import { siteConfig } from '@/lib/site-config'

/** Tên ngắn của phòng khám, không cho ngắt dòng giữa "Nha khoa" và "T-Smile". */
export default function BrandName() {
  return <span className="whitespace-nowrap">{siteConfig.name}</span>
}
