import React, { useCallback, useEffect, useState } from 'react'
import InputItem from '../util/InputItem'
import { getPath, patchPath, postPath, slugify } from '../../util'
import { compileWithRichMarkdown } from '../../parser/rich-markdown'
import debounce from 'lodash.debounce'
import { useParams } from 'react-router-dom'
import BlogButton from '../util/BlogButton'

export default function EditPostContent({ credentials }) {
  const [disableInput, setDisableInput] = useState(false)
  const [showingResult, setShowingResult] = useState(false)
  const [result, setResult] = useState({})

  const [title, setTitle] = useState('')
  const [blurb, setBlurb] = useState('')
  const [body, setBody] = useState('')

  const [postId, setPostId] = useState(-1)

  const [preview, setPreview] = useState('')

  let { slug } = useParams()

  const handlePreview = useCallback(
    debounce((body) => {
      setPreview(compileWithRichMarkdown(body))
    }, 500),
    [],
  )

  useEffect(() => {
    ;(async function () {
      try {
        const data = await getPath(`/posts/${slug}?withMarkdown=true`)
        if (!data.titleMd || !data.blurbMd || !data.bodyMd) {
          throw new Error('Failed to load post')
        }

        setTitle(data.titleMd)
        setBlurb(data.blurbMd)
        setBody(data.bodyMd)
        setPostId(data.id)
      } catch (err) {
        setShowingResult(true)
        setResult(err)
      }
    })()
  }, [])

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
          'm-8 ' + (disableInput ? 'opacity-50 pointer-events-none' : '')
        }
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            if (!title || !blurb || !body) {
              // all fields must be filled, don't proceed
              return
            }

            const reqbody = {
              slug,
              titleHtml: compileWithRichMarkdown(title),
              titleMd: title,
              blurbHtml: compileWithRichMarkdown(blurb),
              blurbMd: blurb,
              bodyHtml: compileWithRichMarkdown(body),
              bodyMd: body,
              jwt: credentials.rawJwt,
            }

            setDisableInput(true)

            try {
              const res = await patchPath(`/posts/${slug}`, reqbody)
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
              value={blurb}
              setter={setBlurb}
              label="Blurb"
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
          <BlogButton>Update Post</BlogButton>
        </form>
      </div>
    )
  }
}
