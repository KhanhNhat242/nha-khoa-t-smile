'use client'

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from 'react'
import Image, { type StaticImageData } from 'next/image'

import { bookingHref } from '@/lib/site-config'
import { ArrowRightIcon } from '@/components/ui/Icons'

export type AudienceItem = {
  label: string
  description: string
  icon: ReactNode
  image: StaticImageData
  imageAlt: string
  imagePosition: string
  services: { slug: string; name: string }[]
}

/** Góc giữa 2 thẻ liền kề trên vòng cung (độ): đủ để cung giữa 2 thẻ lớn hơn bề rộng thẻ, không đè nhau. */
const STEP = 30
/** Kéo bao nhiêu px thì chuyển 1 thẻ. */
const DRAG_PER_STEP = 140
/** Chiều cao header dính (px): 64 mobile, 80 desktop. */
const headerOffset = () => (window.matchMedia('(min-width: 64rem)').matches ? 80 : 64)
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Carousel lõm (GD-11): các thẻ nằm trên mặt trong một vòng cung bao quanh người xem.
 * Thẻ i đặt bằng rotateY(-i · STEP) translateZ(-R); cả vòng xoay rotateY(vị trí · STEP).
 * Vị trí (0 → n-1) lấy từ tiến độ cuộn trang trong vùng dính của section, nên cuộn xuống/lên
 * là carousel xoay ngang. Nút/chấm/phím/kéo chuyển thẻ bằng cách cuộn tới vị trí tương ứng.
 * Bật giảm chuyển động: không dính, không xoay theo cuộn; điều khiển thủ công.
 */
export default function AudienceCarousel({ items, header }: { items: AudienceItem[]; header?: ReactNode }) {
  const count = items.length
  const trackRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLUListElement>(null)
  const position = useRef(0)
  const dragStart = useRef<number | null>(null)
  const dragged = useRef(false)
  const [active, setActive] = useState(0)
  const [scrollDriven, setScrollDriven] = useState(true)
  const [isDragging, setIsDragging] = useState(false)

  /** Ghi góc xoay lên vòng thẻ (không re-render). */
  const applyRotation = (pos: number) => {
    ringRef.current?.style.setProperty('--ring-rot', `${pos * STEP}deg`)
  }

  useEffect(() => {
    const reduced = window.matchMedia(REDUCED_QUERY)
    let frame = 0

    const update = () => {
      frame = 0
      const track = trackRef.current
      if (!track || dragStart.current !== null) return
      const rect = track.getBoundingClientRect()
      const offset = headerOffset()
      const scrollable = rect.height - (window.innerHeight - offset)
      const progress = scrollable > 0 ? Math.min(Math.max((offset - rect.top) / scrollable, 0), 1) : 0
      position.current = progress * (count - 1)
      ringRef.current?.style.setProperty('--ring-rot', `${position.current * STEP}deg`)
      const next = Math.round(position.current)
      setActive((current) => (current === next ? current : next))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const sync = () => {
      const enabled = !reduced.matches
      setScrollDriven(enabled)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (enabled) {
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)
        update()
      }
    }

    sync()
    reduced.addEventListener('change', sync)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      reduced.removeEventListener('change', sync)
    }
  }, [count])

  const clamp = (index: number) => Math.min(Math.max(index, 0), count - 1)

  /** Chuyển tới thẻ index: chế độ cuộn thì cuộn trang tới vị trí tương ứng, chế độ thủ công thì xoay trực tiếp. */
  function go(index: number) {
    const target = clamp(index)
    const track = trackRef.current
    if (scrollDriven && track) {
      const rect = track.getBoundingClientRect()
      const offset = headerOffset()
      const scrollable = rect.height - (window.innerHeight - offset)
      const top = window.scrollY + rect.top - offset + (target / (count - 1)) * scrollable + 1
      window.scrollTo({ top, behavior: 'smooth' })
      return
    }
    position.current = target
    applyRotation(target)
    setActive(target)
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      go(active - 1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      go(active + 1)
    }
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    dragStart.current = event.clientX
    dragged.current = false
    setIsDragging(true)
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (dragStart.current === null) return
    const dx = event.clientX - dragStart.current
    if (Math.abs(dx) > 6) dragged.current = true
    applyRotation(position.current - dx / DRAG_PER_STEP)
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    if (dragStart.current === null) return
    const dx = event.clientX - dragStart.current
    dragStart.current = null
    setIsDragging(false)
    const steps = Math.round(-dx / DRAG_PER_STEP)
    if (steps !== 0) go(Math.round(position.current) + steps)
    else applyRotation(position.current)
  }

  return (
    <div
      ref={trackRef}
      style={{ '--count': count } as CSSProperties}
      className={scrollDriven ? 'h-[calc(var(--count)*55svh)]' : ''}
    >
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Các nhóm khách hàng"
        onKeyDown={onKeyDown}
        className={
          scrollDriven
            ? 'sticky top-16 flex h-[calc(100svh-4rem)] flex-col justify-center pb-20 md:pb-0 lg:top-20 lg:h-[calc(100svh-5rem)]'
            : ''
        }
      >
        {header}

        <p className="sr-only" aria-live="polite">
          Đang xem nhóm {active + 1} trên {count}: {items[active]?.label}
        </p>

        {/* Sân khấu 3D: phối cảnh đặt xa sau tâm vòng cung để hai bên cong vào trong vừa phải, không phóng to quá mức */}
        <div
          className="relative h-[22rem] touch-pan-y overflow-x-clip select-none [--card-w:16.5rem] [--r:35.5rem] [perspective:calc(var(--r)*2.2)] sm:h-[27rem] lg:h-[28rem] lg:[--card-w:19rem] lg:[--r:41rem]"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
        >
          <ul
            ref={ringRef}
            className={`absolute top-4 left-1/2 h-full w-[var(--card-w)] -translate-x-1/2 [transform-style:preserve-3d] [--ring-rot:0deg] ${!scrollDriven && !isDragging ? 'transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]' : ''
              }`}
            style={{ transform: 'translateZ(var(--r)) rotateY(var(--ring-rot))' }}
          >
            {items.map((item, index) => {
              const isActive = index === active
              return (
                <li
                  key={item.label}
                  aria-roledescription="slide"
                  aria-label={`Nhóm ${index + 1} trên ${count}`}
                  onFocus={() => {
                    if (!isActive) go(index)
                  }}
                  onClick={() => {
                    if (!dragged.current && !isActive) go(index)
                  }}
                  className="absolute inset-x-0 top-0 [backface-visibility:hidden]"
                  style={{ transform: `rotateY(${-index * STEP}deg) translateZ(calc(var(--r) * -1))` }}
                >
                  <AudienceCard item={item} isActive={isActive} dragged={dragged} />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

function AudienceCard({
  item,
  isActive,
  dragged,
}: {
  item: AudienceItem
  isActive: boolean
  dragged: { current: boolean }
}) {
  return (
    <article
      className={`relative isolate flex h-[20.75rem] flex-col overflow-hidden rounded-2xl bg-brand-green-dark text-surface transition-[box-shadow,filter,border-color] duration-300 sm:h-[25rem] lg:h-[26rem] ${isActive
        ? 'border-2 border-brand-yellow shadow-float'
        : 'cursor-pointer border-2 border-transparent shadow-soft brightness-[0.82]'
        }`}
    >
      <Image
        src={item.image}
        alt={item.imageAlt}
        fill
        draggable={false}
        sizes="(min-width: 1024px) 304px, 264px"
        className={`-z-20 object-cover ${item.imagePosition}`}
      />
      {/* Lớp nền xanh đậm chỉ phủ phần đáy dưới chữ (đủ tương phản), phần trên để lộ ảnh */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-brand-green-dark from-30% via-brand-green-dark/80 via-45% to-transparent to-70%"
      />

      <div className="mt-auto p-5 pt-0 lg:p-6 lg:pt-0">
        <h3 className="text-xl leading-snug font-bold tracking-[-0.01em]">
          {/* Không ngắt dòng giữa khoảng tuổi, ví dụ "6–12 tuổi" */}
          {item.label.split(/(\d+–\d+ tuổi)/).map((chunk) =>
            /^\d+–\d+ tuổi$/.test(chunk) ? (
              <span key={chunk} className="whitespace-nowrap">
                {chunk}
              </span>
            ) : (
              chunk
            ),
          )}
        </h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-surface/90">{item.description}</p>
      </div>
    </article>
  )
}
