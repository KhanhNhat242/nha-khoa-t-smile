'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import Image from 'next/image'

import { bookingHref } from '@/lib/site-config'
import type { Service } from '@/lib/services'
import { ArrowRightIcon, ToothIcon } from '@/components/ui/Icons'

/** Chiều cao header dính trên desktop (px) — khớp h-20 của Header. */
const HEADER_OFFSET = 80
const DESKTOP_QUERY = '(min-width: 64rem)'
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Tính biến đổi cho thẻ thứ i khi "vị trí" cuộn của bộ thẻ là `position` (0 → n-1).
 * d = i - position: d < 0 là thẻ đang trượt xuống rời đi, d ≥ 0 là thẻ còn trong chồng.
 */
function cardStyle(
  index: number,
  position: number,
): { transform: string; opacity: number; filter: string } {
  const d = index - position
  if (d < 0) {
    // Thẻ đang trượt xuống rời đi: giữ đặc tới 60% quãng đường rồi mới mờ hẳn
    const e = Math.min(-d, 1)
    return {
      transform: `translate3d(0, ${e * 120}%, 0) rotate(${e * 8}deg)`,
      opacity: e < 0.6 ? 1 : Math.max(0, 1 - (e - 0.6) / 0.4),
      filter: 'none',
    }
  }
  // Thẻ trong chồng: đặc, lệch và xoay dần về sau, tối nhẹ theo độ sâu; từ lớp thứ 3 trở đi ẩn
  const depth = Math.min(d, 3)
  return {
    transform: `translate3d(${-depth * 26}px, ${-depth * 18}px, 0) rotate(${-depth * 5}deg) scale(${1 - depth * 0.05})`,
    opacity: d <= 2.4 ? 1 : Math.max(0, (3 - d) / 0.6),
    filter: `brightness(${1 - depth * 0.12})`,
  }
}

function cssVars(index: number, position: number): CSSProperties {
  const { transform, opacity, filter } = cardStyle(index, position)
  return { '--card-tf': transform, '--card-op': String(opacity), '--card-filter': filter } as CSSProperties
}

/**
 * Section Dịch vụ dạng chồng thẻ cuộn (GD-10).
 * Desktop: cột trái (tiêu đề + danh sách dịch vụ) và cột phải (chồng thẻ) cùng dính trong vùng cuộn
 * cao n × 70svh; tiến độ cuộn quyết định thẻ nào ở trên cùng.
 * Mobile và prefers-reduced-motion: thẻ xếp dọc bình thường.
 */
export default function ServicesDeck({
  services,
  header,
}: {
  services: readonly Service[]
  header: ReactNode
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLLIElement | null)[]>([])
  const [active, setActive] = useState(0)
  const [interactive, setInteractive] = useState(false)
  const count = services.length

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY)
    const reduced = window.matchMedia(REDUCED_QUERY)
    let frame = 0

    const update = () => {
      frame = 0
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const scrollable = rect.height - (window.innerHeight - HEADER_OFFSET)
      const progress = scrollable > 0 ? Math.min(Math.max((HEADER_OFFSET - rect.top) / scrollable, 0), 1) : 0
      const position = progress * (count - 1)
      cardRefs.current.forEach((card, index) => {
        if (!card) return
        const { transform, opacity, filter } = cardStyle(index, position)
        card.style.setProperty('--card-tf', transform)
        card.style.setProperty('--card-op', String(opacity))
        card.style.setProperty('--card-filter', filter)
      })
      setActive((current) => {
        const next = Math.min(Math.round(position), count - 1)
        return next === current ? current : next
      })
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const sync = () => {
      const enabled = desktop.matches && !reduced.matches
      setInteractive(enabled)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (enabled) {
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)
        update()
      }
    }

    sync()
    desktop.addEventListener('change', sync)
    reduced.addEventListener('change', sync)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      desktop.removeEventListener('change', sync)
      reduced.removeEventListener('change', sync)
    }
  }, [count])

  /** Cuộn tới vị trí để thẻ thứ index nằm trên cùng. */
  function goTo(index: number) {
    const section = sectionRef.current
    if (!section) return
    const rect = section.getBoundingClientRect()
    const scrollable = rect.height - (window.innerHeight - HEADER_OFFSET)
    const sectionTop = window.scrollY + rect.top
    const target = sectionTop - HEADER_OFFSET + (index / (count - 1)) * scrollable + 1
    const smooth = !window.matchMedia(REDUCED_QUERY).matches
    window.scrollTo({ top: target, behavior: smooth ? 'smooth' : 'auto' })
  }

  return (
    <div
      ref={sectionRef}
      style={{ '--deck-count': count } as CSSProperties}
      className="lg:h-[calc(var(--deck-count)*70svh)] motion-reduce:lg:h-auto"
    >
      <div className="grid gap-10 lg:sticky lg:top-20 lg:h-[calc(100svh-5rem)] lg:grid-cols-12 lg:items-center lg:gap-8 motion-reduce:lg:static motion-reduce:lg:h-auto">
        {/* Cột trái */}
        <div className="lg:col-span-5">
          {header}
          <ol className="mt-8 hidden border-t border-brand-green-100 lg:block motion-reduce:lg:hidden">
            {services.map((service, index) => {
              const isActive = index === active
              return (
                <li key={service.slug} className="border-b border-brand-green-100">
                  <button
                    type="button"
                    onClick={() => goTo(index)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`group flex min-h-13 w-full items-center gap-4 text-left text-lg transition-colors duration-200 ${isActive ? 'font-bold text-brand-green-dark' : 'font-medium text-ink-muted hover:text-ink'
                      }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-0.5 shrink-0 rounded-full bg-brand-green-strong transition-[width] duration-300 ${isActive ? 'w-8' : 'w-3 bg-brand-green-100'
                        }`}
                    />
                    {service.name}
                  </button>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Cột phải: chồng thẻ */}
        <div data-reveal="up" style={{ '--reveal-delay': '150ms' } as CSSProperties} className="lg:col-span-6 lg:col-start-7 lg:flex lg:justify-center">
          <ul className="grid gap-5 sm:grid-cols-2 lg:relative lg:block lg:h-[29.5rem] lg:w-[23.75rem] motion-reduce:lg:grid motion-reduce:lg:h-auto motion-reduce:lg:w-auto">
            {services.map((service, index) => {
              const hidden = interactive && index !== active
              return (
                <li
                  key={service.slug}
                  ref={(node) => {
                    cardRefs.current[index] = node
                  }}
                  inert={hidden}
                  aria-hidden={hidden ? true : undefined}
                  style={{ ...cssVars(index, 0), zIndex: count - index }}
                  className="lg:absolute lg:inset-0 lg:[filter:var(--card-filter)] lg:[opacity:var(--card-op)] lg:[transform:var(--card-tf)] lg:will-change-transform motion-reduce:lg:static motion-reduce:lg:[filter:none] motion-reduce:lg:[opacity:1] motion-reduce:lg:[transform:none]"
                >
                  <ServiceCard service={service} />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="relative isolate flex aspect-[4/5] h-full w-full flex-col overflow-hidden rounded-3xl bg-brand-green-dark text-surface shadow-float lg:aspect-auto">
      {/* Ảnh chỉ phủ ~68% phía trên thẻ: ảnh gốc nhỏ (≈ 443–590px) nên không bị phóng to, giữ ảnh nét */}
      <div className="absolute inset-x-0 top-0 -z-20 h-[68%]">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className={`object-cover ${service.imagePosition}`}
        />
      </div>
      {/* Lớp nền xanh đậm dưới chữ để chữ trắng đủ tương phản */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-[68%] bg-linear-to-t from-brand-green-dark from-45% via-brand-green-dark/85 to-transparent"
      />

      <div className="mt-auto p-6 sm:p-7">
        {/* Dấu cách quanh "–" không ngắt dòng để "Răng – Hàm – Mặt" luôn đi liền */}
        <h3 className="text-[1.625rem] leading-tight font-bold tracking-[-0.015em] text-balance">
          {service.name.replaceAll(' – ', ' – ')}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-surface/90">{service.description}</p>
        <a
          href={bookingHref}
          data-book-service={service.slug}
          className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl bg-brand-yellow px-5 font-bold text-ink transition-[background-color,scale] duration-200 hover:bg-brand-yellow/85 active:scale-[0.97] active:duration-75"
        >
          Đặt lịch tư vấn
          <span className="sr-only"> dịch vụ {service.name}</span>
          <ArrowRightIcon className="size-5" />
        </a>
      </div>
    </article>
  )
}
