import React, { useState, useEffect, Suspense, use } from 'react'
import Loading from './Loading'
import PostSection from './PostSection'
import CommentSection from './CommentSection'
import { getPath } from '../util'
import ErrorDisplay from './ErrorDisplay'

export default function MainContent() {
  /*useEffect(() => {
    //const prommy = getPath('/api/posts')
    //console.log(prommy)
    //setArticles(prommy)
  }, [])*/

  const [posts, setPosts] = useState([])
  const [loadingPosts, setLoadingPosts] = useState(true)

  useEffect(() => {
    ;(async function () {
      try {
        const data = await getPath('/api/posts')
        setPosts(data)

        setLoadingPosts(false)
      } catch (err) {
        setLoadingPosts(false)
      }
    })()
  }, [])

  return (
    <div className="w-full flex justify-center flex-col">
      {loadingPosts ? (
        <Loading />
      ) : posts.length ? (
        <PostSection posts={posts} />
      ) : (
        <ErrorDisplay message="Failed to retrieve post from database" />
      )}
    </div>
  )
}
