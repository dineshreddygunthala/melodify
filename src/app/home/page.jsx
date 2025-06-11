'use client'

import albums from '@/data/albums'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-black to-gray-900 text-white px-4 sm:px-8 py-10 space-y-12">
      {Object.entries(albums).map(([language, albumList]) => (
        <section key={language}>
          
          <div className="flex justify-between items-center mb-4 px-1">
            <h2 className="text-2xl sm:text-3xl font-bold capitalize tracking-tight text-indigo-300">
              {language} Albums
            </h2>
            <Link
              href={`/albums/${language.toLowerCase()}`}
              className="flex items-center gap-1 text-sm sm:text-base text-indigo-400 hover:underline"
            >
              View More <ChevronRight size={18} />
            </Link>
          </div>

          
          <div className="flex gap-5 overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-transparent pb-2">
            {albumList.map((album) => (
              <Link
                key={album.id}
                href={`/songs?albumId=${album.id}`}
                className="min-w-[140px] sm:min-w-[180px] rounded-xl backdrop-blur-md bg-white/10 border border-white/10 shadow-md hover:shadow-xl hover:scale-105 transition duration-300"
              >
                <img
                  src={album.image}
                  alt={album.title}
                  className="w-full h-28 sm:h-40 object-cover rounded-t-xl"
                />
                <div className="px-2 py-2 text-center">
                  <p className="text-xs sm:text-sm font-medium text-white line-clamp-2 leading-tight">
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
