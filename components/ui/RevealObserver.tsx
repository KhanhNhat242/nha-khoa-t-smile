'use client'

import { useEffect } from 'react'

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Gắn / gỡ class `.is-revealed` cho phần tử `[data-reveal]` (CSS ở app/globals.css, GD-15).
 * - Cuộn tới (lên hoặc xuống): phần tử vào màn hình thì hiện.
 * - Ra HẲN khỏi màn hình thì ẩn lại, để lần sau cuộn tới hiệu ứng chạy lại. Phần tử chỉ nằm trong
 *   dải 8% sát mép dưới thì giữ nguyên trạng thái, tránh nhấp nháy khi cuộn qua lại ở mép.
 * - Không có IntersectionObserver hoặc bật giảm chuyển động: hiện ngay, không theo dõi.
 * Lưu ý: đặt data-reveal ở phần tử bọc ngoài do Server Component render, không đặt trên phần tử
 * có hiệu ứng hover riêng hoặc trên phần tử dính (sticky).
 */
export default function RevealObserver() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (elements.length === 0) return

    const reduced = window.matchMedia(REDUCED_QUERY)
    if (!('IntersectionObserver' in window) || reduced.matches) {
      elements.forEach((el) => el.classList.add('is-revealed'))
      return
    }

    // Hiện: khi phần tử vào vùng màn hình đã trừ 8% mép dưới
    const showObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add('is-revealed')
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    )
    // Ẩn: chỉ khi phần tử ra hẳn khỏi màn hình (cả trên lẫn dưới)
    const hideObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) entry.target.classList.remove('is-revealed')
        }
      },
      { threshold: 0 },
    )

    elements.forEach((el) => {
      showObserver.observe(el)
      hideObserver.observe(el)
    })

    const stop = () => {
      showObserver.disconnect()
      hideObserver.disconnect()
    }
    // Bật giảm chuyển động giữa chừng: hiện hết và ngừng theo dõi
    const onReducedChange = () => {
      if (!reduced.matches) return
      stop()
      elements.forEach((el) => el.classList.add('is-revealed'))
    }
    reduced.addEventListener('change', onReducedChange)

    return () => {
      stop()
      reduced.removeEventListener('change', onReducedChange)
    }
  }, [])

  return null
}
