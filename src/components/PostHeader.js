import React from 'react'
import { Link } from 'react-router-dom'

export default function PostHeader({ message, to }) {
  return (
    <div className="w-full mt-4 px-8 py-4 bg-orange-300">
      <div className="block text-2xl">
        {to ? (
          <Link to={to} className="text-blue-700">
            {message}
          </Link>
        ) : (
          message
        )}
      </div>
    </div>
  )
}
