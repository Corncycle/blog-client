import React, { useCallback, useEffect, useState } from 'react'
import InputItem from './InputItem'
import { getPath, patchPath, postPath, slugify } from '../util'
import { compileWithRichMarkdown } from '../parser/rich-markdown'
import debounce from 'lodash.debounce'
import { useParams } from 'react-router-dom'
import BlogButton from './BlogButton'

export default function EditPostContent() {
  const [disableInput, setDisableInput] = useState(false)
  const [showingResult, setShowingResult] = useState(false)
  const [result, setResult] = useState({})

  const [authorization, setAuthorization] = useState('')
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
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
        const data = await getPath(`/posts/${slug}`)
        if (!data.title || !data.subtitle || !data.id) {
          throw new Error('Failed to load post')
        }

        setTitle(data.title)
        setSubtitle(data.subtitle)
        setBody(data.rawbody || data.body) // support old posts that only stored body and not rawbody
        setPostId(data.id)
      } catch (err) {
        console.log(err)
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
            if (result.message) {
              setAuthorization('')
              setTitle('')
              setSubtitle('')
              setBody('')
            }
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
      <div className={disableInput ? 'opacity-50 pointer-events-none' : ''}>
        <h2>Note: Authorization is required to edit a post.</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            if (!authorization || !title || !subtitle || !body) {
              // all fields must be filled, don't proceed
              return
            }

            const reqbody = {
              authorization,
              title,
              slug: slugify(title),
              subtitle,
              body: preview,
              rawbody: body,
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
              value={authorization}
              setter={setAuthorization}
              label="authorization"
              required={true}
              isPassword={true}
            />
          </div>
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
              required={true}
            />
          </div>
          <div className="flex flex-col">
            <InputItem
              value={body}
              setter={setBody}
              label="Body"
              isLarge={true}
              required={true}
            />
          </div>
          <div className="flex flex-col">
            <span>Preview:</span>
            <div
              className="post-body-view"
              dangerouslySetInnerHTML={{ __html: preview }}
            />
          </div>
          <BlogButton>Update Post</BlogButton>
        </form>
      </div>
    )
  }
}
