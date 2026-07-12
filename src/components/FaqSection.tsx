import { faq, site, whatsappHref } from '../content'
import { WhatsAppIcon } from './SocialIcons'
import { FaqAccordion } from './FaqAccordion'
import { ScrollReveal } from './ScrollReveal'

const container = 'mx-auto w-full max-w-[1120px] px-6'

export function FaqSection() {
  const waLink = whatsappHref(site.whatsappNumber, site.whatsappMessage)

  return (
    <ScrollReveal
      as="section"
      id="duvidas"
      className="bg-soft-stone py-20 rounded-t-[64px]"
      aria-labelledby="faq-title"
    >
      <div className={container}>
        <p className="font-mono text-sm uppercase tracking-[0.28px] text-slate">{faq.label}</p>
        <h2
          id="faq-title"
          className="mb-10 max-w-[18ch] font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-tight tracking-[-0.02em] text-primary"
        >
          {faq.title}
        </h2>

        <FaqAccordion items={faq.items} />

        <div className="mt-12 text-center">
          <p className="mb-6 text-lg text-body-muted">{faq.cta.title}</p>
          <a href={waLink} className="btn-primary" target="_blank" rel="noreferrer">
            <WhatsAppIcon />
            {faq.cta.button}
          </a>
        </div>
      </div>
    </ScrollReveal>
  )
}
