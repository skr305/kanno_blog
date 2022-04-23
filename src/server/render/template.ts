import { RenderResult } from '@/ssr'

export const resolveTemplate = (config: RenderResult & { template: string }) => {
  const { html, _document, template, scripts, theme } = config
  return template
    .replace('<html lang="en"', `<html lang="en" class=${theme}`)
    .replace('<!-- _document -->', _document)
    .replace(`<!--app-html-->`, html)
    .replace(`</body>`, () => `\n${scripts}\n</body>`)
}
