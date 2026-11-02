import Image from 'next/image'

import heroBanner from '@/public/images/hero-banner.jpg'
import { bookingHref, sectionIds, siteConfig } from '@/lib/site-config'
import Container from '@/components/ui/Container'
import {
  ArrowRightIcon,
  CheckIcon,
  ClipboardIcon,
  PhoneIcon,
  ScanIcon,
  StethoscopeIcon,
} from '@/components/ui/Icons'

import { revealDelay } from '@/components/ui/reveal'

import HeroHeadline from './HeroHeadline'

/** Trust & Authority: 3 điểm tin cậy, lấy nguyên ý từ USP 1 và 3 (mục 6) [SUY RA]. */
const trustPoints = [
  { text: 'Bác sĩ Răng Hàm Mặt trực tiếp thăm khám', Icon: StethoscopeIcon },
  { text: 'Chụp phim, đánh giá xương trước khi làm', Icon: ScanIcon },
  { text: 'Phương án riêng cho từng người', Icon: ClipboardIcon },
]

/**
 * Hero (#trang-chu) — ND-08, GD-12. Ảnh phòng điều trị phủ kín section, cao đúng một màn hình
 * (trừ thanh thông tin và header). Chữ trắng góc dưới trái trên lớp phủ xanh đậm;
 * thẻ nổi 3 điểm tin cậy góc dưới phải (từ md).
 * data-reveal (GD-15) chỉ cho đoạn mô tả và nút; không dùng ở tiêu đề và ảnh nền (LCP).
 */
export default function HeroSection() {
  const [mainPoint, ...otherPoints] = trustPoints

  return (
    <section
      id={sectionIds.hero}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[max(34rem,calc(100svh-4rem-4px))] overflow-hidden bg-brand-green-dark md:min-h-[max(34rem,calc(100svh-6.5rem-4px))] lg:min-h-[max(36rem,calc(100svh-7.5rem-4px))]"
    >
      <Image
        src={heroBanner}
        alt={`Phòng điều trị của ${siteConfig.name} với ghế nha khoa và màn hình xem phim X-quang`}
        fill
        loading="eager"
        fetchPriority="high"
        placeholder="blur"
        sizes="100vw"
        className="-z-20 object-cover object-[68%_50%] md:object-[60%_45%]"
      />
      {/* Lớp phủ: xanh đậm từ mép trái nhạt dần sang phải, và đậm ở đáy — nền sau chữ trắng luôn đủ tương phản */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-linear-to-r from-brand-green-strong from-0% via-brand-green-dark/60 via-30% to-transparent to-55% md:block"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-brand-green-dark from-25% via-brand-green-dark/75 via-50% to-transparent to-80% md:from-brand-green-dark/90 md:from-0% md:via-brand-green-dark/40 md:via-35% md:to-60%"
      />

      <Container className="flex w-full items-end justify-between gap-10 pt-16 pb-28 md:pb-12 lg:pb-16">
        <div className="max-w-2xl text-surface">
          <HeroHeadline
            id="hero-title"
            name={siteConfig.name}
            headline={siteConfig.headline}
            className="text-[2.25rem] leading-[1.08] font-bold tracking-[-0.025em] select-none sm:text-[3rem] xl:text-[3.75rem]"
          />

          <p data-reveal="up" style={revealDelay(80)} className="mt-5 max-w-xl text-lg leading-relaxed text-pretty text-surface/90 sm:text-xl">
            {siteConfig.slogan}
          </p>

          <div data-reveal="up" style={revealDelay(200)} className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
            <a
              href={bookingHref}
              className="group inline-flex min-h-14 items-center justify-center gap-2.5 self-start rounded-full bg-surface px-7 text-[1.0625rem] font-bold text-brand-green-dark shadow-soft transition-[background-color,scale] duration-200 hover:bg-brand-green-light active:scale-[0.97] active:duration-75"
            >
              Đặt lịch tư vấn
              <ArrowRightIcon className="size-5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href={siteConfig.phone.href}
              className="group inline-flex min-h-12 items-center gap-3 self-start rounded-full text-surface"
            >
              <span className="grid size-12 place-items-center rounded-full border border-surface/40 transition-colors duration-200 group-hover:bg-surface group-hover:text-brand-green-dark">
                <PhoneIcon className="size-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm text-surface/80">Gọi hotline</span>
                <span className="block text-lg font-bold tracking-wide">{siteConfig.phone.display}</span>
              </span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
