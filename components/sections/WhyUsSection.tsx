import Image from 'next/image'

import aboutUs from '@/public/images/about-us.jpg'
import { bookingHref, sectionIds, siteConfig } from '@/lib/site-config'
import BrandName from '@/components/ui/BrandName'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import ButtonLink from '@/components/ui/ButtonLink'
import { CalendarIcon, CheckIcon } from '@/components/ui/Icons'
import { revealDelay } from '@/components/ui/reveal'

/**
 * 4 lý do — nguyên văn nội dung "Lý do khách hàng chọn T-Smile" người dùng cung cấp 02/11/2026 (mục 6, ND-06).
 * TODO(content): ý 2–4 không có trong phiếu — chờ khách xác nhận (Q-19, mục 13).
 */
const reasons = [
  'Bác sĩ trực tiếp thăm khám, theo dõi và giải thích rõ ràng',
  'Phòng khám sạch – vô khuẩn – trang thiết bị đầy đủ',
  'Chi phí minh bạch, quy trình rõ ràng',
  'Chăm sóc sau điều trị chu đáo',
]

/**
 * Section "Lý do Quý khách chọn Nha khoa T-Smile" (#gioi-thieu), GD-13.
 * Trái: tiêu đề, câu mở đầu, lưới 2×2 (4 lý do, dấu kiểm, vạch vàng), nút đặt lịch + hotline.
 * Phải: ảnh about-us bo góc. Không dùng con số thống kê như mẫu tham khảo (Q-07).
 */
export default function WhyUsSection() {
  return (
    <section id={sectionIds.about} aria-labelledby="why-us-title" className="bg-surface py-16 lg:py-24">
      <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-6">
          <div data-reveal="left">
            <SectionHeading
              layout="stack"
              titleId="why-us-title"
              title={
                <>
                  Lý do Quý khách chọn <BrandName />
                </>
              }
              // TODO(content): câu mở đầu [ĐỀ XUẤT, SUY RA từ USP 1 và 3] — chờ khách xác nhận (mục 13).
              description={`${siteConfig.name} chú trọng thăm khám kỹ và tư vấn rõ ràng trước khi đưa ra phương án điều trị cho Quý khách.`}
            />
          </div>

          <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:mt-12">
            {reasons.map((reason, index) => (
              <li
                key={reason}
                data-reveal="up"
                style={revealDelay(150 + index * 120)}
                className="flex gap-4 border-t-2 border-brand-yellow pt-5"
              >
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-green-light text-brand-green-strong"
                >
                  <CheckIcon className="size-5" />
                </span>
                <p className="text-lg leading-snug font-bold tracking-[-0.01em] text-pretty text-ink">{reason}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Ảnh: khung ngang 6:5, chỉ hiện phần giữa ảnh — cắt bỏ chữ in sẵn ở trên và watermark ở góc dưới (GD-13, Q-18) */}
        {/* TODO(content): ảnh about-us có chữ "TSMILE" sai tên và nghi ảnh AI — chờ khách xác nhận hoặc gửi ảnh thật (Q-18). */}
        <div data-reveal="right" style={revealDelay(100)} className="lg:col-span-5 lg:col-start-8">
          <div className="relative mx-auto aspect-[6/5] max-w-[30rem] overflow-hidden rounded-2xl shadow-soft-lg">
            <Image
              src={aboutUs}
              alt="Hình minh họa mẫu hàm răng sứ đặt trên bàn đá"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 480px, 100vw"
              className="reveal-zoom object-cover object-[50%_76%]"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
