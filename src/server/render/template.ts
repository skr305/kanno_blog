import { RenderResult } from '@/ssr'

export const resolveTemplate = (config: RenderResult & { template: string }) => {
  const { html, _document, template, scripts } = config
  return template
    .replace('<!-- _document -->', _document)
    .replace(`<!--app-html-->`, html)
    .replace(`</body>`, () => `\n${scripts}\n</body>`)
}
