'use client'

import { Fragment, useEffect, useRef, type PointerEvent } from 'react'

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'

type CharState = { el: HTMLElement; x: number; y: number; lift: number }

/** Tách chuỗi thành từng ký tự; khoảng trắng trong cụm không ngắt dòng thành NBSP. */
function Chars({ text }: { text: string }) {
  return Array.from(text.normalize('NFC')).map((char, index) => (
    <span key={index} data-char className="inline-block">
      {char === ' ' ? ' ' : char}
    </span>
  ))
}

/**
 * Tiêu đề hero "chữ nổi" (GD-12): chữ nằm yên trên trang; các chữ gần con trỏ / ngón tay
 * nhấc lên theo chiều 3D, nghiêng về phía con trỏ và đổ bóng xuống trang, rời đi thì hạ dần.
 * Tự viết theo ý tưởng Rising Ink (React Bits Pro, trả phí).
 * - Trình đọc màn hình đọc câu đầy đủ trong sr-only; phần chữ tách ký tự là aria-hidden.
 * - prefers-reduced-motion: không có hiệu ứng.
 * - Vòng lặp khung hình chỉ chạy khi có chữ đang nổi hoặc con trỏ đang ở trên tiêu đề.
 */
export default function HeroHeadline({
  id,
  name,
  headline,
  className = '',
}: {
  id: string
  name: string
  headline: string
  className?: string
}) {
  const rootRef = useRef<HTMLHeadingElement>(null)
  const pointer = useRef({ x: 0, y: 0, active: false })
  const wake = useRef<() => void>(() => {})

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduced = window.matchMedia(REDUCED_QUERY)

    let chars: CharState[] = []
    let fontSize = 16
    let frame = 0

    /** Đo tâm từng ký tự (tọa độ trong h1) ở trạng thái nằm yên. */
    const measure = () => {
      const els = Array.from(root.querySelectorAll<HTMLElement>('[data-char]'))
      els.forEach((el) => {
        el.style.transform = ''
        el.style.textShadow = ''
      })
      fontSize = parseFloat(getComputedStyle(root).fontSize) || 16
      const base = root.getBoundingClientRect()
      chars = els.map((el) => {
        const r = el.getBoundingClientRect()
        return { el, x: r.left - base.left + r.width / 2, y: r.top - base.top + r.height / 2, lift: 0 }
      })
    }

    const tick = () => {
      frame = 0
      const fs = fontSize
      const radius = fs * 1.5
      const { x: px, y: py, active } = pointer.current
      let moving = active

      for (const char of chars) {
        const dx = char.x - px
        const dy = char.y - py
        const target = active ? Math.exp(-(dx * dx + dy * dy) / (2 * radius * radius)) : 0
        // Nhấc lên nhanh, hạ xuống chậm như mực khô dần trên giấy
        char.lift += (target - char.lift) * (target > char.lift ? 0.22 : 0.08)
        if (char.lift < 0.002) char.lift = 0
        else moving = true

        const f = char.lift
        if (f === 0) {
          char.el.style.transform = ''
          char.el.style.textShadow = ''
          continue
        }
        // Nghiêng mặt chữ về phía con trỏ: chữ phía trên con trỏ ngả xuống, bên trái ngả sang phải…
        const rx = (dy / radius) * f * 28
        const ry = -(dx / radius) * f * 28
        char.el.style.transform = `perspective(${(fs * 10).toFixed(0)}px) translate3d(0, ${(-f * fs * 0.14).toFixed(2)}px, ${(f * fs * 0.7).toFixed(2)}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`
        // Bóng đổ xuống trang: càng nổi cao, bóng càng xa và nhòe
        char.el.style.textShadow = `0 ${(f * fs * 0.22).toFixed(2)}px ${(f * fs * 0.3).toFixed(2)}px color-mix(in oklab, var(--color-ink) ${(f * 45).toFixed(1)}%, transparent)`
      }

      if (moving) frame = requestAnimationFrame(tick)
    }

    const start = () => {
      if (!frame && !reduced.matches) frame = requestAnimationFrame(tick)
    }
    wake.current = start

    const onResize = () => measure()
    const onReducedChange = () => {
      if (reduced.matches) {
        if (frame) cancelAnimationFrame(frame)
        frame = 0
        measure()
      }
    }

    measure()
    window.addEventListener('resize', onResize)
    reduced.addEventListener('change', onReducedChange)
    // Font web nạp xong có thể đổi kích thước chữ: đo lại
    document.fonts?.ready.then(measure)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      wake.current = () => {}
      window.removeEventListener('resize', onResize)
      reduced.removeEventListener('change', onReducedChange)
    }
  }, [])

  function track(event: PointerEvent<HTMLHeadingElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    pointer.current = { x: event.clientX - rect.left, y: event.clientY - rect.top, active: true }
    wake.current()
  }
  function release() {
    pointer.current = { ...pointer.current, active: false }
    wake.current()
  }

  return (
    <h1
      ref={rootRef}
      id={id}
      onPointerMove={track}
      onPointerDown={track}
      onPointerLeave={release}
      onPointerUp={(event) => {
        if (event.pointerType !== 'mouse') release()
      }}
      onPointerCancel={release}
      className={className}
    >
      <span className="sr-only">
        {name} – {headline}
      </span>
      <span aria-hidden="true">
        <span className="whitespace-nowrap">
          <Chars text={name} />
        </span>
        <span className="mt-2 block text-brand-green-100">
          {/* Mỗi cụm dịch vụ giữ trên một dòng; dấu & đi cùng cụm phía sau để không đứng một mình */}
          {headline.split(/(?<=,) | (?=&)/).map((part, index) => (
            <Fragment key={part}>
              {index > 0 ? ' ' : null}
              <span className="whitespace-nowrap">
                <Chars text={part} />
              </span>
            </Fragment>
          ))}
        </span>
      </span>
    </h1>
  )
}
