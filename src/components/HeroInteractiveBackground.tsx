import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useCallback, type ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const
const spring = { stiffness: 120, damping: 24, mass: 0.8 }

type ParallaxShapeProps = {
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
  factor: number
  reduceMotion: boolean | null
  className?: string
  children: ReactNode
}

function ParallaxShape({
  pointerX,
  pointerY,
  factor,
  reduceMotion,
  className,
  children,
}: ParallaxShapeProps) {
  const x = useSpring(useTransform(pointerX, [-0.5, 0.5], [-40 * factor, 40 * factor]), spring)
  const y = useSpring(useTransform(pointerY, [-0.5, 0.5], [-30 * factor, 30 * factor]), spring)

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div className={className} style={{ x, y }}>
      {children}
    </motion.div>
  )
}

type HeroBackgroundProps = {
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
}

function HeroBackground({ pointerX, pointerY }: HeroBackgroundProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-linear-to-b from-pale-green/40 via-canvas to-canvas" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" stroke="#d9d9dd" strokeWidth="0.6" opacity="0.45" />
          </pattern>
        </defs>
        <rect width="1440" height="900" fill="url(#hero-grid)" opacity="0.35" />
      </svg>

      <ParallaxShape
        pointerX={pointerX}
        pointerY={pointerY}
        factor={1.4}
        reduceMotion={reduceMotion}
        className="absolute -right-16 -top-20 h-[420px] w-[420px] md:right-[-4%] md:top-[-8%]"
      >
        <motion.svg
          viewBox="0 0 420 420"
          className="h-full w-full"
          animate={reduceMotion ? undefined : { rotate: [0, 6, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        >
          <circle cx="210" cy="210" r="180" stroke="#003c33" strokeWidth="1.2" opacity="0.14" />
          <circle cx="210" cy="210" r="120" stroke="#003c33" strokeWidth="0.8" opacity="0.1" />
        </motion.svg>
      </ParallaxShape>

      <ParallaxShape
        pointerX={pointerX}
        pointerY={pointerY}
        factor={0.9}
        reduceMotion={reduceMotion}
        className="absolute left-[-6%] top-[18%] h-48 w-48 md:left-[2%]"
      >
        <motion.div
          className="h-full w-full rounded-sm border border-deep-green/20 bg-pale-green/50"
          animate={reduceMotion ? undefined : { rotate: [12, 18, 12], y: [0, -12, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      </ParallaxShape>

      <ParallaxShape
        pointerX={pointerX}
        pointerY={pointerY}
        factor={1.1}
        reduceMotion={reduceMotion}
        className="absolute right-[12%] top-[42%] h-28 w-28 max-md:hidden"
      >
        <motion.svg
          viewBox="0 0 112 112"
          className="h-full w-full"
          animate={reduceMotion ? undefined : { rotate: [0, -8, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect
            x="16"
            y="16"
            width="80"
            height="80"
            rx="8"
            stroke="#ff7759"
            strokeWidth="1.2"
            opacity="0.35"
          />
          <line x1="56" y1="28" x2="56" y2="84" stroke="#ff7759" strokeWidth="0.8" opacity="0.25" />
          <line x1="28" y1="56" x2="84" y2="56" stroke="#ff7759" strokeWidth="0.8" opacity="0.25" />
        </motion.svg>
      </ParallaxShape>

      <ParallaxShape
        pointerX={pointerX}
        pointerY={pointerY}
        factor={0.6}
        reduceMotion={reduceMotion}
        className="absolute bottom-[22%] left-[8%] h-64 w-64 max-md:hidden"
      >
        <motion.svg
          viewBox="0 0 256 256"
          className="h-full w-full"
          animate={reduceMotion ? undefined : { y: [0, 16, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M32 200 A120 120 0 0 1 224 200"
            stroke="#17171c"
            strokeWidth="1"
            opacity="0.08"
          />
          <line x1="48" y1="200" x2="208" y2="200" stroke="#d9d9dd" strokeWidth="0.8" />
          <line x1="128" y1="80" x2="128" y2="200" stroke="#d9d9dd" strokeWidth="0.8" opacity="0.6" />
        </motion.svg>
      </ParallaxShape>

      <ParallaxShape
        pointerX={pointerX}
        pointerY={pointerY}
        factor={1.6}
        reduceMotion={reduceMotion}
        className="absolute bottom-[8%] right-[6%] h-36 w-36"
      >
        <motion.div
          className="h-full w-full rounded-full border border-coral/30 bg-coral/8"
          animate={reduceMotion ? undefined : { scale: [1, 1.06, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </ParallaxShape>

      <ParallaxShape
        pointerX={pointerX}
        pointerY={pointerY}
        factor={0.75}
        reduceMotion={reduceMotion}
        className="absolute left-[38%] top-[8%] max-md:hidden"
      >
        <motion.svg
          width="120"
          height="24"
          viewBox="0 0 120 24"
          animate={reduceMotion ? undefined : { x: [0, 10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        >
          {[0, 24, 48, 72, 96].map((x) => (
            <line
              key={x}
              x1={x}
              y1="12"
              x2={x + 16}
              y2="12"
              stroke="#75758a"
              strokeWidth="1"
              opacity="0.35"
              strokeLinecap="round"
            />
          ))}
        </motion.svg>
      </ParallaxShape>

      <motion.div
        className="absolute inset-x-0 bottom-0 h-px bg-hairline/80"
        initial={reduceMotion ? undefined : { scaleX: 0, opacity: 0 }}
        animate={reduceMotion ? undefined : { scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease, delay: 0.2 }}
        style={{ transformOrigin: 'left' }}
      />
    </div>
  )
}

type HeroSectionProps = {
  children: ReactNode
  className?: string
  id?: string
  'aria-labelledby'?: string
}

export function HeroSection({ children, className, ...props }: HeroSectionProps) {
  const reduceMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)

  const handlePointerMove = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (reduceMotion) return
      const rect = event.currentTarget.getBoundingClientRect()
      pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
      pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
    },
    [pointerX, pointerY, reduceMotion],
  )

  const resetPointer = useCallback(() => {
    pointerX.set(0)
    pointerY.set(0)
  }, [pointerX, pointerY])

  return (
    <section
      className={`relative overflow-hidden ${className ?? ''}`}
      onMouseMove={handlePointerMove}
      onMouseLeave={resetPointer}
      {...props}
    >
      <HeroBackground pointerX={pointerX} pointerY={pointerY} />
      <div className="relative z-10">{children}</div>
    </section>
  )
}
