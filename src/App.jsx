import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import FloatingWhatsApp from './components/layout/FloatingWhatsApp.jsx'
import Hero from './components/sections/Hero.jsx'
import About from './components/sections/About.jsx'
import Treatments from './components/sections/Treatments.jsx'
import Differentials from './components/sections/Differentials.jsx'
import Philosophy from './components/sections/Philosophy.jsx'
import Experience from './components/sections/Experience.jsx'
import Booking from './components/sections/Booking.jsx'

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <About />
        <Treatments />
        <Differentials />
        <Philosophy />
        <Experience />
        <Booking />
      </main>
      <Footer />
      <FloatingWhatsApp />
      </MotionConfig>
    </LazyMotion>
  )
}
