import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'
import Prism from 'prismjs'

export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/]
    }),
    Markdown({
      headEnabled: true,
      markdownItOptions: {
        highlight: (str, lang, attrs) => {
          return `<pre class='language-${lang}' tabindex='0'><code class='language-${lang}'>${Prism.highlight(
            str,
            Prism.languages[lang],
            attrs
          )}</code></pre>`
        }
      }
    })
  ]
})
