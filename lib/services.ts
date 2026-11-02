import type { StaticImageData } from 'next/image'

import rangHamMatImg from '@/public/images/services/rang-ham-mat.jpg'
import nhaKhoaThamMyImg from '@/public/images/services/nha-khoa-tham-my.jpg'
import niengRangSomImg from '@/public/images/services/nieng-rang-som.jpg'
import cayGhepImplantImg from '@/public/images/services/cay-ghep-implant.jpg'
import rangSuCaoCapImg from '@/public/images/services/rang-su-cao-cap.jpg'

/**
 * 5 dịch vụ — đúng tên, đúng thứ tự mục 4 tài liệu yêu cầu. Không tự thêm dịch vụ (ND-03).
 * Mô tả lấy nguyên cột "Mô tả ngắn [SUY RA]" của mục 4.
 */
export type ServiceSlug =
  | 'rang-ham-mat'
  | 'nha-khoa-tham-my'
  | 'nieng-rang-som'
  | 'cay-ghep-implant'
  | 'rang-su-cao-cap'

export type Service = {
  slug: ServiceSlug
  name: string
  description: string
  image: StaticImageData
  imageAlt: string
  /** Vị trí cắt ảnh trong khung thẻ (class object-position của Tailwind) */
  imagePosition: string
}

export const services: readonly Service[] = [
  {
    slug: 'rang-ham-mat',
    name: 'Phòng khám Răng – Hàm – Mặt',
    description:
      'Khám và điều trị các vấn đề răng hàm mặt thường gặp như sâu răng, viêm nướu, nhổ răng khôn.',
    image: rangHamMatImg,
    imageAlt: 'Phim X-quang toàn hàm dùng khi thăm khám răng hàm mặt',
    imagePosition: 'object-[50%_55%]',
  },
  {
    slug: 'nha-khoa-tham-my',
    name: 'Nha khoa thẩm mỹ',
    description:
      'Dành cho Quý khách quan tâm đến ngoại hình, mong muốn có nụ cười đẹp và tự tin.',
    image: nhaKhoaThamMyImg,
    imageAlt: 'Dãy răng sứ thẩm mỹ đặt trên mẫu hàm',
    imagePosition: 'object-[50%_40%]',
  },
  {
    slug: 'nieng-rang-som',
    name: 'Niềng răng sớm cho trẻ',
    description: 'Niềng răng sớm cho trẻ 6–12 tuổi, giúp điều chỉnh hàm từ nhỏ.',
    image: niengRangSomImg,
    imageAlt: 'Phim sọ nghiêng có đường phân tích dùng khi lên kế hoạch niềng răng',
    imagePosition: 'object-[50%_45%]',
  },
  {
    slug: 'cay-ghep-implant',
    name: 'Cấy ghép Implant',
    description: 'Phục hồi răng đã mất bằng cấy ghép Implant, giúp Quý khách ăn nhai tốt hơn.',
    image: cayGhepImplantImg,
    imageAlt: 'Hình minh họa trụ Implant và mão răng nằm giữa hai răng thật',
    imagePosition: 'object-[50%_22%]',
  },
  {
    slug: 'rang-su-cao-cap',
    name: 'Răng sứ cao cấp',
    description:
      'Giải pháp răng sứ thẩm mỹ cao cấp, được bác sĩ tư vấn kỹ trước khi thực hiện.',
    image: rangSuCaoCapImg,
    imageAlt: 'Mẫu hàm răng sứ cầm trên tay',
    imagePosition: 'object-[50%_60%]',
  },
]

/** Lựa chọn thêm trong ô "Dịch vụ quan tâm" (CN-03). */
export const UNSURE_SERVICE = {
  value: 'chua-ro',
  label: 'Chưa rõ, cần bác sĩ tư vấn',
} as const

export const serviceOptions: readonly { value: string; label: string }[] = [
  ...services.map((s) => ({ value: s.slug, label: s.name })),
  UNSURE_SERVICE,
]

export function getServiceName(slug: ServiceSlug): string {
  return services.find((s) => s.slug === slug)?.name ?? ''
}
