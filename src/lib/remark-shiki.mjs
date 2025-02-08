import { visit } from 'unist-util-visit'

import { createHighlighter, bundledLanguages } from 'shiki/bundle/full';
import theme from '@shikijs/themes/github-dark-high-contrast';

const shiki = await createHighlighter({
  themes: [theme],
  langs: Object.values(bundledLanguages)
});

export default function attacher(options = {}) {

  return function transformer(tree) {
    visit(tree, 'code', visitor)

    function visitor(node) {
      const lang = node.lang
      const originalCode = node.value

      const highlighted = shiki.codeToHtml(node.value, {
        lang, theme: 'github-dark-high-contrast'
      })

      // Create HTML with data attribute containing original code
      // so we can copy the code to clipboard later
      const htmlWithData = highlighted.replace(
        /^<pre /,
        `<pre data-code="${encodeURIComponent(originalCode)}" `
      )

      node.type = 'html'
      node.value = htmlWithData
    }
  }
}
