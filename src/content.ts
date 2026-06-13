export const site = {
  name: 'Maria Fernanda Faleiro',
  tagline: 'Social Media e Design',
  title: 'Maria Fernanda Faleiro — Social Media e Design',
  description:
    'Gestão de redes, anúncios locais e identidade visual para negócios da sua região.',
  whatsappNumber: '5564992424925',
  whatsappMessage:
    'Olá, Maria! Vi seu portfólio e gostaria de conversar sobre social media para o meu negócio.',
  instagramUrl: 'https://instagram.com/mariafernanda.social',
  linkedinUrl: 'https://www.linkedin.com/in/maria-fernanda26/',
} as const

export const navLinks = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Produção', href: '#producao' },
  { label: 'Trabalhos', href: '#trabalhos' },
  { label: 'Contato', href: '#contato' },
] as const

export const hero = {
  headline: 'Presença digital que o seu negócio local merece.',
  lead: 'Estratégia, conteúdo e design para restaurantes, clínicas, lojas e serviços da região — com métricas claras e entrega consistente.',
  primaryCta: 'Ver produção',
  secondaryCta: 'Falar no WhatsApp',
} as const

export const trust = {
  label: 'Atendo negócios como',
  items: ['Restaurantes', 'Clínicas', 'Lojas', 'Serviços locais'],
} as const

export const services = [
  {
    icon: 'social',
    title: 'Gestão de redes',
    description:
      'Planejamento, publicação e monitoramento com linguagem alinhada ao seu público e ao seu bairro.',
  },
  {
    icon: 'ads',
    title: 'Anúncios locais (Meta Ads)',
    description:
      'Campanhas geolocalizadas para atrair clientes perto de você, com orçamento controlado e relatórios objetivos.',
  },
  {
    icon: 'identity',
    title: 'Identidade visual',
    description:
      'Templates, cores e tipografia para feed e stories — sua marca reconhecível em cada post.',
  },
] as const

export const portfolio = {
  worksLabel: 'Produção visual',
  worksTitle: 'Posts, identidades e catálogos',
  worksLead:
    'Peças visuais para redes sociais e materiais digitais — deslize o carrossel e clique para ampliar.',
  allLabel: 'Portfólio',
  allTitle: 'Projetos de design',
} as const

export const contact = {
  title: 'Pronto para aparecer no feed dos seus clientes?',
  lead: 'Conte sobre o seu negócio. Respondo em até um dia útil.',
  whatsappCta: 'Falar no WhatsApp',
  instagramCta: 'Ver Instagram',
  linkedinCta: 'LinkedIn',
} as const

export const footer = {
  copyright: `© ${new Date().getFullYear()} Maria Fernanda Faleiro`,
  note: 'Social Media e Design · Negócios locais',
} as const

export function whatsappHref(number: string, message: string): string {
  const text = encodeURIComponent(message)
  return `https://wa.me/${number}?text=${text}`
}
