import React from 'react'
import { Link } from 'react-router-dom'
import PostHeader from './PostHeader'
import PostBody from './PostBody'

export default function PostBlurb({ post }) {
  return (
    <div className="w-full flex flex-col">
      <PostHeader message={post.titleHtml} to={`posts/${post.slug}`} />
      <PostBody
        date={post.createdAt}
        message={post.blurbHtml}
        append={<Link to={`posts/${post.slug}`}>continue reading...</Link>}
      />
    </div>
  )
}
