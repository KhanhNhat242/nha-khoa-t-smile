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

/** Section "Đặt lịch tư vấn" (#dat-lich) — CN-03, dải xanh lá đậm toàn chiều ngang. */
export default function BookingSection() {
  return (
    <section id={sectionIds.booking} aria-labelledby="booking-title" className="bg-brand-green-dark text-surface">
      <Container className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-28">
        <div data-reveal="left" className="lg:col-span-5">
          {/* TODO(content): lời mời đặt lịch [ĐỀ XUẤT] — chờ khách xác nhận (mục 13). */}
          <SectionHeading
            layout="stack"
            tone="dark"
            titleId="booking-title"
            title={
              <>
                Đặt lịch thăm khám tại <BrandName />
              </>
            }
            description={`Quý khách để lại thông tin, ${siteConfig.name} sẽ liên hệ lại để xác nhận lịch hẹn. Cần tư vấn ngay, Quý khách vui lòng gọi hotline hoặc nhắn Zalo.`}
          />

          <div className="mt-10 border-t border-surface/20 pt-8">
            <p className="text-sm font-bold tracking-[0.08em] text-surface/85 uppercase">Hotline</p>
            <a
              href={siteConfig.phone.href}
              className="mt-2 inline-block text-[2.25rem] leading-none font-bold tracking-[-0.01em] underline-offset-8 hover:underline sm:text-5xl"
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
                className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-surface/50 px-5 font-bold transition-colors duration-200 hover:border-surface hover:bg-surface hover:text-brand-green-dark"
              >
                <ChatIcon className="size-5" />
                {siteConfig.zalo.label}
              </a>
            </div>
          </div>
        </div>

        <div data-reveal="right" className="lg:col-span-6 lg:col-start-7" style={revealDelay(150)}>
          <div className="rounded-2xl bg-surface p-6 text-ink shadow-float sm:p-8 lg:p-10">
            <h3 className="text-2xl font-bold tracking-[-0.01em] text-ink">Thông tin đặt lịch</h3>
            <p className="mt-1.5 text-base text-ink-muted">
              Các mục có dấu <span className="font-bold text-danger">*</span> là bắt buộc.
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
