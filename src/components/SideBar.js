import React from 'react'
import SideBarMonth from './SideBarMonth'

export default function SideBar({ data }) {
  const yearNodes = []
  const years = Object.keys(data).sort().reverse()
  for (const year of years) {
    const monthNodes = []
    for (const month of Object.keys(data[year])) {
      monthNodes.push(
        <SideBarMonth
          year={year}
          month={month}
          count={data[year][month]}
          key={year * 100 + month}
        />,
      )
    }

    const yearTotal = Object.values(data[year]).reduce(
      (a, b) => Number(a) + Number(b),
      0,
    )
    const yearNode = (
      <h3 key={year}>
        <details>
          <summary>
            <span>{`${year} (${yearTotal})`}</span>
          </summary>
          <div className="ml-4">{monthNodes}</div>
        </details>
      </h3>
    )
    yearNodes.push(yearNode)
  }

  return <div>{yearNodes}</div>
}
