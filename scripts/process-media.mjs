// Gera imagens responsivas (AVIF + WebP) e vídeos otimizados a partir de /media-src.
// Uso: npm run media   (requer ffmpeg no PATH)
import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync, rmSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(root, 'media-src')
const OUT = join(root, 'public', 'media')
const TMP = join(root, '.media-tmp')

rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })
mkdirSync(TMP, { recursive: true })

// Gradação quente: aproxima o fundo cinza das gravações da paleta (taupe / nude).
const WARM =
  'colorbalance=rs=0.08:gs=0.025:bs=-0.075:rm=0.055:gm=0.012:bm=-0.055:rh=0.02:bh=-0.02,eq=saturation=1.05'

const ff = (args) => execFileSync('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: 'inherit' })

function frame(name, video, time, filter) {
  const file = join(TMP, `${name}.png`)
  ff(['-ss', String(time), '-i', join(SRC, video), ...(filter ? ['-vf', filter] : []), '-frames:v', '1', file])
  return file
}

// ---------- Imagens ----------
const images = {
  // stills extraídos dos reels da Aurion
  rosto: { input: () => frame('rosto', 'reel-reconhecer.mp4', 0.7, WARM), widths: [480, 720], crop: { top: 0.06, height: 0.82 } },
  corpo: { input: () => frame('corpo', 'reel-corpo.mp4', 7.4), widths: [480, 720] },
  firmeza: { input: () => frame('firmeza', 'reel-firmeza.mp4', 3.2), widths: [480, 720] },
  textura: { input: () => frame('textura', 'reel-textura.mp4', 4.0, 'eq=saturation=0.86'), widths: [480, 720] },
  luz: { input: () => frame('luz', 'reel-luz.mp4', 6.0, 'hue=h=38:s=0.62,colorbalance=rm=0.05:bm=-0.05'), widths: [480, 720], crop: { top: 0.46, height: 0.54 } },
  reconhecer: { input: () => frame('reconhecer', 'reel-reconhecer.mp4', 7.2, WARM), widths: [480, 720] },
  // fotografia enviada
  labios: { input: () => join(SRC, 'labios.jpg'), widths: [480, 800, 1200] },
  labiosAntes: { input: () => join(SRC, 'labios.jpg'), widths: [480, 800, 1200], crop: { top: 0.06, height: 0.42 } },
  labiosDepois: { input: () => join(SRC, 'labios.jpg'), widths: [480, 800, 1200], crop: { top: 0.56, height: 0.42 } },
  mascara: { input: () => join(SRC, 'mascara.jpg'), widths: [480, 800, 1200, 1600] },
  // texturas do moodboard (recortes ampliados — usar em tamanhos pequenos)
  cetim: { input: () => join(SRC, 'moodboard.webp'), px: [30, 1068, 254, 216], up: 2, widths: [508] },
  cetimLargo: { input: () => join(SRC, 'moodboard.webp'), px: [798, 88, 294, 140], up: 2, widths: [588] },
  gota: { input: () => join(SRC, 'moodboard.webp'), px: [294, 1068, 239, 216], up: 2, widths: [478] },
  linho: { input: () => join(SRC, 'moodboard.webp'), px: [543, 1068, 237, 216], up: 2, widths: [474] },
  pescoco: { input: () => join(SRC, 'moodboard.webp'), px: [791, 1068, 301, 216], up: 2, widths: [602] },
  folha: { input: () => join(SRC, 'moodboard.webp'), px: [922, 743, 170, 307], up: 2, widths: [340] },
  retrato: { input: () => join(SRC, 'moodboard.webp'), px: [491, 88, 290, 429], up: 2, widths: [580] },
}

const manifest = {}

for (const [name, cfg] of Object.entries(images)) {
  const file = cfg.input()
  let img = sharp(file)
  const meta = await img.metadata()
  let { width, height } = meta

  if (cfg.px) {
    const [left, top, w, h] = cfg.px
    img = sharp(await img.extract({ left, top, width: w, height: h }).toBuffer())
    width = w
    height = h
  } else if (cfg.crop) {
    const c = { left: 0, top: 0, width: 1, height: 1, ...cfg.crop }
    const region = {
      left: Math.round(c.left * width),
      top: Math.round(c.top * height),
      width: Math.round(c.width * width),
      height: Math.round(c.height * height),
    }
    img = sharp(await img.extract(region).toBuffer())
    width = region.width
    height = region.height
  }

  let base = await img.toBuffer()
  if (cfg.up) {
    width *= cfg.up
    height *= cfg.up
    base = await sharp(base).resize({ width, kernel: 'lanczos3' }).sharpen({ sigma: 0.6 }).toBuffer()
  }

  const widths = cfg.widths.filter((w) => w <= width)
  const entry = { width, height, avif: [], webp: [], fallback: '' }
  for (const w of widths) {
    const resized = sharp(base).resize({ width: w })
    const a = `${name}-${w}.avif`
    const wp = `${name}-${w}.webp`
    await resized.clone().avif({ quality: 52, effort: 6 }).toFile(join(OUT, a))
    await resized.clone().webp({ quality: 78, effort: 6 }).toFile(join(OUT, wp))
    entry.avif.push([`/media/${a}`, w])
    entry.webp.push([`/media/${wp}`, w])
  }
  entry.fallback = entry.webp.at(-1)[0]
  // placeholder de cor para evitar flashes durante o carregamento
  const { dominant } = await sharp(base).stats()
  entry.color = `rgb(${dominant.r} ${dominant.g} ${dominant.b})`
  manifest[name] = entry
  console.log('img', name, widths.join(','))
}

// ---------- Vídeos ----------
const videos = {
  reconhecer: { src: 'reel-reconhecer.mp4', vf: `${WARM},scale=540:-2`, to: 10.0 },
  firmeza: { src: 'reel-firmeza.mp4', vf: 'scale=540:-2', to: 7.9 },
  textura: { src: 'reel-textura.mp4', vf: 'eq=saturation=0.86,scale=540:-2', to: 9.3 },
  luz: { src: 'reel-luz.mp4', vf: 'crop=720:690:0:590,hue=h=38:s=0.62,colorbalance=rm=0.05:bm=-0.05,scale=540:-2', to: 9.9 },
  corpo: { src: 'reel-corpo.mp4', vf: 'scale=540:-2', to: 15.1 },
}

for (const [name, v] of Object.entries(videos)) {
  const out = join(OUT, `${name}.mp4`)
  ff([
    '-i', join(SRC, v.src), '-t', String(v.to), '-an', '-vf', v.vf,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-pix_fmt', 'yuv420p', '-profile:v', 'high',
    '-movflags', '+faststart', out,
  ])
  manifest[`video:${name}`] = { src: `/media/${name}.mp4` }
  console.log('video', name, Math.round(statSync(out).size / 1024) + 'KB')
}

writeFileSync(join(root, 'src', 'data', 'media.json'), JSON.stringify(manifest, null, 2))
rmSync(TMP, { recursive: true, force: true })
console.log('ok')
