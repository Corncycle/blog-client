import React from 'react'
import { Link } from 'react-router-dom'

export default function PostBody({ message, to }) {
  return (
    <div className="w-full">
      <div className="p-8">{to ? message : message}</div>
    </div>
  )
}
