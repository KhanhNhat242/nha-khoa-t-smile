/**
 * Sơ đồ 4 kiểu mọc răng khôn — vẽ bằng code (minh họa, không phải ảnh lâm sàng).
 * Bên trái là răng số 7 làm mốc, bên phải là răng khôn. Đường nướu ở y = 32:
 * phần răng phía trên nướu vẽ nét liền, phần nằm dưới nướu vẽ nét đứt.
 */
export type WisdomToothKind = 'horizontal' | 'partial' | 'impacted' | 'upright'

/** Hình chiếc răng (thân ở trên, chân ở dưới), tâm hình tại (29.5, 27). */
const TOOTH =
  'M20 14c-3 0-5 2.5-5 6 0 3 1.2 5 1.8 7.5.8 3 .9 6.5 1.8 9.5.5 1.8 1.5 2.5 2.5 2.5 2.2 0 2.2-3.8 3-6.5.4-1.5 1.1-2.6 2.7-2.6s2.3 1.1 2.7 2.6c.8 2.7.8 6.5 3 6.5 1 0 2-.7 2.5-2.5.9-3 1-6.5 1.8-9.5C42.8 25 44 23 44 20c0-3.5-2-6-5-6-2.7 0-4.1 1.4-6.4 1.4S22.7 14 20 14Z'

const GUM_Y = 32

function place(cx: number, cy: number, rotate: number, scale: number) {
  return `translate(${cx} ${cy}) rotate(${rotate}) scale(${scale}) translate(-29.5 -27)`
}

const NEIGHBOR = place(13, GUM_Y, 0, 0.72)

const WISDOM: Record<WisdomToothKind, string> = {
  upright: place(48, GUM_Y, 0, 0.8),
  partial: place(48, 41, 12, 0.8),
  impacted: place(49, 49, 22, 0.8),
  horizontal: place(36, 45, -90, 0.8),
}

function Tooth({ transform, clipId }: { transform: string; clipId: string }) {
  return (
    <>
      <path
        d={TOOTH}
        transform={transform}
        className="fill-surface stroke-brand-green-dark"
        strokeWidth={2.4}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <g clipPath={`url(#${clipId})`}>
        <path
          d={TOOTH}
          transform={transform}
          className="fill-brand-green-100 stroke-brand-green-dark"
          strokeWidth={1.8}
          strokeDasharray="3 2.5"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </>
  )
}

export default function WisdomToothIllustration({ kind }: { kind: WisdomToothKind }) {
  const clipId = `wisdom-gum-${kind}`
  return (
    <svg viewBox="0 16 64 48" aria-hidden="true" focusable="false" className="size-full">
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y={GUM_Y} width="64" height={64 - GUM_Y} />
        </clipPath>
      </defs>
      {/* Nướu và xương hàm */}
      <rect x="0" y={GUM_Y} width="64" height={64 - GUM_Y} className="fill-brand-green-light" />
      <Tooth transform={NEIGHBOR} clipId={clipId} />
      <Tooth transform={WISDOM[kind]} clipId={clipId} />
      {/* Đường viền nướu */}
      <path
        d={`M0 ${GUM_Y}c8-2.5 14-2.5 22 0s14 2.5 22 0 14-2.5 20 0`}
        fill="none"
        className="stroke-brand-green"
        strokeWidth={2}
      />
    </svg>
  )
}
