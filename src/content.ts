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
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Dúvidas', href: '#duvidas' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
] as const

export const hero = {
  headline: 'Presença digital que o seu negócio local merece.',
  lead: 'Estratégia, conteúdo e design para restaurantes, clínicas, lojas e serviços da região — com métricas claras e entrega consistente.',
  primaryCta: 'Ver portfólio',
  secondaryCta: 'Falar no WhatsApp',
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
  label: 'Portfólio',
  title: 'Posts, identidades e catálogos',
  lead: 'Uma seleção de entregas que já realizei para clientes — exemplos do que posso fazer pelo seu negócio.',
  allLabel: 'UX/UI Design',
  allTitle: 'Projetos de design',
} as const

export const about = {
  label: 'Sobre',
  title: 'Maria Fernanda Dias Faleiro',
  image: '/images/a33b1c8a-c669-4ecd-951b-d919a66a3f76.jpeg',
  bio: 'Sou social media e designer. Ajudo marcas a aparecer com consistência, clareza e visual profissional nas redes sociais.',
  process: [
    {
      step: 'Diagnóstico',
      description: 'Entendo seu negócio, público e objetivos antes de qualquer post ou campanha.',
    },
    {
      step: 'Planejamento',
      description: 'Defino linha editorial, calendário e identidade visual alinhados à sua marca.',
    },
    {
      step: 'Entrega',
      description: 'Produzo conteúdo, publico e acompanho resultados com relatórios objetivos.',
    },
  ],
} as const

export const faq = {
  label: 'Dúvidas',
  title: 'Perguntas frequentes',
  items: [
    {
      question: 'Quanto custa a gestão de redes sociais?',
      answer:
        'O valor varia conforme o escopo — quantidade de posts, stories, anúncios e nível de estratégia. Entre em contato para um orçamento personalizado ao seu negócio.',
    },
    {
      question: 'Em quanto tempo posso começar?',
      answer:
        'Após a primeira conversa e alinhamento do briefing, o planejamento costuma ficar pronto em até uma semana. A publicação começa logo em seguida.',
    },
    {
      question: 'Preciso já ter Instagram ou Facebook criados?',
      answer:
        'Não necessariamente. Posso orientar na criação e configuração dos perfis, ou trabalhar com contas que você já usa hoje.',
    },
    {
      question: 'Você cria o conteúdo ou só publica?',
      answer:
        'Faço o ciclo completo: estratégia, criação visual, textos, publicação e acompanhamento. Você aprova antes de ir ao ar.',
    },
    {
      question: 'Atende apenas negócios da minha cidade?',
      answer:
        'Trabalho com foco em negócios locais e campanhas geolocalizadas, mas atendo clientes de qualquer região do Brasil de forma remota.',
    },
  ],
  cta: {
    title: 'Ainda tem dúvidas? Fale diretamente comigo.',
    button: 'Falar no WhatsApp',
  },
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
