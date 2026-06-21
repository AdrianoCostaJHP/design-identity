import { HeroSection } from './components/HeroInteractiveBackground'
import { ProjectCard } from './components/ProjectCard'
import { ScrollReveal, StaggerItem, StaggerReveal } from './components/ScrollReveal'
import {
  LocalAdsIcon,
  SocialManagementIcon,
  VisualIdentityIcon,
} from './components/ServiceIcons'
import { InstagramIcon, LinkedInIcon, WhatsAppIcon } from './components/SocialIcons'
import { WorkGallery } from './components/WorkGallery'
import {
  site,
  navLinks,
  hero,
  trust,
  services,
  portfolio,
  contact,
  footer,
  whatsappHref,
} from './content'
import { projects } from './data/projects'

const container = 'mx-auto w-full max-w-[1120px] px-6'

const serviceIcons = {
  social: SocialManagementIcon,
  ads: LocalAdsIcon,
  identity: VisualIdentityIcon,
} as const

function serviceColumnClass(index: number, total: number): string {
  const base = 'border-t border-hairline py-6 md:py-8'
  if (total <= 1) return base
  if (index === 0) return `${base} md:border-r md:pr-8`
  if (index === total - 1) return `${base} md:pl-8`
  return `${base} md:border-r md:px-8`
}

function App() {
  const waLink = whatsappHref(site.whatsappNumber, site.whatsappMessage)

  const btnPrimary =
    'inline-flex items-center justify-center gap-2 rounded-[32px] bg-accent-gold px-6 py-3 text-sm font-medium leading-[1.71] text-on-primary transition-opacity hover:opacity-88'
  const btnSecondary =
    'inline-flex items-center justify-center gap-2 bg-transparent px-0 py-2 text-sm font-normal text-ink underline underline-offset-4 transition-opacity hover:opacity-88'

  return (
    <div className="text-left font-body text-ink">
      <header className="sticky top-0 z-50 border-b border-hairline bg-white/92 backdrop-blur-sm">
        <div className={`${container} grid min-h-[72px] grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr]`}>
          <a href="#" className="justify-self-start no-underline">
            <span className="block text-sm font-medium text-primary">{site.name}</span>
            <span className="mt-0.5 block text-xs text-muted">{site.tagline}</span>
          </a>
          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex list-none gap-7 p-0">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-ink no-underline hover:underline hover:underline-offset-4"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="justify-self-end md:justify-self-end">
            <a href={waLink} className={btnPrimary} target="_blank" rel="noreferrer">
              <WhatsAppIcon />
              {hero.secondaryCta}
            </a>
          </div>
        </div>
      </header>

      <main>
        <HeroSection aria-labelledby="hero-title">
          <ScrollReveal className={`${container} py-16 md:py-24 md:pb-16`}>
            <div className="grid items-end gap-12 lg:grid-cols-2">
              <div>
                <p className="font-mono text-sm uppercase tracking-[0.28px] text-slate">{site.tagline}</p>
                <h1
                  id="hero-title"
                  className="mb-6 max-w-[14ch] font-display text-[clamp(2.5rem,6vw,4.5rem)] font-normal leading-none tracking-[-0.02em] text-primary"
                >
                  {hero.headline}
                </h1>
                <p className="m-0 max-w-[52ch] text-lg leading-snug text-body-muted">{hero.lead}</p>
                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-6">
                  <a href="#producao" className={btnPrimary}>
                    {hero.primaryCta}
                  </a>
                  <a href={waLink} className={btnSecondary} target="_blank" rel="noreferrer">
                    <WhatsAppIcon />
                    {hero.secondaryCta}
                  </a>
                </div>
              </div>
              <ScrollReveal
                className="grid grid-cols-[1.4fr_1fr] items-end gap-4 max-[520px]:grid-cols-1"
                aria-hidden
                delay={0.15}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-soft-stone/80 backdrop-blur-sm">
                  <div className="absolute inset-0 bg-linear-to-br from-pale-green via-soft-stone to-[#e8e4dc]" />
                  <div className="absolute inset-x-4 bottom-4 rounded-sm bg-primary-dark p-3 px-4 text-xs leading-snug text-on-dark">
                    <strong className="mb-1 block text-sm font-medium">Feed + stories</strong>
                    Conteúdo e design alinhados à sua marca
                  </div>
                </div>
                <div className="relative aspect-[3/4] overflow-hidden rounded-[22px] bg-soft-stone/80 backdrop-blur-sm">
                  <div className="absolute inset-0 bg-linear-to-br from-pale-green via-soft-stone to-[#e8e4dc]" />
                </div>
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </HeroSection>

        <ScrollReveal
          as="section"
          className={`${container} border-y border-hairline py-12 text-center`}
          aria-label={trust.label}
        >
          <p className="mb-7 text-sm text-muted">{trust.label}</p>
          <StaggerReveal as="ul" className="flex list-none flex-wrap justify-center gap-x-14 gap-y-10 p-0">
            {trust.items.map((item) => (
              <StaggerItem as="li" key={item} className="text-lg font-medium tracking-[-0.02em] text-primary">
                {item}
              </StaggerItem>
            ))}
          </StaggerReveal>
        </ScrollReveal>

        <ScrollReveal
          as="section"
          id="servicos"
          className={`${container} py-20`}
          aria-labelledby="services-title"
        >
          <header className="mb-12">
            <p className="font-mono text-sm uppercase tracking-[0.28px] text-slate">Serviços</p>
            <h2
              id="services-title"
              className="mb-4 max-w-[18ch] font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-tight tracking-[-0.02em] text-primary"
            >
              O que faço pelo seu negócio
            </h2>
            <p className="m-0 max-w-[52ch] text-lg leading-snug text-body-muted">
              Estratégia, execução e visual — tudo pensado para quem atende clientes na região.
            </p>
          </header>
          <StaggerReveal className="grid md:grid-cols-3">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.icon]
              return (
                <StaggerItem
                  as="article"
                  key={service.title}
                  className={serviceColumnClass(index, services.length)}
                >
                  <Icon />
                  <h3 className="mb-2 font-display text-2xl font-normal leading-snug text-ink">{service.title}</h3>
                  <p className="m-0 text-body-muted">{service.description}</p>
                </StaggerItem>
              )
            })}
          </StaggerReveal>
        </ScrollReveal>

        <ScrollReveal
          as="section"
          id="producao"
          aria-labelledby="work-gallery-title"
        >
          <div className="mx-6 rounded-[22px] bg-primary-dark py-20 text-on-dark max-md:mx-0 max-md:rounded-none">
            <div className={container}>
              <WorkGallery
                variant="dark"
                label={portfolio.worksLabel}
                title={portfolio.worksTitle}
                lead={portfolio.worksLead}
              />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal
          as="section"
          id="trabalhos"
          className={`${container} py-20`}
          aria-labelledby="portfolio-title"
        >
          <p className="font-mono text-sm uppercase tracking-[0.28px] text-slate">{portfolio.allLabel}</p>
          <h2
            id="portfolio-title"
            className="mb-4 max-w-[18ch] font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-tight tracking-[-0.02em] text-primary"
          >
            {portfolio.allTitle}
          </h2>
          <p className="m-0 max-w-[52ch] text-lg leading-snug text-body-muted">
            Projetos de UX/UI Design desenvolvidos no Figma — interfaces mobile, landing pages e experiências digitais.
          </p>
          <StaggerReveal className="mt-10 grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <StaggerItem key={project.id}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </StaggerReveal>
        </ScrollReveal>

        <ScrollReveal
          as="section"
          id="contato"
          className="bg-soft-stone py-20 text-center"
          aria-labelledby="contact-title"
        >
          <div className={container}>
            <p className="font-mono text-sm uppercase tracking-[0.28px] text-slate">Contato</p>
            <h2
              id="contact-title"
              className="mx-auto mb-4 max-w-[18ch] font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-tight tracking-[-0.02em] text-primary"
            >
              {contact.title}
            </h2>
            <p className="mx-auto m-0 max-w-[52ch] text-lg leading-snug text-body-muted">{contact.lead}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-6">
              <a href={waLink} className={btnPrimary} target="_blank" rel="noreferrer">
                <WhatsAppIcon />
                {contact.whatsappCta}
              </a>
              <a href={site.instagramUrl} className={btnSecondary} target="_blank" rel="noreferrer">
                <InstagramIcon />
                {contact.instagramCta}
              </a>
              <a href={site.linkedinUrl} className={btnSecondary} target="_blank" rel="noreferrer">
                <LinkedInIcon />
                {contact.linkedinCta}
              </a>
            </div>
          </div>
        </ScrollReveal>
      </main>

      <footer className="bg-primary-dark py-8 text-on-dark">
        <div className={`${container} flex flex-wrap items-center justify-between gap-4 text-xs`}>
          <p className="m-0 text-on-dark/65">
            <strong className="font-medium text-on-dark">{site.name}</strong> · {footer.note}
          </p>
          <p className="m-0 text-on-dark/65">{footer.copyright}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
