'use client'

import { useEffect } from 'react'

/** Thuộc tính gắn lên <html> khi hàng logo + menu trong hero đã cuộn qua (dùng với variant `in-data-[past-hero]:`). */
const ATTR = 'data-past-hero'

/**
 * GD-16: theo dõi hàng logo + menu trong hero (`#hero-nav`). Khi hàng này cuộn ra khỏi mép trên màn hình,
 * gắn `data-past-hero` lên <html> để CSS ẩn hàng đó và cho header (fixed từ 1280px) trượt xuống.
 * Không render gì. Chưa có JS: không có thuộc tính, header ẩn và hàng menu nằm trong hero (trang thường mở ở đầu).
 */
export default function HeroNavObserver() {
  useEffect(() => {
    const target = document.getElementById('hero-nav')
    if (!target) return
    const root = document.documentElement

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Chỉ tính là "qua hero" khi menu đã đi lên phía trên (không tính lúc nó còn ở dưới màn hình)
        const past = !entry.isIntersecting && entry.boundingClientRect.top < 0
        root.toggleAttribute(ATTR, past)
      },
    )
    observer.observe(target)
    return () => {
      observer.disconnect()
      root.removeAttribute(ATTR)
    }
  }, [])

  return null
}
