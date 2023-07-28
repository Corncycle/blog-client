import React from 'react'

export default function Loading({ size, message, className }) {
  let defaultMessage
  switch (size) {
    case 'small':
      defaultMessage = 'Loading...'
      break
    case 'large':
      defaultMessage = 'LOADING...'
      break
    default:
      defaultMessage = 'Unknown loading format!'
  }

  const shownMessage = message || defaultMessage

  if (!size || size === 'small') {
    return <div className={`${className}`}>{shownMessage}</div>
  } else if (size === 'large') {
    return (
      <div className={`${className} flex flex-col items-center w-full gap-4`}>
        <div className="font-bold text-gray-500">{shownMessage}</div>
        <div className="relative w-full max-w-sm h-1">
          <div className="absolute bg-gray-500 left-0 h-full animate-loading-bar-all"></div>
        </div>
      </div>
    )
  } else {
    return <div className={`${className}`}>{shownMessage}</div>
  }
}
