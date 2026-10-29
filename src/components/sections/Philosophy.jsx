import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { principles } from '../../data/site.js'
import { ease, viewportOnce } from '../../lib/motion.js'
import RevealLines from '../ui/RevealLines.jsx'
import Reveal from '../ui/Reveal.jsx'
import LazyVideo from '../ui/LazyVideo.jsx'
import './Philosophy.css'

export default function Philosophy() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.84, 1])
  const sideY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, 0])

  return (
    <section id="filosofia" className="philo" ref={ref} aria-labelledby="filosofia-title">
      <div className="philo__grid container">
        <div className="philo__copy">
          <RevealLines
            id="filosofia-title"
            className="h2"
            lines={['Naturalidade', { text: 'é um', className: 'philo__indent' }, 'compromisso.']}
          />
          <Reveal className="philo__text" delay={0.1}>
            <p className="body">
              Acreditamos em resultados que respeitam a sua história. Tratamos a pele para que ela fique mais saudável,
              firme e luminosa, e para que você continue se reconhecendo no espelho.
            </p>
            <p className="body">
              Individualidade, para nós, é ponto de partida: nenhum rosto é igual, e nenhum plano de cuidado deveria ser.
            </p>
          </Reveal>
        </div>

        <figure className="philo__film">
          <m.div className="philo__frame" style={{ scale }}>
            <LazyVideo
              name="reconhecer"
              poster="reconhecer"
              sizes="(min-width: 1024px) 30vw, 80vw"
              alt="Mulher madura tocando o próprio rosto com serenidade"
            />
          </m.div>
          <figcaption className="philo__caption caps">
            Você não precisa ser diferente. Precisa continuar se reconhecendo.
          </figcaption>
        </figure>

        <m.div className="philo__principles" style={{ y: sideY }}>
          <h3 className="caps philo__label">O que guia cada decisão</h3>
          <ul>
            {principles.map((p, i) => (
              <m.li
                key={p}
                data-reveal
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.9, ease, delay: 0.12 * i }}
              >
                {p}
              </m.li>
            ))}
          </ul>
        </m.div>
      </div>
    </section>
  )
}
