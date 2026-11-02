import { sectionIds, siteConfig } from '@/lib/site-config'
import { serviceOptions } from '@/lib/services'
import BrandName from '@/components/ui/BrandName'
import Container from '@/components/ui/Container'
import { Wave } from '@/components/ui/Decor'
import { ChatIcon, CheckCircleIcon, PhoneIcon } from '@/components/ui/Icons'
import SectionHeading from '@/components/ui/SectionHeading'
import { revealDelay } from '@/components/ui/reveal'

import AntdIsland from '@/components/ui/AntdIsland'

import BookingForm from './BookingForm'
import BookingFormSkeleton from './BookingFormSkeleton'

/** Nhắc lại 3 điểm thăm khám — lấy từ USP 1 và 3 (mục 6). */
const assurances = [
  'Bác sĩ Răng Hàm Mặt trực tiếp thăm khám',
  'Kiểm tra khớp cắn, chụp phim, đánh giá xương',
  'Giải thích rõ từng bước trước khi điều trị',
]

/** Section "Đặt lịch tư vấn" (#dat-lich) — CN-03, nền xanh lá đậm. */
export default function BookingSection() {
  return (
    <section
      id={sectionIds.booking}
      aria-labelledby="booking-title"
      className="relative overflow-hidden bg-brand-green-dark text-surface"
    >
      <Wave className="fill-brand-green-light" />

      <Container className="grid gap-10 py-14 lg:grid-cols-12 lg:gap-12 lg:py-20">
        <div data-reveal className="lg:col-span-5">
          {/* TODO(content): lời mời đặt lịch [ĐỀ XUẤT] — chờ khách xác nhận (mục 13). */}
          <SectionHeading
            eyebrow="Đặt lịch tư vấn"
            titleId="booking-title"
            title={
              <>
                Đặt lịch thăm khám tại <BrandName />
              </>
            }
            description={`Quý khách để lại thông tin, ${siteConfig.name} sẽ liên hệ lại để xác nhận lịch hẹn. Cần tư vấn ngay, Quý khách vui lòng gọi hotline hoặc nhắn Zalo.`}
            align="left"
            tone="dark"
          />

          <div className="mt-8 space-y-3">
            <a
              href={siteConfig.phone.href}
              className="flex min-h-[4.5rem] items-center gap-4 rounded-xl bg-brand-yellow p-4 text-ink transition-[background-color,scale] duration-200 hover:bg-brand-yellow/85 active:scale-[0.98] active:duration-75 sm:p-5"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-surface text-brand-green-strong">
                <PhoneIcon className="size-6" />
              </span>
              <span className="leading-tight">
                <span className="block text-base font-medium">Gọi hotline</span>
                <span className="mt-0.5 block text-2xl font-extrabold tracking-wide sm:text-[1.75rem]">
                  {siteConfig.phone.display}
                </span>
              </span>
            </a>
            <a
              href={siteConfig.zalo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-14 items-center gap-4 rounded-xl border-2 border-surface/50 px-4 text-lg font-bold text-surface transition-colors duration-200 hover:border-surface hover:bg-surface hover:text-brand-green-dark sm:px-5"
            >
              <ChatIcon className="size-6 shrink-0" />
              {siteConfig.zalo.label} {siteConfig.phone.display}
            </a>
          </div>

          <ul className="mt-8 space-y-3">
            {assurances.map((text) => (
              <li key={text} className="flex items-start gap-3 text-base text-surface/90 sm:text-lg">
                <CheckCircleIcon className="mt-0.5 size-6 shrink-0 text-brand-yellow" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal className="lg:col-span-7" style={revealDelay(120)}>
          <div className="rounded-2xl bg-surface p-6 text-ink shadow-float sm:p-8 lg:p-10">
            <h3 className="text-2xl font-extrabold text-ink">Thông tin đặt lịch</h3>
            <p className="mt-1.5 text-base text-ink-muted">
              Các mục có dấu <span className="font-bold text-danger">*</span> là bắt buộc.
            </p>
            <div className="mt-6">
              <AntdIsland fallback={<BookingFormSkeleton />}>
                <BookingForm options={serviceOptions} />
              </AntdIsland>
            </div>
          </div>
        </div>
      </Container>

      <Wave flip className="fill-surface" />
    </section>
  )
}
