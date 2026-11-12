import React, { useEffect, useState } from 'react'
import Loading from '../util/Loading'
import ErrorDisplay from '../util/ErrorDisplay'
import { getPath } from '../../util'
import { Link } from 'react-router-dom'

const monthsLookup = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
}

export default function SideBarMonth({ year, month, count, posts }) {
  return (
    <details>
      <summary>{monthsLookup[month] + ' ' + year + ' (' + count + ')'}</summary>
      <div className="-indent-4 ml-6">
        {false || posts.length === 0 ? (
          <Loading size="small" message="Loading..." />
        ) : posts.length === 0 ? (
          <ErrorDisplay message="blah" />
        ) : (
          <div>
            {posts.map((post, i) => {
              return (
                <Link
                  to={`posts/${post[0]}`}
                  className="block text-blue-700 underline"
                  key={year * 1000 + month * 10 + i}
                  dangerouslySetInnerHTML={{ __html: post[1] }}
                ></Link>
              )
            })}
          </div>
        )}
      </div>
    </details>
  )
}
