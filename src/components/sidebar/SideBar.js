import React from 'react'
import SideBarMonth from './SideBarMonth'

export default function SideBar({ data }) {
  const yearNodes = []
  const years = Object.keys(data).sort().reverse()
  for (const year of years) {
    const monthNodes = []
    const sortedMonths = Object.keys(data[year]).sort(
      (a, b) => Number(a) - Number(b),
    )
    for (const month of sortedMonths) {
      monthNodes.push(
        <SideBarMonth
          year={year}
          month={month}
          count={data[year][month].length}
          key={year * 100 + month}
          posts={data[year][month]}
        />,
      )
    }

    const yearTotal = Object.values(data[year]).reduce(
      (curr, next) => curr + next.length,
      0,
    )
    const yearNode = (
      <h3 key={year}>
        <details>
          <summary className="cursor-default">
            <span>{`${year} (${yearTotal})`}</span>
          </summary>
          <div className="ml-4 cursor-default">{monthNodes}</div>
        </details>
      </h3>
    )
    yearNodes.push(yearNode)
  }

  return <div className="sidebar text-sm">{yearNodes}</div>
}
