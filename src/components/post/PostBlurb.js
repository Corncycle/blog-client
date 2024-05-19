import React from 'react'
import { Link } from 'react-router-dom'
import PostHeader from './PostHeader'
import PostBody from './PostBody'

export default function PostBlurb({ post }) {
  return (
    <div className="w-full flex flex-col">
      <PostHeader message={post.title_html} to={`posts/${post.slug}`} />
      <PostBody
        date={post.created_at}
        message={post.blurb_html}
        append={
          <Link to={`posts/${post.slug}`} className="text-brown underline">
            continue reading...
          </Link>
        }
      />
    </div>
  )
}
