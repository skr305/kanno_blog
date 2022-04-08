import { RenderResult } from '@/ssr'

export const resolveTemplate = (config: RenderResult & { template: string }) => {
  const { html, preloadLinks, _document, template } = config
  return template
    .replace('<!-- _document -->', _document)
    .replace(`<!--preload-links-->`, preloadLinks)
    .replace(`<!--app-html-->`, html)
}
