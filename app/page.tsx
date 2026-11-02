import AudienceSection from '@/components/sections/AudienceSection'
import BookingSection from '@/components/sections/BookingSection'
import ContactSection from '@/components/sections/ContactSection'
import HeroSection from '@/components/sections/HeroSection'
import ProcessSection from '@/components/sections/ProcessSection'
import ServicesSection from '@/components/sections/ServicesSection'
import WhyUsSection from '@/components/sections/WhyUsSection'
import DentistJsonLd from '@/components/ui/DentistJsonLd'
import RevealObserver from '@/components/ui/RevealObserver'

/** Trang chủ dạng landing (CN-01): chỉ ghép các section theo thứ tự mục 10. */
export default function HomePage() {
  return (
    <main id="noi-dung-chinh" className="overflow-x-clip">
      <DentistJsonLd />
      <HeroSection />
      <WhyUsSection />
      <ServicesSection />
      <AudienceSection />
      <ProcessSection />
      <BookingSection />
      <ContactSection />
      <RevealObserver />
    </main>
  )
}
