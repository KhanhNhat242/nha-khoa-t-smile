import type { Metadata, Viewport } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'

import './globals.css'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import MobileContactBar from '@/components/layout/MobileContactBar'
import { siteConfig } from '@/lib/site-config'
import { colors } from '@/lib/theme'

/** GD-05: font có subset tiếng Việt. */
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-be-vietnam-pro',
  display: 'swap',
})

const defaultTitle = `${siteConfig.fullName} – ${siteConfig.headline}`

/** KT-10. metadataBase, sitemap, robots: làm khi có domain (KT-12, Q-10). */
export const metadata: Metadata = {
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.fullName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.fullName,
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    siteName: siteConfig.fullName,
    title: defaultTitle,
    description: siteConfig.description,
  },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: colors.brandGreen,
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="vi" data-scroll-behavior="smooth" className={`${beVietnamPro.variable} antialiased`}>
      <body className="min-h-dvh bg-surface font-sans text-ink">
        {/*
          Providers (AntdRegistry + ConfigProvider) KHÔNG bọc cả trang ở đây: AntdRegistry gọi createCache() của
          @ant-design/cssinjs, hàm này dùng Math.random() ngay khi render. Cache Components bắt buộc phần đó nằm dưới
          <Suspense>, nên nếu bọc cả trang thì HTML tĩnh sẽ rỗng (toàn trang render ở client, hại SEO và LCP).
          Vì vậy Providers chỉ bọc 2 widget antd (components/ui/AntdIsland.tsx): form đặt lịch và menu Drawer.
        */}
        <a
          href="#noi-dung-chinh"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-brand-green focus:px-5 focus:py-3 focus:font-semibold focus:text-surface"
        >
          Bỏ qua tới nội dung chính
        </a>
        <Header />
        {children}
        <Footer />
        <MobileContactBar />
      </body>
    </html>
  )
}
