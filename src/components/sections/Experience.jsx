import { m } from 'framer-motion'
import { experience } from '../../data/site.js'
import { useParallax } from '../../lib/motion.js'
import RevealLines from '../ui/RevealLines.jsx'
import Reveal from '../ui/Reveal.jsx'
import MaskImage from '../ui/MaskImage.jsx'
import './Experience.css'

const drift = [30, 70, 45, 90]

function Moment({ item, index }) {
  const { ref, y } = useParallax(drift[index])
  return (
    <m.li ref={ref} style={{ y }} className={`moment moment--${index + 1}`}>
      <MaskImage
        name={item.image}
        alt={item.alt}
        className="moment__image"
        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 44vw, 80vw"
        delay={0.05 * index}
      />
      <Reveal className="moment__body" delay={0.15}>
        <span className="moment__n caps" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="h3">{item.title}</h3>
        <p className="body">{item.text}</p>
      </Reveal>
    </m.li>
  )
}

export default function Experience() {
  return (
    <section id="experiencia" className="exp" aria-labelledby="experiencia-title">
      <div className="container">
        <header className="exp__head">
          <RevealLines id="experiencia-title" className="h2" lines={['Acolhimento', { text: 'em cada detalhe.', className: 'exp__indent' }]} />
          <Reveal as="p" className="lead exp__intro" delay={0.1}>
            A experiência Aurion começa antes do primeiro procedimento: um percurso reservado e sem pressa, com escuta atenta
            e acompanhamento próximo em cada etapa.
          </Reveal>
        </header>

        <ol className="exp__moments" aria-label="Etapas da experiência Aurion">
          {experience.map((item, i) => (
            <Moment key={item.title} item={item} index={i} />
          ))}
        </ol>

        <Reveal as="blockquote" className="exp__quote" y={30}>
          <p>Tratamentos que preservam a sua história.</p>
          <footer className="caps">Resultados naturais para cada fase sua</footer>
        </Reveal>
      </div>
    </section>
  )
}
