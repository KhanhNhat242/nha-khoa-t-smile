import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'accent' | 'outline' | 'soft' | 'outline-light'
type Size = 'md' | 'lg'

/**
 * Flat Design: màu phẳng, không gradient. Soft UI: bo 12px, chuyển màu 200ms.
 * Micro-interaction: nhấn xuống thu nhỏ nhẹ trong 80ms.
 * Nút có chữ dùng brand-green-strong (chữ trắng 5,48:1), không dùng brand-green (3,77:1).
 */
const variantClasses: Record<Variant, string> = {
  primary: 'bg-brand-green-strong text-surface hover:bg-brand-green-dark',
  accent: 'bg-brand-yellow text-ink hover:bg-brand-yellow/85',
  outline:
    'border-2 border-brand-green-strong bg-surface text-brand-green-strong hover:bg-brand-green-light',
  soft: 'bg-brand-green-light text-brand-green-dark ring-1 ring-brand-green-100 hover:bg-brand-green-100',
  'outline-light':
    'border-2 border-surface/50 text-surface hover:border-surface hover:bg-surface hover:text-brand-green-dark',
}

const sizeClasses: Record<Size, string> = {
  md: 'min-h-12 px-5 text-base',
  lg: 'min-h-14 px-6 text-[1.0625rem]',
}

export function buttonClasses(variant: Variant = 'primary', size: Size = 'md', extra = '') {
  return `inline-flex items-center justify-center gap-2.5 rounded-xl font-bold transition-[background-color,color,border-color,scale] duration-200 active:scale-[0.97] active:duration-75 ${variantClasses[variant]} ${sizeClasses[size]} ${extra}`
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  variant?: Variant
  size?: Size
  children: ReactNode
}

/** Link trông như nút (CTA). Vùng chạm tối thiểu 48px. */
export default function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a href={href} className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </a>
  )
}
