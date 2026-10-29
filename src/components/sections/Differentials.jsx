import { m } from 'framer-motion'
import { differentials } from '../../data/site.js'
import { ease, viewportOnce } from '../../lib/motion.js'
import RevealLines from '../ui/RevealLines.jsx'
import Reveal from '../ui/Reveal.jsx'
import MaskImage from '../ui/MaskImage.jsx'
import './Differentials.css'

export default function Differentials() {
  return (
    <section id="diferenciais" className="diff" aria-labelledby="diferenciais-title">
      <div className="diff__grid container">
        <div className="diff__intro">
          <div className="diff__sticky">
            <RevealLines id="diferenciais-title" className="h2" lines={['Precisão técnica.', 'Olhar humano.']} />
            <Reveal as="p" className="diff__text" delay={0.1}>
              O que torna a Aurion diferente não é um procedimento isolado, mas a forma como cada decisão é tomada.
            </Reveal>
            <MaskImage
              name="cetim"
              className="diff__texture"
              sizes="(min-width: 1024px) 18rem, 50vw"
              alt="Tecido de cetim em tom chocolate com reflexos caramelo"
            />
          </div>
        </div>

        <ul className="diff__list">
          {differentials.map((d, i) => (
            <m.li
              key={d.title}
              className="diff__item"
              initial="hide"
              whileInView="show"
              viewport={viewportOnce}
            >
              <m.span
                className="diff__rule"
                aria-hidden="true"
                variants={{ hide: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.2, ease } } }}
              />
              <m.h3
                className="h3 diff__title"
                data-reveal
                variants={{ hide: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: 0.15 } } }}
              >
                {d.title}
              </m.h3>
              <m.div
                className="diff__body"
                data-reveal
                variants={{ hide: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: 0.25 } } }}
              >
                <p>{d.text}</p>
                {d.steps && (
                  <ol className="diff__steps" aria-label="Etapas do atendimento">
                    {d.steps.map((s, n) => (
                      <li key={s}>
                        <span className="diff__step-n" aria-hidden="true">
                          {String(n + 1).padStart(2, '0')}
                        </span>
                        {s}
                      </li>
                    ))}
                  </ol>
                )}
              </m.div>
            </m.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
