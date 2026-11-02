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
    <section id={sectionIds.contact} aria-labelledby="contact-title" className="bg-surface py-16 lg:py-28">
      <Container>
        <div data-reveal="up">
          {/* TODO(content): tiêu đề và câu mở đầu [ĐỀ XUẤT] — chờ khách xác nhận (mục 13). */}
          <SectionHeading
            titleId="contact-title"
            layout="stack"
            align='center'
            title={
              <>
                Ghé thăm <BrandName />
              </>
            }
            description=""
            className="mb-10 lg:mb-16"
          />
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div data-reveal="left" style={revealDelay(100)} className="flex flex-col lg:col-span-4">
            <dl className="border-b border-brand-green-100">
              {contactItems.map(({ label, value, href, external, Icon }) => (
                <div key={label} className="border-t border-brand-green-100 py-5">
                  <dt className="flex items-center gap-2 text-sm font-semibold text-ink-muted">
                    <Icon className="size-4 text-brand-green" />
                    {label}
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="inline-flex min-h-11 items-center text-lg font-bold break-words text-ink underline-offset-4 hover:text-brand-green-strong hover:underline"
                    >
                      {value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
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
              <ButtonLink href={siteConfig.phone.href} variant="outline" size="lg" className="sm:flex-1">
                <PhoneIcon className="size-5" />
                Gọi ngay
              </ButtonLink>
            </div>
          </div>

          <div data-reveal="right" style={revealDelay(200)} className="lg:col-span-8">
            <div className="h-full overflow-hidden rounded-2xl bg-brand-green-light">
              <iframe
                title={`Bản đồ đường tới ${siteConfig.fullName}`}
                src={siteConfig.maps.embedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[22rem] w-full lg:h-full lg:min-h-[30rem]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
