import { nav, site } from '../../data/site.js'
import { whatsappUrl } from '../../lib/whatsapp.js'
import Wordmark from '../ui/Wordmark.jsx'
import Reveal from '../ui/Reveal.jsx'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer" id="rodape">
      <div className="container">
        <div className="footer__top">
          <p className="footer__claim lead">
            Ciência, sensibilidade e expertise para realçar o que existe de mais autêntico em você.
          </p>

          <nav className="footer__col" aria-label="Rodapé">
            <h2 className="caps footer__title">Navegação</h2>
            <ul>
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <h2 className="caps footer__title">Contato</h2>
            <ul>
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  WhatsApp {site.phoneLabel}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram {site.instagramLabel}
                </a>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h2 className="caps footer__title">Clínica</h2>
            <address>
              <a href={site.address.mapsUrl} target="_blank" rel="noopener noreferrer">
                {site.address.street}
                <br />
                {site.address.district}, {site.address.city} — {site.address.region}
              </a>
            </address>
            <dl className="footer__hours">
              {site.hours.map((h) => (
                <div key={h.days}>
                  <dt>{h.days}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <Reveal className="footer__mark" y={40}>
          <Wordmark size="xl" />
        </Reveal>

        <div className="footer__legal">
          <p>© {year} {site.name}. Todos os direitos reservados.</p>
          <p>{site.technicalLead}</p>
          <p>Os resultados variam de pessoa para pessoa e dependem de avaliação individual.</p>
          <a href="#inicio" className="footer__top-link">
            Voltar ao topo
          </a>
        </div>
      </div>
    </footer>
  )
}
