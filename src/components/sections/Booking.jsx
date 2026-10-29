import { useId, useState } from 'react'
import { interests, site } from '../../data/site.js'
import { whatsappUrl } from '../../lib/whatsapp.js'
import RevealLines from '../ui/RevealLines.jsx'
import Reveal from '../ui/Reveal.jsx'
import Button from '../ui/Button.jsx'
import WhatsAppIcon from '../ui/WhatsAppIcon.jsx'
import './Booking.css'

const periods = ['Manhã', 'Tarde', 'Noite']

function buildMessage({ name, interest, period, note }) {
  const lines = [`Olá, Aurion! Meu nome é ${name.trim()}.`, `Gostaria de agendar: ${interest.toLowerCase()}.`]
  if (period) lines.push(`Melhor período: ${period.toLowerCase()}.`)
  if (note.trim()) lines.push(note.trim())
  return lines.join('\n')
}

export default function Booking() {
  const uid = useId()
  const [form, setForm] = useState({ name: '', interest: interests[0], period: '', note: '' })
  const [error, setError] = useState('')
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  function onSubmit(e) {
    e.preventDefault()
    if (form.name.trim().length < 2) {
      setError('Informe seu nome para montarmos a mensagem.')
      document.getElementById(`${uid}-name`)?.focus()
      return
    }
    setError('')
    window.open(whatsappUrl(buildMessage(form)), '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="agendamento" className="book" aria-labelledby="agendamento-title">
      <div className="book__grid container">
        <div className="book__copy">
          <RevealLines id="agendamento-title" className="h2" lines={['Vamos começar', { text: 'pela sua pele.', className: 'book__indent' }]} />
          <Reveal as="p" className="lead book__lead" delay={0.1}>
            Agende uma avaliação. Conversamos sobre seus objetivos e indicamos o caminho mais adequado para você.
          </Reveal>
          <Reveal delay={0.15}>
            <Button href={whatsappUrl()} icon={<WhatsAppIcon size={20} />} className="book__cta">
              Conversar no WhatsApp
            </Button>
          </Reveal>
          <Reveal as="dl" className="book__info" delay={0.2}>
            <div>
              <dt className="caps">WhatsApp</dt>
              <dd>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  {site.phoneLabel}
                </a>
              </dd>
            </div>
            <div>
              <dt className="caps">Endereço</dt>
              <dd>
                <a href={site.address.mapsUrl} target="_blank" rel="noopener noreferrer">
                  {site.address.street}, {site.address.district} — {site.address.city}/{site.address.region}
                </a>
              </dd>
            </div>
            <div>
              <dt className="caps">Horários</dt>
              <dd>
                {site.hours.map((h) => (
                  <span key={h.days}>
                    {h.days}, {h.time}
                    <br />
                  </span>
                ))}
              </dd>
            </div>
          </Reveal>
        </div>

        <Reveal className="book__panel" delay={0.1}>
          <form className="bform" onSubmit={onSubmit} noValidate aria-labelledby={`${uid}-title`}>
            <h3 className="h3" id={`${uid}-title`}>
              Prefere que a gente monte a mensagem?
            </h3>
            <p className="bform__hint">Preencha em poucos segundos e envie direto pelo WhatsApp.</p>

            <div className="bform__field">
              <label htmlFor={`${uid}-name`}>Seu nome</label>
              <input
                id={`${uid}-name`}
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={set('name')}
                aria-invalid={error ? 'true' : undefined}
                aria-describedby={error ? `${uid}-error` : undefined}
              />
              {error && (
                <p className="bform__error" id={`${uid}-error`} role="alert">
                  {error}
                </p>
              )}
            </div>

            <fieldset className="bform__field">
              <legend>Interesse</legend>
              <div className="bform__chips">
                {interests.map((opt) => (
                  <label key={opt} className="chip">
                    <input type="radio" name="interest" value={opt} checked={form.interest === opt} onChange={set('interest')} />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="bform__field">
              <legend>Melhor período</legend>
              <div className="bform__chips">
                {periods.map((opt) => (
                  <label key={opt} className="chip">
                    <input type="radio" name="period" value={opt} checked={form.period === opt} onChange={set('period')} />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="bform__field">
              <label htmlFor={`${uid}-note`}>
                Mensagem <span className="bform__optional">(opcional)</span>
              </label>
              <textarea id={`${uid}-note`} name="note" rows={3} value={form.note} onChange={set('note')} />
            </div>

            <button type="submit" className="btn btn--solid bform__submit">
              <span className="btn__fill" aria-hidden="true" />
              <span className="btn__icon">
                <WhatsAppIcon />
              </span>
              <span className="btn__label">Enviar pelo WhatsApp</span>
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
