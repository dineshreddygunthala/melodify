'use client'

import useStore from '@/lib/zustandStore'
import { useRouter } from 'next/navigation'

export default function FavoritesPage() {
  const { favorites, setCurrentSong } = useStore()
  const router = useRouter()

  if (favorites.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-300 text-base sm:text-lg">
        No favorite songs yet.
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
        Your Favorites
      </h2>

      <div className="space-y-4">
        {favorites.map((song) => (
          <div
            key={song.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-colors duration-200 cursor-pointer"
            onClick={() => setCurrentSong(song)}
          >
            <div className="flex-1">
              <p className="font-semibold text-lg sm:text-xl">{song.title}</p>
              <p className="text-sm text-gray-300 truncate w-full sm:max-w-xs">
                {song.singer} • {song.cinema}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
