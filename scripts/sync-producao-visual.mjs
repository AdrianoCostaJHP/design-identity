import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const visualDir = path.join(root, 'public', 'works', 'producao-visual')
const worksPath = path.join(root, 'src', 'data', 'works.json')

const imagePattern = /\.(webp|jpe?g|png|svg)$/i

const files = (await readdir(visualDir))
  .filter((file) => imagePattern.test(file) && file !== 'cover.svg')
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

if (files.length === 0) {
  console.error('Nenhuma imagem encontrada em public/works/producao-visual/')
  process.exit(1)
}

const images = files.map((file) => `/works/producao-visual/${file}`)
const coverImage = images.includes('/works/producao-visual/cover.webp')
  ? '/works/producao-visual/cover.webp'
  : images.includes('/works/producao-visual/cover.jpg')
    ? '/works/producao-visual/cover.jpg'
    : images.includes('/works/producao-visual/cover.png')
      ? '/works/producao-visual/cover.png'
      : '/works/producao-visual/cover.svg'

const producaoWork = {
  id: 'producao-visual',
  slug: 'producao-visual',
  title: 'Stories — agenda e CTA',
  client: 'Beleza e estética',
  category: 'social-media',
  layout: 'carousel',
  coverImage,
  images,
  description:
    'Sequência de stories com tipografia editorial, destaque de serviço e chamada para agendamento — pensada para conversão no Instagram.',
  shortDescription: 'Stories com CTA de agendamento para negócios de beleza.',
  tags: ['stories', 'beleza', 'cta'],
  year: 2025,
  featured: true,
}

const works = JSON.parse(await readFile(worksPath, 'utf8'))
const withoutProducao = works.works.filter((work) => work.slug !== 'producao-visual')
works.works = [producaoWork, ...withoutProducao]

await writeFile(worksPath, `${JSON.stringify(works, null, 2)}\n`, 'utf8')
console.log(`Produção visual sincronizada: ${images.length} imagem(ns) em ${visualDir}`)
