import { getImage } from '../../lib/media.js'

const toSrcSet = (list) => list.map(([src, w]) => `${src} ${w}w`).join(', ')

/** <picture> responsivo com AVIF + WebP e cor de fundo dominante como placeholder. */
export default function Picture({ name, alt, sizes = '100vw', priority = false, className, imgClassName, style }) {
  const img = getImage(name)
  return (
    <picture className={className} style={{ backgroundColor: img.color, ...style }}>
      <source type="image/avif" srcSet={toSrcSet(img.avif)} sizes={sizes} />
      <source type="image/webp" srcSet={toSrcSet(img.webp)} sizes={sizes} />
      <img
        src={img.fallback}
        alt={alt}
        width={img.width}
        height={img.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : undefined}
        className={imgClassName}
      />
    </picture>
  )
}
