/**
 * Chi tiết trang trí vẽ bằng code, kiểu Flat (màu phẳng, không gradient).
 * Không phải ảnh chụp, không trình bày như ảnh thật (GD-04).
 */

/** Nét gạch chân màu vàng dưới tiêu đề (điểm nổi bật). */
export function Swoosh({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 16"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M3 11.5C60 4.5 140 2.5 297 7.5"
        stroke="currentColor"
        strokeWidth={6}
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Đường cong chuyển tiếp giữa 2 section. `className` đặt màu fill (màu của section liền kề). */
export function Wave({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 64"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={`block h-6 w-full sm:h-10 lg:h-14 ${flip ? 'rotate-180' : ''} ${className}`}
    >
      <path d="M0 0h1440v22c-160 26-360 40-600 30C560 42 300 6 0 36Z" />
    </svg>
  )
}
