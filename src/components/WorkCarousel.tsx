import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import { getWorkCoverFallback, getWorkCoverImage } from '../data/works'
import type { PortfolioCarouselMode } from '../data/works'
import type { WorkItem } from '../types/work'
import { openPdfInNewTab } from '../utils/media'

type WorkCarouselProps = {
  works: WorkItem[]
  mode: PortfolioCarouselMode
  onOpen?: (id: string) => void
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

function MagnifyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="2" />
      <path d="M13 13l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M11 3h6v6M17 3l-8 8M9 7H5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PostCarouselSlide({
  work,
  onOpen,
}: {
  work: WorkItem
  onOpen: (id: string) => void
}) {
  const coverSrc = getWorkCoverImage(work)
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null)

  function handleMouseMove(event: MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    setCursor({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(work.id)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setCursor(null)}
      className="group relative block h-full w-full cursor-pointer overflow-hidden rounded-[18px] border-0 bg-black/10 p-0 shadow-lg transition-shadow duration-300 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70 [@media(pointer:fine)]:cursor-none"
      aria-label={`Ampliar: ${work.title}`}
    >
      <div className="relative aspect-[9/16] w-full overflow-hidden">
        <img
          src={coverSrc}
          alt={work.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
          onError={(event) => {
            const img = event.currentTarget
            const fallback = getWorkCoverFallback(work, img.src)
            if (fallback) {
              img.src = fallback
            }
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden
        />
        {cursor && (
          <span
            className="pointer-events-none absolute z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#3a4849] text-white shadow-md [@media(pointer:coarse)]:hidden"
            style={{ left: cursor.x, top: cursor.y }}
            aria-hidden
          >
            <MagnifyIcon />
          </span>
        )}
        <span className="pointer-events-none absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#3a4849] text-white opacity-0 shadow-sm transition-all duration-300 group-focus-visible:opacity-100">
          <MagnifyIcon />
        </span>
      </div>
    </button>
  )
}

function PdfCarouselSlide({ work }: { work: WorkItem }) {
  const coverSrc = getWorkCoverImage(work)

  function handleOpen() {
    if (work.pdfUrl) {
      openPdfInNewTab(work.pdfUrl)
    }
  }

  return (
    <button
      type="button"
      onClick={handleOpen}
      disabled={!work.pdfUrl}
      className="group relative block h-full w-full cursor-pointer overflow-hidden rounded-[18px] border border-hairline bg-soft-stone p-0 text-left shadow-lg transition-shadow duration-300 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70 disabled:cursor-not-allowed disabled:opacity-60"
      aria-label={`Abrir PDF: ${work.title}`}
    >
      <div className="relative aspect-[9/16] w-full overflow-hidden">
        <img
          src={coverSrc}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          onError={(event) => {
            const img = event.currentTarget
            const fallback = getWorkCoverFallback(work, img.src)
            if (fallback) {
              img.src = fallback
            }
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-primary/80 via-primary/25 to-transparent"
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
          <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.28px] text-white/75 transition-colors group-hover:text-white">
            <ExternalLinkIcon />
            Ver PDF
          </span>
        </div>
      </div>
    </button>
  )
}

export function WorkCarousel({ works, mode, onOpen, variant = 'light' }: WorkCarouselProps) {
  const isDark = variant === 'dark'
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setActiveIndex(0)
    trackRef.current?.scrollTo({ left: 0 })
  }, [works, mode])

  const syncActiveIndex = useCallback(() => {
    const track = trackRef.current
    if (!track || works.length === 0) return

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
  }, [works.length])

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
    scrollToIndex(Math.min(works.length - 1, activeIndex + 1))
  }, [activeIndex, scrollToIndex, works.length])

  if (works.length === 0) return null

  const navButtonClass = isDark
    ? 'border-white/30 bg-white/10 text-white hover:bg-white/20'
    : 'border-hairline bg-white text-ink hover:opacity-88'

  const carouselLabel = mode === 'modal' ? 'Carrossel de posts' : 'Carrossel de PDFs'

  return (
    <div className="relative mt-10">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth py-2 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label={carouselLabel}
      >
        {works.map((work) => (
          <div
            key={work.id}
            className="w-[min(62vw,240px)] shrink-0 snap-center sm:w-[min(36vw,260px)] lg:w-[min(24vw,280px)]"
          >
            {mode === 'modal' && onOpen ? (
              <PostCarouselSlide work={work} onOpen={onOpen} />
            ) : (
              <PdfCarouselSlide work={work} />
            )}
          </div>
        ))}
      </div>

      {works.length > 1 && (
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              disabled={activeIndex === 0}
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${navButtonClass}`}
              aria-label="Item anterior"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex === works.length - 1}
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${navButtonClass}`}
              aria-label="Próximo item"
            >
              <ChevronIcon direction="right" />
            </button>
          </div>
          <p className={`m-0 font-mono text-xs uppercase tracking-[0.28px] ${isDark ? 'text-white/60' : 'text-muted'}`}>
            {activeIndex + 1} / {works.length}
          </p>
        </div>
      )}
    </div>
  )
}
