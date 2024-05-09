import React, { useEffect, useState } from 'react'
import TopBar from './components/TopBar'
import SideBar from './components/SideBar'
import HomeContent from './components/HomeContent'
import Loading from './components/Loading'
import ErrorDisplay from './components/ErrorDisplay'
import { getPath } from './util'
import { Route, Routes, useLocation } from 'react-router-dom'
import PostFull from './components/PostFull'
import NewPostContent from './components/NewPostContent'
import EditPostContent from './components/EditPostContent'

const App = () => {
  const location = useLocation()

  const [sideData, setSideData] = useState({})
  const [loadingSideData, setLoadingSideData] = useState(true)

  const [credentials, setCredentials] = useState(null)

  // populate sidebar data
  useEffect(() => {
    ;(async function () {
      try {
        const data = await getPath('/postsByMonth')

        setSideData(data)
        setLoadingSideData(false)
      } catch (err) {
        setLoadingSideData(false)
      }
    })()
  }, [])

  // use credentials if we have some in localstorage and they haven't expired
  useEffect(() => {
    const storedCreds = JSON.parse(localStorage.getItem('googleCredentials'))
    if (storedCreds?.exp) {
      console.log('Expiration date of your stored credentials:')
      console.log(new Date(storedCreds.exp * 1000)) // google's unix timestamps are to the second
      if (new Date() <= new Date(storedCreds.exp * 1000)) {
        console.log("our token hasn't expired")
        setCredentials(storedCreds)
      } else {
        console.log('our token has expired')
        localStorage.setItem('googleCredentials', null)
      }
    }
  }, [])

  return (
    <div className="w-full mb-10">
      <div>
        <TopBar
          credentials={credentials}
          setCredentials={setCredentials}
        ></TopBar>
        <div className="relative flex flex-col-reverse lg:block">
          <div className="block max-w-3xl w-full m-auto">
            <Routes>
              <Route path="/" element={<HomeContent />} />
              <Route path="/posts/new" element={<NewPostContent />} />
              <Route
                path="/posts/:slug"
                element={<PostFull location={location} />}
              />
              <Route
                path="/posts/:slug/edit"
                element={<EditPostContent location={location} />}
              />
              <Route
                path="/*"
                element={
                  <div>
                    {`Unknown path '${location.pathname}' Try selecting a post from the sidebar, or returning the home page.`}
                  </div>
                }
              />
            </Routes>
          </div>
          <div className="lg:absolute lg:right-0 lg:top-0 lg:w-48 p-2 bg-white">
            {loadingSideData ? (
              <Loading size="small" message="Loading..." />
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
