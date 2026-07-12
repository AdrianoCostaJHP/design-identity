export type WorkCategory = 'identidade-visual' | 'catalogo' | 'social-media' | 'landing-page'

export type WorkLayout = 'carousel' | 'grid' | 'stack'

export type WorkItem = {
  id: string
  slug: string
  title: string
  client: string
  category: WorkCategory
  layout: WorkLayout
  coverImage: string
  images: string[]
  description: string
  shortDescription: string
  tags: string[]
  year: number
  featured?: boolean
  /** Quando definido, o card abre o PDF em nova aba do navegador */
  pdfUrl?: string
}

export type WorksData = {
  works: WorkItem[]
}
