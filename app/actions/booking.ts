'use server'

import { serviceOptions } from '@/lib/services'
import {
  HONEYPOT_FIELD,
  parseBooking,
  todayInVietnam,
  type BookingResult,
} from '@/lib/validation/booking'

/**
 * Server Action cho form "Đặt lịch tư vấn" (CN-03). Server là chốt chặn cuối:
 * kiểm tra lại toàn bộ dữ liệu, không tin dữ liệu đã kiểm tra ở client.
 *
 * TODO(booking-destination): chưa chốt nơi nhận dữ liệu (Q-09 — email, Google Sheet, Zalo OA...).
 * Hiện action CHỈ kiểm tra dữ liệu rồi trả kết quả, KHÔNG gửi hay lưu dữ liệu ở đâu cả.
 * Khi chốt kênh nhận: gửi `parsed.data` tại đây (secret chỉ đọc ở server, không dùng NEXT_PUBLIC_),
 * trả `delivered: true` khi gửi thành công và `{ status: 'error' }` khi gửi lỗi.
 */
export async function submitBooking(raw: unknown): Promise<BookingResult> {
  try {
    const parsed = parseBooking(
      raw,
      serviceOptions.map((option) => option.value),
      todayInVietnam(new Date()),
      HONEYPOT_FIELD,
    )

    if (!parsed.ok) {
      return { status: 'invalid', errors: parsed.errors }
    }

    // Ô bẫy có dữ liệu => bot. Trả về như thành công để bot không dò ra, nhưng bỏ qua yêu cầu.
    if (parsed.isSpam) {
      return { status: 'success', delivered: false }
    }

    // TODO(booking-destination): gửi parsed.data tới kênh nhận lịch hẹn ở đây.
    return { status: 'success', delivered: false }
  } catch {
    return { status: 'error' }
  }
}
