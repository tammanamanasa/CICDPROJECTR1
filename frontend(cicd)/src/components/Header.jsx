"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from 'lucide-react'
import UserDetails from "./UserDetails"

const Header = () => {
  const [expanded, setExpanded] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20) // Blur effect after 20px scroll
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 left-0 w-full z-50 bg-gray-50 shadow-md transition-all duration-300 ${isScrolled ? "backdrop-blur-md bg-gray-50/70" : ""}`}>
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 md:py-6">
          <div className="flex-shrink-0">
            <Link to="/" className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
              <img className="w-auto h-24" src="logo.svg" alt="ShopNow Logo" />
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="text-gray-900"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
            >
              <span className="sr-only">Toggle menu</span>
              {!expanded ? <Menu className="w-8 h-8" /> : <X className="w-8 h-8" />}
            </button>
          </div>

          <div className="hidden lg:ml-auto lg:flex lg:items-center">
            <UserDetails />
          </div>
        </div>

        {expanded && (
          <nav className="px-1 py-8">
            <div className="grid gap-y-7">
              <UserDetails />
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
