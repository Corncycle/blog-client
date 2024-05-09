import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import React from 'react'

export default function GoogleOAuthWidget({
  credentials,
  setCredentials,
  className,
  authorizedElm, // element to display when the client is logged in
}) {
  return (
    <div className={className}>
      {credentials ? (
        authorizedElm
      ) : (
        <GoogleLogin
          onSuccess={(credentialsResponse) => {
            const creds = jwtDecode(credentialsResponse.credential)
            creds.rawJwt = credentialsResponse.credential
            console.log(creds)
            setCredentials(creds)
          }}
        />
      )}
    </div>
  )
}
