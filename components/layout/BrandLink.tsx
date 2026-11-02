import Image from 'next/image'

import logoMark from '@/public/images/brand/logo-mark.jpg'
import { sectionIds, siteConfig } from '@/lib/site-config'

/** Logo (biểu tượng chiếc răng cắt từ logo gốc) + tên phòng khám. */
export default function BrandLink({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  return (
    <a
      href={`#${sectionIds.hero}`}
      aria-label={`${siteConfig.fullName}, về đầu trang`}
      className="group flex min-h-11 items-center gap-3 rounded-xl"
    >
      <Image
        src={logoMark}
        alt={`Logo ${siteConfig.name}`}
        width={48}
        height={48}
        sizes="48px"
        className="size-11 rounded-xl lg:size-12"
      />
      <span className="leading-tight">
        <span
          className={`block text-[1.0625rem] font-extrabold tracking-tight lg:text-lg ${
            tone === 'dark' ? 'text-surface' : 'text-brand-green-dark'
          }`}
        >
          {siteConfig.name}
        </span>
        <span
          className={`block text-sm font-medium ${tone === 'dark' ? 'text-surface/85' : 'text-ink-muted'}`}
        >
          {siteConfig.address.region}
        </span>
      </span>
    </a>
  )
}
