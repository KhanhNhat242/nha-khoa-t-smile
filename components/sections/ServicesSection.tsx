import Image from 'next/image'

import { bookingHref, sectionIds } from '@/lib/site-config'
import { services, UNSURE_SERVICE, type Service } from '@/lib/services'
import BrandName from '@/components/ui/BrandName'
import ButtonLink from '@/components/ui/ButtonLink'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { ArrowRightIcon, CalendarIcon } from '@/components/ui/Icons'
import { revealDelay } from '@/components/ui/reveal'

/**
 * Bento Box Grid (GD-08), giữ đúng thứ tự mục 4:
 * - Hàng trên: 3 thẻ gọn (1, 2, 3) nền trắng.
 * - Hàng dưới: 2 thẻ lớn (4 Cấy ghép Implant, 5 Răng sứ cao cấp) nền xanh đậm, ảnh lớn đặt ngang.
 * Tablet: 3 thẻ gọn một hàng, mỗi thẻ lớn chiếm cả hàng.
 */
const FEATURED = new Set(['cay-ghep-implant', 'rang-su-cao-cap'])

function CompactCard({ service, index }: { service: Service; index: number }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-surface shadow-soft ring-1 ring-brand-green-100 transition-[box-shadow,translate] duration-200 hover:-translate-y-1 hover:shadow-soft-lg">
      <div className="relative h-44 overflow-hidden bg-brand-green-100 lg:h-48">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          placeholder="blur"
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 31vw, 100vw"
          className={`object-cover transition-[scale] duration-300 group-hover:scale-[1.03] ${service.imagePosition}`}
        />
        <span className="absolute top-3 left-3 rounded-full bg-brand-yellow px-3 py-1 text-sm font-bold text-ink">
          0{index + 1}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <h3 className="text-xl font-bold text-ink">{service.name}</h3>
        <p className="mt-2 text-base leading-relaxed text-ink-muted">{service.description}</p>
        <a
          href={bookingHref}
          data-book-service={service.slug}
          className="mt-auto inline-flex min-h-12 items-center gap-2 self-start pt-4 font-bold text-brand-green-strong underline-offset-4 transition-colors duration-200 hover:text-brand-green-dark hover:underline"
        >
          Đặt lịch tư vấn
          <span className="sr-only"> dịch vụ {service.name}</span>
          <ArrowRightIcon className="size-5 transition-[translate] duration-200 group-hover:translate-x-1" />
        </a>
      </div>
    </article>
  )
}

function FeaturedCard({ service, index }: { service: Service; index: number }) {
  return (
    <article className="group grid h-full overflow-hidden rounded-2xl bg-brand-green-dark text-surface shadow-soft transition-[box-shadow,translate] duration-200 hover:-translate-y-1 hover:shadow-soft-lg sm:grid-cols-[1.1fr_1fr]">
      <div className="relative h-56 overflow-hidden bg-brand-green-100 sm:h-full sm:min-h-80">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          placeholder="blur"
          sizes="(min-width: 1280px) 330px, (min-width: 1024px) 26vw, (min-width: 640px) 52vw, 100vw"
          className={`object-cover transition-[scale] duration-300 group-hover:scale-[1.03] ${service.imagePosition}`}
        />
      </div>
      <div className="flex flex-col p-6 lg:p-8">
        <span className="self-start rounded-full bg-brand-yellow px-3 py-1 text-sm font-bold text-ink">
          0{index + 1}
        </span>
        <h3 className="mt-4 text-2xl font-extrabold">{service.name}</h3>
        <p className="mt-3 text-base leading-relaxed text-surface/90">{service.description}</p>
        <div className="mt-auto pt-6">
          <a
            href={bookingHref}
            data-book-service={service.slug}
            className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-brand-yellow px-5 font-bold text-ink transition-[background-color,scale] duration-200 hover:bg-brand-yellow/85 active:scale-[0.97] active:duration-75"
          >
            Đặt lịch tư vấn
            <span className="sr-only"> dịch vụ {service.name}</span>
            <ArrowRightIcon className="size-5 transition-[translate] duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </article>
  )
}

/** Section "Dịch vụ" (#dich-vu) — CN-02, nền xanh lá nhạt. */
export default function ServicesSection() {
  return (
    <section
      id={sectionIds.services}
      aria-labelledby="services-title"
      className="relative bg-brand-green-light py-14 lg:py-24"
    >
      <Container>
        <div data-reveal>
          {/* TODO(content): tiêu đề và câu mở đầu section dịch vụ [ĐỀ XUẤT] — chờ khách xác nhận (mục 13). */}
          <SectionHeading
            eyebrow="Dịch vụ"
            titleId="services-title"
            title={
              <>
                Dịch vụ tại <BrandName />
              </>
            }
            description="Quý khách chọn dịch vụ quan tâm để đặt lịch. Bác sĩ sẽ thăm khám và tư vấn phương án phù hợp."
            className="mb-8 lg:mb-14"
          />
        </div>

        <ul className="grid gap-5 md:grid-cols-6 lg:gap-6">
          {services.map((service, index) => {
            const featured = FEATURED.has(service.slug)
            return (
              <li
                key={service.slug}
                data-reveal
                className={featured ? 'md:col-span-6 lg:col-span-3' : 'md:col-span-2'}
                style={revealDelay((index % 3) * 80)}
              >
                {featured ? (
                  <FeaturedCard service={service} index={index} />
                ) : (
                  <CompactCard service={service} index={index} />
                )}
              </li>
            )
          })}
        </ul>

        {/* CTA sau phần dịch vụ (mục 3) */}
        <div
          data-reveal
          className="mt-8 flex flex-col items-start gap-5 rounded-2xl bg-brand-yellow-light p-6 ring-1 ring-brand-yellow/40 sm:p-8 lg:mt-12 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="max-w-2xl">
            {/* TODO(content): dải kêu gọi "Chưa rõ nên chọn dịch vụ nào?" [ĐỀ XUẤT] (mục 13). */}
            <h3 className="text-2xl font-extrabold text-ink">Chưa rõ nên chọn dịch vụ nào?</h3>
            <p className="mt-2 text-base leading-relaxed text-ink-muted sm:text-lg">
              Bác sĩ Răng Hàm Mặt sẽ trực tiếp thăm khám và tư vấn phương án phù hợp cho Quý khách.
            </p>
          </div>
          <ButtonLink
            href={bookingHref}
            size="lg"
            data-book-service={UNSURE_SERVICE.value}
            className="w-full shrink-0 sm:w-auto"
          >
            <CalendarIcon className="size-5" />
            Đặt lịch tư vấn
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
