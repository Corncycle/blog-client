import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import { getPath, postPath } from '../../util'
import GoogleOAuthWidget from '../GoogleOAuthWidget'
import BlogButton from '../util/BlogButton'

export default function CommentSection({ slug, credentials, setCredentials }) {
  const [comments, setComments] = useState([])
  const [editedComment, setEditedComment] = useState('')
  const [updateComments, setUpdateComments] = useState(true)

  useEffect(() => {
    ;(async function () {
      if (updateComments) {
        try {
          const data = await getPath(`/posts/${slug}/comments`)
          setComments(data)
        } catch (err) {}
      }
    })()
    setUpdateComments(false)
  }, [updateComments])

  return (
    <div className="w-full flex flex-col">
      <div className="px-4 py-4 text-lg font-bold">{`Comments (${comments.length})`}</div>
      <div className="flex flex-col gap-2">
        {comments.map((comment, i) => (
          <Comment comment={comment} key={i} />
        ))}
      </div>
      <div>
        <div className="p-2 font-bold">Leave a comment</div>
        <GoogleOAuthWidget
          credentials={credentials}
          setCredentials={setCredentials}
          className="invisible md:visible flex flex-row gap-2"
          authorizedElm={
            <form
              className="w-full flex"
              onSubmit={async (e) => {
                e.preventDefault()

                const reqbody = {
                  jwt: credentials.rawJwt,
                  postSlug: slug,
                  displayName: credentials.given_name,
                  email: credentials.email,
                  picture: credentials.picture,
                  body: editedComment,
                }

                try {
                  const res = await postPath(`/posts/${slug}/comments`, reqbody)
                } catch (err) {}
                setEditedComment('')
                setUpdateComments(true)
                return
              }}
            >
              <div className="flex flex-col w-1/5 min-w-28 p-4">
                <div
                  className="w-10 h-10 bg-cover rounded-full"
                  style={{
                    backgroundImage: `url("${credentials?.picture}")`,
                  }}
                ></div>
                <div className="font-bold">{credentials?.given_name}</div>
              </div>
              <div className="w-full p-2 flex flex-col gap-2">
                <textarea
                  rows="4"
                  className="w-full p-2 border-1 border-slate-300 rounded-md"
                  onChange={(e) => {
                    setEditedComment(e.target.value)
                  }}
                  required={true}
                  value={editedComment}
                ></textarea>
                <div>
                  <BlogButton>Submit</BlogButton>
                </div>
              </div>
            </form>
          }
        />
      </div>
    </div>
  )
}
