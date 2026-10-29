import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { getVideo } from '../../lib/media.js'
import Picture from './Picture.jsx'
import './LazyVideo.css'

/**
 * Vídeo silencioso em loop sobre um poster responsivo.
 * - Só baixa o arquivo quando se aproxima do viewport.
 * - mode="inview": toca enquanto visível; mode="hover": toca com `active` (hover/foco do card),
 *   recaindo para "inview" em telas de toque.
 * - Com prefers-reduced-motion nada toca sozinho; o botão permite tocar manualmente.
 */
export default function LazyVideo({ name, poster, alt, sizes, mode = 'inview', active = false, controls = true, className = '' }) {
  const ref = useRef(null)
  const [near, setNear] = useState(false)
  const [visible, setVisible] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const [env, setEnv] = useState({ reduce: false, touch: false })

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const touch = window.matchMedia('(hover: none)')
    const update = () => setEnv({ reduce: reduce.matches, touch: touch.matches })
    update()
    reduce.addEventListener('change', update)
    return () => reduce.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const nearObs = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: '400px 0px' })
    const visObs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.45 })
    nearObs.observe(el)
    visObs.observe(el)
    return () => {
      nearObs.disconnect()
      visObs.disconnect()
    }
  }, [])

  const effectiveMode = mode === 'hover' && env.touch ? 'inview' : mode
  const wantsAuto = !env.reduce && !userPaused && (effectiveMode === 'inview' ? visible : active && visible)
  const [manual, setManual] = useState(false)
  const shouldPlay = near && (wantsAuto || (manual && visible))

  useEffect(() => {
    const video = ref.current?.querySelector('video')
    if (!video) return
    if (shouldPlay) {
      const p = video.play()
      if (p) p.catch(() => {})
    } else {
      video.pause()
    }
  }, [shouldPlay, near])

  const toggle = () => {
    if (playing) {
      setUserPaused(true)
      setManual(false)
    } else {
      setUserPaused(false)
      setManual(true)
    }
  }

  return (
    <div ref={ref} className={`lvideo ${started ? 'is-started' : ''} ${className}`}>
      <Picture name={poster} alt={alt} sizes={sizes} className="lvideo__poster" />
      {near && (
        <video
          className="lvideo__video"
          src={getVideo(name)}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => {
            setPlaying(true)
            setStarted(true)
          }}
          onPause={() => setPlaying(false)}
        />
      )}
      {controls && (
        <button
          type="button"
          className="lvideo__toggle"
          onClick={toggle}
          aria-label={playing ? 'Pausar vídeo' : 'Reproduzir vídeo'}
        >
          {playing ? <Pause size={14} strokeWidth={1.5} /> : <Play size={14} strokeWidth={1.5} />}
        </button>
      )}
    </div>
  )
}
