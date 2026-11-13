import React from 'react'

export default function ErrorDisplay({ message }) {
  return (
    <div className="font-serif flex flex-col items-center">
      {'Error: ' + (message || 'Failed to load component')}
    </div>
  )
}
