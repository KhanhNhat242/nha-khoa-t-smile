import type { ButtonHTMLAttributes } from 'react'

import { MenuIcon } from '@/components/ui/Icons'

/** Nút mở menu mobile. Dùng chung cho MobileMenu và fallback khi menu chưa hydrate. */
export default function MenuButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label="Mở menu"
      className="grid size-11 place-items-center rounded-xl border border-line/50 bg-surface text-brand-green-dark transition-[border-color,scale] duration-200 hover:border-brand-green-strong active:scale-95 lg:hidden"
      {...props}
    >
      <MenuIcon className="size-6" />
    </button>
  )
}
