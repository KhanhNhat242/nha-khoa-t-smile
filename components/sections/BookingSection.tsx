import { sectionIds, siteConfig } from '@/lib/site-config'
import { serviceOptions } from '@/lib/services'
import AntdIsland from '@/components/ui/AntdIsland'
import BrandName from '@/components/ui/BrandName'
import Container from '@/components/ui/Container'
import { ChatIcon, PhoneIcon } from '@/components/ui/Icons'
import SectionHeading from '@/components/ui/SectionHeading'
import { revealDelay } from '@/components/ui/reveal'

import BookingForm from './BookingForm'
import BookingFormSkeleton from './BookingFormSkeleton'

/**
 * Section "Đặt lịch tư vấn" (#dat-lich) — CN-03, nền trắng, thẻ form xanh lá đậm.
 * GD-17: từ 1024px cột chữ bên trái bám dính ngay dưới header (cao 84px) khi cuộn trong section.
 */
export default function BookingSection() {
  return (
    <section id={sectionIds.booking} aria-labelledby="booking-title" className="bg-surface text-ink">
      <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-28">
        {/* Lớp ngoài bám dính; data-reveal đặt ở lớp trong (không đặt hiệu ứng trên phần tử sticky) */}
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <div data-reveal="left">
            {/* TODO(content): lời mời đặt lịch [ĐỀ XUẤT] — chờ khách xác nhận (mục 13). */}
            <SectionHeading
              layout="stack"
              titleId="booking-title"
              title={
                <>
                  Đặt lịch thăm khám tại <BrandName />
                </>
              }
              description={`Quý khách để lại thông tin, ${siteConfig.name} sẽ liên hệ lại để xác nhận lịch hẹn. Cần tư vấn ngay, Quý khách vui lòng gọi hotline hoặc nhắn Zalo.`}
            />

            <div className="mt-10 border-t border-brand-green-100 pt-8">
              <p className="text-sm font-bold tracking-[0.08em] text-ink-muted uppercase">Hotline</p>
              <a
                href={siteConfig.phone.href}
                className="mt-2 inline-block text-[2.25rem] leading-none font-bold text-brand-green-strong tracking-[-0.01em] underline-offset-8 hover:underline sm:text-5xl"
              >
                {siteConfig.phone.display}
              </a>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={siteConfig.phone.href}
                  className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-brand-yellow px-5 font-bold text-ink transition-[background-color,scale] duration-200 hover:bg-brand-yellow/85 active:scale-[0.97] active:duration-75"
                >
                  <PhoneIcon className="size-5" />
                  Gọi ngay
                </a>
                <a
                  href={siteConfig.zalo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-brand-green-strong px-5 font-bold text-brand-green-strong transition-colors duration-200 hover:bg-brand-green-strong hover:text-surface"
                >
                  <ChatIcon className="size-5" />
                  {siteConfig.zalo.label}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div data-reveal="right" className="lg:col-span-6 lg:col-start-7" style={revealDelay(150)}>
          {/* Thẻ nền xanh đậm: chữ của antd Form (label, dấu *, lỗi, bộ đếm) đổi sang màu sáng để đủ tương phản */}
          <div className="rounded-2xl bg-brand-green-dark p-6 text-surface shadow-float sm:p-8 lg:p-10 [&_.ant-form-item-explain-error]:text-brand-yellow-light [&_.ant-form-item-label>label]:text-surface [&_.ant-form-item-required::before]:!text-brand-yellow-light [&_.ant-input-data-count]:text-surface/80 [&_:focus-visible]:outline-surface">
            <h3 className="text-2xl font-bold tracking-[-0.01em] text-surface">Thông tin đặt lịch</h3>
            <p className="mt-1.5 text-base text-surface/85">
              Các mục có dấu <span className="font-bold text-brand-yellow-light">*</span> là bắt buộc.
            </p>
            <div className="mt-7">
              <AntdIsland fallback={<BookingFormSkeleton />}>
                <BookingForm options={serviceOptions} />
              </AntdIsland>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
