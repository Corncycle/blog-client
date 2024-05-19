import React from 'react'
import { dateToFormatted } from '../../util'

export default function Comment({ comment }) {
  return (
    <div className="w-full flex border-gray-300 border-1">
      <div className="flex flex-col w-1/5 min-w-28 p-4 bg-gray-100">
        <div
          className="w-10 h-10 bg-cover rounded-full"
          style={{
            backgroundImage: `url("${comment.picture}")`,
          }}
        ></div>
        <div className="font-bold pt-2">{comment.display_name}</div>
        <div className="text-xs text-gray-500">
          {dateToFormatted(comment.created_at)}
        </div>
      </div>
      <div className="w-2 bg-gray-200"></div>
      <div className="w-full p-4">
        <div className="font-serif">{comment.body}</div>
      </div>
    </div>
  )
}
