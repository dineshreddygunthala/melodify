import { Suspense } from 'react'
import SongsPageClient from '@/app/songs/SongsPageClient.jsx'

export default function SongsPage() {
  return (
    <Suspense fallback={<div className="p-4 text-white">Loading songs...</div>}>
      <SongsPageClient />
    </Suspense>
  )
}
