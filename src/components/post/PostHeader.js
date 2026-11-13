import React from 'react'
import { Link } from 'react-router-dom'
import EditLogo from '../../../public/assets/edit.svg'
import DeleteLogo from '../../../public/assets/delete.svg'

export default function PostHeader({ message, to, showActions }) {
  return (
    <div className="mt-4 p-3 border-pattern shadow-md">
      <div className={`w-full px-6 py-3 bg-theme4 relative`}>
        <div className="block text-2xl font-bold">
          {to ? (
            <Link
              to={to}
              dangerouslySetInnerHTML={{ __html: message }}
              className="text-white"
            ></Link>
          ) : (
            <div
              className="text-white"
              dangerouslySetInnerHTML={{ __html: message }}
            />
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
    </div>
  )
}
