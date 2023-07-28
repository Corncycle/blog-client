import React from 'react'
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
