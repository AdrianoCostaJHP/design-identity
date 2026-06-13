import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'works')

const projects = [
  { slug: 'boutique-estilo-urbano', title: 'Boutique Estilo Urbano', images: 6, slide: [800, 1000] },
  { slug: 'restaurante-sabor-praia', title: 'Restaurante Sabor da Praia', images: 4, slide: [800, 1000] },
  { slug: 'clinica-odonto-vida', title: 'Clínica Odonto Vida', images: 3, slide: [1200, 800] },
  { slug: 'catalogo-padaria-bairro', title: 'Padaria do Bairro', images: 5, slide: [800, 1100] },
  { slug: 'landing-servicos-locais', title: 'Auto Elétrica Centro', images: 3, slide: [1400, 900] },
  { slug: 'stories-promo-verao', title: 'Loja Sol & Mar', images: 4, slide: [800, 1400] },
]

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function placeholderSvg({ label, title, slot, width, height }) {
  const safeTitle = escapeXml(title)
  const safeLabel = escapeXml(label)
  const safeSlot = slot ? escapeXml(slot) : ''

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${safeTitle}">
  <rect width="${width}" height="${height}" fill="#eeece7"/>
  <rect width="${width}" height="${height}" fill="#edfce9" opacity="0.4"/>
  <rect x="32" y="32" width="${width - 64}" height="${height - 64}" fill="none" stroke="#d9d9dd" stroke-width="2" rx="8"/>
  <text x="48" y="72" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12" fill="#75758a" letter-spacing="1">${safeLabel}</text>
  <text x="48" y="108" font-family="ui-sans-serif, system-ui, sans-serif" font-size="24" fill="#17171c">${safeTitle}</text>
  ${safeSlot ? `<text x="48" y="142" font-family="ui-monospace, monospace" font-size="12" fill="#ff7759">${safeSlot}</text>` : ''}
  <text x="48" y="${height - 48}" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" fill="#93939f">Substitua por .webp ou .jpg com o mesmo nome</text>
</svg>
`
}

for (const project of projects) {
  const dir = path.join(root, project.slug)
  await mkdir(dir, { recursive: true })

  const coverSvg = placeholderSvg({
    label: 'CAPA',
    title: project.title,
    slot: 'cover.webp',
    width: 800,
    height: 500,
  })
  await writeFile(path.join(dir, 'cover.svg'), coverSvg, 'utf8')

  for (let index = 1; index <= project.images; index += 1) {
    const fileName = String(index).padStart(2, '0')
    const [width, height] = project.slide
    const slideSvg = placeholderSvg({
      label: 'IMAGEM',
      title: project.title,
      slot: `${fileName}.webp`,
      width,
      height,
    })
    await writeFile(path.join(dir, `${fileName}.svg`), slideSvg, 'utf8')
  }
}

console.log(`Placeholders criados em ${root}`)
