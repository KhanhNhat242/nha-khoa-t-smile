'use client'

import type { ReactNode } from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'
import viVN from 'antd/locale/vi_VN'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'

import { antdTheme } from '@/lib/theme'

dayjs.locale('vi')

/**
 * AntdRegistry: thu CSS của antd khi render ở server; `layer` bọc CSS antd vào @layer antd
 * để khớp thứ tự `@layer theme, base, antd, components, utilities` trong globals.css.
 */
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AntdRegistry layer>
      <ConfigProvider locale={viVN} theme={antdTheme}>
        {children}
      </ConfigProvider>
    </AntdRegistry>
  )
}
