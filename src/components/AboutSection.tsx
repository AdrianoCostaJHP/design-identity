import { about } from '../content'
import { ScrollReveal, StaggerItem, StaggerReveal } from './ScrollReveal'

const container = 'mx-auto w-full max-w-[1120px] px-6'

export function AboutSection() {
  return (
    <ScrollReveal
      as="section"
      id="sobre"
      className={`${container} py-20`}
      aria-labelledby="about-title"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <ScrollReveal
          className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-soft-stone/80"
          aria-hidden
          delay={0.1}
        >
          <img src={about.image} alt={about.title} className="object-cover" />
        </ScrollReveal>

        <div>
          <p className="font-mono text-sm uppercase tracking-[0.28px] text-slate">{about.label}</p>
          <h2
            id="about-title"
            className="mb-4 max-w-[18ch] font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-tight tracking-[-0.02em] text-primary"
          >
            {about.title}
          </h2>
          <p className="m-0 max-w-[52ch] text-lg leading-snug text-body-muted">{about.bio}</p>

          <StaggerReveal as="ul" className="mt-10 list-none space-y-6 p-0">
            {about.process.map((item, index) => (
              <StaggerItem as="li" key={item.step} className="flex gap-4 align-middle">
                <span className="font-mono text-sm tabular-nums text-slate mt-1">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="mb-1 font-display text-xl font-normal text-ink">{item.step}</h3>
                  <p className="m-0 text-body-muted">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </ScrollReveal>
  )
}
