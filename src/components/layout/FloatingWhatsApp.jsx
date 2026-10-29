import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { whatsappUrl } from '../../lib/whatsapp.js'
import { ease } from '../../lib/motion.js'
import WhatsAppIcon from '../ui/WhatsAppIcon.jsx'
import './FloatingWhatsApp.css'

/** Aparece depois do hero e some quando a seção de agendamento (ou o rodapé) está na tela. */
export default function FloatingWhatsApp() {
  const [pastHero, setPastHero] = useState(false)
  const [nearBooking, setNearBooking] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('inicio')
    const targets = [document.getElementById('agendamento'), document.getElementById('rodape')].filter(Boolean)
    const visible = new Set()
    const heroObs = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting), { threshold: 0.15 })
    const bookObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)))
        setNearBooking(visible.size > 0)
      },
      { threshold: 0.2 },
    )
    if (hero) heroObs.observe(hero)
    targets.forEach((t) => bookObs.observe(t))
    return () => {
      heroObs.disconnect()
      bookObs.disconnect()
    }
  }, [])

  const show = pastHero && !nearBooking

  return (
    <AnimatePresence>
      {show && (
        <m.a
          key="wa"
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="fwa"
          aria-label="Agendar pelo WhatsApp (abre em nova aba)"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease } }}
          exit={{ opacity: 0, y: 16, transition: { duration: 0.3 } }}
        >
          <span className="fwa__icon">
            <WhatsAppIcon size={20} />
          </span>
          <span className="fwa__label" aria-hidden="true">
            Agendar
          </span>
        </m.a>
      )}
    </AnimatePresence>
  )
}
