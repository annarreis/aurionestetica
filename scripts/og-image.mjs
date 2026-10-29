// Imagem de compartilhamento (1200×630) a partir da fotografia da máscara facial.
import sharp from 'sharp'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = join(root, 'media-src', 'mascara.jpg')
const { width, height } = await sharp(src).metadata()
const h = Math.round((width * 630) / 1200)
await sharp(src)
  .extract({ left: 0, top: Math.round(height * 0.28), width, height: h })
  .resize(1200, 630)
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(join(root, 'public', 'og-image.jpg'))
console.log('og ok', width, height)
