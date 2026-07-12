import rawPortfolio from './portfolio.json'
import type { PortfolioImage } from '../types/image'
import type { PortfolioData, PortfolioEntry, PortfolioEntryType } from '../types/portfolio'
import type { WorkCategory, WorkItem, WorkLayout } from '../types/work'

const portfolio = rawPortfolio as PortfolioData
const IMAGE_PATTERN = /\.(png|jpe?g|webp)$/i

function assetPath(filename: string): string {
  return `${portfolio.basePath}/${filename}`
}

function entryTypeToCategory(type: PortfolioEntryType): WorkCategory {
  switch (type) {
    case 'post':
      return 'social-media'
    case 'catalogo':
      return 'catalogo'
    case 'identidade-visual':
      return 'identidade-visual'
  }
}

function resolveLayout(entry: PortfolioEntry): WorkLayout {
  if (entry.layout) return entry.layout
  return entry.type === 'post' ? 'carousel' : 'grid'
}

function entryToWorkItem(entry: PortfolioEntry): WorkItem {
  const imageFiles = entry.files ?? []
  const images = imageFiles.map(assetPath)

  const coverFile = entry.cover ?? imageFiles[0]
  const coverImage = coverFile ? assetPath(coverFile) : images[0] ?? ''

  return {
    id: entry.id,
    slug: entry.slug,
    title: entry.title,
    client: entry.client ?? '',
    category: entryTypeToCategory(entry.type),
    layout: resolveLayout(entry),
    coverImage,
    images: images.length > 0 ? images : coverImage ? [coverImage] : [],
    description: entry.description ?? '',
    shortDescription: entry.shortDescription ?? entry.title,
    tags: entry.tags ?? [],
    year: entry.year ?? new Date().getFullYear(),
    featured: entry.featured,
    pdfUrl: entry.pdf ? assetPath(entry.pdf) : undefined,
  }
}

export const works: WorkItem[] = portfolio.entries.map(entryToWorkItem)

export const workCategoryLabels: Record<WorkCategory, string> = {
  'identidade-visual': 'Identidade visual',
  catalogo: 'Catálogo',
  'social-media': 'Social media',
  'landing-page': 'Landing page',
}

export const workCategoryOrder: WorkCategory[] = [
  'identidade-visual',
  'catalogo',
  'social-media',
  'landing-page',
]

export function getWorkCoverImage(work: WorkItem): string {
  if (work.coverImage) {
    return work.coverImage
  }

  if (work.images.length > 0) {
    return work.images[0]
  }

  return `${portfolio.basePath}/${work.slug}/cover.webp`
}

export function getWorkCoverFallback(work: WorkItem, failedSrc: string): string | null {
  return work.images.find((src) => !failedSrc.endsWith(src)) ?? null
}

export type PortfolioTabId = 'posts' | 'identidades' | 'catalogos'

export const portfolioTabs: { id: PortfolioTabId; label: string; categories: WorkCategory[] }[] = [
  { id: 'posts', label: 'Posts', categories: ['social-media'] },
  { id: 'identidades', label: 'Identidades Visuais', categories: ['identidade-visual'] },
  { id: 'catalogos', label: 'Catálogos', categories: ['catalogo'] },
]

export function getWorksForTab(tabId: PortfolioTabId): WorkItem[] {
  const tab = portfolioTabs.find((item) => item.id === tabId)
  if (!tab) return []
  return works.filter((work) => tab.categories.includes(work.category))
}

export function getWorkBySlug(slug: string): WorkItem | undefined {
  return works.find((work) => work.slug === slug)
}

export function isPdfWork(work: WorkItem): boolean {
  return Boolean(work.pdfUrl)
}

export type PortfolioCarouselMode = 'modal' | 'pdf'

export function getCarouselModeForTab(tabId: PortfolioTabId): PortfolioCarouselMode {
  return tabId === 'catalogos' ? 'pdf' : 'modal'
}

export function getPortfolioImagesForTab(tabId: PortfolioTabId): PortfolioImage[] {
  return getWorksForTab(tabId).map((work) => ({
    id: work.id,
    src: getWorkCoverImage(work),
    alt: work.title,
  }))
}

/** Imagens individuais dos posts — usadas na galeria com lightbox */
export function getPortfolioPostImages(): { id: string; src: string; alt: string }[] {
  return portfolio.entries
    .filter((entry) => entry.type === 'post')
    .flatMap((entry) =>
      (entry.files ?? []).filter((file) => IMAGE_PATTERN.test(file)).map((file) => ({
        id: file.replace(/\.[^.]+$/, ''),
        src: assetPath(file),
        alt: entry.title,
      })),
    )
}

export { portfolio as portfolioData }
