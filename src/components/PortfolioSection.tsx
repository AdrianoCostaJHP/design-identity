import { useCallback, useMemo, useState } from 'react'
import { portfolio } from '../content'
import {
  getCarouselModeForTab,
  getPortfolioImagesForTab,
  getWorksForTab,
  portfolioTabs,
  type PortfolioTabId,
} from '../data/works'
import { ImageLightbox } from './ImageLightbox'
import { WorkCarousel } from './WorkCarousel'

type PortfolioSectionProps = {
  variant?: 'light' | 'dark'
}

export function PortfolioSection({ variant = 'dark' }: PortfolioSectionProps) {
  const isDark = variant === 'dark'
  const [activeTab, setActiveTab] = useState<PortfolioTabId>('posts')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const tabWorks = useMemo(() => getWorksForTab(activeTab), [activeTab])
  const tabImages = useMemo(() => getPortfolioImagesForTab(activeTab), [activeTab])
  const carouselMode = getCarouselModeForTab(activeTab)

  const selectedImage = useMemo(() => {
    if (!selectedId || carouselMode !== 'modal') return null
    return tabImages.find((image) => image.id === selectedId) ?? null
  }, [carouselMode, selectedId, tabImages])

  const openImage = useCallback((id: string) => {
    setSelectedId(id)
  }, [])

  const closeImage = useCallback(() => {
    setSelectedId(null)
  }, [])

  const navigateImage = useCallback((id: string) => {
    setSelectedId(id)
  }, [])

  const handleTabChange = useCallback((tabId: PortfolioTabId) => {
    setActiveTab(tabId)
    setSelectedId(null)
  }, [])

  const tabButtonClass = (isActive: boolean) => {
    const base =
      'cursor-pointer border-0 bg-transparent px-0 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4'
    if (isDark) {
      return isActive
        ? `${base} border-b-2 border-accent-gold text-on-dark focus-visible:outline-white/70`
        : `${base} border-b-2 border-transparent text-white/65 hover:text-on-dark focus-visible:outline-white/70`
    }
    return isActive
      ? `${base} border-b-2 border-primary text-primary focus-visible:outline-primary`
      : `${base} border-b-2 border-transparent text-muted hover:text-ink focus-visible:outline-primary`
  }

  return (
    <>
      <p
        className={`font-mono text-sm uppercase tracking-[0.28px] ${isDark ? 'text-white/65' : 'text-slate'}`}
      >
        {portfolio.label}
      </p>
      <h2
        id="portfolio-title"
        className={`mb-4 max-w-[18ch] font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-tight tracking-[-0.02em] ${
          isDark ? 'text-on-dark' : 'text-primary'
        }`}
      >
        {portfolio.title}
      </h2>
      <p className={`m-0 max-w-[52ch] text-lg leading-snug ${isDark ? 'text-white/80' : 'text-body-muted'}`}>
        {portfolio.lead}
      </p>

      <div
        role="tablist"
        aria-label="Categorias do portfólio"
        className={`mt-10 flex flex-wrap gap-x-8 gap-y-2 border-b ${isDark ? 'border-white/20' : 'border-hairline'}`}
      >
        {portfolioTabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`portfolio-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`portfolio-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              className={tabButtonClass(isActive)}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div
        id={`portfolio-panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`portfolio-tab-${activeTab}`}
        tabIndex={0}
      >
        {tabWorks.length > 0 ? (
          <WorkCarousel
            key={activeTab}
            works={tabWorks}
            mode={carouselMode}
            onOpen={carouselMode === 'modal' ? openImage : undefined}
            variant={variant}
          />
        ) : (
          <p className={`mt-10 text-body-muted ${isDark ? 'text-white/70' : ''}`}>
            Em breve — novos projetos nesta categoria.
          </p>
        )}
      </div>

      {carouselMode === 'modal' && (
        <ImageLightbox
          image={selectedImage}
          images={tabImages}
          onClose={closeImage}
          onNavigate={navigateImage}
        />
      )}
    </>
  )
}
