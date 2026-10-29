import { m } from 'framer-motion'
import { useParallax } from '../../lib/motion.js'
import RevealLines from '../ui/RevealLines.jsx'
import Reveal from '../ui/Reveal.jsx'
import MaskImage from '../ui/MaskImage.jsx'
import { TextLink } from '../ui/Button.jsx'
import './About.css'

export default function About() {
  const detail = useParallax(60)

  return (
    <section id="sobre" className="about" aria-labelledby="sobre-title">
      <div className="about__grid container">
        <div className="about__media">
          <MaskImage
            name="rosto"
            className="about__image"
            sizes="(min-width: 1024px) 36vw, 80vw"
            alt="Close-up de uma mulher madura com os olhos fechados, tocando o rosto com delicadeza sob luz quente"
          />
          <m.div ref={detail.ref} style={{ y: detail.y }} className="about__detail">
            <MaskImage
              name="folha"
              delay={0.25}
              from="top"
              className="about__detail-image"
              sizes="12rem"
              alt="Ramo de oliveira projetando sombra suave sobre parede nude"
            />
          </m.div>
          <p className="about__caption caps">Cada pele carrega a sua própria história</p>
        </div>

        <div className="about__copy">
          <RevealLines
            id="sobre-title"
            className="h2"
            lines={['Ciência e', 'sensibilidade,', { text: 'na mesma medida.', className: 'about__indent' }]}
          />
          <Reveal as="p" className="lead about__lead" delay={0.1}>
            A Aurion é uma clínica de estética avançada para quem deseja cuidar da pele com profundidade, sem exageros e sem
            fórmulas prontas.
          </Reveal>
          <Reveal className="about__body" delay={0.15}>
            <p className="body">
              Unimos conhecimento técnico, tecnologia atual e um olhar atento para cada pessoa que chega até nós. Antes de
              qualquer procedimento, entendemos a sua pele, a sua história e o que você deseja preservar.
            </p>
            <p className="body">
              O resultado é um cuidado que se percebe na textura, no viço e na firmeza, e que continua parecendo você.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <TextLink href="#filosofia">Nossa filosofia de cuidado</TextLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
