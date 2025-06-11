'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import useStore from '@/lib/zustandStore';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, favorites, setUser } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === '/';

  const handleLogout = () => {
    setUser(null);
    router.push('/');
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between">
        
        
        <div className="flex items-center gap-3">
          {!isHome && (
            <button
              onClick={() => router.back()}
              className="text-white hover:text-indigo-300 transition"
              title="Go Back"
            >
              <ArrowLeft size={22} />
            </button>
          )}
          <Link
            href="/home"
            className="text-xl sm:text-2xl font-bold tracking-wide hover:scale-105 transition-transform"
            onClick={() => setMenuOpen(false)}
          >
            🎵 Melodify
          </Link>
        </div>

        
        <div className="hidden sm:flex items-center gap-6 font-medium text-base">
          {user ? (
            <>
              <Link href="/favorites" className="hover:text-indigo-300 transition">
                Favorites ({favorites.length})
              </Link>
              <button onClick={handleLogout} className="hover:text-red-400 transition">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-indigo-300 transition">
                Login
              </Link>
              <Link href="/register" className="hover:text-indigo-300 transition">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white hover:text-indigo-300 transition"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      
      {menuOpen && (
        <div className="sm:hidden bg-indigo-950 px-4 py-5 text-sm flex flex-col items-center gap-4 transition-all duration-300">
          {user ? (
            <>
              <Link
                href="/favorites"
                className="hover:text-indigo-300 transition"
                onClick={() => setMenuOpen(false)}
              >
                Favorites ({favorites.length})
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-red-400 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hover:text-indigo-300 transition"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="hover:text-indigo-300 transition"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
