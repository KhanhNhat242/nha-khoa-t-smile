import type { ComponentType, SVGProps } from 'react'

import { sectionIds, siteConfig } from '@/lib/site-config'
import BrandName from '@/components/ui/BrandName'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { ScanIcon, SparklesIcon, StethoscopeIcon } from '@/components/ui/Icons'
import { revealDelay } from '@/components/ui/reveal'

type Usp = {
  title: string
  description: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}

/** Đúng 3 USP của phiếu (mục 6, ND-06). Không thêm USP khác. */
const usps: Usp[] = [
  {
    title: 'Bác sĩ trực tiếp thăm khám',
    description:
      'Bác sĩ Răng Hàm Mặt trực tiếp thăm khám, tư vấn và giải thích rõ từng bước cho Quý khách.',
    Icon: StethoscopeIcon,
  },
  {
    title: 'Dịch vụ đa dạng',
    description:
      'Đáp ứng đa dạng nhu cầu từ răng sứ thẩm mỹ, cấy ghép Implant đến niềng răng sớm cho trẻ.',
    Icon: SparklesIcon,
  },
  {
    title: 'Tư vấn kỹ trước khi làm',
    description:
      'Kiểm tra khớp cắn, chụp phim, đánh giá xương và đưa phương án riêng phù hợp cho từng người.',
    Icon: ScanIcon,
  },
]

/** Section "Vì sao chọn Nha khoa T-Smile" (#gioi-thieu) — phần chứng minh uy tín, nền trắng. */
export default function WhyUsSection() {
  return (
    <section
      id={sectionIds.about}
      aria-labelledby="why-us-title"
      className="relative bg-surface py-14 lg:py-24"
    >
      <Container>
        <div data-reveal>
          <SectionHeading
            eyebrow="Giới thiệu"
            titleId="why-us-title"
            title={
              <>
                Vì sao Quý khách chọn <BrandName />?
              </>
            }
            // TODO(content): câu mở đầu [ĐỀ XUẤT, SUY RA từ USP 1 và 3] — chờ khách xác nhận (mục 13).
            description={`${siteConfig.name} chú trọng thăm khám kỹ và tư vấn rõ ràng trước khi đưa ra phương án điều trị cho Quý khách.`}
            className="mb-8 lg:mb-14"
          />
        </div>

        <ul className="grid gap-5 md:grid-cols-3 lg:gap-8">
          {usps.map(({ title, description, Icon }, index) => (
            <li key={title} data-reveal style={revealDelay(index * 80)}>
              <article className="group h-full rounded-2xl border border-brand-green-100 bg-surface p-6 shadow-soft transition-[box-shadow,border-color,translate] duration-200 hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-soft-lg lg:p-8">
                <div className="flex items-center justify-between">
                  <span className="grid size-14 place-items-center rounded-xl bg-brand-green-strong text-surface">
                    <Icon className="size-7" />
                  </span>
                  <span className="rounded-full bg-brand-yellow-light px-3 py-1 text-sm font-bold text-ink">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-ink">{title}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink-muted">{description}</p>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
