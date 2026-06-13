import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getPortfolioImageById, portfolioImages } from '../data/images'
import { isPdfSrc } from '../utils/media'
import { ImageCarousel } from './ImageCarousel'
import { ImageLightbox } from './ImageLightbox'

const lightboxImages = portfolioImages.filter((image) => !isPdfSrc(image.src))

type GalleryHistoryState = {
  gallery?: boolean
}

function buildUrl(imageId: string | null): string {
  const params = new URLSearchParams(window.location.search)
  if (imageId) {
    params.set('imagem', imageId)
  } else {
    params.delete('imagem')
  }
  const query = params.toString()
  return query
    ? `${window.location.pathname}?${query}${window.location.hash}`
    : `${window.location.pathname}${window.location.hash}`
}

function syncUrl(imageId: string | null, mode: 'push' | 'replace') {
  const nextUrl = buildUrl(imageId)
  const state: GalleryHistoryState = imageId ? { gallery: true } : {}
  if (mode === 'push') {
    window.history.pushState(state, '', nextUrl)
  } else {
    window.history.replaceState(state, '', nextUrl)
  }
}

function readImageIdFromUrl(): string | null {
  const imageId = new URLSearchParams(window.location.search).get('imagem')
  if (!imageId) return null

  const image = getPortfolioImageById(imageId)
  if (!image || isPdfSrc(image.src)) return null

  return imageId
}

type WorkGalleryProps = {
  label: string
  title: string
  lead: string
  variant?: 'light' | 'dark'
}

export function WorkGallery({ label, title, lead, variant = 'light' }: WorkGalleryProps) {
  const isDark = variant === 'dark'
  const historyPushedRef = useRef(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectedImage = useMemo(() => {
    if (!selectedId) return null
    return getPortfolioImageById(selectedId) ?? null
  }, [selectedId])

  const openImage = useCallback((id: string) => {
    const image = getPortfolioImageById(id)
    if (!image || isPdfSrc(image.src)) return

    setSelectedId(id)
    const current = new URLSearchParams(window.location.search).get('imagem')
    if (!current) {
      syncUrl(id, 'push')
      historyPushedRef.current = true
    } else {
      syncUrl(id, 'replace')
    }
  }, [])

  const closeImage = useCallback(() => {
    if (historyPushedRef.current) {
      historyPushedRef.current = false
      window.history.back()
      return
    }

    setSelectedId(null)
    if (new URLSearchParams(window.location.search).has('imagem')) {
      syncUrl(null, 'replace')
    }
  }, [])

  const navigateImage = useCallback((id: string) => {
    setSelectedId(id)
    syncUrl(id, 'replace')
  }, [])

  useEffect(() => {
    setSelectedId(readImageIdFromUrl())

    function handlePopState() {
      const imageId = readImageIdFromUrl()
      setSelectedId(imageId)
      if (!imageId) {
        historyPushedRef.current = false
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return (
    <>
      <p
        className={`font-mono text-sm uppercase tracking-[0.28px] ${isDark ? 'text-white/65' : 'text-slate'}`}
      >
        {label}
      </p>
      <h2
        id="work-gallery-title"
        className={`mb-4 max-w-[18ch] font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-tight tracking-[-0.02em] ${
          isDark ? 'text-on-dark' : 'text-primary'
        }`}
      >
        {title}
      </h2>
      <p className={`m-0 max-w-[52ch] text-lg leading-snug ${isDark ? 'text-white/80' : 'text-body-muted'}`}>
        {lead}
      </p>

      <ImageCarousel images={portfolioImages} onOpen={openImage} variant={variant} />

      <ImageLightbox
        image={selectedImage}
        images={lightboxImages}
        onClose={closeImage}
        onNavigate={navigateImage}
      />
    </>
  )
}
