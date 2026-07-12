import { useReducedMotion } from 'framer-motion'
import { useId, useState, type KeyboardEvent } from 'react'

type FaqItem = {
  question: string
  answer: string
}

type FaqAccordionProps = {
  items: readonly FaqItem[]
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const baseId = useId()
  const reduceMotion = useReducedMotion()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index))
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      const next = document.getElementById(`${baseId}-trigger-${index + 1}`)
      next?.focus()
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      const prev = document.getElementById(`${baseId}-trigger-${index - 1}`)
      prev?.focus()
    }
  }

  return (
    <div className="divide-y divide-hairline border-y border-hairline">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const triggerId = `${baseId}-trigger-${index}`
        const panelId = `${baseId}-panel-${index}`

        return (
          <div key={item.question}>
            <h3 className="m-0">
              <button
                id={triggerId}
                type="button"
                className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-base font-medium text-ink transition-opacity hover:opacity-88"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                <span>{item.question}</span>
                <span
                  aria-hidden
                  className={`shrink-0 text-xl leading-none text-muted transition-transform duration-200 ${
                    isOpen ? 'rotate-45' : ''
                  } ${reduceMotion ? '!transition-none' : ''}`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className="pb-5 text-body-muted"
            >
              <p className="m-0 max-w-[60ch] leading-relaxed">{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
