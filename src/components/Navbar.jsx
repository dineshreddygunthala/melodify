'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import useStore from '@/lib/zustandStore'
import { ArrowLeft, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, favorites, setUser } = useStore()
  const [menuOpen, setMenuOpen] = useState(false)

  const isHome = pathname === '/'

  const handleLogout = () => {
    setUser(null)
    router.push('/')
    setMenuOpen(false)
  }

  return (
    <nav className="w-full bg-black text-white shadow-md py-3">
      <div className="w-full flex items-center justify-between px-3 sm:px-6">
        {/* Left: Logo & Back */}
        <div className="flex items-center gap-2 sm:gap-4">
          {!isHome && (
            <button
              onClick={() => router.back()}
              className="hover:text-blue-400 transition-colors"
            >
              <ArrowLeft size={20} className="sm:size-5" />
            </button>
          )}
          <Link
            href="/"
            className="text-lg sm:text-2xl font-bold whitespace-nowrap"
            onClick={() => setMenuOpen(false)}
          >
            🎵 Melodify
          </Link>
        </div>

        {/* Desktop Right Menu aligned to right edge */}
        <div className="hidden sm:flex items-center gap-4 text-sm sm:text-base">
          {user ? (
            <>
              <Link href="/favorites" className="hover:underline whitespace-nowrap">
                Favorites ({favorites.length})
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-red-400 transition-colors whitespace-nowrap"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline whitespace-nowrap">
                Login
              </Link>
              <Link href="/register" className="hover:underline whitespace-nowrap">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="sm:hidden mt-3 flex flex-col gap-2 px-3 text-sm border-t border-white/10 pt-3">
          {user ? (
            <>
              <Link
                href="/favorites"
                className="hover:underline text-xs"
                onClick={() => setMenuOpen(false)}
              >
                Favorites ({favorites.length})
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-red-400 text-left text-xs"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hover:underline text-xs"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="hover:underline text-xs"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
