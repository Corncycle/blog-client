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
  const [isAdmin, setIsAdmin] = useState(false)

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
      if (new Date() <= new Date(storedCreds.exp * 1000)) {
        // token is still active (google's unix timestamps are to the second)
        setCredentials(storedCreds)
      } else {
        // token expired
        localStorage.setItem('googleCredentials', null)
      }
    }
  }, [])

  // on the frontend, we set admin if the email associated with the signed-in account is in the admin whitelist, for simplicity
  // on the backend, we verify the jwt before allowing admin actions to be executed, for security
  useEffect(() => {
    const whitelist = ['corncycle@gmail.com']
    if (whitelist.includes(credentials?.email)) {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }
  }, [credentials])

  return (
    <div className="w-full mb-10">
      <div>
        <TopBar
          credentials={credentials}
          setCredentials={setCredentials}
          isAdmin={isAdmin}
        ></TopBar>
        <div className="relative flex flex-col-reverse lg:block">
          <div className="block max-w-3xl w-full m-auto">
            <Routes>
              <Route path="/" element={<HomeContent />} />
              <Route
                path="/posts/new"
                element={<NewPostContent credentials={credentials} />}
              />
              <Route
                path="/posts/:slug"
                element={<PostFull location={location} isAdmin={isAdmin} />}
              />
              <Route
                path="/posts/:slug/edit"
                element={
                  <EditPostContent
                    location={location}
                    credentials={credentials}
                  />
                }
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
