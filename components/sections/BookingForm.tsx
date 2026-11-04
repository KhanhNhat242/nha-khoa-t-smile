'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import { Button, DatePicker, Form, Input, Select } from 'antd'
import dayjs, { type Dayjs } from 'dayjs'

import { submitBooking } from '@/app/actions/booking'
import { siteConfig } from '@/lib/site-config'
import {
  HONEYPOT_FIELD,
  NAME_MAX,
  NOTE_MAX,
  messages,
  validateFullName,
  validateNote,
  validatePhone,
  type BookingField,
} from '@/lib/validation/booking'
import { AlertIcon, ShieldCheckIcon } from '@/components/ui/Icons'

type Option = { value: string; label: string }

type FormValues = {
  fullName?: string
  phone?: string
  service?: string
  preferredDate?: Dayjs | null
  note?: string
}

type Status =
  | { kind: 'idle' }
  | { kind: 'success'; delivered: boolean }
  | { kind: 'error'; attempt: number }

/** Biến hàm kiểm tra dùng chung (trả về thông báo lỗi) thành rule của antd Form. */
function toRule(check: (value: string) => string | null) {
  return {
    validator: (_: unknown, value: unknown) => {
      const message = check(typeof value === 'string' ? value : '')
      return message ? Promise.reject(new Error(message)) : Promise.resolve()
    },
  }
}

const dateRule = {
  validator: (_: unknown, value: Dayjs | null | undefined) =>
    value && value.isBefore(dayjs().startOf('day'))
      ? Promise.reject(new Error(messages.datePast))
      : Promise.resolve(),
}

/** Dấu kiểm thành công: vòng tròn bật ra, nét kiểm vẽ dần (Micro-interactions, GD-08). */
function SuccessMark() {
  return (
    <span className="mx-auto grid size-16 animate-pop place-items-center rounded-full bg-success/15 ring-4 ring-success/30">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-9">
        <circle cx="12" cy="12" r="10" className="fill-success" />
        <path
          d="m7.5 12.5 3 3 6-6.5"
          className="animate-draw stroke-surface"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={24}
        />
      </svg>
    </span>
  )
}

/**
 * Form "Đặt lịch tư vấn" (CN-03, GD-08 Conversion + Micro-interactions).
 * Một nút CTA chính, ô nhập cao 48px. Kiểm tra ở client bằng các hàm dùng chung với server,
 * rồi gửi tới Server Action (server kiểm tra lại toàn bộ).
 */
export default function BookingForm({ options }: { options: readonly Option[] }) {
  const [form] = Form.useForm<FormValues>()
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [isPending, startTransition] = useTransition()
  const honeypotRef = useRef<HTMLInputElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  // Bấm "Đặt lịch tư vấn" ở thẻ dịch vụ (phần tử có data-book-service) => chọn sẵn dịch vụ đó.
  useEffect(() => {
    const allowed = new Set(options.map((option) => option.value))
    function handleClick(event: MouseEvent) {
      const trigger =
        event.target instanceof Element ? event.target.closest<HTMLElement>('[data-book-service]') : null
      const value = trigger?.dataset.bookService
      if (!value || !allowed.has(value)) return
      form.setFieldValue('service', value)
      setStatus((current) => (current.kind === 'success' ? { kind: 'idle' } : current))
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [form, options])

  useEffect(() => {
    if (status.kind === 'success') successRef.current?.focus()
  }, [status])

  function handleFinish(values: FormValues) {
    if (isPending) return
    const previousAttempt = status.kind === 'error' ? status.attempt : 0
    setStatus({ kind: 'idle' })
    const payload = {
      fullName: values.fullName ?? '',
      phone: values.phone ?? '',
      service: values.service ?? '',
      preferredDate: values.preferredDate ? values.preferredDate.format('YYYY-MM-DD') : '',
      note: values.note ?? '',
      [HONEYPOT_FIELD]: honeypotRef.current?.value ?? '',
    }

    startTransition(async () => {
      try {
        const result = await submitBooking(payload)
        if (result.status === 'success') {
          form.resetFields()
          setStatus({ kind: 'success', delivered: result.delivered })
        } else if (result.status === 'invalid') {
          form.setFields(
            (Object.entries(result.errors) as [BookingField, string][]).map(([name, error]) => ({
              name,
              errors: [error],
            })),
          )
        } else {
          setStatus({ kind: 'error', attempt: previousAttempt + 1 })
        }
      } catch {
        setStatus({ kind: 'error', attempt: previousAttempt + 1 })
      }
    })
  }

  return (
    <div>
      {status.kind === 'success' ? (
        <div
          ref={successRef}
          tabIndex={-1}
          role="status"
          className="animate-enter rounded-2xl bg-surface p-6 text-center ring-2 ring-success/40 outline-none sm:p-8"
        >
          <SuccessMark />
          <p className="mt-4 text-xl font-extrabold text-ink">Cảm ơn Quý khách!</p>
          <p className="mt-2 text-base leading-relaxed text-ink-muted">
            {siteConfig.name} sẽ liên hệ lại để xác nhận lịch hẹn.
          </p>
          {!status.delivered ? (
            // TODO(booking-destination): bỏ thông báo này khi form đã gửi dữ liệu thật (Q-09).
            <p className="mt-5 rounded-xl bg-brand-yellow-light p-4 text-left text-base leading-relaxed text-ink">
              <strong>Lưu ý:</strong> đây là bản demo, thông tin chưa được gửi tới phòng khám. Để đặt lịch, Quý
              khách vui lòng gọi hotline{' '}
              <a href={siteConfig.phone.href} className="font-bold text-brand-green-strong underline">
                {siteConfig.phone.display}
              </a>
              .
            </p>
          ) : null}
          <Button size="large" className="mt-6" onClick={() => setStatus({ kind: 'idle' })}>
            Gửi yêu cầu khác
          </Button>
        </div>
      ) : null}

      <div hidden={status.kind === 'success'}>
        <Form<FormValues>
          form={form}
          name="booking"
          layout="vertical"
          size="large"
          requiredMark
          validateTrigger="onBlur"
          disabled={isPending}
          onFinish={handleFinish}
          scrollToFirstError={{ behavior: 'smooth', block: 'center' }}
          autoComplete="on"
        >
          <div className="grid gap-x-5 sm:grid-cols-2">
            <Form.Item<FormValues>
              label="Họ và tên"
              name="fullName"
              required
              hasFeedback
              rules={[toRule(validateFullName)]}
            >
              <Input autoComplete="name" maxLength={NAME_MAX} placeholder="Ví dụ: Nguyễn Văn An" />
            </Form.Item>

            <Form.Item<FormValues>
              label="Số điện thoại"
              name="phone"
              required
              hasFeedback
              rules={[toRule(validatePhone)]}
            >
              <Input
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                maxLength={20}
                placeholder="Ví dụ: 0912 345 678"
              />
            </Form.Item>

            <Form.Item<FormValues> label="Dịch vụ quan tâm" name="service">
              <Select
                allowClear
                placeholder="Chọn dịch vụ"
                options={options.map((option) => ({ value: option.value, label: option.label }))}
              />
            </Form.Item>

            <Form.Item<FormValues> label="Ngày mong muốn" name="preferredDate" rules={[dateRule]}>
              <DatePicker
                className="w-full"
                format="DD/MM/YYYY"
                placeholder="DD/MM/YYYY"
                disabledDate={(date) => date.isBefore(dayjs().startOf('day'))}
              />
            </Form.Item>
          </div>

          <Form.Item<FormValues>
            label="Ghi chú"
            name="note"
            rules={[toRule(validateNote)]}
            className="mb-9"
          >
            <Input.TextArea
              rows={3}
              maxLength={NOTE_MAX}
              showCount
              placeholder="Ví dụ: thời gian thuận tiện để nhận cuộc gọi, câu hỏi cần tư vấn"
            />
          </Form.Item>

          {/* Ô bẫy chống spam: người dùng không thấy, bot thường tự điền */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor={`booking_${HONEYPOT_FIELD}`}>Website</label>
            <input
              ref={honeypotRef}
              id={`booking_${HONEYPOT_FIELD}`}
              name={HONEYPOT_FIELD}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>

          {status.kind === 'error' ? (
            <div
              key={status.attempt}
              role="alert"
              className="mb-5 flex animate-shake items-start gap-3 rounded-xl bg-surface p-4 text-base leading-relaxed text-danger ring-1 ring-danger/30"
            >
              <AlertIcon className="mt-0.5 size-5 shrink-0" />
              <p>
                Chưa gửi được thông tin. Quý khách vui lòng thử lại hoặc gọi hotline{' '}
                <a href={siteConfig.phone.href} className="font-bold underline">
                  {siteConfig.phone.display}
                </a>{' '}
                để được hỗ trợ.
              </p>
            </div>
          ) : null}

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isPending}
            className="h-14 bg-brand-yellow text-[1.0625rem] text-ink transition-[background-color,scale] hover:bg-brand-yellow/85 active:scale-[0.98] active:duration-75"
          >
            {isPending ? 'Đang gửi...' : 'Gửi yêu cầu đặt lịch'}
          </Button>

          <p className="mt-4 flex items-start gap-2.5 text-base leading-relaxed text-surface/85">
            <ShieldCheckIcon className="mt-0.5 size-5 shrink-0 text-brand-green-100" />
            Thông tin của Quý khách chỉ được dùng để liên hệ tư vấn và xác nhận lịch hẹn.
          </p>
        </Form>
      </div>
    </div>
  )
}
