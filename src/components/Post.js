import React from 'react'

export default function Post({ post }) {
  return (
    <div className="w-full flex flex-col bg-teal-500">
      <div className="text-2xl">{post.title}</div>
      <div>{post.body}</div>
    </div>
  )
}
