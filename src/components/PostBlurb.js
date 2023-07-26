import React from 'react'
import { Link } from 'react-router-dom'
import PostHeader from './PostHeader'
import PostBody from './PostBody'

export default function PostBlurb({ post }) {
  return (
    <div className="w-full flex flex-col post-body-view">
      <PostHeader message={post.title} to={`posts/${post.slug}`} />
      <PostBody message={post.subtitle} />
    </div>
  )
}
