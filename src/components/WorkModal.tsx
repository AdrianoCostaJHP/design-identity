import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { workCategoryLabels } from '../data/works'
import type { WorkItem } from '../types/work'

const ease = [0.22, 1, 0.36, 1] as const

type WorkModalProps = {
  work: WorkItem | null
  works: WorkItem[]
  onClose: () => void
  onNavigate: (slug: string) => void
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
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

function CarouselGallery({
  images,
  title,
  reduceMotion,
}: {
  images: string[]
  title: string
  reduceMotion: boolean | null
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex(0)
  }, [images])

  const prev = useCallback(() => {
    setIndex((current) => (current === 0 ? images.length - 1 : current - 1))
  }, [images.length])

  const next = useCallback(() => {
    setIndex((current) => (current === images.length - 1 ? 0 : current + 1))
  }, [images.length])

  if (images.length === 0) return null

  return (
    <div>
      <div className="relative overflow-hidden rounded-sm bg-soft-stone">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={`${title} — imagem ${index + 1} de ${images.length}`}
          className="mx-auto max-h-[min(60vh,520px)] w-full object-contain"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, ease }}
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute top-1/2 left-2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-hairline bg-white/95 text-ink transition-opacity hover:opacity-88"
              aria-label="Imagem anterior"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute top-1/2 right-2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-hairline bg-white/95 text-ink transition-opacity hover:opacity-88"
              aria-label="Próxima imagem"
            >
              <ChevronIcon direction="right" />
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <ul className="mt-3 flex list-none gap-2 overflow-x-auto p-0">
          {images.map((src, thumbIndex) => (
            <li key={src} className="shrink-0">
              <button
                type="button"
                onClick={() => setIndex(thumbIndex)}
                className={`cursor-pointer overflow-hidden rounded-sm border-2 p-0 transition-colors ${
                  thumbIndex === index ? 'border-coral' : 'border-transparent'
                }`}
                aria-label={`Ver imagem ${thumbIndex + 1}`}
                aria-current={thumbIndex === index}
              >
                <img src={src} alt="" className="h-14 w-14 object-cover" loading="lazy" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function GridGallery({ images, title }: { images: string[]; title: string }) {
  return (
    <ul className="grid list-none gap-3 p-0 sm:grid-cols-2">
      {images.map((src, imageIndex) => (
        <li key={src} className="overflow-hidden rounded-sm bg-soft-stone">
          <img
            src={src}
            alt={`${title} — ${imageIndex + 1}`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </li>
      ))}
    </ul>
  )
}

function StackGallery({ images, title }: { images: string[]; title: string }) {
  return (
    <ul className="flex list-none flex-col gap-4 p-0">
      {images.map((src, imageIndex) => (
        <li key={src} className="overflow-hidden rounded-sm bg-soft-stone">
          <img
            src={src}
            alt={`${title} — ${imageIndex + 1}`}
            className="w-full object-contain"
            loading="lazy"
          />
        </li>
      ))}
    </ul>
  )
}

export function WorkModal({ work, works, onClose, onNavigate }: WorkModalProps) {
  const reduceMotion = useReducedMotion()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const currentIndex = work ? works.findIndex((item) => item.slug === work.slug) : -1
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex >= 0 && currentIndex < works.length - 1

  const goPrev = useCallback(() => {
    if (hasPrev) {
      onNavigate(works[currentIndex - 1].slug)
    }
  }, [currentIndex, hasPrev, onNavigate, works])

  const goNext = useCallback(() => {
    if (hasNext) {
      onNavigate(works[currentIndex + 1].slug)
    }
  }, [currentIndex, hasNext, onNavigate, works])

  useEffect(() => {
    if (!work) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [work])

  useEffect(() => {
    if (!work) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key === 'ArrowLeft') {
        goPrev()
        return
      }
      if (event.key === 'ArrowRight') {
        goNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [work, onClose, goPrev, goNext])

  return (
    <AnimatePresence>
      {work && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
          role="presentation"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2, ease }}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-pointer border-0 bg-primary/80"
            aria-label="Fechar modal"
            onClick={onClose}
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="work-modal-title"
            className="relative z-10 flex max-h-[100dvh] w-full max-w-4xl flex-col overflow-hidden rounded-none bg-canvas sm:max-h-[92dvh] sm:rounded-[22px]"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease }}
            onClick={(event) => event.stopPropagation()}
          >
            <header className="flex shrink-0 items-start justify-between gap-4 border-b border-hairline px-5 py-4 sm:px-8 sm:py-6">
              <div className="min-w-0 pr-2">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="inline-block rounded-sm border border-coral px-2.5 py-1.5 font-mono text-xs uppercase tracking-[0.28px] text-coral">
                    {workCategoryLabels[work.category]}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.28px] text-muted">{work.year}</span>
                </div>
                <p className="m-0 text-sm text-body-muted">{work.client}</p>
                <h2 id="work-modal-title" className="m-0 mt-1 text-xl text-ink sm:text-2xl">
                  {work.title}
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-hairline bg-white text-ink transition-opacity hover:opacity-88"
                aria-label="Fechar"
              >
                <CloseIcon />
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-8 sm:py-6">
              {work.layout === 'grid' && <GridGallery images={work.images} title={work.title} />}
              {work.layout === 'stack' && <StackGallery images={work.images} title={work.title} />}
              {work.layout === 'carousel' && (
                <CarouselGallery images={work.images} title={work.title} reduceMotion={reduceMotion} />
              )}
              <p className="mt-6 mb-0 text-body-muted">{work.description}</p>
              {work.tags.length > 0 && (
                <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
                  {work.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-sm bg-soft-stone px-2 py-1 font-mono text-xs uppercase tracking-[0.28px] text-slate"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {works.length > 1 && (
              <footer className="flex shrink-0 items-center justify-between gap-4 border-t border-hairline px-5 py-4 sm:px-8">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={!hasPrev}
                  className="inline-flex cursor-pointer items-center gap-2 border-0 bg-transparent px-0 py-2 text-sm font-medium text-ink disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronIcon direction="left" />
                  Anterior
                </button>
                <span className="font-mono text-xs text-muted">
                  {currentIndex + 1} / {works.length}
                </span>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!hasNext}
                  className="inline-flex cursor-pointer items-center gap-2 border-0 bg-transparent px-0 py-2 text-sm font-medium text-ink disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Próximo
                  <ChevronIcon direction="right" />
                </button>
              </footer>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
