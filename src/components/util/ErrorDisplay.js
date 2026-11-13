import React from 'react'

export default function ErrorDisplay({ message, className }) {
  return (
    <div className={`font-serif flex flex-col items-center ${className}`}>
      {'Error: ' + (message || 'Failed to load component')}
    </div>
  )
}
