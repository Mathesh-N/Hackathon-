"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, TrendingUp } from "lucide-react"
import { AboutModal } from "@/components/about-modal"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">SentimentFlow</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => setIsAboutOpen(true)} className="text-gray-600 hover:text-gray-900 font-medium">
                About
              </button>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900 font-medium">
                Pricing
              </Link>
              <Link href="/help" className="text-gray-600 hover:text-gray-900 font-medium">
                Help Center
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-medium">
                Contact
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => {
                    setIsAboutOpen(true)
                    setIsMenuOpen(false)
                  }}
                  className="text-gray-600 hover:text-gray-900 font-medium text-left"
                >
                  About
                </button>
                <Link href="/pricing" className="text-gray-600 hover:text-gray-900 font-medium">
                  Pricing
                </Link>
                <Link href="/help" className="text-gray-600 hover:text-gray-900 font-medium">
                  Help Center
                </Link>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-medium">
                  Contact
                </Link>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <Button variant="ghost" asChild>
                    <Link href="/signin">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </>
  )
}
