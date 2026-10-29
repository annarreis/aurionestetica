import media from '../data/media.json'

export function getImage(name) {
  const entry = media[name]
  if (!entry) throw new Error(`Imagem não encontrada: ${name}`)
  return entry
}

export function getVideo(name) {
  return media[`video:${name}`]?.src
}
