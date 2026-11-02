import { bookingHref, navItems, siteConfig } from '@/lib/site-config'
import AntdIsland from '@/components/ui/AntdIsland'
import ButtonLink from '@/components/ui/ButtonLink'
import Container from '@/components/ui/Container'
import { CalendarIcon, FacebookIcon, MapPinIcon, PhoneIcon } from '@/components/ui/Icons'

import BrandLink from './BrandLink'
import MenuButton from './MenuButton'
import MobileMenu from './MobileMenu'

/**
 * Header (mục 10 #1, GD-08 Trust & Authority).
 * Thanh thông tin trên cùng (desktop): địa chỉ, hotline, Facebook — nền xanh đậm, chữ trắng 7,68:1.
 * Header chính dính trên cùng, có vạch màu nhận diện (token brand-green) ở mép trên.
 */
export default function Header() {
  return (
    <>
      <div className="hidden bg-brand-green-dark text-[0.9375rem] text-surface md:block">
        <Container className="flex h-10 items-center justify-between gap-6">
          <p className="flex min-w-0 items-center gap-2">
            <MapPinIcon className="size-4 shrink-0" />
            <span className="truncate">{siteConfig.address.full}</span>
          </p>
          <div className="flex shrink-0 items-center gap-5">
            <a
              href={siteConfig.phone.href}
              className="inline-flex min-h-10 items-center gap-2 font-semibold hover:underline"
            >
              <PhoneIcon className="size-4" />
              Hotline {siteConfig.phone.display}
            </a>
            <a
              href={siteConfig.facebook.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-2 hover:underline"
            >
              <FacebookIcon className="size-4" />
              {siteConfig.facebook.label}
            </a>
          </div>
        </Container>
      </div>

      <header className="sticky top-0 z-50 border-t-[3px] border-b border-t-brand-green border-b-brand-green-100 bg-surface">
        <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
          <BrandLink />

          <nav aria-label="Menu chính" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-11 items-center rounded-xl px-4 text-base font-semibold text-ink transition-colors duration-200 hover:bg-brand-green-light hover:text-brand-green-strong"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 lg:gap-3">
            <div className="hidden md:block">
              <ButtonLink href={bookingHref}>
                <CalendarIcon className="size-5" />
                Đặt lịch tư vấn
              </ButtonLink>
            </div>

            <a
              href={siteConfig.phone.href}
              aria-label={`Gọi ${siteConfig.phone.display}`}
              className="grid size-11 place-items-center rounded-xl bg-brand-green-strong text-surface transition-[background-color,scale] duration-200 hover:bg-brand-green-dark active:scale-95 lg:hidden"
            >
              <PhoneIcon className="size-5" />
            </a>

            <AntdIsland fallback={<MenuButton />}>
              <MobileMenu />
            </AntdIsland>
          </div>
        </Container>
      </header>
    </>
  )
}
