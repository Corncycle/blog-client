import React, { useState, useEffect } from 'react'
import Loading from '../util/Loading'
import { getPath } from '../../util'
import ErrorDisplay from '../util/ErrorDisplay'
import { useParams } from 'react-router-dom'
import PostHeader from './PostHeader'
import PostBody from './PostBody'
import CommentSection from '../comment/CommentSection'

export default function PostFull({
  location,
  isAdmin,
  credentials,
  setCredentials,
}) {
  const [post, setPost] = useState({})
  const [loadingPost, setLoadingPost] = useState(true)

  let { slug } = useParams()

  useEffect(() => {
    ;(async function () {
      if (slug !== post.slug) {
        setLoadingPost(true)
        try {
          const data = await getPath(`/posts/${slug}`)
          setPost(data)

          setLoadingPost(false)
        } catch (err) {
          setLoadingPost(false)
        }
      }
    })()
  }, [location])

  return (
    <div className="w-full flex justify-center flex-col">
      {loadingPost ? (
        <Loading size="large" message="Retrieving post..." className="pt-8" />
      ) : post.title_html && post.body_html ? (
        <div className="w-full flex flex-col">
          <PostHeader message={post.title_html} showActions={isAdmin} />
          <PostBody date={post.created_at} message={post.body_html} />
          <hr className="border-gray-300"></hr>
          <CommentSection
            slug={slug}
            credentials={credentials}
            setCredentials={setCredentials}
          />
        </div>
      ) : post.error ? (
        <div>{post.error}</div>
      ) : (
        <ErrorDisplay
          message={`Failed to retrieve post '${slug}' from database`}
        />
      )}
    </div>
  )
}
