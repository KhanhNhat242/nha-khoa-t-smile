import type { ComponentType, ReactNode, SVGProps } from 'react'

import { sectionIds, siteConfig } from '@/lib/site-config'
import BrandName from '@/components/ui/BrandName'
import ButtonLink from '@/components/ui/ButtonLink'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import {
  ChatIcon,
  DirectionsIcon,
  FacebookIcon,
  MapPinIcon,
  PhoneIcon,
} from '@/components/ui/Icons'
import { revealDelay } from '@/components/ui/reveal'

type ContactItem = {
  label: string
  value: ReactNode
  href: string
  external: boolean
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}

const contactItems: ContactItem[] = [
  {
    label: 'Địa chỉ',
    value: siteConfig.address.full,
    href: siteConfig.maps.directionsHref,
    external: true,
    Icon: MapPinIcon,
  },
  {
    label: 'Hotline',
    value: siteConfig.phone.display,
    href: siteConfig.phone.href,
    external: false,
    Icon: PhoneIcon,
  },
  {
    label: 'Zalo',
    value: `${siteConfig.zalo.label} ${siteConfig.phone.display}`,
    href: siteConfig.zalo.href,
    external: true,
    Icon: ChatIcon,
  },
  {
    label: 'Facebook',
    value: siteConfig.facebook.href.replace(/^https?:\/\/(www\.)?/, ''),
    href: siteConfig.facebook.href,
    external: true,
    Icon: FacebookIcon,
  },
]

/** Section "Liên hệ & bản đồ" (#lien-he) — CN-06, CN-07, nền trắng. */
export default function ContactSection() {
  return (
    <section
      id={sectionIds.contact}
      aria-labelledby="contact-title"
      className="relative bg-surface py-14 lg:py-24"
    >
      <Container>
        <div data-reveal>
          {/* TODO(content): tiêu đề và câu mở đầu [ĐỀ XUẤT] — chờ khách xác nhận (mục 13). */}
          <SectionHeading
            eyebrow="Liên hệ"
            titleId="contact-title"
            title={
              <>
                Ghé thăm <BrandName />
              </>
            }
            description="Quý khách có thể đến trực tiếp phòng khám hoặc liên hệ qua hotline, Zalo, Facebook để được tư vấn."
            className="mb-8 lg:mb-14"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div data-reveal className="flex flex-col lg:col-span-5">
            <ul className="space-y-3">
              {contactItems.map(({ label, value, href, external, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex min-h-[4.5rem] items-center gap-4 rounded-2xl border border-brand-green-100 bg-surface p-4 transition hover:border-brand-green/40 hover:bg-brand-green-light hover:shadow-soft"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand-green-light text-brand-green ring-1 ring-brand-green-100 transition group-hover:bg-brand-green-strong group-hover:text-surface">
                      <Icon className="size-6" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-ink-muted">{label}</span>
                      <span className="block text-base font-bold break-words text-ink sm:text-lg">
                        {value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-auto lg:pt-6">
              <ButtonLink
                href={siteConfig.maps.directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="sm:flex-1"
              >
                <DirectionsIcon className="size-5" />
                Chỉ đường
              </ButtonLink>
              <ButtonLink href={siteConfig.phone.href} variant="accent" size="lg" className="sm:flex-1">
                <PhoneIcon className="size-5" />
                Gọi ngay
              </ButtonLink>
            </div>
          </div>

          <div data-reveal style={revealDelay(120)} className="lg:col-span-7">
            <div className="h-full overflow-hidden rounded-2xl shadow-soft ring-1 ring-brand-green-100">
              <iframe
                title={`Bản đồ đường tới ${siteConfig.fullName}`}
                src={siteConfig.maps.embedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[22rem] w-full lg:h-full lg:min-h-[28rem]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
