'use client'

import { useParams } from 'next/navigation'
import albums from '@/data/albums'
import Link from 'next/link'

export default function LanguageAlbumsPage() {
  const { language } = useParams()
  const lang = language.charAt(0).toUpperCase() + language.slice(1)
  const albumList = albums[lang] || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 sm:px-6 lg:px-12 py-8 text-white">
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center">
        {lang} Albums
      </h2>

      {albumList.length === 0 ? (
        <p className="text-center text-gray-400">No albums available in this language.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {albumList.map((album) => (
            <Link
              key={album.id}
              href={`/songs?albumId=${album.id}`}
              className="group rounded-xl overflow-hidden bg-white/5 hover:bg-white/10 transition duration-300 shadow-md hover:shadow-lg backdrop-blur-sm"
            >
              <div className="overflow-hidden">
                <img
                  src={album.image}
                  alt={album.title}
                  className="w-full h-40 sm:h-44 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3 text-center">
                <p className="text-sm sm:text-base font-medium text-white group-hover:text-indigo-300 transition duration-200">
                  {album.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
