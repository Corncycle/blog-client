import React, { useState, useEffect, Suspense, use } from 'react'
import Loading from './Loading'
import PostSection from './PostSection'
import CommentSection from './CommentSection'
import { getPath } from '../util'

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
      setPosts(await getPath('/api/posts'))

      setLoadingPosts(false)
    })()
  }, [])

  return (
    <div className="w-full flex justify-center flex-col">
      {loadingPosts ? <Loading /> : <PostSection posts={posts} />}
    </div>
  )

  return loadingPosts ? <Loading /> : <PostSection posts={posts} />

  /*return (
    <div className="w-full flex justify-center flex-col">
      <Suspense fallback={<div>Waiting...</div>}>
        <ArticleSection articles={articles} />
      </Suspense>
      <CommentSection />
    </div>
  )*/
}
