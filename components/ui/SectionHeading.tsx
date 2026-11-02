import type { ReactNode } from 'react'

type SectionHeadingProps = {
  title: ReactNode
  description?: ReactNode
  /** id cho thẻ h2, dùng với aria-labelledby của section */
  titleId?: string
  /**
   * split: tiêu đề bên trái, đoạn mở đầu canh đáy bên phải (desktop) — bố cục chính của trang.
   * stack: tiêu đề và đoạn mở đầu xếp chồng, canh trái.
   */
  layout?: 'split' | 'stack'
  /** Chỉ áp dụng cho layout "stack": canh trái (mặc định) hoặc canh giữa. */
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  className?: string
}

/** Cụm tiêu đề section. Canh trái theo lưới 12 cột, không dùng nhãn nhỏ phía trên. */
export default function SectionHeading({
  title,
  description,
  titleId,
  layout = 'split',
  align = 'left',
  tone = 'light',
  className = '',
}: SectionHeadingProps) {
  const isDark = tone === 'dark'
  const titleNode = (
    <h2
      id={titleId}
      className={`text-balance text-[1.875rem] leading-[1.12] font-bold tracking-[-0.02em] sm:text-4xl lg:text-[2.875rem] ${
        isDark ? 'text-surface' : 'text-ink'
      }`}
    >
      {title}
    </h2>
  )
  const descriptionNode = description ? (
    <p
      className={`text-pretty text-base leading-relaxed sm:text-lg ${
        isDark ? 'text-surface/90' : 'text-ink-muted'
      }`}
    >
      {description}
    </p>
  ) : null

  if (layout === 'stack') {
    return (
      <div className={`${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-xl'} ${className}`}>
        {titleNode}
        {descriptionNode ? <div className="mt-4">{descriptionNode}</div> : null}
      </div>
    )
  }

  return (
    <div className={`grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-8 ${className}`}>
      <div className="lg:col-span-7">{titleNode}</div>
      {descriptionNode ? <div className="lg:col-span-4 lg:col-start-9">{descriptionNode}</div> : null}
    </div>
  )
}
