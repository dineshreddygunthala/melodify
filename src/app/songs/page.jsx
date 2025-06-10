'use client'

import { useSearchParams } from 'next/navigation'
import songsData from '@/data/songs'
import useStore from '@/lib/zustandStore'
import { Heart } from 'lucide-react'

export default function SongsPage() {
  const searchParams = useSearchParams()
  const albumId = searchParams.get('albumId')

  const songs = songsData[albumId] || []
  const { currentSong, setCurrentSong, favorites, toggleFavorite } = useStore()

  const isFavorite = (song) => favorites.some((s) => s.id === song.id)

  return (
    <div className="space-y-4 px-3 sm:px-6 pb-20 pt-4 sm:pt-10">
      <h2 className="text-[13px] sm:text-2xl font-semibold mb-2">Songs</h2>

      <div className="space-y-3">
        {songs.map((song) => (
          <div
            key={song.id}
            className="flex items-center justify-between bg-white/10 p-3 rounded-lg hover:bg-white/20 transition cursor-pointer"
            onClick={() => setCurrentSong(song)}
          >
            <div className="w-3/4">
              <p className="font-medium text-[11px] sm:text-base truncate">{song.title}</p>
              <p className="text-[10px] sm:text-sm text-gray-300 truncate">
                {song.singer} • {song.cinema}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleFavorite(song)
              }}
            >
              <Heart
                size={18}
                className={`transition ${
                  isFavorite(song) ? 'fill-red-500 text-red-500' : 'text-white'
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {currentSong && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[92%] bg-white/10 p-3 rounded-lg shadow-lg backdrop-blur-lg">
          <div className="flex items-center justify-between gap-3">
            <div className="w-2/3">
              <p className="font-semibold text-[11px] truncate">{currentSong.title}</p>
              <p className="text-[10px] text-gray-300 truncate">
                {currentSong.singer} • {currentSong.cinema}
              </p>
            </div>

            <audio controls className="w-24 sm:w-64">
              <source src={currentSong.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      )}
    </div>
  )
}
