import React, { useEffect, useState } from 'react'
import TopBar from './components/TopBar'
import SideBar from './components/SideBar'
import MainContent from './components/MainContent'
import Loading from './components/Loading'
import ErrorDisplay from './components/ErrorDisplay'
import { getPath } from './util'

const App = () => {
  const [sideData, setSideData] = useState({})
  const [loadingSideData, setLoadingSideData] = useState(true)

  useEffect(() => {
    ;(async function () {
      try {
        const data = await getPath('/api/postsByMonth')

        setSideData(data)
        setLoadingSideData(false)
      } catch (err) {
        setLoadingSideData(false)
      }
    })()
  }, [])

  return (
    <div className="w-full">
      <div>
        <TopBar></TopBar>
        <div className="relative">
          <div className="block max-w-xl bg-red-600 m-auto">
            <MainContent></MainContent>
          </div>
          <div className="absolute right-0 top-0 bg-zinc-300">
            {loadingSideData ? (
              <Loading />
            ) : Object.keys(sideData).length === 0 ? (
              <ErrorDisplay message="Failed to retrieve monthly data" />
            ) : (
              <SideBar data={sideData} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
