import React from 'react'
import { Link } from 'react-router-dom'

export default function PostBlurb({ post }) {
  return (
    <div className="w-full flex flex-col bg-teal-500">
      <Link
        to={`posts/${post.slug}`}
        className="block text-2xl text-blue-700 underline"
      >
        {post.title}
      </Link>
      <div>{post.subtitle}</div>
    </div>
  )
}
