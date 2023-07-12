import React, { Suspense } from 'react'
import Loading from './Loading'
import Post from './Post'

export default function PostSection({ posts }) {
  return (
    <div className="w-full bg-emerald-500">
      {posts.map((post) => {
        return <Post post={post} />
      })}
    </div>
  )
}
