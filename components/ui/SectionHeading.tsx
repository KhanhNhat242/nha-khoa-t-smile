import type { ReactNode } from 'react'

type SectionHeadingProps = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  /** id cho thẻ h2, dùng với aria-labelledby của section */
  titleId?: string
  align?: 'center' | 'left'
  tone?: 'light' | 'dark'
  className?: string
}

/**
 * Cụm tiêu đề section: nhãn nhỏ + H2 + đoạn mở đầu (rộng tối đa 672px).
 * Nhãn là huy hiệu nền vàng chữ tối (6,83:1) — không đặt chữ vàng trên nền trắng hay nền xanh đậm.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  titleId,
  align = 'center',
  tone = 'light',
  className = '',
}: SectionHeadingProps) {
  const isDark = tone === 'dark'
  return (
    <div
      className={`${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}
    >
      <p
        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-bold ${
          isDark ? 'bg-brand-yellow text-ink' : 'bg-brand-green-100 text-brand-green-dark'
        }`}
      >
        <span
          aria-hidden="true"
          className={`size-2 rounded-full ${isDark ? 'bg-ink' : 'bg-brand-green'}`}
        />
        {eyebrow}
      </p>
      <h2
        id={titleId}
        className={`mt-4 text-balance text-[1.75rem] font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.625rem] ${
          isDark ? 'text-surface' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-pretty text-base leading-relaxed sm:text-lg ${
            isDark ? 'text-surface/90' : 'text-ink-muted'
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
