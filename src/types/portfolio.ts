export type PortfolioEntryType = 'post' | 'catalogo' | 'identidade-visual'

export type PortfolioEntryLayout = 'carousel' | 'grid' | 'stack'

export type PortfolioEntry = {
  id: string
  slug: string
  type: PortfolioEntryType
  title: string
  client?: string
  description?: string
  shortDescription?: string
  tags?: string[]
  year?: number
  featured?: boolean
  layout?: PortfolioEntryLayout
  /** Nomes dos arquivos em public/images/ (.png, .jpeg, .webp) */
  files?: string[]
  /** Capa do card — padrão: primeiro item de `files` */
  cover?: string
  /** Arquivo PDF em public/images/ (catálogo ou identidade visual) */
  pdf?: string
}

export type PortfolioData = {
  basePath: string
  entries: PortfolioEntry[]
}
