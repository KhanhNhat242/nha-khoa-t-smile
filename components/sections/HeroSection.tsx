import Image from 'next/image'

import clinicRoom from '@/public/images/clinic/phong-dieu-tri.jpg'
import porcelainModel from '@/public/images/clinic/mau-ham-rang-su.jpg'
import { bookingHref, sectionIds, siteConfig } from '@/lib/site-config'
import ButtonLink from '@/components/ui/ButtonLink'
import Container from '@/components/ui/Container'
import { Swoosh } from '@/components/ui/Decor'
import {
  CalendarIcon,
  CheckCircleIcon,
  MapPinIcon,
  PhoneIcon,
  ToothIcon,
} from '@/components/ui/Icons'

/** Trust & Authority: 3 điểm tin cậy, lấy nguyên ý từ USP 1 và 3 (mục 6) [SUY RA]. */
const trustPoints = [
  'Bác sĩ Răng Hàm Mặt trực tiếp thăm khám',
  'Chụp phim, đánh giá xương trước khi làm',
  'Phương án riêng cho từng người',
]

/**
 * Hero (#trang-chu) — ND-08, GD-08. Cao vừa một màn hình trên desktop.
 * Flat: nền phẳng, khối màu đặc phía sau ảnh. Không dùng data-reveal ở tiêu đề và ảnh chính (LCP).
 */
export default function HeroSection() {
  return (
    <section
      id={sectionIds.hero}
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-brand-green-light"
    >
      <Container className="grid items-center gap-10 pt-8 pb-14 sm:pt-12 lg:min-h-[max(36rem,calc(100svh-7.75rem))] lg:grid-cols-[55fr_45fr] lg:gap-12 lg:py-8">
        {/* Cột chữ */}
        <div className="max-w-2xl">
          <p className="inline-flex animate-enter items-center gap-2 rounded-2xl bg-brand-yellow px-4 py-2 sm:rounded-full text-sm font-bold text-ink sm:text-base">
            <ToothIcon className="size-[1.15rem]" />
            Nha khoa tại {siteConfig.address.area}
          </p>

          <h1
            id="hero-title"
            className="mt-5 text-balance text-[2.125rem] font-extrabold leading-[1.15] tracking-tight text-ink sm:mt-6 sm:text-5xl lg:mt-5 lg:text-[2.75rem] xl:text-[3.25rem]"
          >
            <span className="relative inline-block">
              {siteConfig.name}
              <Swoosh className="absolute -bottom-2 left-0 h-3 w-full text-brand-yellow sm:-bottom-2.5" />
            </span>
            <span className="sr-only"> – </span>
            {/* Dùng brand-green-strong (không dùng brand-green) để chữ đạt 4,5:1 */}
            <span className="mt-3 block text-brand-green-strong sm:mt-4">
              {siteConfig.headline.split(/(, | & )/).map((part, index) =>
                part === ', ' || part === ' & ' ? (
                  part
                ) : (
                  <span key={`${part}-${index}`} className="whitespace-nowrap">
                    {part}
                  </span>
                ),
              )}
            </span>
          </h1>

          <p className="mt-6 max-w-xl animate-enter text-pretty text-lg lg:mt-5 leading-relaxed text-ink-muted [animation-delay:80ms] sm:text-xl">
            {siteConfig.slogan}
          </p>

          <div className="mt-8 flex animate-enter flex-col gap-3 lg:mt-7 [animation-delay:160ms] sm:flex-row sm:flex-wrap">
            <ButtonLink href={bookingHref} size="lg">
              <CalendarIcon className="size-5" />
              Đặt lịch tư vấn
            </ButtonLink>
            <ButtonLink href={siteConfig.phone.href} variant="outline" size="lg">
              <PhoneIcon className="size-5" />
              Gọi {siteConfig.phone.display}
            </ButtonLink>
          </div>

          {/* Dòng tin cậy */}
          <ul className="mt-8 grid animate-enter gap-3 border-t border-brand-green-100 pt-6 lg:mt-7 lg:pt-5 [animation-delay:240ms] sm:grid-cols-3 sm:gap-4">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-base font-semibold leading-snug text-ink">
                <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-brand-green-strong" />
                {point}
              </li>
            ))}
          </ul>

          {/* Desktop đã có địa chỉ ở thanh thông tin trên cùng */}
          <p className="mt-5 flex items-start gap-2.5 text-base text-ink-muted md:hidden">
            <MapPinIcon className="mt-0.5 size-5 shrink-0 text-brand-green-strong" />
            <span>{siteConfig.address.full}</span>
          </p>
        </div>

        {/* Cụm ảnh: ảnh phòng điều trị + khối màu phẳng + thẻ ảnh nổi */}
        <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:ml-auto lg:h-[min(36rem,calc(100svh-12rem))] lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute top-8 -right-1 bottom-10 left-[24%] rounded-2xl bg-brand-green sm:-right-3 lg:top-10 lg:bottom-8"
          />

          <div className="relative ml-auto aspect-[4/3] w-[92%] overflow-hidden rounded-2xl shadow-float ring-4 ring-surface sm:aspect-[5/4] lg:aspect-auto lg:h-full lg:w-[82%]">
            <Image
              src={clinicRoom}
              alt={`Phòng điều trị của ${siteConfig.name} với ghế nha khoa và màn hình xem phim X-quang`}
              fill
              loading="eager"
              fetchPriority="high"
              placeholder="blur"
              sizes="(min-width: 1280px) 440px, (min-width: 1024px) 36vw, (min-width: 640px) 470px, 92vw"
              className="object-cover object-[50%_42%]"
            />
          </div>

          <figure className="absolute -bottom-6 left-0 w-32 animate-float rounded-2xl bg-surface p-2 shadow-float sm:w-40 lg:bottom-4 lg:-left-6 lg:w-48">
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                src={porcelainModel}
                alt="Mẫu hàm răng sứ thẩm mỹ đặt trên bàn đá"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 192px, 160px"
                className="object-cover"
              />
            </div>
            <figcaption className="px-1 pt-2 pb-0.5 text-sm font-bold text-brand-green-dark">
              Răng sứ thẩm mỹ
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  )
}
