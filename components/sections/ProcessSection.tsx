import Image from 'next/image'

import ctScan from '@/public/images/clinic/chup-phim-ct.jpg'
import { sectionIds } from '@/lib/site-config'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { ScanIcon } from '@/components/ui/Icons'
import { revealDelay } from '@/components/ui/reveal'

/** ND-07: bước 1–3 SUY RA từ USP 1 và 3; bước 4 là [ĐỀ XUẤT]. */
const steps = [
  {
    title: 'Thăm khám trực tiếp',
    description: 'Bác sĩ Răng Hàm Mặt trực tiếp thăm khám tình trạng răng miệng của Quý khách.',
  },
  {
    title: 'Chụp phim & đánh giá',
    description: 'Kiểm tra khớp cắn, chụp phim và đánh giá xương hàm kỹ lưỡng.',
  },
  {
    title: 'Lên phương án riêng',
    description: 'Đưa phương án phù hợp cho từng người và giải thích rõ từng bước.',
  },
  {
    // TODO(content): bước 4 là bước nối logic [ĐỀ XUẤT theo ND-07], khách chưa nêu (mục 13).
    title: 'Thực hiện điều trị',
    description: 'Tiến hành điều trị theo đúng phương án đã thống nhất cùng Quý khách.',
  },
]

/** Section "Quy trình thăm khám & tư vấn" (#quy-trinh) — nền xanh lá nhạt. */
export default function ProcessSection() {
  return (
    <section
      id={sectionIds.process}
      aria-labelledby="process-title"
      className="relative bg-brand-green-light py-14 lg:py-24"
    >
      <Container>
        <div className="mb-10 grid items-center gap-8 lg:mb-16 lg:grid-cols-2 lg:gap-14">
          <div data-reveal>
            {/* TODO(content): câu mở đầu [ĐỀ XUẤT, SUY RA từ USP 1] — chờ khách xác nhận (mục 13). */}
            <SectionHeading
              eyebrow="Quy trình"
              titleId="process-title"
              title="Quy trình thăm khám & tư vấn"
              description="Mỗi bước đều được bác sĩ giải thích rõ ràng để Quý khách yên tâm trước khi điều trị."
              align="left"
            />
          </div>

          <figure data-reveal style={revealDelay(120)} className="relative">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-float ring-4 ring-surface">
              <Image
                src={ctScan}
                alt="Màn hình hiển thị phim chụp răng hàm và khách đang được chụp phim"
                fill
                placeholder="blur"
                sizes="(min-width: 1280px) 600px, (min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
            </div>
            {/* TODO(content): chú thích ảnh [ĐỀ XUẤT, SUY RA từ USP 3] (mục 13). */}
            <figcaption className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 text-[0.9375rem] font-semibold text-ink shadow-float ring-1 ring-brand-green-100 sm:left-6">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-yellow text-ink">
                <ScanIcon className="size-5" />
              </span>
              Bước 2: chụp phim, đánh giá xương
            </figcaption>
          </figure>
        </div>

        <ol className="relative grid gap-6 pt-4 lg:grid-cols-4 lg:gap-8 lg:pt-0">
          {/* Đường nối chấm giữa các bước (desktop) */}
          <li
            aria-hidden="true"
            className="pointer-events-none absolute top-7 right-[12.5%] left-[12.5%] hidden border-t-2 border-dashed border-brand-green/40 lg:block"
          />
          {steps.map((step, index) => (
            <li
              key={step.title}
              data-reveal
              style={revealDelay(index * 120)}
              className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
            >
              {/* Đường nối dọc (mobile) */}
              {index < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute top-14 -bottom-6 left-7 border-l-2 border-dashed border-brand-green/40 lg:hidden"
                />
              ) : null}
              <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full bg-brand-green-strong text-lg font-extrabold text-surface shadow-soft ring-8 ring-brand-green-light">
                0{index + 1}
                <span
                  aria-hidden="true"
                  className="absolute -top-0.5 -right-0.5 size-3.5 rounded-full bg-brand-yellow ring-2 ring-brand-green-light"
                />
              </span>
              <div className="flex-1 rounded-2xl bg-surface p-5 shadow-soft ring-1 ring-brand-green-100 lg:mt-6 lg:w-full lg:p-6">
                <h3 className="text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
