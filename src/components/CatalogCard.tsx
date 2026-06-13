import type { ImageRatio, PortfolioImage } from '../types/image'
import { downloadPdf } from '../utils/media'

const ratioClass: Record<ImageRatio, string> = {
  portrait: 'aspect-[9/16]',
  square: 'aspect-square',
  landscape: 'aspect-[4/3]',
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 3v10M10 13l-3.5-3.5M10 13l3.5-3.5M4 16h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type CatalogCardProps = {
  image: PortfolioImage
}

export function CatalogCard({ image }: CatalogCardProps) {
  const aspect = ratioClass[image.ratio ?? 'portrait']
  const filename = image.src.split('/').pop() ?? 'catalogo.pdf'

  function handleDownload() {
    downloadPdf(image.src, filename)
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="group relative block h-full w-full cursor-pointer overflow-hidden rounded-[18px] border border-hairline bg-soft-stone p-0 text-left shadow-lg transition-shadow duration-300 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
      aria-label={`Baixar catálogo: ${image.alt}`}
    >
      <div className={`relative ${aspect} w-full overflow-hidden`}>
        {image.poster ? (
          <img
            src={image.poster}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-pale-green" aria-hidden />
        )}

        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-primary/80 via-primary/25 to-transparent"
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
          <span className="inline-block rounded-sm border border-coral px-2 py-1 font-mono text-[10px] uppercase tracking-[0.28px] text-coral">
            Catálogo PDF
          </span>
          <p className="mt-2 mb-0 line-clamp-2 text-sm leading-snug font-medium text-on-dark">{image.alt}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.28px] text-white/75 transition-colors group-hover:text-white">
            <DownloadIcon />
            Baixar PDF
          </span>
        </div>
      </div>
    </button>
  )
}
