import { useCallback, useEffect, useRef, useState } from 'react'
import { getWorkCoverFallback, getWorkCoverImage, workCategoryLabels } from '../data/works'
import type { WorkItem } from '../types/work'

type WorkCarouselProps = {
  works: WorkItem[]
  onOpen: (slug: string) => void
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

function WorkCarouselSlide({
  work,
  onOpen,
}: {
  work: WorkItem
  onOpen: (slug: string) => void
}) {
  const coverSrc = getWorkCoverImage(work)

  return (
    <article className="flex h-full snap-start snap-always flex-col overflow-hidden rounded-sm bg-soft-stone">
      <button
        type="button"
        onClick={() => onOpen(work.slug)}
        className="flex h-full cursor-pointer flex-col border-0 bg-transparent p-0 text-left"
        aria-label={`Ver projeto ${work.title}`}
      >
        <div className="relative aspect-[4/5] shrink-0 overflow-hidden">
          <img
            src={coverSrc}
            alt={`Capa do projeto ${work.title}`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
            onError={(event) => {
              const img = event.currentTarget
              const fallback = getWorkCoverFallback(work, img.src)
              if (fallback) {
                img.src = fallback
              }
            }}
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="inline-block rounded-sm border border-coral px-2 py-1 font-mono text-xs uppercase tracking-[0.28px] text-coral">
              {workCategoryLabels[work.category]}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.28px] text-muted">{work.year}</span>
          </div>
          <h3 className="mb-2 mt-0 text-lg leading-snug text-ink">{work.title}</h3>
          <p className="m-0 line-clamp-2 text-sm text-body-muted">{work.shortDescription}</p>
          <p className="mt-auto pt-4 text-sm font-medium text-action-blue">Ver projeto →</p>
        </div>
      </button>
    </article>
  )
}

export function WorkCarousel({ works, onOpen, variant = 'light' }: WorkCarouselProps) {
  const isDark = variant === 'dark'
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

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
    slide?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
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

  return (
    <div className="relative mt-10">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Carrossel de trabalhos"
      >
        {works.map((work) => (
          <div
            key={work.id}
            className="group w-[min(78vw,300px)] shrink-0 snap-start sm:w-[min(42vw,320px)] lg:w-[min(32vw,340px)]"
          >
            <WorkCarouselSlide work={work} onOpen={onOpen} />
          </div>
        ))}
      </div>

      {works.length > 1 && (
        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              disabled={activeIndex === 0}
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${navButtonClass}`}
              aria-label="Trabalho anterior"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex === works.length - 1}
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${navButtonClass}`}
              aria-label="Próximo trabalho"
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
