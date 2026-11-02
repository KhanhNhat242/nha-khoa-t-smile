/**
 * Kiểm tra dữ liệu form "Đặt lịch tư vấn" (CN-03).
 * Dùng chung cho client (rule của antd Form) và server (Server Action — chốt chặn cuối).
 * Không phụ thuộc thư viện ngoài để chạy được ở cả hai phía.
 */

export const NAME_MIN = 2
export const NAME_MAX = 60
export const NOTE_MAX = 500

/** Số di động Việt Nam sau khi đã chuẩn hóa. */
const PHONE_PATTERN = /^(0|\+84)(3|5|7|8|9)\d{8}$/
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

export type BookingField = 'fullName' | 'phone' | 'service' | 'preferredDate' | 'note'

export type BookingData = {
  fullName: string
  phone: string
  /** slug dịch vụ hoặc '' nếu không chọn */
  service: string
  /** YYYY-MM-DD hoặc '' nếu không chọn */
  preferredDate: string
  note: string
}

export type BookingErrors = Partial<Record<BookingField, string>>

export type BookingResult =
  | { status: 'success'; delivered: boolean }
  | { status: 'invalid'; errors: BookingErrors }
  | { status: 'error' }

export const messages = {
  nameRequired: 'Vui lòng nhập họ và tên.',
  nameLength: `Họ và tên cần từ ${NAME_MIN} đến ${NAME_MAX} ký tự.`,
  phoneRequired: 'Vui lòng nhập số điện thoại.',
  phoneInvalid: 'Số điện thoại chưa đúng. Vui lòng nhập số di động 10 số.',
  serviceInvalid: 'Dịch vụ chưa hợp lệ. Vui lòng chọn lại.',
  dateInvalid: 'Ngày mong muốn chưa hợp lệ.',
  datePast: 'Ngày mong muốn không được trước hôm nay.',
  noteLength: `Ghi chú tối đa ${NOTE_MAX} ký tự.`,
} as const

/** Bỏ khoảng trắng, dấu chấm, gạch ngang (và ngoặc) trong số điện thoại. */
export function normalizePhone(value: string): string {
  return value.replace(/[\s.\-()]/g, '')
}

export function validateFullName(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return messages.nameRequired
  if (trimmed.length < NAME_MIN || trimmed.length > NAME_MAX) return messages.nameLength
  return null
}

export function validatePhone(value: string): string | null {
  const normalized = normalizePhone(value)
  if (!normalized) return messages.phoneRequired
  if (!PHONE_PATTERN.test(normalized)) return messages.phoneInvalid
  return null
}

export function validateService(value: string, allowed: readonly string[]): string | null {
  if (!value) return null
  return allowed.includes(value) ? null : messages.serviceInvalid
}

/**
 * @param value YYYY-MM-DD hoặc ''
 * @param todayIso ngày hôm nay dạng YYYY-MM-DD (theo giờ Việt Nam ở server)
 */
export function validatePreferredDate(value: string, todayIso: string): string | null {
  if (!value) return null
  if (!ISO_DATE_PATTERN.test(value)) return messages.dateInvalid
  const parsed = new Date(`${value}T00:00:00Z`)
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) {
    return messages.dateInvalid
  }
  // So sánh chuỗi YYYY-MM-DD tương đương so sánh ngày
  if (value < todayIso) return messages.datePast
  return null
}

export function validateNote(value: string): string | null {
  return value.trim().length > NOTE_MAX ? messages.noteLength : null
}

/** Lấy chuỗi an toàn từ dữ liệu không tin cậy (server không tin kiểu dữ liệu từ client). */
function readString(source: Record<string, unknown>, key: string): string {
  const value = source[key]
  return typeof value === 'string' ? value : ''
}

export type ParsedBooking =
  | { ok: true; data: BookingData; isSpam: boolean }
  | { ok: false; errors: BookingErrors }

/**
 * Kiểm tra toàn bộ dữ liệu form.
 * @param raw dữ liệu thô (không tin cậy)
 * @param allowedServices danh sách slug hợp lệ
 * @param todayIso ngày hôm nay YYYY-MM-DD
 * @param honeypotField tên ô bẫy chống spam
 */
export function parseBooking(
  raw: unknown,
  allowedServices: readonly string[],
  todayIso: string,
  honeypotField: string,
): ParsedBooking {
  const source: Record<string, unknown> =
    typeof raw === 'object' && raw !== null ? (raw as Record<string, unknown>) : {}

  const data: BookingData = {
    fullName: readString(source, 'fullName').trim(),
    phone: normalizePhone(readString(source, 'phone')),
    service: readString(source, 'service'),
    preferredDate: readString(source, 'preferredDate'),
    note: readString(source, 'note').trim(),
  }

  const errors: BookingErrors = {}
  const checks: [BookingField, string | null][] = [
    ['fullName', validateFullName(data.fullName)],
    ['phone', validatePhone(data.phone)],
    ['service', validateService(data.service, allowedServices)],
    ['preferredDate', validatePreferredDate(data.preferredDate, todayIso)],
    ['note', validateNote(data.note)],
  ]
  for (const [field, message] of checks) {
    if (message) errors[field] = message
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors }

  const isSpam = readString(source, honeypotField).trim().length > 0
  return { ok: true, data, isSpam }
}

/** Ngày hôm nay dạng YYYY-MM-DD theo múi giờ Việt Nam. */
export function todayInVietnam(now: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
}

export const HONEYPOT_FIELD = 'website'
