import { create } from 'zustand'

const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  currentSong: null,
  setCurrentSong: (song) => set({ currentSong: song }),

  favorites: [],
  setFavorites: (favorites) => set({ favorites }),

  addFavorite: (song) =>
    set((state) => {
      const exists = state.favorites.some((s) => s.id === song.id)
      if (exists) return state // no update if already in favorites
      return { favorites: [...state.favorites, song] }
    }),

  removeFavorite: (songId) =>
    set((state) => ({
      favorites: state.favorites.filter((s) => s.id !== songId),
    })),

  toggleFavorite: (song) =>
    set((state) => {
      const exists = state.favorites.find((s) => s.id === song.id)
      return {
        favorites: exists
          ? state.favorites.filter((s) => s.id !== song.id)
          : [...state.favorites, song],
      }
    }),
}))

export default useStore
