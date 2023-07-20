import React from 'react'
import { Link } from 'react-router-dom'

export default function PostBody({ message, to }) {
  return (
    <div className="w-full post-body-view">
      <div className="p-8" dangerouslySetInnerHTML={{ __html: message }}></div>
    </div>
  )
}
