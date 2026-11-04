import Image, { type StaticImageData } from 'next/image'

import examIllustration from '@/public/images/audience/1.jpg'
import ctScan from '@/public/images/clinic/chup-phim-ct.jpg'
import dentalModel from '@/public/images/clinic/mau-ham-rang-su.jpg'
import treatmentRoom from '@/public/images/clinic/phong-dieu-tri.jpg'
import { bookingHref, sectionIds } from '@/lib/site-config'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { revealDelay } from '@/components/ui/reveal'
import {
  ArrowRightIcon,
  ClipboardIcon,
  ScanIcon,
  StethoscopeIcon,
  ToothIcon,
} from '@/components/ui/Icons'

import ProcessStepper, { type ProcessStep } from './ProcessStepper'

/** Ảnh nhỏ trong thẻ bước, khung 16:9 thống nhất cho mọi bước. */
function StepImage({ src, alt, className = '' }: { src: StaticImageData; alt: string; className?: string }) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
      <Image
        src={src}
        alt={alt}
        fill
        placeholder="blur"
        sizes="(min-width: 1024px) 260px, (min-width: 640px) 50vw, 100vw"
        className={`object-cover ${className}`}
      />
    </div>
  )
}

/** ND-07: bước 1–3 SUY RA từ USP 1 và 3; bước 4 là [ĐỀ XUẤT]. */
const steps: ProcessStep[] = [
  {
    title: 'Thăm khám trực tiếp',
    description: 'Bác sĩ Răng Hàm Mặt trực tiếp thăm khám tình trạng răng miệng của Quý khách.',
    icon: <StethoscopeIcon className="size-6" />,
    media: (
      <StepImage
        src={examIllustration}
        alt="Hình minh họa bác sĩ đang thăm khám răng miệng cho khách"
        className="object-[center_65%]"
      />
    ),
  },
  {
    title: 'Chụp phim & đánh giá',
    description: 'Kiểm tra khớp cắn, chụp phim và đánh giá xương hàm kỹ lưỡng.',
    icon: <ScanIcon className="size-6" />,
    media: (
      <StepImage
        src={ctScan}
        alt="Màn hình hiển thị phim chụp răng hàm và khách đang được chụp phim"
      />
    ),
  },
  {
    title: 'Lên phương án riêng',
    description: 'Đưa phương án phù hợp cho từng người và giải thích rõ từng bước.',
    icon: <ClipboardIcon className="size-6" />,
    media: (
      <StepImage
        src={dentalModel}
        alt="Hình minh họa mô hình hàm răng dùng để trao đổi phương án điều trị"
        className="object-[center_60%]"
      />
    ),
  },
  {
    // TODO(content): bước 4 là bước nối logic [ĐỀ XUẤT theo ND-07], khách chưa nêu (mục 13).
    title: 'Thực hiện điều trị',
    description: 'Tiến hành điều trị theo đúng phương án đã thống nhất cùng Quý khách.',
    icon: <ToothIcon className="size-6" />,
    media: (
      <StepImage
        src={treatmentRoom}
        alt="Phòng điều trị với ghế nha khoa và màn hình hiển thị phim chụp răng"
        className="object-[center_55%]"
      />
    ),
    action: (
      <a
        href={bookingHref}
        className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-green-strong px-5 font-bold text-surface transition-[background-color,scale] duration-200 hover:bg-brand-green-dark active:scale-[0.97] active:duration-75"
      >
        Đặt lịch tư vấn
        <ArrowRightIcon className="size-5 transition-transform duration-200 group-hover:translate-x-0.5" />
      </a>
    ),
  },
]

/** Section "Quy trình thăm khám & tư vấn" (#quy-trinh), GD-14: thanh tiến trình 4 bước + 4 thẻ. */
export default function ProcessSection() {
  return (
    <section id={sectionIds.process} aria-labelledby="process-title" className="bg-brand-green-light py-16 lg:py-28">
      <Container>
        <div data-reveal="blur">
          {/* TODO(content): câu mở đầu [ĐỀ XUẤT, SUY RA từ USP 1] — chờ khách xác nhận (mục 13). */}
          <SectionHeading
            layout="stack"
            align="center"
            titleId="process-title"
            title="Quy trình thăm khám & tư vấn"
            description="Mỗi bước đều được bác sĩ giải thích rõ ràng để Quý khách yên tâm trước khi điều trị."
          />
        </div>

        <div data-reveal="up" style={revealDelay(150)} className="mt-10 lg:mt-14">
          <ProcessStepper steps={steps} />
        </div>
      </Container>
    </section>
  )
}
