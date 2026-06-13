import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'
import type { PortfolioImage } from '../types/image'

const ease = [0.22, 1, 0.36, 1] as const

type ImageLightboxProps = {
  image: PortfolioImage | null
  images: PortfolioImage[]
  onClose: () => void
  onNavigate: (id: string) => void
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
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden>
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

export function ImageLightbox({ image, images, onClose, onNavigate }: ImageLightboxProps) {
  const reduceMotion = useReducedMotion()
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const currentIndex = image ? images.findIndex((item) => item.id === image.id) : -1
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex >= 0 && currentIndex < images.length - 1

  const goPrev = useCallback(() => {
    if (hasPrev) {
      onNavigate(images[currentIndex - 1].id)
    }
  }, [currentIndex, hasPrev, images, onNavigate])

  const goNext = useCallback(() => {
    if (hasNext) {
      onNavigate(images[currentIndex + 1].id)
    }
  }, [currentIndex, hasNext, images, onNavigate])

  useEffect(() => {
    if (!image) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [image])

  useEffect(() => {
    if (!image) return

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
  }, [image, onClose, goPrev, goNext])

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          role="presentation"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2, ease }}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-pointer border-0 bg-primary/90"
            aria-label="Fechar visualização"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={image.alt}
            className="relative z-10 flex max-h-[92dvh] w-full max-w-5xl flex-col items-center"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="absolute -top-2 right-0 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:-top-12"
              aria-label="Fechar"
            >
              <CloseIcon />
            </button>

            <figure className="m-0 flex w-full flex-col items-center">
              <div className="relative w-full overflow-hidden rounded-[18px] bg-black/20 shadow-2xl">
                <motion.img
                  key={image.id}
                  src={image.src}
                  alt={image.alt}
                  className="mx-auto max-h-[min(82dvh,900px)] w-full object-contain"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, ease }}
                />

                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={goPrev}
                      disabled={!hasPrev}
                      className="absolute top-1/2 left-3 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/50 disabled:cursor-not-allowed disabled:opacity-30"
                      aria-label="Imagem anterior"
                    >
                      <ChevronIcon direction="left" />
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={!hasNext}
                      className="absolute top-1/2 right-3 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/50 disabled:cursor-not-allowed disabled:opacity-30"
                      aria-label="Próxima imagem"
                    >
                      <ChevronIcon direction="right" />
                    </button>
                  </>
                )}
              </div>

              {images.length > 1 && (
                <figcaption className="mt-4 font-mono text-xs uppercase tracking-[0.28px] text-white/60">
                  {currentIndex + 1} / {images.length}
                </figcaption>
              )}
            </figure>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
