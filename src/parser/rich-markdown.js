import { marked } from 'marked'

const preservationString = 'ÁØñ'

export function compileWithRichMarkdown(str) {
  const splitOnOpen = str.split('[[[')
  let preMarkdown = splitOnOpen[0]
  let rawHtmlStrings = []
  for (let i = 1; i < splitOnOpen.length; i++) {
    splitOnOpen[i] = splitOnOpen[i].split(']]]')
    if (splitOnOpen[i].length > 2) {
      return "Syntax error: too many closing ']]]'"
    } else if (splitOnOpen[i].length < 2) {
      return "Syntax error: missing closing ']]]'"
    }
    preMarkdown =
      preMarkdown +
      preservationString +
      (i - 1) +
      preservationString +
      splitOnOpen[i][1]
    rawHtmlStrings.push(splitOnOpen[i][0])
  }

  const postMarkdown = marked(preMarkdown, { mangle: false, headerIds: false })

  const splitPostMarkdown = postMarkdown.split(preservationString)

  for (let i = 0; i < splitPostMarkdown.length; i++) {
    if (i % 2 === 1) {
      splitPostMarkdown[i] = rawHtmlStrings[(i - 1) / 2]
    }
  }

  return splitPostMarkdown.join('')
}
