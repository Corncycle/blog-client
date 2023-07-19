import React, { useState, useEffect, Suspense, use } from 'react'
import Loading from './Loading'
import HomeContentPosts from './HomeContentPosts'
import CommentSection from './CommentSection'
import { getPath } from '../util'
import ErrorDisplay from './ErrorDisplay'

export default function HomeContent() {
  const [posts, setPosts] = useState([])
  const [loadingPosts, setLoadingPosts] = useState(true)

  useEffect(() => {
    ;(async function () {
      try {
        const data = await getPath('/api/posts')
        setPosts(data)

        setLoadingPosts(false)
      } catch (err) {
        console.log(err)
        setLoadingPosts(false)
      }
    })()
  }, [])

  return (
    <div className="w-full flex justify-center flex-col">
      {loadingPosts ? (
        <Loading />
      ) : posts.length ? (
        <HomeContentPosts posts={posts} />
      ) : (
        <ErrorDisplay message="Failed to retrieve recent posts from database" />
      )}
    </div>
  )
}
