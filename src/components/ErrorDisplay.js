import React from 'react'

export default function ErrorDisplay({ message }) {
  return <div>{'Error: ' + (message || 'Failed to load component')}</div>
}
