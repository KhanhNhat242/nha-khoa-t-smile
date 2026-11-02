'use client'

import { useEffect } from 'react'

/**
 * Gắn class `.is-revealed` cho phần tử `[data-reveal]` khi cuộn tới (CSS ở app/globals.css).
 * Mỗi phần tử chỉ hiện một lần. Trình duyệt không có IntersectionObserver thì hiện ngay.
 * Lưu ý: đặt data-reveal ở phần tử bọc ngoài, không đặt trên phần tử có hiệu ứng hover riêng.
 */
export default function RevealObserver() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-revealed)'),
    )
    if (elements.length === 0) return

    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      elements.forEach((el) => el.classList.add('is-revealed'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
