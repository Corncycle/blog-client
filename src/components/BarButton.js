import React from 'react'

export default function BarButton({ onClick, children, title }) {
  return (
    <button
      onClick={onClick}
      className="text-zinc-700 bg-white border-zinc-200 border-1 text-sm px-2 py-1.5 rounded-md shadow-lg hover:shadow-md hover:bg-orange-100 flex flex-row items-center gap-2"
      title={title}
    >
      {children}
    </button>
  )
}
