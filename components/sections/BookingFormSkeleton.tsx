/** Khung giữ chỗ cho form đặt lịch khi chưa hydrate (cùng kích thước để trang không bị nhảy). */
export default function BookingFormSkeleton() {
  const field = (
    <div>
      <div className="h-5 w-28 rounded bg-surface/25" />
      <div className="mt-2 h-12 rounded-xl bg-surface" />
    </div>
  )
  return (
    <div aria-hidden="true" className="animate-pulse">
      <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
        {field}
        {field}
        {field}
        {field}
      </div>
      <div className="mt-5">
        <div className="h-5 w-20 rounded bg-surface/25" />
        <div className="mt-2 h-24 rounded-xl bg-surface" />
      </div>
      <div className="mt-8 h-14 rounded-xl bg-brand-yellow/70" />
      <div className="mt-4 h-5 w-4/5 rounded bg-surface/25" />
    </div>
  )
}
