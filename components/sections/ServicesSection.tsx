import { sectionIds } from '@/lib/site-config'
import { services } from '@/lib/services'
import BrandName from '@/components/ui/BrandName'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'

import ServicesDeck from './ServicesDeck'

/** Section "Dịch vụ" (#dich-vu) — CN-02, GD-10: tiêu đề bên trái, chồng thẻ cuộn bên phải. */
export default function ServicesSection() {
  return (
    <section id={sectionIds.services} aria-labelledby="services-title" className="bg-brand-green-light py-16 lg:py-0">
      <Container>
        <ServicesDeck
          services={services}
          header={
            // TODO(content): tiêu đề và câu mở đầu section dịch vụ [ĐỀ XUẤT] — chờ khách xác nhận (mục 13).
            <div data-reveal="left">
              <SectionHeading
                layout="stack"
                titleId="services-title"
                title={
                  <>
                    Dịch vụ tại <BrandName />
                  </>
                }
                description="Quý khách chọn dịch vụ quan tâm để đặt lịch. Bác sĩ sẽ thăm khám và tư vấn phương án phù hợp."
              />
            </div>
          }
        />
      </Container>
    </section>
  )
}
