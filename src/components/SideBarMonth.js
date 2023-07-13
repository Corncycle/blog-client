import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import ErrorDisplay from './ErrorDisplay'
import { getPath } from '../util'

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
    ;(async function () {
      console.log()
    })()
  }, [])

  useEffect(() => {
    if (isLoading) {
      ;(async function () {
        const postsData = await getPath(
          `/api/postsByMonth/${year}${month.padStart(2, '0')}`,
        )
        setPosts(postsData)
        setIsLoading(false)
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
      {isLoading || posts.length === 0 ? (
        <Loading />
      ) : posts.length === 0 ? (
        <ErrorDisplay message="blah" />
      ) : (
        <div>
          {posts.map((post) => {
            return (
              <a className="block text-blue-800" href={`/posts/${post.slug}`}>
                {post.title}
              </a>
            )
          })}
        </div>
      )}
    </details>
  )
}
