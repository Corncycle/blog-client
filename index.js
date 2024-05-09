import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './src/App.js'

import { BrowserRouter } from 'react-router-dom'

import './dist/style.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <GoogleOAuthProvider clientId="607612451084-qal8us7moirfr4q4f6p36kbtocd2109j.apps.googleusercontent.com">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GoogleOAuthProvider>,
)
