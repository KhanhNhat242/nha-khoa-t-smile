import { bookingHref, siteConfig } from '@/lib/site-config'
import { CalendarIcon, ChatIcon, PhoneIcon } from '@/components/ui/Icons'

/** Thanh liên hệ nổi trên mobile (CN-08): Gọi, Zalo, Đặt lịch tư vấn — mỗi nút 1 chạm. */
export default function MobileContactBar() {
  const item =
    'flex min-h-12 items-center justify-center gap-1.5 rounded-xl px-3.5 text-[0.9375rem] font-semibold whitespace-nowrap transition-[scale] duration-75 active:scale-[0.97]'
  return (
    <nav
      aria-label="Liên hệ nhanh"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-green-100 bg-surface px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-float md:hidden"
    >
      <ul className="grid grid-cols-[auto_auto_1fr] gap-2">
        <li>
          <a href={siteConfig.phone.href} className={`${item} bg-brand-green-strong text-surface`}>
            <PhoneIcon className="size-5" />
            Gọi
          </a>
        </li>
        <li>
          <a
            href={siteConfig.zalo.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${item} bg-brand-green-light text-brand-green-dark ring-1 ring-brand-green-100`}
          >
            <ChatIcon className="size-5" />
            Zalo
          </a>
        </li>
        <li>
          <a href={bookingHref} className={`${item} bg-brand-yellow text-ink`}>
            <CalendarIcon className="size-5" />
            Đặt lịch tư vấn
          </a>
        </li>
      </ul>
    </nav>
  )
}
