import React from 'react'
import { Link } from 'react-router-dom'
import GoogleOAuthWidget from './GoogleOAuthWidget'

export default function TopBar({ credentials, setCredentials }) {
  return (
    <div className="w-full flex justify-center bg-orange-500 py-3 relative">
      <h1>
        <Link to="/" className="text-4xl font-bold text-white">
          Corncycle's Blog
        </Link>
        <GoogleOAuthWidget
          credentials={credentials}
          setCredentials={setCredentials}
          className="right-3 top-1/2 -translate-y-1/2 absolute invisible md:visible"
          authorizedElm={
            <button
              className="text-zinc-700 bg-white border-zinc-200 border-1 text-sm px-2 pr-3 py-1.5 rounded-md shadow-lg hover:shadow-md hover:bg-orange-100 flex flex-row items-center gap-2"
              onClick={() => {
                localStorage.setItem('googleCredentials', null)
                setCredentials(null)
              }}
              title={credentials?.given_name}
            >
              {credentials?.picture && (
                <div
                  className="w-6 h-6 bg-cover rounded-full"
                  style={{ backgroundImage: `url("${credentials?.picture}")` }}
                />
              )}{' '}
              Sign out
            </button>
          }
        />
      </h1>
    </div>
  )
}
