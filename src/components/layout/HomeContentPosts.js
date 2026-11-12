import React from 'react'
import PostBlurb from '../post/PostBlurb'

export default function HomeContentPosts({ posts, showLoadingAnimation }) {
  return (
    <div className={`w-full ${showLoadingAnimation ? 'animate-fade-in' : ''}`}>
      {posts.map((post, i) => {
        return <PostBlurb post={post} key={i} />
      })}
    </div>
  )
}
