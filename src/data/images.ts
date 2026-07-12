import { getPortfolioPostImages } from './works'
import type { PortfolioImage } from '../types/image'

export const portfolioImages: PortfolioImage[] = getPortfolioPostImages().map((image) => ({
  ...image,
  ratio: 'portrait' as const,
}))

export function getPortfolioImageById(id: string): PortfolioImage | undefined {
  return portfolioImages.find((image) => image.id === id)
}
