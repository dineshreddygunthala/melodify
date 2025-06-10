'use client'

import albums from '@/data/albums'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="space-y-6 sm:space-y-10 px-0">
      {Object.entries(albums).map(([language, albumList]) => (
        <section key={language}>
          {/* Section header */}
          <div className="flex justify-between items-center mb-2 sm:mb-4 px-2 sm:px-6">
            <h2 className="text-[11px] sm:text-2xl font-semibold">
              {language} Albums
            </h2>
            <Link
              href={`/albums/${language.toLowerCase()}`}
              className="text-blue-400 flex items-center text-[10px] sm:text-base hover:underline"
            >
              View More <ChevronRight size={12} className="ml-1" />
            </Link>
          </div>

          {/* Album list */}
          <div className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-1 sm:pb-2 px-2 sm:px-6">
            {albumList.map((album) => (
              <Link
                key={album.id}
                href={`/songs?albumId=${album.id}`}
                className="min-w-[90px] sm:min-w-[160px] bg-white/10 rounded-md overflow-hidden hover:scale-105 transition"
              >
                <img
                  src={album.image}
                  alt={album.title}
                  className="w-full h-16 sm:h-32 object-cover"
                />
                <p className="p-1 sm:p-2 text-[9px] sm:text-sm text-center">
                  {album.title}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
