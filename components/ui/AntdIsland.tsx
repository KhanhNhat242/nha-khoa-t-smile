import { Suspense, type ReactNode } from 'react'

import Providers from '@/components/layout/Providers'

/**
 * "Đảo" antd: bọc một widget antd trong <Suspense> + Providers (AntdRegistry + ConfigProvider).
 *
 * Lý do: AntdRegistry gọi Math.random() khi render (createCache của @ant-design/cssinjs). Với Cache Components,
 * phần đó phải nằm dưới <Suspense>. Chỉ bọc riêng widget antd thì phần còn lại của trang vẫn được prerender
 * thành HTML tĩnh; widget hiện `fallback` (có cùng kích thước) cho tới khi hydrate xong.
 */
export default function AntdIsland({
  fallback,
  children,
}: {
  fallback: ReactNode
  children: ReactNode
}) {
  return (
    <Suspense fallback={fallback}>
      <Providers>{children}</Providers>
    </Suspense>
  )
}
