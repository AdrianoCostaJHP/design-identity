import type { PortfolioImage } from '../types/image'

export const portfolioImages: PortfolioImage[] = [
  {
    id: 'b25838fa-7045-4beb-994b-b85193649f4b',
    src: '/images/b25838fa-7045-4beb-994b-b85193649f4b.jpeg',
    alt: 'Storys',
    ratio: 'portrait',
  },
  {
    id: '47a3db95-06e0-4432-a379-07ac0254b699',
    src: '/images/47a3db95-06e0-4432-a379-07ac0254b699.png',
    alt: 'Storys',
    ratio: 'portrait',
  },
  {
    id: '65125d2b-2a56-4825-b64f-f05670ad5a3f',
    src: '/images/65125d2b-2a56-4825-b64f-f05670ad5a3f.png',
    alt: 'Storys',
    ratio: 'portrait',
  },
  {
    id: '126976cb-eaef-4196-8cd4-97fdabbbbc5e',
    src: '/images/126976cb-eaef-4196-8cd4-97fdabbbbc5e.png',
    alt: 'Storys',
    ratio: 'portrait',
  },
  {
    id: 'e5b28d4a-7e1c-4a7d-8849-27dd2368702b',
    src: '/images/e5b28d4a-7e1c-4a7d-8849-27dd2368702b.jpeg',
    alt: 'Storys',
    ratio: 'portrait',
  },
  {
    id: '8f619929-e893-43d1-ad9b-c812d7247948',
    src: '/images/8f619929-e893-43d1-ad9b-c812d7247948.png',
    alt: 'Storys',
    ratio: 'portrait',
  },
]

export function getPortfolioImageById(id: string): PortfolioImage | undefined {
  return portfolioImages.find((image) => image.id === id)
}
