import { marked } from 'marked'

export function compileWithRichMarkdown(str) {
  return marked(str, { mangle: false, headerIds: false })
}
