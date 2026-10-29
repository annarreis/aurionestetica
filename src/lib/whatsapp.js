import { site, defaultMessage } from '../data/site.js'

export function whatsappUrl(message = defaultMessage) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
}

export function treatmentMessage(title) {
  return `Olá, Aurion! Tenho interesse em ${title.toLowerCase()} e gostaria de agendar uma avaliação.`
}
