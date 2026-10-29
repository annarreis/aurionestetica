import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './styles/index.js'
import App from './App.jsx'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Em produção o HTML vem pré-renderizado (SEO); em desenvolvimento, renderiza do zero.
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
