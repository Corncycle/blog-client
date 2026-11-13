import React from 'react'
import { Link } from 'react-router-dom'
import GoogleOAuthWidget from '../GoogleOAuthWidget'
import BarButton from '../BarButton'

export default function TopBar({ credentials, setCredentials, isAdmin }) {
  return (
    <div className="w-full flex justify-center bg-theme4 py-4 relative z-10 mb-2 shadow-md">
      <h1>
        <Link
          to="/"
          className="text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]"
        >
          Corncycle's Blog
        </Link>
        <GoogleOAuthWidget
          credentials={credentials}
          setCredentials={setCredentials}
          className="right-4 top-1/2 -translate-y-1/2 absolute invisible md:visible flex flex-row gap-2"
          authorizedElm={
            <>
              {isAdmin && (
                <>
                  <BarButton>
                    <Link to="/posts/new">New Post</Link>
                  </BarButton>
                  <BarButton>Disable Comments</BarButton>
                </>
              )}
              <BarButton
                onClick={() => {
                  localStorage.setItem('googleCredentials', null)
                  setCredentials(null)
                }}
                title={credentials?.given_name}
              >
                {credentials?.picture && (
                  <div
                    className="w-6 h-6 bg-cover rounded-full"
                    style={{
                      backgroundImage: `url("${credentials?.picture}")`,
                    }}
                  />
                )}{' '}
                Sign out
              </BarButton>
            </>
          }
        />
      </h1>
    </div>
  )
}
