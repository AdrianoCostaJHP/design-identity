import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { site } from './content.ts'

document.title = site.title

const descriptionMeta = document.querySelector('meta[name="description"]')
if (descriptionMeta) {
  descriptionMeta.setAttribute('content', site.description)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
