import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionStyle,
} from 'framer-motion'
import type { MouseEvent } from 'react'
import { getWorkCoverFallback, getWorkCoverImage, workCategoryLabels } from '../data/works'
import type { WorkItem } from '../types/work'

const ease = [0.22, 1, 0.36, 1] as const

type WorkCardProps = {
  work: WorkItem
  onOpen: (slug: string) => void
}

export function WorkCard({ work, onOpen }: WorkCardProps) {
  const reduceMotion = useReducedMotion()
  const coverSrc = getWorkCoverImage(work)

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springConfig = { stiffness: 260, damping: 22, mass: 0.6 }

  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [4, -4]), springConfig)
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-4, 4]), springConfig)

  const tiltStyle: MotionStyle = reduceMotion
    ? {}
    : {
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: 'preserve-3d',
      }

  function handlePointerMove(event: MouseEvent<HTMLElement>) {
    if (reduceMotion) return

    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  function resetPointer() {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <motion.article
      className="group overflow-hidden rounded-sm bg-soft-stone"
      style={tiltStyle}
      onMouseMove={handlePointerMove}
      onMouseLeave={resetPointer}
      whileHover={reduceMotion ? undefined : { y: -6, transition: { duration: 0.35, ease } }}
      whileTap={reduceMotion ? undefined : { scale: 0.985, y: -2, transition: { duration: 0.15 } }}
    >
      <button
        type="button"
        onClick={() => onOpen(work.slug)}
        className="block w-full cursor-pointer border-0 bg-transparent p-0 text-left"
        aria-label={`Ver projeto ${work.title}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <motion.img
            src={coverSrc}
            alt={`Capa do projeto ${work.title}`}
            className="h-full w-full object-cover"
            loading="lazy"
            whileHover={reduceMotion ? undefined : { scale: 1.05 }}
            transition={{ duration: 0.45, ease }}
            onError={(event) => {
              const img = event.currentTarget
              const fallback = getWorkCoverFallback(work, img.src)
              if (fallback) {
                img.src = fallback
              }
            }}
          />
        </div>
        <div className="p-6 md:p-8">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-block rounded-sm border border-coral px-2.5 py-1.5 font-mono text-xs uppercase tracking-[0.28px] text-coral">
              {workCategoryLabels[work.category]}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.28px] text-muted">{work.year}</span>
          </div>
          <p className="mb-1 mt-0 text-sm text-body-muted">{work.client}</p>
          <h3 className="mb-2 mt-0 text-xl text-ink">{work.title}</h3>
          <p className="m-0 text-body-muted">{work.shortDescription}</p>
          {work.tags.length > 0 && (
            <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
              {work.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-sm bg-white/70 px-2 py-1 font-mono text-xs uppercase tracking-[0.28px] text-slate"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <p className="mt-5 mb-0 text-sm font-medium text-action-blue">Ver projeto →</p>
        </div>
      </button>
    </motion.article>
  )
}
