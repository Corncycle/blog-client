import React from 'react'
import { Link } from 'react-router-dom'

export default function TopBar() {
  return (
    <div className="w-full flex justify-center bg-slate-400">
      <h1>
        <Link to="/">Caleb's Blog</Link>
      </h1>
    </div>
  )
}
