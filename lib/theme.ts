import type { ThemeConfig } from 'antd'

/**
 * Design token (GD-01, GD-08). PHẢI khớp 1–1 với khối @theme trong app/globals.css.
 * Đây là một trong hai nơi duy nhất được viết mã màu hex.
 */
export const colors = {
  /** Màu nhận diện. Không dùng cho chữ thường / nền nút có chữ (chữ trắng chỉ 3,77:1) */
  brandGreen: '#059669',
  /** Nút, link, chữ xanh cỡ thường (chữ trắng 5,48:1) */
  brandGreenStrong: '#047857',
  brandGreenDark: '#065F46',
  brandGreenLight: '#ECFDF5',
  brandGreen100: '#D1FAE5',
  /** Chỉ làm nền đi với chữ ink, hoặc trang trí */
  brandYellow: '#F59E0B',
  brandYellowLight: '#FEF3C7',
  /** Phản hồi thành công: icon, viền, nền nhạt. Không làm màu chữ */
  success: '#22C55E',
  ink: '#1F2937',
  inkMuted: '#4B5563',
  surface: '#FFFFFF',
  line: '#7C8C82',
  danger: '#B91C1C',
} as const

/** Font nạp bằng next/font trong app/layout.tsx (biến CSS --font-be-vietnam-pro). */
const fontFamily = 'var(--font-be-vietnam-pro), sans-serif'

/** Theme cho antd ConfigProvider (chỉ dùng cho widget tương tác: Form, Select, DatePicker, Drawer). */
export const antdTheme: ThemeConfig = {
  cssVar: { key: 'tsmile' },
  token: {
    colorPrimary: colors.brandGreenStrong,
    colorInfo: colors.brandGreenStrong,
    colorSuccess: colors.success,
    colorLink: colors.brandGreenStrong,
    colorLinkHover: colors.brandGreenDark,
    colorError: colors.danger,
    colorText: colors.ink,
    colorTextHeading: colors.ink,
    colorTextSecondary: colors.inkMuted,
    colorTextDescription: colors.inkMuted,
    colorTextPlaceholder: colors.inkMuted,
    /** Viền ô nhập liệu: tương phản ≥ 3:1 (WCAG 1.4.11), dễ nhận ra với người lớn tuổi */
    colorBorder: colors.line,
    colorBorderSecondary: colors.brandGreen100,
    colorSplit: colors.brandGreen100,
    colorBgContainer: colors.surface,
    colorBgElevated: colors.surface,
    fontFamily,
    fontSize: 16,
    /** Soft UI: nút / ô nhập bo 12px */
    borderRadius: 12,
    borderRadiusLG: 12,
    /** Conversion: ô nhập cao 48px */
    controlHeight: 48,
    controlHeightLG: 48,
    controlOutlineWidth: 3,
    motionDurationFast: '0.08s',
    motionDurationMid: '0.2s',
    motionDurationSlow: '0.3s',
  },
  components: {
    Form: {
      labelColor: colors.ink,
      labelFontSize: 16,
      verticalLabelPadding: '0 0 6px',
      itemMarginBottom: 20,
    },
    Input: {
      activeBorderColor: colors.brandGreenStrong,
      hoverBorderColor: colors.brandGreenStrong,
      paddingBlock: 10,
    },
    Select: {
      optionHeight: 44,
      optionPadding: '10px 14px',
      optionSelectedBg: colors.brandGreenLight,
      optionActiveBg: colors.brandGreenLight,
      optionSelectedColor: colors.brandGreenDark,
    },
    DatePicker: {
      activeBorderColor: colors.brandGreenStrong,
      hoverBorderColor: colors.brandGreenStrong,
      cellHeight: 36,
      cellWidth: 40,
    },
    Button: {
      fontWeight: 700,
      primaryShadow: 'none',
      defaultShadow: 'none',
      contentFontSizeLG: 17,
      colorPrimaryHover: colors.brandGreenDark,
      colorPrimaryActive: colors.brandGreenDark,
    },
    Drawer: {
      footerPaddingBlock: 16,
      footerPaddingInline: 20,
    },
  },
}
