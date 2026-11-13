import React from 'react'
import { Link } from 'react-router-dom'
import { dateToFormatted } from '../../util'

export default function PostBody({ date, message, to, append }) {
  return (
    <div className="w-full post-body-view font-serif">
      <div className="p-8 pt-2 flex-col">
        <div className="w-full flex justify-end text-sm text-gray-500">{`Posted ${dateToFormatted(
          date,
        )}`}</div>
        <div dangerouslySetInnerHTML={{ __html: message }}></div>
        {append}
      </div>
    </div>
  )
}
