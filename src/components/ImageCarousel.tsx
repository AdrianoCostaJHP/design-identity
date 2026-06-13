import { useCallback, useEffect, useRef, useState } from 'react'
import type { ImageRatio, PortfolioImage } from '../types/image'
import { isPdfSrc } from '../utils/media'
import { CatalogCard } from './CatalogCard'

const ratioClass: Record<ImageRatio, string> = {
  portrait: 'aspect-[9/16]',
  square: 'aspect-square',
  landscape: 'aspect-[4/3]',
}

type ImageCarouselProps = {
  images: PortfolioImage[]
  onOpen: (id: string) => void
  variant?: 'light' | 'dark'
}

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d={direction === 'left' ? 'M13 4L7 10l6 6' : 'M7 4l6 6-6 6'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ExpandIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4 12v4h4M16 8V4h-4M16 16h-4v-4M4 4h4v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ImageCarouselSlide({
  image,
  onOpen,
}: {
  image: PortfolioImage
  onOpen: (id: string) => void
}) {
  const aspect = ratioClass[image.ratio ?? 'portrait']

  return (
    <button
      type="button"
      onClick={() => onOpen(image.id)}
      className="group relative block h-full w-full cursor-pointer overflow-hidden rounded-[18px] border-0 bg-black/10 p-0 shadow-lg transition-shadow duration-300 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
      aria-label={`Ampliar: ${image.alt}`}
    >
      <div className={`relative ${aspect} w-full overflow-hidden`}>
        <img
          src={image.src}
          alt={image.alt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden
        />
        <span className="pointer-events-none absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <ExpandIcon />
        </span>
      </div>
    </button>
  )
}

export function ImageCarousel({ images, onOpen, variant = 'light' }: ImageCarouselProps) {
  const isDark = variant === 'dark'
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const syncActiveIndex = useCallback(() => {
    const track = trackRef.current
    if (!track || images.length === 0) return

    const slides = Array.from(track.children) as HTMLElement[]
    if (slides.length === 0) return

    const trackRect = track.getBoundingClientRect()
    const trackCenter = trackRect.left + trackRect.width / 2

    let closestIndex = 0
    let closestDistance = Number.POSITIVE_INFINITY

    slides.forEach((slide, index) => {
      const slideRect = slide.getBoundingClientRect()
      const slideCenter = slideRect.left + slideRect.width / 2
      const distance = Math.abs(slideCenter - trackCenter)
      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })

    setActiveIndex(closestIndex)
  }, [images.length])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    syncActiveIndex()
    track.addEventListener('scroll', syncActiveIndex, { passive: true })
    window.addEventListener('resize', syncActiveIndex)

    return () => {
      track.removeEventListener('scroll', syncActiveIndex)
      window.removeEventListener('resize', syncActiveIndex)
    }
  }, [syncActiveIndex])

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current
    if (!track) return

    const slide = track.children[index] as HTMLElement | undefined
    slide?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [])

  const goPrev = useCallback(() => {
    scrollToIndex(Math.max(0, activeIndex - 1))
  }, [activeIndex, scrollToIndex])

  const goNext = useCallback(() => {
    scrollToIndex(Math.min(images.length - 1, activeIndex + 1))
  }, [activeIndex, images.length, scrollToIndex])

  if (images.length === 0) return null

  const navButtonClass = isDark
    ? 'border-white/30 bg-white/10 text-white hover:bg-white/20'
    : 'border-hairline bg-white text-ink hover:opacity-88'

  return (
    <div className="relative mt-10">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth py-2 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Carrossel de produção visual"
      >
        {images.map((image) => (
          <div
            key={image.id}
            className="w-[min(62vw,240px)] shrink-0 snap-center sm:w-[min(36vw,260px)] lg:w-[min(24vw,280px)]"
          >
            {isPdfSrc(image.src) ? (
              <CatalogCard image={image} />
            ) : (
              <ImageCarouselSlide image={image} onOpen={onOpen} />
            )}
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              disabled={activeIndex === 0}
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${navButtonClass}`}
              aria-label="Imagem anterior"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex === images.length - 1}
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${navButtonClass}`}
              aria-label="Próxima imagem"
            >
              <ChevronIcon direction="right" />
            </button>
          </div>
          <p className={`m-0 font-mono text-xs uppercase tracking-[0.28px] ${isDark ? 'text-white/60' : 'text-muted'}`}>
            {activeIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  )
}
