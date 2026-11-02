import type { ComponentType, SVGProps } from 'react'

import { bookingHref, sectionIds } from '@/lib/site-config'
import { getServiceName, type ServiceSlug } from '@/lib/services'
import BrandName from '@/components/ui/BrandName'
import ButtonLink from '@/components/ui/ButtonLink'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import WisdomToothIllustration, {
  type WisdomToothKind,
} from '@/components/ui/WisdomToothIllustration'
import {
  ArrowRightIcon,
  CalendarIcon,
  ChildIcon,
  GemIcon,
  HeartIcon,
  SmileIcon,
  UsersIcon,
} from '@/components/ui/Icons'
import { revealDelay } from '@/components/ui/reveal'

type AudienceGroup = {
  label: string
  description: string
  services: ServiceSlug[]
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}

/** 5 nhóm khách hàng mục tiêu (mục 5) và ánh xạ sang dịch vụ [SUY RA]. */
const groups: AudienceGroup[] = [
  {
    label: 'Người lớn 25–55 tuổi',
    description:
      'Cần khám và điều trị các vấn đề răng hàm mặt thông thường như sâu răng, viêm nướu, nhổ răng khôn.',
    services: ['rang-ham-mat'],
    Icon: UsersIcon,
  },
  {
    label: 'Người trẻ 20–35 tuổi',
    description: 'Quan tâm đến ngoại hình, mong muốn có nụ cười đẹp và tự tin hơn.',
    services: ['nha-khoa-tham-my', 'rang-su-cao-cap'],
    Icon: SmileIcon,
  },
  {
    label: 'Phụ huynh có con 6–12 tuổi',
    description: 'Muốn niềng răng sớm cho con để điều chỉnh hàm từ nhỏ.',
    services: ['nieng-rang-som'],
    Icon: ChildIcon,
  },
  {
    label: 'Trung niên và cao tuổi 45–70 tuổi',
    description: 'Bị mất răng, cần phục hồi bằng cấy ghép Implant để ăn nhai tốt hơn.',
    services: ['cay-ghep-implant'],
    Icon: HeartIcon,
  },
  {
    // TODO(content): nhãn viết lại từ "Khách có thu nhập khá" [ĐỀ XUẤT] — chờ khách xác nhận (mục 13).
    label: 'Quý khách có yêu cầu cao',
    description: 'Sẵn sàng đầu tư cho răng sứ cao cấp và cấy ghép Implant chỉn chu.',
    services: ['rang-su-cao-cap', 'cay-ghep-implant'],
    Icon: GemIcon,
  },
]

// TODO(content): khối "Góc nhận biết nhanh" lấy ý từ bài đăng của khách (ảnh 585378209_…),
// đã bỏ số liệu "90%" — chờ khách xác nhận (Q-16, mục 13).
const wisdomToothKinds: { kind: WisdomToothKind; name: string; description: string }[] = [
  { kind: 'horizontal', name: 'Mọc nằm ngang', description: 'Răng nằm ngang, đẩy vào răng số 7 bên cạnh.' },
  { kind: 'partial', name: 'Mọc lấp ló', description: 'Lúc nhô lên gây sưng, lúc lại lặn xuống dưới nướu.' },
  { kind: 'impacted', name: 'Mọc ngầm', description: 'Nằm im dưới nướu, phải chụp X-quang mới thấy.' },
  { kind: 'upright', name: 'Mọc thẳng', description: 'Mọc thẳng hàng, ngay ngắn như các răng khác.' },
]

/** Section "Phù hợp với ai" (#khach-hang) — nền trắng. */
export default function AudienceSection() {
  return (
    <section
      id={sectionIds.audience}
      aria-labelledby="audience-title"
      className="relative bg-surface py-14 lg:py-24"
    >
      <Container>
        <div data-reveal>
          {/* TODO(content): tiêu đề và câu mở đầu [ĐỀ XUẤT] — chờ khách xác nhận (mục 13). */}
          <SectionHeading
            eyebrow="Phù hợp với ai"
            titleId="audience-title"
            title={
              <>
                <BrandName /> đồng hành cùng ai?
              </>
            }
            description="Mỗi độ tuổi có một nhu cầu riêng. Quý khách chọn nhóm phù hợp để đặt lịch đúng dịch vụ cần tư vấn."
            className="mb-8 lg:mb-14"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <ul className="space-y-4 lg:col-span-7 lg:space-y-5">
            {groups.map(({ label, description, services, Icon }, index) => (
              <li key={label} data-reveal style={revealDelay(index * 70)}>
                {/* Mobile: icon + tiêu đề cùng hàng, mô tả và nút trải hết chiều ngang. Từ sm: nội dung thụt theo icon. */}
                <article className="grid grid-cols-[auto_1fr] items-center gap-x-4 rounded-2xl border border-brand-green-100 bg-surface p-5 transition duration-300 hover:border-brand-green/40 hover:shadow-soft sm:gap-x-5 lg:p-6">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-green-light text-brand-green ring-1 ring-brand-green-100 sm:row-span-3 sm:size-14 sm:self-start">
                    <Icon className="size-6 sm:size-7" />
                  </span>
                  <h3 className="text-lg leading-snug font-bold text-ink">{label}</h3>
                  <p className="col-span-2 mt-3 text-base leading-relaxed text-ink-muted sm:col-span-1 sm:col-start-2 sm:mt-1">
                    {description}
                  </p>
                  <ul className="col-span-2 mt-3 flex flex-wrap gap-2 sm:col-span-1 sm:col-start-2">
                    {services.map((slug) => (
                      <li key={slug}>
                        <a
                          href={bookingHref}
                          data-book-service={slug}
                          className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-brand-green-100 px-4 text-[0.9375rem] font-semibold whitespace-nowrap text-brand-green-dark transition hover:bg-brand-green-strong hover:text-surface"
                        >
                          <span className="sr-only">Đặt lịch tư vấn </span>
                          {getServiceName(slug)}
                          <ArrowRightIcon className="size-4" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ul>

          <div className="lg:col-span-5">
            <aside
              aria-labelledby="wisdom-tooth-title"
              data-reveal
              className="relative overflow-hidden rounded-2xl bg-brand-green-light p-6 ring-1 ring-brand-green-100 sm:p-8 lg:sticky lg:top-28"
            >
              <div className="relative">
                <p className="inline-flex rounded-full bg-brand-yellow px-3.5 py-1.5 text-sm font-bold text-ink">
                  Góc nhận biết nhanh
                </p>
                <h3
                  id="wisdom-tooth-title"
                  className="mt-4 text-2xl leading-snug font-extrabold text-ink"
                >
                  Răng khôn của Quý khách thuộc kiểu nào?
                </h3>

                <ul className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-1">
                  {wisdomToothKinds.map((item) => (
                    <li
                      key={item.kind}
                      className="flex items-center gap-4 rounded-2xl bg-surface p-3.5 pr-4 shadow-soft"
                    >
                      <span className="block h-[3.75rem] w-20 shrink-0 overflow-hidden rounded-xl bg-surface ring-1 ring-brand-green-100">
                        <WisdomToothIllustration kind={item.kind} />
                      </span>
                      <span>
                        <span className="block font-bold text-ink">{item.name}</span>
                        <span className="mt-1 block text-[0.9375rem] leading-snug text-ink-muted">
                          {item.description}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 text-base leading-relaxed text-ink-muted">
                  Để biết chính xác tình trạng răng khôn, Quý khách nên được bác sĩ thăm khám và chụp phim.
                </p>
                <ButtonLink
                  href={bookingHref}
                  data-book-service="rang-ham-mat"
                  className="mt-5 w-full sm:w-auto"
                >
                  <CalendarIcon className="size-5" />
                  Đặt lịch tư vấn
                </ButtonLink>
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </section>
  )
}
