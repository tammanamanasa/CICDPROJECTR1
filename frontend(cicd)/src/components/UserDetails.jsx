"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Settings, LogOut } from 'lucide-react'

const UserDetails = () => {
  const [user, setUser] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState({ username: "", email: "" })
  const dropdownRef = useRef(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) setUser(JSON.parse(storedUser))

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (user) {
      setEditedUser({ username: user.username, email: user.email })
    }
  }, [user])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    setIsDropdownOpen(false)
  }

  const handleUpdateUser = (e) => {
    e.preventDefault()
    const updatedUser = { ...user, ...editedUser }
    localStorage.setItem("user", JSON.stringify(updatedUser))
    setUser(updatedUser)
    setIsEditing(false)
  }

  return user ? (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-10 h-10 flex items-center justify-center rounded-full focus:outline-none"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <span className="text-white text-lg font-bold">
          {user.username.charAt(0).toUpperCase()}
        </span>
      </button>

      {isDropdownOpen && (
        <div
  className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg py-2 border border-gray-200 z-50">          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-semibold text-gray-900">{user.username}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          {/* Edit Profile Form */}
          {isEditing ? (
            <form onSubmit={handleUpdateUser} className="px-4 py-3 border-b border-gray-200">
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-500">Username</label>
                  <input
                    type="text"
                    value={editedUser.username}
                    onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <input
                    type="email"
                    value={editedUser.email}
                    onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-2 bg-gray-200 text-gray-800 text-sm rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <Settings className="w-4 h-4 mr-2" />
              Account Settings
            </button>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </button>
        </div>
      )}
    </div>
  ) : (
    <div className="flex items-center space-x-6">
      <Link
        to="/login"
        className="px-6 py-3 text-lg font-bold text-gray-900 border-2 border-gray-900 rounded-xl hover:bg-gray-100"
      >
        Login
      </Link>
      <Link
        to="/registration"
        className="px-6 py-3 text-lg font-bold text-white bg-gray-900 border-2 border-gray-900 rounded-xl hover:bg-gray-600"
      >
        Sign up
      </Link>
    </div>
  )
}

export default UserDetails
