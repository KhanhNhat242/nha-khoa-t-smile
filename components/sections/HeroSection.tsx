import Image from 'next/image'

import doctorPhoto from '@/public/images/hero-doctor.webp'
import { bookingHref, navItems, sectionIds, siteConfig } from '@/lib/site-config'
import Container from '@/components/ui/Container'
import { ArrowRightIcon, PhoneIcon } from '@/components/ui/Icons'
import { revealDelay } from '@/components/ui/reveal'

import BrandLink from '@/components/layout/BrandLink'

import HeroHeadline from './HeroHeadline'
import HeroNavObserver from './HeroNavObserver'

/**
 * Hero (#trang-chu) — ND-08, GD-16 (thay bố cục GD-12, giữ tiêu đề chữ nổi).
 * Từ 1280px: cao bằng màn hình nhưng trong khoảng 40–50rem (màn hình lớn không bị hero quá cao);
 * nền xanh đậm + thẻ trắng bên phải, ảnh bác sĩ tách nền đứng giữa đè lên cả hai mảng.
 * Nền mảng xanh: gradient loang (các đốm màu mờ trôi chậm, đứng yên khi bật giảm chuyển động).
 * Dưới 1280px: tiêu đề, nút và ảnh xếp dọc trên nền xanh; thẻ trắng (USP 3) nằm dưới ảnh.
 * Từ 1280px, header ẩn khi đang ở hero: logo + menu chính nằm ở hàng trên cùng của thẻ trắng; cuộn qua thì
 * header trượt xuống, hàng này mờ đi (HeroNavObserver).
 * Ảnh bác sĩ là phần tử LCP: tải sớm, không dùng data-reveal.
 */
export default function HeroSection() {
  return (
    <section
      id={sectionIds.hero}
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-brand-green-dark text-surface xl:min-h-[clamp(40rem,100svh,50rem)]"
    >
      {/* Gradient loang: đốm sáng đặt xa vùng chữ (góc trên trái giữ màu đậm) để chữ trắng đủ tương phản */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute -top-[20%] -left-[15%] size-[34rem] animate-blob-a rounded-full bg-brand-green-strong/70 blur-3xl will-change-transform xl:size-[46rem]" />
        <div className="absolute top-[35%] left-[25%] size-[26rem] animate-blob-b rounded-full bg-brand-green/60 blur-3xl will-change-transform xl:top-[20%] xl:left-[38%] xl:size-[36rem]" />
        <div className="absolute bottom-[-10%] left-[-10%] size-[22rem] animate-blob-c rounded-full bg-brand-green-100/15 blur-3xl will-change-transform xl:bottom-[-25%] xl:size-[30rem]" />
        <div className="absolute right-[-10%] bottom-[20%] size-[18rem] animate-blob-a rounded-full bg-brand-yellow/15 blur-3xl will-change-transform [animation-delay:-9s] xl:right-auto xl:bottom-[-12%] xl:left-[30%] xl:size-[24rem]" />
      </div>

      {/* Trang trí: các vòng tròn đồng tâm và quầng sáng sau lưng bác sĩ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[22rem] left-1/2 -z-10 size-[28rem] -translate-x-1/2 translate-y-1/2 sm:size-[34rem] xl:top-1/2 xl:bottom-auto xl:left-[calc(50%+min(3%,2.4rem))] xl:size-[46rem] xl:-translate-y-1/2"
      >
        <div className="absolute inset-0 rounded-full border border-surface/10" />
        <div className="absolute inset-[12%] rounded-full border border-surface/10" />
        <div className="absolute inset-[24%] rounded-full bg-brand-green/40 blur-3xl" />
      </div>

      {/* Thẻ trắng bên phải (chỉ là nền, nội dung nằm ở cột phải của lưới) */}
      <div
        aria-hidden="true"
        className="absolute inset-y-4 right-4 left-[calc(50%+min(6%,4.8rem))] -z-10 hidden rounded-[2rem] bg-surface xl:block"
      />

      {/* Hàng trên cùng thẻ trắng (từ 1280px): logo bên trái, menu chính bên phải. Cuộn qua thì ẩn, header hiện lại. */}
      <div
        id="hero-nav"
        className="absolute top-8 right-8 left-[calc(50%+min(6%,4.8rem)+2rem)] z-30 hidden items-center justify-between gap-4 transition-[opacity,translate,visibility] duration-300 ease-soft xl:flex in-data-[past-hero]:invisible in-data-[past-hero]:-translate-y-3 in-data-[past-hero]:opacity-0"
      >
        {/* Thẻ trắng hẹp ở 1280–1679px: chỉ hiện biểu tượng logo, đủ chỗ mới hiện tên */}
        <BrandLink nameClassName="hidden whitespace-nowrap min-[1680px]:block" />
        <nav aria-label="Menu chính">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-xl px-3 text-base font-semibold whitespace-nowrap text-ink transition-colors duration-200 hover:bg-brand-green-light hover:text-brand-green-strong 2xl:px-4"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <HeroNavObserver />

      <Container className="grid pt-10 sm:pt-14 xl:min-h-[inherit] xl:grid-cols-12 xl:gap-8 xl:py-14">
        {/* Cột trái: tiêu đề và nút, căn giữa theo chiều dọc từ 1280px */}
        <div className="relative z-20 flex flex-col xl:col-span-5 xl:justify-center xl:pb-16">
          <HeroHeadline
            id="hero-title"
            name={siteConfig.name}
            headline={siteConfig.headline}
            className="text-[2.25rem] leading-[1.08] font-bold tracking-[-0.025em] select-none sm:text-[3rem] xl:text-[3.5rem]"
          />

          <div
            data-reveal="up"
            style={revealDelay(200)}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7"
          >
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
                <span className="block text-sm text-surface/90">Gọi hotline</span>
                <span className="block text-lg font-bold tracking-wide">{siteConfig.phone.display}</span>
              </span>
            </a>
          </div>
        </div>

        {/* Ảnh bác sĩ: trong luồng trên mobile, đứng giữa section từ 1280px */}
        <div className="relative z-10 mx-auto mt-8 w-full max-w-[20rem] sm:max-w-[24rem] xl:absolute xl:bottom-0 xl:left-[calc(50%+min(3%,2.4rem))] xl:mt-0 xl:h-[84%] xl:max-h-[46rem] xl:w-auto xl:max-w-none xl:-translate-x-1/2">
          <Image
            src={doctorPhoto}
            alt={`Bác sĩ của ${siteConfig.name} mặc áo blouse, cầm tập tài liệu của phòng khám`}
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1280px) 460px, (min-width: 640px) 384px, 320px"
            className="h-auto w-full xl:h-full xl:w-auto"
          />
        </div>

        {/* Cột phải: câu USP 3 (nằm trên thẻ trắng từ 1280px, căn giữa theo chiều dọc) */}
        <div className="relative z-20 mb-4 flex flex-col rounded-[2rem] bg-surface p-6 text-ink sm:p-8 xl:col-span-4 xl:col-start-9 xl:mb-0 xl:justify-center xl:rounded-none xl:bg-transparent xl:p-0 xl:pl-10"
        >
          {/* TODO(content): câu USP 3 viết gọn lại từ nguyên văn [SUY RA] (GD-16). */}
          <p className="text-2xl leading-snug font-bold tracking-[-0.01em] text-balance xl:text-[1.75rem]">
            Kiểm tra khớp cắn, chụp phim, đánh giá xương, rồi đưa ra{' '}
            <span className="text-brand-green-strong">phương án riêng cho từng người</span>.
          </p>
        </div>
      </Container>
    </section>
  )
}
