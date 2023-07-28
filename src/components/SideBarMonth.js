import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import ErrorDisplay from './ErrorDisplay'
import { getPath } from '../util'
import { Link } from 'react-router-dom'

const monthsLookup = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
}

export default function SideBarMonth({ year, month, count }) {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isLoading) {
      ;(async function () {
        try {
          const postsData = await getPath(
            `/postsByMonth/${year}${month.padStart(2, '0')}`,
          )
          setPosts(postsData.reverse())
          setIsLoading(false)
        } catch (err) {}
      })()
    }
  }, [isLoading])

  return (
    <details>
      <summary
        onClick={(e) => {
          if (!isLoading && posts.length == 0) {
            setIsLoading(true)
          }
        }}
      >
        {monthsLookup[month] + ' ' + year + ' (' + count + ')'}
      </summary>
      <div className="-indent-4 ml-6">
        {isLoading || posts.length === 0 ? (
          <Loading size="small" message="Loading..." />
        ) : posts.length === 0 ? (
          <ErrorDisplay message="blah" />
        ) : (
          <div>
            {posts.map((post, i) => {
              return (
                <Link
                  to={`posts/${post.slug}`}
                  className="block text-blue-700 underline"
                  key={year * 1000 + month * 10 + i}
                >
                  {post.title}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </details>
  )
}
