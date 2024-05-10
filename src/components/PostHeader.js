import React from 'react'
import { Link } from 'react-router-dom'
import EditLogo from '../../public/assets/edit.svg'
import DeleteLogo from '../../public/assets/delete.svg'

export default function PostHeader({ message, to, showActions }) {
  return (
    <div className="w-full mt-4 px-8 py-4 bg-orange-300 relative">
      <div className="block text-2xl font-bold">
        {to ? (
          <Link to={to} className="text-brown">
            {message}
          </Link>
        ) : (
          message
        )}
        {showActions && (
          <div className="absolute top-5 right-6 flex flex-row gap-3">
            <Link className="w-4 h-4" to="./edit">
              <EditLogo />
            </Link>
            <button className="w-4 h-4">
              <DeleteLogo />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
