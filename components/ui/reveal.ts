import type { CSSProperties } from 'react'

/** Độ trễ cho hiệu ứng data-reveal (biến CSS --reveal-delay trong globals.css). */
export function revealDelay(ms: number): CSSProperties {
  return { '--reveal-delay': `${ms}ms` } as CSSProperties
}
