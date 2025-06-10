'use client'

import { useParams } from 'next/navigation'
import albums from '@/data/albums'
import Link from 'next/link'

export default function LanguageAlbumsPage() {
  const { language } = useParams()
  const lang = language.charAt(0).toUpperCase() + language.slice(1)
  const albumList = albums[lang] || []

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        {lang} Albums
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {albumList.map((album) => (
          <Link
            key={album.id}
            href={`/songs?albumId=${album.id}`}
            className="bg-white/10 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200"
          >
            <img
              src={album.image}
              alt={album.title}
              className="w-full h-40 sm:h-44 md:h-48 object-cover"
            />
            <p className="p-2 text-center text-sm sm:text-base">{album.title}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
