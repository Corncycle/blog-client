import React, { useCallback, useEffect, useState } from 'react'
import InputItem from './InputItem'
import { postPath, slugify } from '../util'
import { compileWithRichMarkdown } from '../parser/rich-markdown'
import debounce from 'lodash.debounce'
import BlogButton from './BlogButton'

export default function NewPostContent({ credentials }) {
  const [disableInput, setDisableInput] = useState(false)
  const [showingResult, setShowingResult] = useState(false)
  const [result, setResult] = useState({})

  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [body, setBody] = useState('')

  const [preview, setPreview] = useState('')

  const handlePreview = useCallback(
    debounce((body) => {
      setPreview(compileWithRichMarkdown(body))
    }, 500),
    [],
  )

  useEffect(() => {
    handlePreview(body)
  }, [body])

  if (showingResult) {
    return (
      <div>
        <div>
          {result.message && <h3>Result</h3>}
          {result.message && <div>{result.message}</div>}
          {result.error && <h3>Error</h3>}
          {result.error && <div>{result.error}</div>}
        </div>
        <BlogButton
          onClick={(e) => {
            e.preventDefault()
            setShowingResult(false)
            setResult({})
          }}
        >
          Return to Form
        </BlogButton>
      </div>
    )
  } else {
    return (
      <div
        className={
          'p-8 w-full' + (disableInput ? 'opacity-50 pointer-events-none' : '')
        }
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            if (!title || !subtitle || !body) {
              // all fields must be filled, don't proceed
              return
            }

            const reqbody = {
              title,
              slug: slugify(title),
              subtitle: compileWithRichMarkdown(subtitle),
              body: preview,
              rawbody: body,
              jwt: credentials.rawJwt,
            }

            setDisableInput(true)

            try {
              const res = await postPath('/posts/new', reqbody)
              setResult(res)
            } catch (err) {
              setResult({ error: 'Failed to reach database' })
            }
            setShowingResult(true)
            setDisableInput(false)
          }}
        >
          <div className="flex flex-col">
            <InputItem
              value={title}
              setter={setTitle}
              label="Title"
              required={true}
            />
          </div>
          <div className="flex flex-col">
            <InputItem
              value={subtitle}
              setter={setSubtitle}
              label="Subtitle"
              isTextArea={true}
              required={true}
            />
          </div>
          <div className="flex flex-col">
            <InputItem
              value={body}
              setter={setBody}
              label="Body"
              isTextArea={true}
              isLarge={true}
              required={true}
            />
          </div>
          <div className="flex flex-col">
            <span>Preview:</span>
            <div
              className="post-body-view font-serif"
              dangerouslySetInnerHTML={{ __html: preview }}
            />
          </div>
          <BlogButton>Make post</BlogButton>
        </form>
      </div>
    )
  }
}
