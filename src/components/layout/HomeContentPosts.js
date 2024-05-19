import React from 'react'
import PostBlurb from '../post/PostBlurb'

export default function HomeContentPosts({ posts }) {
  return (
    <div className="w-full">
      {posts.map((post, i) => {
        return <PostBlurb post={post} key={i} />
      })}
    </div>
  )
}
