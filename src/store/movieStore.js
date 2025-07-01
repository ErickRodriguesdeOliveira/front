import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMovieStore = defineStore('movie', () => {
  const favorites = ref([])
  const watchList = ref([])
  const reviews = ref([]) // avaliações

  function toggleFavorite(movie) {
    const index = favorites.value.findIndex(f => f.id === movie.id)
    if (index >= 0) {
      favorites.value.splice(index, 1)
    } else {
      favorites.value.push(movie)
    }
  }

  function toggleWatchList(movie) {
    const index = watchList.value.findIndex(m => m.id === movie.id)
    if (index >= 0) {
      watchList.value.splice(index, 1)
    } else {
      watchList.value.push(movie)
    }
  }

  // adiciona uma avaliação
  function addReview(movieId, author, rating, comment) {
    reviews.value.push({ movieId, author, rating, comment })
  }

  // retorna avaliações de um filme
  function getReviews(movieId) {
    return reviews.value.filter(r => r.movieId === movieId)
  }

  return {
    favorites,
    watchList,
    reviews,
    toggleFavorite,
    toggleWatchList,
    addReview,
    getReviews
  }
})
