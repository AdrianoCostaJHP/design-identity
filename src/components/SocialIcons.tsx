type IconProps = {
  className?: string
}

const iconClass = 'h-5 w-5 shrink-0'

export function WhatsAppIcon({ className = iconClass }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7.254 18.494 7.978 18.917A9.97 9.97 0 0 0 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8c0 1.436.377 2.813 1.085 4.024l.423.724-.654 2.402 2.4-.653ZM2.005 22l1.352-4.968A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.03-1.356L2.005 22ZM8.392 7.307c-.257.396-.657 1.506-.49 2.566.165 1.045.857 2.154 1.431 2.862 1.091 1.295 2.558 2.385 4.246 2.988.925.325 1.675.21 2.271-.147.293-.172.577-.422.815-.734.283-.368.349-.763.252-1.061-.075-.23-.263-.412-.558-.616l-1.332-.925c-.244-.16-.514-.061-.677.056l-.363.261c-.167.12-.386.113-.545-.017-.388-.315-1.187-1.014-1.55-1.418-.328-.363-.686-.98-.98-1.368-.138-.188-.134-.466.009-.65l.247-.332c.128-.176.227-.52.084-.794l-.893-1.658c-.144-.275-.39-.39-.605-.39-.213 0-.48.114-.734.303-.303.225-.619.514-.785.755-.168.243-.295.612.159.323Z" />
    </svg>
  )
}

export function InstagramIcon({ className = iconClass }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function LinkedInIcon({ className = iconClass }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 4.126 0 2.065 2.065 0 0 1-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}
