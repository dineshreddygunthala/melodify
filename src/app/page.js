'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function WelcomePage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home') 
    }, 5000) 

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 to-purple-900 text-white">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold animate-pulse">🎵 Welcome to Melody 🎵</h1>
        <p className="text-lg">Get ready to explore music like never before...</p>
        <p className="text-sm text-gray-200">Redirecting in 10 seconds...</p>
      </div>
    </div>
  )
}
