import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionStyle,
} from 'framer-motion'
import type { MouseEvent } from 'react'
import { getProjectCoverImage } from '../data/projects'
import type { Project } from '../types/project'

const ease = [0.22, 1, 0.36, 1] as const

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const reduceMotion = useReducedMotion()
  const coverSrc = getProjectCoverImage(project)
  const publishedYear = new Date(project.publishedDate).getFullYear()

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springConfig = { stiffness: 260, damping: 22, mass: 0.6 }

  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [5, -5]), springConfig)
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-5, 5]), springConfig)

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
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        className="block no-underline"
        aria-label={`Ver ${project.title} no Behance`}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <motion.img
            src={coverSrc}
            alt={`Capa do projeto ${project.title}`}
            className="h-full w-full object-cover"
            loading="lazy"
            whileHover={reduceMotion ? undefined : { scale: 1.05 }}
            transition={{ duration: 0.45, ease }}
            onError={(event) => {
              const img = event.currentTarget
              const fallback = `https://picsum.photos/seed/${encodeURIComponent(project.id)}/800/600`
              if (img.src !== fallback) {
                img.src = fallback
              }
            }}
          />
        </div>
      </a>
      <div className="p-6 md:p-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-block rounded-sm border border-coral px-2.5 py-1.5 font-mono text-xs uppercase tracking-[0.28px] text-coral">
            {project.category}
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.28px] text-muted">{publishedYear}</span>
        </div>
        <h3 className="mb-2 mt-0 text-xl text-ink">{project.title}</h3>
        <p className="m-0 text-body-muted">{project.shortDescription}</p>
        {project.tools.length > 0 && (
          <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
            {project.tools.map((tool) => (
              <motion.li
                key={tool}
                className="rounded-sm bg-white/70 px-2 py-1 font-mono text-xs uppercase tracking-[0.28px] text-slate"
                whileHover={reduceMotion ? undefined : { y: -2, backgroundColor: 'rgba(255,255,255,0.95)' }}
                transition={{ duration: 0.2, ease }}
              >
                {tool}
              </motion.li>
            ))}
          </ul>
        )}
        <p className="mt-5 mb-0">
          <motion.a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-action-blue no-underline"
            whileHover={reduceMotion ? undefined : { x: 4 }}
            transition={{ duration: 0.25, ease }}
          >
            <span className="hover:underline hover:underline-offset-4">Ver no Behance</span>
            <motion.span
              aria-hidden
              initial={false}
              animate={reduceMotion ? undefined : { x: 0 }}
              whileHover={reduceMotion ? undefined : { x: 3 }}
              transition={{ duration: 0.25, ease }}
            >
              →
            </motion.span>
          </motion.a>
        </p>
      </div>
    </motion.article>
  )
}
