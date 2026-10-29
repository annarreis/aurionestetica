import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'framer-motion'
import { nav, site } from '../../data/site.js'
import { whatsappUrl } from '../../lib/whatsapp.js'
import { ease, easeInOut } from '../../lib/motion.js'
import Wordmark from '../ui/Wordmark.jsx'
import Button from '../ui/Button.jsx'
import WhatsAppIcon from '../ui/WhatsAppIcon.jsx'
import './Header.css'

function useActiveSection(ids) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [ids])
  return active
}

const sectionIds = nav.map((n) => n.href.slice(1))

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)
  const firstLinkRef = useRef(null)
  const active = useActiveSection(sectionIds)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > 520 && y > prev + 2)
    if (y < prev - 2) setHidden(false)
  })

  // Menu mobile: trava o scroll, isola o conteúdo de fundo e devolve o foco ao fechar.
  useEffect(() => {
    const main = document.getElementById('conteudo')
    const footer = document.getElementById('rodape')
    document.body.classList.toggle('is-locked', open)
    if (main) main.inert = open
    if (footer) footer.inert = open
    if (!open) return
    const t = setTimeout(() => firstLinkRef.current?.focus(), 350)
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    const onChange = () => mql.matches && setOpen(false)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  function close() {
    setOpen(false)
    toggleRef.current?.focus()
  }

  const cls = ['header', scrolled && 'is-scrolled', hidden && !open && 'is-hidden', open && 'is-open']
    .filter(Boolean)
    .join(' ')

  return (
    <header className={cls}>
      <div className="header__bar container">
        <nav className="header__nav" aria-label="Principal">
          <ul>
            {nav.slice(0, 4).map((item) => (
              <li key={item.href}>
                <a href={item.href} aria-current={active === item.href.slice(1) ? 'true' : undefined}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#inicio" className="header__brand" aria-label="Aurion Estética Avançada — início">
          <Wordmark />
        </a>

        <div className="header__actions">
          <Button href="#agendamento" variant="outline" className="header__cta">
            Agendar avaliação
          </Button>
          <button
            ref={toggleRef}
            type="button"
            className="header__toggle"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="header__toggle-label">{open ? 'Fechar' : 'Menu'}</span>
            <span className="header__toggle-lines" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            id="menu-mobile"
            className="mmenu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1, transition: { duration: 0.6, ease: easeInOut } }}
            exit={{ scaleY: 0, transition: { duration: 0.5, ease: easeInOut, delay: 0.1 } }}
            style={{ originY: 0 }}
          >
            <m.div
              className="mmenu__inner container"
              initial="hide"
              animate="show"
              exit="hide"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } }, hide: { transition: { staggerChildren: 0.03, staggerDirection: -1 } } }}
            >
              <nav aria-label="Menu mobile">
                <ul className="mmenu__list">
                  {nav.map((item, i) => (
                    <m.li
                      key={item.href}
                      variants={{ hide: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
                    >
                      <a href={item.href} ref={i === 0 ? firstLinkRef : undefined} onClick={() => setOpen(false)}>
                        {item.label}
                      </a>
                    </m.li>
                  ))}
                </ul>
              </nav>
              <m.div
                className="mmenu__foot"
                variants={{ hide: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6, ease } } }}
              >
                <Button href={whatsappUrl()} variant="light" icon={<WhatsAppIcon />}>
                  Agendar pelo WhatsApp
                </Button>
                <p>
                  {site.address.street}
                  <br />
                  {site.address.district}, {site.address.city} — {site.address.region}
                </p>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer">
                  {site.instagramLabel}
                </a>
              </m.div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
