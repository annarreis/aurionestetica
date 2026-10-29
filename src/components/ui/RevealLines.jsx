import { m } from 'framer-motion'
import { ease, viewportOnce } from '../../lib/motion.js'
import './RevealLines.css'

/**
 * Título revelado linha a linha por máscara.
 * `lines` define as quebras editoriais; cada linha pode receber uma classe (ex.: recuo).
 * `animate` permite orquestrar a entrada sem depender do viewport (hero).
 */
export default function RevealLines({ as = 'h2', lines, className, delay = 0, stagger = 0.09, animate, id }) {
  const Tag = as
  const trigger = animate === undefined ? { whileInView: 'show', viewport: viewportOnce } : { animate: animate ? 'show' : 'hide' }
  return (
    <Tag className={className} id={id}>
      <m.span className="lines" initial="hide" {...trigger}>
        {lines.map((line, i) => {
          const text = typeof line === 'string' ? line : line.text
          const lineClass = typeof line === 'string' ? '' : line.className
          return (
            <span className={`lines__row ${lineClass ?? ''}`} key={i}>
              <m.span
                data-reveal
                className="lines__inner"
                variants={{
                  hide: { y: '108%' },
                  show: { y: '0%', transition: { duration: 1.1, ease, delay: delay + i * stagger } },
                }}
              >
                {text}
              </m.span>{' '}
            </span>
          )
        })}
      </m.span>
    </Tag>
  )
}
