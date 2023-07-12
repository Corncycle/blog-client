import React from 'react'
import TopBar from './components/TopBar'
import SideBar from './components/SideBar'
import MainContent from './components/MainContent'

const App = () => {
  return (
    <div className="w-full">
      <div>
        <TopBar></TopBar>
        <div className="relative">
          <div className="block max-w-xl bg-red-600 m-auto">
            <MainContent></MainContent>
          </div>
          <SideBar></SideBar>
        </div>
      </div>
    </div>
  )
}

export default App
