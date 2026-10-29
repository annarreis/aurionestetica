import { m } from 'framer-motion'
import { ease, easeInOut } from '../../lib/motion.js'
import Picture from './Picture.jsx'
import './MaskImage.css'

/**
 * Moldura revelada por uma cortina que recolhe (scaleY) enquanto o conteúdo assenta (scale).
 * Só transform — barato para o compositor. A cor da cortina segue a seção (--cover).
 * `animate` permite orquestrar a entrada sem depender do viewport (hero).
 */
export function MaskFrame({ as = 'figure', className = '', delay = 0, from = 'bottom', animate, style, media, children }) {
  const Tag = m[as]
  const trigger =
    animate === undefined
      ? { whileInView: 'show', viewport: { once: true, amount: 0.2 } }
      : { animate: animate ? 'show' : 'hide' }

  return (
    <Tag className={`mask ${className}`} initial="hide" {...trigger} style={style}>
      <m.div
        className="mask__media"
        variants={{ hide: { scale: 1.14 }, show: { scale: 1, transition: { duration: 1.6, ease, delay } } }}
      >
        {media}
      </m.div>
      <m.span
        aria-hidden="true"
        className="mask__cover"
        style={{ originY: from === 'bottom' ? 0 : 1 }}
        variants={{ hide: { scaleY: 1 }, show: { scaleY: 0, transition: { duration: 1.15, ease: easeInOut, delay } } }}
      />
      {children}
    </Tag>
  )
}

export default function MaskImage({ name, alt, sizes, priority, ...rest }) {
  return (
    <MaskFrame
      {...rest}
      media={<Picture name={name} alt={alt} sizes={sizes} priority={priority} className="mask__picture" />}
    />
  )
}
