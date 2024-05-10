import React from 'react'
import { Link } from 'react-router-dom'
import GoogleOAuthWidget from './GoogleOAuthWidget'
import BarButton from './BarButton'

export default function TopBar({ credentials, setCredentials, isAdmin }) {
  return (
    <div className="w-full flex justify-center bg-orange-500 py-3 relative">
      <h1>
        <Link to="/" className="text-4xl font-bold text-white">
          Corncycle's Blog
        </Link>
        <GoogleOAuthWidget
          credentials={credentials}
          setCredentials={setCredentials}
          className="right-3 top-1/2 -translate-y-1/2 absolute invisible md:visible flex flex-row gap-2"
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
