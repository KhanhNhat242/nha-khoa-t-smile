'use client'

import { useState, type FocusEvent, type ReactNode } from 'react'

import { CheckIcon } from '@/components/ui/Icons'

export type ProcessStep = {
  title: string
  description: string
  icon: ReactNode
  /** Nội dung phụ trong thẻ, đặt trước mô tả (ví dụ ảnh nhỏ) */
  media?: ReactNode
  /** Nút cuối thẻ */
  action?: ReactNode
}

type StepState = 'done' | 'current' | 'todo'

/** Thời gian thanh tiến trình chạy (ms) — khớp duration-500 của thanh. */
const BAR_MS = 500
/** Chưa có bước nào active. */
const NONE = -1

const circleClasses: Record<StepState, string> = {
  done: 'bg-brand-green-100 text-brand-green-strong',
  current:
    'bg-brand-green-strong text-surface outline-2 outline-offset-4 outline-brand-green outline-dashed',
  todo: 'border-2 border-brand-green-100 bg-surface text-ink-muted',
}

const cardClasses: Record<StepState, string> = {
  done: 'border-transparent bg-surface shadow-soft',
  current: 'border-brand-green bg-surface shadow-float',
  todo: 'border-dashed border-line/50 bg-transparent',
}

/**
 * Thanh tiến trình 4 bước (GD-14). Rê chuột / focus / chạm vào bước N: thanh xanh chạy từ bước 1
 * tới bước N, các bước trước N hiện dấu kiểm, bước N nổi bật, các bước sau ở trạng thái chờ.
 * Mặc định (chưa rê chuột) và khi rời khỏi cả khối: không bước nào active. Vòng tròn và thẻ sáng lên trễ theo nhịp thanh chạy tới.
 */
export default function ProcessStepper({ steps }: { steps: ProcessStep[] }) {
  // active = -1: chưa rê chuột, không bước nào active (cả 4 bước ở trạng thái chờ)
  const [{ active, from }, setState] = useState({ active: NONE, from: NONE })
  const last = steps.length - 1

  const activate = (index: number) =>
    setState((current) => (current.active === index ? current : { active: index, from: current.active }))

  const stateOf = (index: number): StepState =>
    index < active ? 'done' : index === active ? 'current' : 'todo'

  /** Khi thanh chạy tới (tiến lên), bước i sáng lên đúng lúc thanh chạm tới nó. Thanh bắt đầu ở bước 1. */
  const delayOf = (index: number) => {
    const start = Math.max(from, 0)
    return active > start && index > start && index <= active
      ? `${Math.round(((index - start) / (active - start)) * BAR_MS)}ms`
      : '0ms'
  }

  function onBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) activate(NONE)
  }

  return (
    <div onMouseLeave={() => activate(NONE)} onBlur={onBlur}>
      {/* Thanh tiến trình (desktop) — chỉ là hình ảnh, nội dung đầy đủ nằm trong các thẻ bên dưới */}
      <div aria-hidden="true" className="relative hidden grid-cols-4 lg:grid">
        <div className="absolute top-7 right-[12.5%] left-[12.5%] h-1 -translate-y-1/2 overflow-hidden rounded-full bg-brand-green-100">
          <div
            className="h-full rounded-full bg-brand-green transition-[width] duration-500 ease-soft motion-reduce:transition-none"
            style={{ width: `${last > 0 ? (Math.max(active, 0) / last) * 100 : 0}%` }}
          />
        </div>
        {steps.map((step, index) => {
          const state = stateOf(index)
          return (
            <div
              key={step.title}
              onMouseEnter={() => activate(index)}
              className="relative flex cursor-default flex-col items-center px-2 text-center"
            >
              <span
                style={{ transitionDelay: delayOf(index) }}
                className={`grid size-14 place-items-center rounded-full transition-[background-color,color,border-color,outline-color] duration-300 motion-reduce:transition-none ${circleClasses[state]}`}
              >
                {state === 'done' ? <CheckIcon className="size-6" /> : step.icon}
              </span>
              <span
                style={{ transitionDelay: delayOf(index) }}
                className={`mt-4 text-xl font-bold tracking-[-0.01em] transition-colors duration-300 motion-reduce:transition-none ${
                  state === 'todo' ? 'text-ink-muted' : 'text-ink'
                }`}
              >
                {step.title}
              </span>
            </div>
          )
        })}
      </div>

      <ol className="grid gap-4 rounded-3xl bg-brand-green-100/60 p-3 sm:grid-cols-2 sm:p-4 lg:mt-8 lg:grid-cols-4">
        {steps.map((step, index) => {
          const state = stateOf(index)
          return (
            <li
              key={step.title}
              tabIndex={0}
              aria-current={state === 'current' ? 'step' : undefined}
              onMouseEnter={() => activate(index)}
              onFocus={() => activate(index)}
              onClick={() => activate(index)}
              style={{ transitionDelay: delayOf(index) }}
              className={`flex flex-col rounded-2xl border-2 p-5 transition-[background-color,border-color,box-shadow] duration-300 motion-reduce:transition-none lg:p-6 ${cardClasses[state]}`}
            >
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-brand-green-light text-brand-green-strong lg:hidden [&_svg]:size-5">
                  {step.icon}
                </span>
                <p className="text-sm font-bold tracking-[0.08em] text-brand-green-strong uppercase">
                  Bước {index + 1}
                </p>
              </div>
              <h3 className="mt-3 text-lg font-bold tracking-[-0.01em] text-ink">{step.title}</h3>
              {step.media ? <div className="mt-3">{step.media}</div> : null}
              <p className="mt-2 text-base leading-relaxed text-ink-muted">{step.description}</p>
              {step.action ? <div className="mt-auto pt-5">{step.action}</div> : null}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
