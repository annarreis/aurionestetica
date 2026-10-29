import { useEffect, useRef, useState } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { whatsappUrl } from '../../lib/whatsapp.js'
import { ease } from '../../lib/motion.js'
import RevealLines from '../ui/RevealLines.jsx'
import MaskImage from '../ui/MaskImage.jsx'
import Picture from '../ui/Picture.jsx'
import Button, { TextLink } from '../ui/Button.jsx'
import WhatsAppIcon from '../ui/WhatsAppIcon.jsx'
import './Hero.css'

export default function Hero() {
  const ref = useRef(null)
  const [ready, setReady] = useState(false)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 90])
  const noteY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -50])

  // A sequência de abertura começa só depois da hidratação.
  useEffect(() => setReady(true), [])

  const fade = (delay) => ({
    initial: { opacity: 0, y: 18 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: reduce ? { duration: 0.4 } : { duration: 1, ease, delay },
  })

  return (
    <section id="inicio" className="hero" ref={ref} aria-labelledby="hero-title">
      <div className="hero__grid container">
        <div className="hero__copy">
          <RevealLines
            as="h1"
            id="hero-title"
            className="display hero__title"
            animate={ready}
            delay={0.35}
            stagger={0.12}
            lines={[
              'Sua pele',
              { text: 'ainda pode', className: 'hero__l2' },
              { text: 'se renovar.', className: 'hero__l3' },
            ]}
          />

          <m.div className="hero__intro" data-reveal {...fade(0.95)}>
            <p className="hero__lead lead">
              Ciência, sensibilidade e expertise para realçar o que existe de mais autêntico em você.
            </p>
            <div className="hero__ctas">
              <Button href={whatsappUrl()} icon={<WhatsAppIcon />}>
                Agendar avaliação
              </Button>
              <TextLink href="#tratamentos">Conhecer tratamentos</TextLink>
            </div>
          </m.div>
        </div>

        <div className="hero__visual">
          <m.div className="hero__frame" style={{ y: imageY }}>
            <MaskImage
              name="mascara"
              priority
              animate={ready}
              delay={0.1}
              className="hero__image"
              sizes="(min-width: 1024px) 38vw, 86vw"
              alt="Paciente deitada com máscara facial dourada; indicações de hidratação, luminosidade, maciez e textura da pele"
            />
          </m.div>

          <m.aside className="hero__note" style={{ y: noteY }} aria-label="Nosso compromisso">
            <m.div className="hero__note-inner" data-reveal {...fade(1.25)}>
              <Picture name="cetimLargo" alt="" sizes="16rem" className="hero__note-bg" />
              <p className="caps">
                Ciência para resultados reais. <br />
                Sempre com a sua essência.
              </p>
              <span className="rule" aria-hidden="true" />
            </m.div>
          </m.aside>

          <p className="hero__vertical caps" aria-hidden="true">
            Pele, renovação e naturalidade
          </p>
        </div>
      </div>
    </section>
  )
}
