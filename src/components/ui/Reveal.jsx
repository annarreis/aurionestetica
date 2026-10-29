import { m } from 'framer-motion'
import { ease, viewportOnce } from '../../lib/motion.js'

/** Entrada discreta: opacidade + 20px. */
export default function Reveal({ as = 'div', delay = 0, y = 20, children, ...rest }) {
  const Tag = m[as]
  return (
    <Tag
      data-reveal
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.9, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
