import rawData from './works.json'
import type { WorkCategory, WorkItem, WorksData } from '../types/work'

const data = rawData as WorksData

export const works: WorkItem[] = data.works

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

  return `/works/${work.slug}/cover.svg`
}

export function getWorkCoverFallback(work: WorkItem, failedSrc: string): string | null {
  return work.images.find((src) => !failedSrc.endsWith(src)) ?? null
}

export function getWorkBySlug(slug: string): WorkItem | undefined {
  return works.find((work) => work.slug === slug)
}
