export function isPdfSrc(src: string): boolean {
  return /\.pdf($|\?|#)/i.test(src)
}

export function downloadPdf(src: string, filename?: string): void {
  const link = document.createElement('a')
  link.href = src
  link.download = filename ?? src.split('/').pop() ?? 'catalogo.pdf'
  link.rel = 'noopener'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
