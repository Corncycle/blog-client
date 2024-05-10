import React, { useState, useEffect, Suspense, use } from 'react'
import Loading from './Loading'
import { getPath } from '../util'
import ErrorDisplay from './ErrorDisplay'
import { useParams } from 'react-router-dom'
import PostHeader from './PostHeader'
import PostBody from './PostBody'

export default function PostFull({ location, isAdmin }) {
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
      ) : post.title && post.body ? (
        <div className="w-full flex flex-col">
          <PostHeader message={post.title} showActions={isAdmin} />
          <PostBody message={post.body} />
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
