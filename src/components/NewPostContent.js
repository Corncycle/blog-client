import React, { useState } from 'react'
import InputItem from './InputItem'
import { slugify } from '../util'

export default function NewPostContent() {
  const [disableInput, setDisableInput] = useState(false)
  const [showingResult, setShowingResult] = useState(false)
  const [result, setResult] = useState({})

  const [authorization, setAuthorization] = useState('')
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [body, setBody] = useState('')

  if (showingResult) {
    return (
      <div>
        <div>
          {result.message && <h3>Result</h3>}
          {result.message && <div>{result.message}</div>}
          {result.error && <h3>Error</h3>}
          {result.error && <div>{result.error}</div>}
        </div>
        <button
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
        </button>
      </div>
    )
  } else {
    return (
      <div className={disableInput ? 'opacity-50 pointer-events-none' : ''}>
        <h2>Note: Authorization is required to create a new post.</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            console.log(authorization, title, subtitle, body)
            if (!authorization || !title || !subtitle || !body) {
              // all fields must be filled, don't proceed
              return
            }

            const reqbody = {
              authorization,
              title,
              slug: slugify(title),
              subtitle,
              body,
            }

            setDisableInput(true)

            let response
            try {
              response = await fetch(
                `http://${location.hostname}:3000/api/posts/new`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(reqbody),
                },
              )
              const res = await response.json()
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
          <button>Make post</button>
        </form>
      </div>
    )
  }
}
