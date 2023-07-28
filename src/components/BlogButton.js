import React from 'react'

export default function BlogButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="bg-orange-700 hover:bg-orange-500 text-white px-4 py-1 rounded-lg font-bold select-none"
    >
      {children}
    </button>
  )
}
