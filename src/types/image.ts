export type ImageRatio = 'portrait' | 'square' | 'landscape'

export type PortfolioImage = {
  id: string
  src: string
  alt: string
  ratio?: ImageRatio
  /** Miniatura usada no carrossel quando `src` é um PDF */
  poster?: string
}

export type ImagesData = {
  images: PortfolioImage[]
}
