import React from 'react'
import { Link } from 'react-router-dom'
import PostHeader from './PostHeader'
import PostBody from './PostBody'

export default function PostBlurb({ post }) {
  return (
    <div className="w-full flex flex-col">
      <PostHeader message={post.title} to={`posts/${post.slug}`} />
      <PostBody
        message={post.subtitle}
        append={
          <Link to={`posts/${post.slug}`} className="text-brown underline">
            continue reading...
          </Link>
        }
      />
    </div>
  )
}
