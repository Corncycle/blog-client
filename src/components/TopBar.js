import React from 'react'
import { Link } from 'react-router-dom'

export default function TopBar() {
  return (
    <div className="w-full flex justify-center bg-orange-500 py-2">
      <h1>
        <Link to="/" className="text-4xl font-bold text-white">
          Corncycle's Blog
        </Link>
      </h1>
    </div>
  )
}
