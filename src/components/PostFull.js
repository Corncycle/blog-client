import React, { useState, useEffect, Suspense, use } from 'react'
import Loading from './Loading'
import { getPath } from '../util'
import ErrorDisplay from './ErrorDisplay'
import { useParams } from 'react-router-dom'

export default function PostFull({ location }) {
  const [post, setPost] = useState({})
  const [loadingPost, setLoadingPost] = useState(true)

  let { slug } = useParams()

  useEffect(() => {
    ;(async function () {
      if (slug !== post.slug) {
        setLoadingPost(true)
        try {
          const data = await getPath(`/api/posts/${slug}`)
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
        <Loading />
      ) : post.title && post.body ? (
        <div className="w-full flex flex-col bg-teal-500">
          <div className="text-2xl">{post.title}</div>
          <div>{post.body}</div>
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
