import React, { useState, useEffect } from 'react'
import Loading from '../util/Loading'
import { getPath } from '../../util'
import ErrorDisplay from '../util/ErrorDisplay'
import { useParams } from 'react-router-dom'
import PostHeader from './PostHeader'
import PostBody from './PostBody'
import CommentSection from '../comment/CommentSection'
import { useAdaptiveAnimation } from '../util/customHooks'

export default function PostFull({
  location,
  isAdmin,
  credentials,
  setCredentials,
}) {
  const [post, setPost] = useState({})
  const [loadingPost, setLoadingPost] = useState(true)
  const { shouldShowLoadingAnimation, alertDoneLoading } =
    useAdaptiveAnimation()

  let { slug } = useParams()

  useEffect(() => {
    ;(async function () {
      if (slug !== post.slug) {
        setLoadingPost(true)
        try {
          // await new Promise((res) => setTimeout(res, 2000))

          const data = await getPath(`/posts/${slug}`)
          setPost(data)

          setLoadingPost(false)
          alertDoneLoading(true)
        } catch (err) {
          setLoadingPost(false)
          alertDoneLoading(true)
        }
      }
    })()
  }, [location])

  return (
    <div className="w-full flex justify-center flex-col lg:my-4">
      {loadingPost ? (
        <Loading size="large" message="Retrieving post" className="pt-8" />
      ) : post.titleHtml && post.bodyHtml ? (
        <div
          className={`w-full flex flex-col ${
            shouldShowLoadingAnimation ? 'animate-fade-in' : ''
          }`}
        >
          <PostHeader message={post.titleHtml} showActions={isAdmin} />
          <PostBody date={post.createdAt} message={post.bodyHtml} />
          <hr className="border-gray-300"></hr>
          <CommentSection
            slug={slug}
            credentials={credentials}
            setCredentials={setCredentials}
            newCommentsDisabled={true}
          />
        </div>
      ) : post.error ? (
        <ErrorDisplay
          className="mt-4"
          message={`Failed to retrieve post '${slug}'`}
        />
      ) : (
        <ErrorDisplay
          className="mt-4"
          message={`Failed to retrieve post '${slug}'`}
        />
      )}
    </div>
  )
}
