// Injeta o HTML renderizado no servidor em dist/index.html para que o conteúdo seja indexável sem JavaScript.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const template = readFileSync(join(root, 'dist', 'index.html'), 'utf8')
const { render } = await import(pathToFileURL(join(root, 'dist-server', 'entry-server.js')).href)

const html = template.replace('<div id="root"></div>', `<div id="root">${render()}</div>`)
writeFileSync(join(root, 'dist', 'index.html'), html)
rmSync(join(root, 'dist-server'), { recursive: true, force: true })
console.log('prerender ok')
