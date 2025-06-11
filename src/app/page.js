'use client'

import albums from '@/data/albums'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="space-y-10 px-4 sm:px-8 py-6">
      {Object.entries(albums).map(([language, albumList]) => (
        <section key={language}>
          {/* Section Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl sm:text-3xl font-semibold text-indigo-900 capitalize tracking-tight">
              {language} Albums
            </h2>
            <Link
              href={`/albums/${language.toLowerCase()}`}
              className="flex items-center gap-1 text-sm sm:text-base text-indigo-600 hover:underline"
            >
              View More <ChevronRight size={18} />
            </Link>
          </div>

          {/* Album List */}
          <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-indigo-100 pb-2">
            {albumList.map((album) => (
              <Link
                key={album.id}
                href={`/songs?albumId=${album.id}`}
                className="min-w-[120px] sm:min-w-[180px] bg-white rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <img
                  src={album.image}
                  alt={album.title}
                  className="w-full h-24 sm:h-40 object-cover rounded-t-xl"
                />
                <div className="px-2 py-2">
                  <p className="text-center text-[11px] sm:text-sm font-semibold text-gray-800 line-clamp-2 leading-tight">
                    {album.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
