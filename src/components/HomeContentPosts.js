import React from 'react'
import Loading from './Loading'
import PostBlurb from './PostBlurb'

export default function HomeContentPosts({ posts }) {
  return (
    <div className="w-full">
      {posts.map((post, i) => {
        return <PostBlurb post={post} key={i} />
      })}
    </div>
  )
}
