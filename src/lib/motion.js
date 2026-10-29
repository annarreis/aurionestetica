import { useRef } from 'react'
import { useReducedMotion, useScroll, useTransform } from 'framer-motion'

// Curva única do projeto: saída suave, sem rebote.
export const ease = [0.22, 1, 0.36, 1]
export const easeInOut = [0.76, 0, 0.24, 1]

export const viewportOnce = { once: true, amount: 0.25 }

/** Deslocamento vertical discreto ligado ao scroll. Desliga com prefers-reduced-motion. */
export function useParallax(distance = 40, offset = ['start end', 'end start']) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [distance, -distance])
  return { ref, y }
}
