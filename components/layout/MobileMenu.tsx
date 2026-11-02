'use client'

import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Drawer } from 'antd'

import { bookingHref, navItems, siteConfig } from '@/lib/site-config'
import { buttonClasses } from '@/components/ui/ButtonLink'
import { CalendarIcon, ChatIcon, CloseIcon, PhoneIcon } from '@/components/ui/Icons'

import MenuButton from './MenuButton'

/**
 * Menu trên mobile/tablet (dưới 1024px) dùng antd Drawer.
 * Drawer rộng toàn màn hình; khi mở thì khóa cuộn trang (mục 10).
 * Khi bấm một mục: đóng Drawer trước (đang khóa cuộn trang), xong mới cuộn tới section.
 */
export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const pendingHash = useRef<string | null>(null)

  // Khóa cuộn trang khi menu mở. antd chỉ đặt overflow: hidden trên <body>, nhưng <html> có
  // overflow-x: clip (globals.css) nên thiết lập của body không áp lên khung cuộn của trang;
  // vì vậy khóa thẳng trên <html>.
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const previous = { overflow: root.style.overflow, overscroll: root.style.overscrollBehavior }
    root.style.overflow = 'hidden'
    root.style.overscrollBehavior = 'none'
    return () => {
      root.style.overflow = previous.overflow
      root.style.overscrollBehavior = previous.overscroll
    }
  }, [open])

  function handleNavigate(event: MouseEvent<HTMLAnchorElement>, hash: string) {
    event.preventDefault()
    pendingHash.current = hash
    setOpen(false)
  }

  function handleAfterOpenChange(isOpen: boolean) {
    if (isOpen || !pendingHash.current) return
    const hash = pendingHash.current
    pendingHash.current = null
    const target = document.querySelector(hash)
    if (!target) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
    window.history.replaceState(null, '', hash)
  }

  return (
    <>
      <MenuButton onClick={() => setOpen(true)} aria-expanded={open} aria-controls="menu-di-dong" />

      <Drawer
        id="menu-di-dong"
        open={open}
        onClose={() => setOpen(false)}
        afterOpenChange={handleAfterOpenChange}
        placement="right"
        size="100%"
        title={<span className="text-lg font-bold text-brand-green-dark">{siteConfig.name}</span>}
        closeIcon={
          <span className="grid size-11 place-items-center rounded-xl text-ink" aria-label="Đóng menu">
            <CloseIcon className="size-6" />
          </span>
        }
        styles={{ body: { padding: 20 } }}
      >
        <nav aria-label="Menu di động">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(event) => handleNavigate(event, item.href)}
                  className="flex min-h-13 items-center rounded-xl px-4 text-lg font-semibold text-ink transition-colors hover:bg-brand-green-light hover:text-brand-green-strong"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 space-y-3 border-t border-brand-green-100 pt-6">
          <a
            href={bookingHref}
            onClick={(event) => handleNavigate(event, bookingHref)}
            className={buttonClasses('primary', 'lg', 'w-full')}
          >
            <CalendarIcon className="size-5" />
            Đặt lịch tư vấn
          </a>
          <a href={siteConfig.phone.href} className={buttonClasses('accent', 'lg', 'w-full')}>
            <PhoneIcon className="size-5" />
            Gọi {siteConfig.phone.display}
          </a>
          <a
            href={siteConfig.zalo.href}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses('soft', 'lg', 'w-full')}
          >
            <ChatIcon className="size-5" />
            {siteConfig.zalo.label}
          </a>
        </div>

        <p className="mt-6 text-base leading-relaxed text-ink-muted">{siteConfig.address.full}</p>
      </Drawer>
    </>
  )
}
