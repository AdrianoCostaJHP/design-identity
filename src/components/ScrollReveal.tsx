import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from 'framer-motion'
import type { ElementType, ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

const motionTags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  ul: motion.ul,
  li: motion.li,
} as const

type MotionTag = keyof typeof motionTags

type ScrollRevealProps<T extends MotionTag = 'div'> = {
  as?: T
  children: ReactNode
  delay?: number
} & HTMLMotionProps<T>

export function ScrollReveal<T extends MotionTag = 'div'>({
  as = 'div' as T,
  children,
  delay = 0,
  ...props
}: ScrollRevealProps<T>) {
  const reduceMotion = useReducedMotion()
  const Component = motionTags[as]

  if (reduceMotion) {
    const StaticTag = as as ElementType
    return <StaticTag {...props}>{children}</StaticTag>
  }

  return (
    <Component
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.6, ease, delay }}
      {...props as any}
    >
      {children}
    </Component>
  )
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
}

type StaggerRevealProps<T extends MotionTag = 'div'> = {
  as?: T
  children: ReactNode
} & HTMLMotionProps<T>

export function StaggerReveal<T extends MotionTag = 'div'>({
  as = 'div' as T,
  children,
  ...props
}: StaggerRevealProps<T>) {
  const reduceMotion = useReducedMotion()
  const Component = motionTags[as]

  if (reduceMotion) {
    const StaticTag = as as ElementType
    return <StaticTag {...props}>{children}</StaticTag>
  }

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -8% 0px' }}
      variants={containerVariants}
      {...props as any}
    >
      {children}
    </Component>
  )
}

type StaggerItemProps<T extends MotionTag = 'div'> = {
  as?: T
  children: ReactNode
} & HTMLMotionProps<T>

export function StaggerItem<T extends MotionTag = 'div'>({
  as = 'div' as T,
  children,
  ...props
}: StaggerItemProps<T>) {
  const reduceMotion = useReducedMotion()
  const Component = motionTags[as]

  if (reduceMotion) {
    const StaticTag = as as ElementType
    return <StaticTag {...props}>{children}</StaticTag>
  }

  return (
    <Component variants={itemVariants} {...props as any}>
      {children}
    </Component>
  )
}
