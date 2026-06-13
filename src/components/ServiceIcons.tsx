type IconProps = {
  className?: string
}

const serviceIconClass = 'mb-5 h-10 w-10 text-deep-green'

export function SocialManagementIcon({ className = serviceIconClass }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x="5" y="5" width="13" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="22" y="5" width="13" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="5" y="22" width="13" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="22" y="22" width="13" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="11.5" cy="11.5" r="2" fill="currentColor" stroke="none" />
      <path
        d="M25 9.5h7M25 13.5h4.5M8.5 28.5h6M25 25.5h7M25 29.5h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function LocalAdsIcon({ className = serviceIconClass }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden>
      <circle cx="20" cy="16" r="9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="16" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="16" r="1.25" fill="currentColor" stroke="none" />
      <path
        d="M20 25v9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M15.5 34h9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 12.5c2.2-4.2 6.2-7 10.5-7.5M32 12.5c-2.2-4.2-6.2-7-10.5-7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function VisualIdentityIcon({ className = serviceIconClass }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden>
      <circle cx="13" cy="14" r="6" stroke="currentColor" strokeWidth="1.5" />
      <rect
        x="23"
        y="8"
        width="10"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 30h24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10 30v-4c0-2.2 1.8-4 4-4h2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30 30v-6.5a2.5 2.5 0 0 0-2.5-2.5H24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 22l3-5 3 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
