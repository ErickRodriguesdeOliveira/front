<template>
  <div class="page-container">
    <h2>Assistir Depois</h2>
    <div class="movie-grid">
      <MovieCard
        v-for="movie in watchList"
        :key="movie.id"
        :movie="movie"
        :title="movie.title"
        :image="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
        :rating="movie.vote_average"
      />
    </div>
  </div>
</template>

<script>
import { useMovieStore } from '../store/movieStore'
import MovieCard from '../MovieCard.vue'

export default {
  components: { MovieCard },
  setup() {
    const store = useMovieStore()
    return { watchList: store.watchList }
  }
}
</script>

<style scoped>
.page-container {
  padding: 2rem;
  color: white;
}
.movie-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
