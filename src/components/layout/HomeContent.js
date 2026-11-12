import React, { useState, useEffect } from 'react'
import Loading from '../util/Loading'
import HomeContentPosts from './HomeContentPosts'
import CommentSection from '../comment/CommentSection'
import { getPath } from '../../util'
import ErrorDisplay from '../util/ErrorDisplay'
import { useAdaptiveAnimation } from '../util/customHooks'

export default function HomeContent() {
  const [posts, setPosts] = useState([])
  const [loadingPosts, setLoadingPosts] = useState(true)
  const { shouldShowLoadingAnimation, alertDoneLoading } =
    useAdaptiveAnimation()

  useEffect(() => {
    ;(async function () {
      try {
        // await new Promise((res) => setTimeout(res, 2000))

        const data = await getPath('/posts')
        setPosts(data)

        setLoadingPosts(false)
        alertDoneLoading(true)
      } catch (err) {
        console.log(err)
        setLoadingPosts(false)
        alertDoneLoading(true)
      }
    })()
  }, [])

  return (
    <div className="w-full flex justify-center flex-col">
      {loadingPosts ? (
        <div className="flex justify-center">
          <Loading
            size="large"
            message="Retrieving recent posts"
            className="pt-8"
          />
        </div>
      ) : posts.length ? (
        <HomeContentPosts
          posts={posts}
          showLoadingAnimation={shouldShowLoadingAnimation}
        />
      ) : (
        <ErrorDisplay message="Failed to retrieve recent posts from database" />
      )}
    </div>
  )
}
