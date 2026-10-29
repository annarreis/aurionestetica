# Aurion Estética Avançada — website

Site institucional de página única, pré-renderizado para SEO e hidratado com React + Framer Motion.

## Comandos

```bash
npm install
npm run dev       # desenvolvimento em http://localhost:5173
npm run build     # gera /dist (HTML pré-renderizado + assets)
npm run preview   # serve /dist em http://localhost:4173
npm run media     # regenera imagens/vídeos a partir de /media-src (requer ffmpeg)
npm run og        # regenera a imagem de compartilhamento (public/og-image.jpg)
```

O conteúdo de `/dist` é estático: pode ser publicado em Vercel, Netlify, Cloudflare Pages ou qualquer hospedagem.

## Antes de publicar — dados a substituir

Todos os contatos ficam em `src/data/site.js` (campos marcados com `TODO`):

- número de WhatsApp (`whatsapp`, só dígitos com DDI e DDD) e telefone exibido
- e-mail, Instagram, endereço, link do Google Maps e horários
- responsável técnico e registro profissional
- domínio definitivo

Atualize também os mesmos dados no JSON-LD e nas tags de SEO de `index.html`, em `public/robots.txt` e em `public/sitemap.xml`.

## Estrutura

```
src/
  data/site.js          conteúdo, contatos, tratamentos
  data/media.json       manifesto gerado pelo script de mídia
  lib/                  WhatsApp, curvas de animação, parallax, mídia
  styles/               fontes, tokens (paleta e tipografia) e base
  components/ui/        Picture, MaskImage, LazyVideo, RevealLines, Button, Wordmark
  components/layout/    Header + menu mobile, Footer, botão flutuante de WhatsApp
  components/sections/  Hero, Sobre, Tratamentos, Diferenciais, Filosofia, Experiência, Agendamento
media-src/              arquivos originais (fotos, moodboard, reels)
public/media/           AVIF/WebP responsivos e MP4 otimizados (gerados)
```

## Sistema visual

- Paleta: chocolate `#3B1F15`, terracota `#71351F`, caramelo `#AD7957`, taupe `#A58C7C`, nude `#DCC3AD`, off-white `#F8F5F0`
- Títulos: Newsreader (variável, eixo óptico) — substitui Playfair por acentuação mais limpa em português
- Texto de apoio: Jost (geométrica, na linha de Montserrat)
- Fontes auto-hospedadas sob a SIL Open Font License

## Acessibilidade e movimento

- `prefers-reduced-motion`: sem parallax, sem cortinas de revelação, vídeos não tocam sozinhos
- vídeos em loop têm botão de pausa; o menu mobile prende o foco e fecha com Esc
- sem JavaScript, todo o conteúdo continua visível (HTML pré-renderizado)
