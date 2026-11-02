/**
 * Thông tin doanh nghiệp — nguồn duy nhất (KT-03).
 * Component chỉ import từ đây, không gõ cứng tên, SĐT, địa chỉ hay link.
 * Nguồn: docs/YEU-CAU-DU-AN.md mục 2, ND-01, ND-02, KT-10, KT-11.
 */
const name = 'Nha khoa T-Smile'

export const siteConfig = {
  /** ND-01: tên ngắn */
  name,
  /** ND-01: tên đầy đủ */
  fullName: `${name} Ninh Bình`,
  /** ND-08: 3 dịch vụ chủ lực trong tiêu đề hero */
  headline: 'Niềng răng, Cấy ghép Implant & Răng sứ thẩm mỹ',
  /** ND-08, ND-09: câu của khách, giữ nguyên "hàng ngàn khách hàng" (chỉ đổi tên theo ND-01) */
  slogan: `Hãy đến với ${name} – nơi kiến tạo nụ cười tự tin và bền vững cho hàng ngàn khách hàng.`,
  /** KT-10 */
  description: `${name} tại 263 Nguyễn Công Trứ, Phường Hoa Lư, Ninh Bình. Bác sĩ Răng Hàm Mặt trực tiếp thăm khám, tư vấn niềng răng sớm, cấy ghép Implant, răng sứ cao cấp. Hotline 0985 329 550.`,
  locale: 'vi_VN',
  phone: {
    display: '0985 329 550',
    href: 'tel:0985329550',
    e164: '+84985329550',
  },
  zalo: {
    label: 'Chat Zalo',
    href: 'https://zalo.me/0985329550',
  },
  facebook: {
    label: 'Facebook',
    href: 'https://www.facebook.com/tsmilenb',
  },
  address: {
    /** Giữ nguyên văn, không thêm quận/huyện hay "TP. Ninh Bình" */
    full: '263 Nguyễn Công Trứ, Phường Hoa Lư, Tỉnh Ninh Bình',
    street: '263 Nguyễn Công Trứ',
    locality: 'Phường Hoa Lư',
    region: 'Ninh Bình',
    country: 'VN',
    /** Dùng cho badge hero: "Nha khoa tại Phường Hoa Lư, Ninh Bình" */
    area: 'Phường Hoa Lư, Ninh Bình',
  },
  maps: {
    directionsHref: 'https://maps.app.goo.gl/g3n3QTC6dV2d64oz7',
    embedSrc: 'https://www.google.com/maps?q=20.2473248,105.9850686&z=17&output=embed',
    latitude: 20.2473248,
    longitude: 105.9850686,
  },
  copyrightYear: 2026,
} as const

/** Menu chính (mục 10 tài liệu yêu cầu). `id` anchor đúng bảng mục 10. */
export const navItems = [
  { label: 'Giới thiệu', href: '#gioi-thieu' },
  { label: 'Dịch vụ', href: '#dich-vu' },
  { label: 'Quy trình', href: '#quy-trinh' },
  { label: 'Liên hệ', href: '#lien-he' },
] as const

/** Anchor của các section, dùng chung để tránh gõ sai. */
export const sectionIds = {
  hero: 'trang-chu',
  about: 'gioi-thieu',
  services: 'dich-vu',
  audience: 'khach-hang',
  process: 'quy-trinh',
  booking: 'dat-lich',
  contact: 'lien-he',
} as const

export const bookingHref = `#${sectionIds.booking}`
