import { useState } from 'react'
import { m } from 'framer-motion'
import { treatments } from '../../data/site.js'
import { whatsappUrl, treatmentMessage } from '../../lib/whatsapp.js'
import { ease, viewportOnce } from '../../lib/motion.js'
import RevealLines from '../ui/RevealLines.jsx'
import Reveal from '../ui/Reveal.jsx'
import { MaskFrame } from '../ui/MaskImage.jsx'
import LazyVideo from '../ui/LazyVideo.jsx'
import Picture from '../ui/Picture.jsx'
import Button, { TextLink } from '../ui/Button.jsx'
import './Treatments.css'

const sizes = '(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 92vw'

function BeforeAfter({ before, after, alt }) {
  const [showBefore, setShowBefore] = useState(false)
  return (
    <div className={`ba ${showBefore ? 'is-before' : ''}`}>
      <Picture name={after} alt={`${alt} — depois`} sizes={sizes} className="ba__img ba__img--after" />
      <Picture name={before} alt={`${alt} — antes`} sizes={sizes} className="ba__img ba__img--before" />
      <div className="ba__switch" role="group" aria-label="Comparar resultado">
        <button type="button" aria-pressed={showBefore} onClick={() => setShowBefore(true)}>
          Antes
        </button>
        <button type="button" aria-pressed={!showBefore} onClick={() => setShowBefore(false)}>
          Depois
        </button>
      </div>
    </div>
  )
}

function TreatmentCard({ item }) {
  const [active, setActive] = useState(false)
  const { media } = item
  const content = media.video ? (
    <LazyVideo name={media.video} poster={media.poster} alt={item.alt} sizes={sizes} mode="hover" active={active} />
  ) : (
    <BeforeAfter before={media.before} after={media.after} alt={item.alt} />
  )

  return (
    <article
      className={`tcard tcard--${item.layout}`}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      aria-labelledby={`t-${item.id}`}
    >
      <MaskFrame as="div" className="tcard__media" media={<div className="tcard__zoom">{content}</div>} />
      <m.div
        className="tcard__body"
        data-reveal
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.9, ease, delay: 0.2 }}
      >
        <h3 className="h3 tcard__title" id={`t-${item.id}`}>
          {item.title}
        </h3>
        <span className="tcard__line" aria-hidden="true" />
        <p className="body tcard__text">{item.text}</p>
        <ul className="tcard__tags" aria-label="Procedimentos">
          {item.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <TextLink href={whatsappUrl(treatmentMessage(item.title))} target="_blank" rel="noopener noreferrer">
          Agendar avaliação<span className="sr-only"> para {item.title.toLowerCase()} (abre em nova aba)</span>
        </TextLink>
      </m.div>
    </article>
  )
}

export default function Treatments() {
  return (
    <section id="tratamentos" className="treat" aria-labelledby="tratamentos-title">
      <div className="container">
        <header className="treat__head">
          <RevealLines id="tratamentos-title" className="h2" lines={['Áreas', { text: 'de atuação', className: 'treat__indent' }]} />
          <Reveal as="p" className="lead treat__intro" delay={0.1}>
            Cada protocolo começa por uma avaliação. A partir dela, combinamos técnica e tecnologia para tratar a pele em
            camadas, da superfície à sustentação.
          </Reveal>
        </header>

        <div className="treat__grid">
          {treatments.map((t) => (
            <TreatmentCard key={t.id} item={t} />
          ))}

          <Reveal className="treat__aside">
            <p className="lead">Não sabe por onde começar? Esse é justamente o papel da avaliação.</p>
            <p className="body">
              Analisamos sua pele, seus objetivos e o seu momento para indicar o caminho mais adequado, que pode combinar
              mais de uma frente de cuidado.
            </p>
            <Button href="#agendamento" variant="outline">
              Agendar minha avaliação
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
