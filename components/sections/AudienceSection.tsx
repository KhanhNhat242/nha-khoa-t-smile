import type { ComponentType, SVGProps } from 'react'
import type { StaticImageData } from 'next/image'

import audience1 from '@/public/images/audience/1.jpg'
import audience2 from '@/public/images/audience/2.png'
import audience3 from '@/public/images/audience/3.jpg'
import audience4 from '@/public/images/audience/4.jpg'
import audience5 from '@/public/images/audience/5.jpg'

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
  CalendarIcon,
  ChildIcon,
  GemIcon,
  HeartIcon,
  SmileIcon,
  UsersIcon,
} from '@/components/ui/Icons'
import { revealDelay } from '@/components/ui/reveal'

import AudienceCarousel, { type AudienceItem } from './AudienceCarousel'

type AudienceGroup = {
  label: string
  description: string
  services: ServiceSlug[]
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  image: StaticImageData
  imageAlt: string
  /** Vị trí cắt ảnh trong thẻ (class object-position) */
  imagePosition: string
}

/** 5 nhóm khách hàng mục tiêu (mục 5) và ánh xạ sang dịch vụ [SUY RA]. */
const groups: AudienceGroup[] = [
  {
    label: 'Người lớn 25–55 tuổi',
    description:
      'Cần khám và điều trị các vấn đề răng hàm mặt thông thường như sâu răng, viêm nướu, nhổ răng khôn.',
    services: ['rang-ham-mat'],
    Icon: UsersIcon,
    image: audience1,
    imageAlt: "Hình minh họa bác sĩ đang khám răng cho khách",
    imagePosition: "object-[30%_50%]",
  },
  {
    label: 'Người trẻ 20–35 tuổi',
    description: 'Quan tâm đến ngoại hình, mong muốn có nụ cười đẹp và tự tin hơn.',
    services: ['nha-khoa-tham-my', 'rang-su-cao-cap'],
    Icon: SmileIcon,
    image: audience2,
    imageAlt: "Hình minh họa người phụ nữ trẻ cười tươi soi gương",
    imagePosition: "object-[45%_30%]",
  },
  {
    label: 'Phụ huynh có con 6–12 tuổi',
    description: 'Muốn niềng răng sớm cho con để điều chỉnh hàm từ nhỏ.',
    services: ['nieng-rang-som'],
    Icon: ChildIcon,
    // TODO(content): ảnh thật bé trai thấy rõ mặt — cần đồng ý của phụ huynh trước khi công khai (Q-17).
    image: audience3,
    imageAlt: "Bé trai đang niềng răng cười tươi",
    imagePosition: "object-[50%_25%]",
  },
  {
    label: 'Trung niên và cao tuổi 45–70 tuổi',
    description: 'Bị mất răng, cần phục hồi bằng cấy ghép Implant để ăn nhai tốt hơn.',
    services: ['cay-ghep-implant'],
    Icon: HeartIcon,
    image: audience4,
    imageAlt: "Bác sĩ đang thực hiện cấy ghép Implant cho khách",
    imagePosition: "object-[60%_15%]",
  },
  {
    // TODO(content): nhãn viết lại từ "Khách có thu nhập khá" [ĐỀ XUẤT] — chờ khách xác nhận (mục 13).
    label: 'Quý khách có yêu cầu cao',
    description: 'Sẵn sàng đầu tư cho răng sứ cao cấp và cấy ghép Implant chỉn chu.',
    services: ['rang-su-cao-cap', 'cay-ghep-implant'],
    Icon: GemIcon,
    image: audience5,
    imageAlt: "Phòng điều trị với ghế nha khoa và màn hình xem phim X-quang",
    imagePosition: "object-[50%_40%]",
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

/** Section "Phù hợp với ai" (#khach-hang), GD-11: carousel lõm 5 nhóm khách ở trên, khối nhận biết răng khôn ở dưới. */
export default function AudienceSection() {
  const items: AudienceItem[] = groups.map(({ label, description, services, Icon, image, imageAlt, imagePosition }) => ({
    label,
    description,
    image,
    imageAlt,
    imagePosition,
    icon: <Icon className="size-6" />,
    services: services.map((slug) => ({ slug, name: getServiceName(slug) })),
  }))

  return (
    <section id={sectionIds.audience} aria-labelledby="audience-title" className="overflow-x-clip bg-surface pt-6 pb-16 lg:pt-8 lg:pb-28">
      {/* Phần trên: carousel lõm, tràn hết chiều ngang; tiêu đề nằm trong vùng dính cùng carousel */}
      <div data-reveal>
        <AudienceCarousel
          items={items}
          header={
            <Container className="relative z-10 mb-3 sm:mb-6 lg:mb-8">
              {/* TODO(content): tiêu đề và câu mở đầu [ĐỀ XUẤT] — chờ khách xác nhận (mục 13). */}
              <SectionHeading
                layout="stack"
                align="center"
                titleId="audience-title"
                title={
                  <>
                    <BrandName /> đồng hành cùng ai?
                  </>
                }
                description=""
              />
            </Container>
          }
        />
      </div>
    </section>
  )
}
