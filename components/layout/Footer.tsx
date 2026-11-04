import Image from 'next/image'

import logo from '@/public/images/brand/logo-t-smile.jpg'
import { navItems, sectionIds, siteConfig } from '@/lib/site-config'
import { services } from '@/lib/services'
import Container from '@/components/ui/Container'
import { ChatIcon, FacebookIcon, MapPinIcon, PhoneIcon } from '@/components/ui/Icons'

/** Footer (mục 10 #9). pb lớn trên mobile để thanh liên hệ nổi không che chữ. */
export default function Footer() {
  const linkClass =
    'inline-flex min-h-11 items-center gap-3 text-surface/85 transition-colors duration-200 hover:text-surface hover:underline underline-offset-4'

  return (
    <footer id='lien-he' className="relative bg-brand-green-dark text-surface/85">
      <Container className="pt-14 pb-28 md:pb-10 lg:pt-20">
        <div className="grid gap-10 md:grid-cols-12 lg:gap-12">
          <div className="md:col-span-12 lg:col-span-5">
            <div className="flex items-center gap-4">
              <Image
                src={logo}
                alt={`Logo ${siteConfig.name}`}
                width={96}
                height={96}
                sizes="96px"
                className="size-20 rounded-2xl lg:size-24"
              />
              <div>
                <p className="text-xl font-extrabold text-surface">{siteConfig.fullName}</p>
                <p className="mt-1 text-base text-surface/75">{siteConfig.headline}</p>
              </div>
            </div>
            <p className="mt-6 max-w-md text-base leading-relaxed">{siteConfig.slogan}</p>
          </div>

          <nav aria-label="Dịch vụ" className="md:col-span-5 lg:col-span-3">
            <h2 className="flex items-center gap-2 text-base font-bold uppercase tracking-[0.12em] text-surface">
              Dịch vụ
            </h2>
            <ul className="mt-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <a href={`#${sectionIds.services}`} className={linkClass}>
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-7 lg:col-span-4">
            <h2 className="flex items-center gap-2 text-base font-bold uppercase tracking-[0.12em] text-surface">
              Liên hệ
            </h2>
            <ul className="mt-3">
              <li>
                <a
                  href={siteConfig.maps.directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} py-2`}
                >
                  <MapPinIcon className="size-5 shrink-0 text-brand-yellow" />
                  {siteConfig.address.full}
                </a>
              </li>
              <li>
                <a href={siteConfig.phone.href} className={linkClass}>
                  <PhoneIcon className="size-5 shrink-0 text-brand-yellow" />
                  Hotline: <span className="font-bold text-surface">{siteConfig.phone.display}</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.zalo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <ChatIcon className="size-5 shrink-0 text-brand-yellow" />
                  {siteConfig.zalo.label}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.facebook.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <FacebookIcon className="size-5 shrink-0 text-brand-yellow" />
                  {siteConfig.facebook.label}
                </a>
              </li>
            </ul>

            {/* Bản đồ thu nhỏ (CN-07), cùng nguồn nhúng với ContactSection */}
            <div className="mt-5 overflow-hidden rounded-xl border border-surface/15 bg-brand-green-light">
              <iframe
                title={`Bản đồ vị trí ${siteConfig.fullName}`}
                src={siteConfig.maps.embedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-44 w-full lg:h-48"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-surface/15 pt-6 text-base sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {siteConfig.copyrightYear} {siteConfig.fullName}
          </p>
          <nav aria-label="Liên kết nhanh">
            <ul className="flex flex-wrap gap-x-5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="inline-flex min-h-11 items-center hover:text-surface hover:underline underline-offset-4">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  )
}
