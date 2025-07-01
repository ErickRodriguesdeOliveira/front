<template>
  <div v-if="movie && !error" class="details-container">
    <h1>{{ movie.title }}</h1>
    <img :src="posterUrl" alt="Poster" class="poster" />
    <p class="overview">{{ movie.overview }}</p>
    <p class="rating">Nota: {{ movie.vote_average.toFixed(1) }}</p>
    <div class="actions">
      <button @click="toggleFavorite">Favorito</button>
      <button @click="addToWatchList">Assistir depois</button>
    </div>

    <!-- Importa o componente só para avaliações -->
    <MovieReviews :movieId="movie.id" />
  </div>

  <div v-else-if="error" class="details-container">
    <p style="color: red">❌ Erro ao carregar o filme.</p>
  </div>

  <div v-else class="details-container">
    <p>Carregando filme...</p>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMovieStore } from '../store/movieStore'
import MovieReviews from '../components/MovieReviews.vue'

export default {
  components: { MovieReviews },
  setup() {
    const route = useRoute()
    const store = useMovieStore()
    const movie = ref(null)
    const error = ref(false)
    const apiKey = '33623d85704b6445392be4a75bcff31e'
    const movieId = route.params.id

    const posterUrl = computed(() =>
      movie.value ? `https://image.tmdb.org/t/p/w500${movie.value.poster_path}` : ''
    )

    async function fetchMovie() {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`)
        if (!response.ok) throw new Error('Erro na API')
        movie.value = await response.json()
      } catch (e) {
        console.error(e)
        error.value = true
      }
    }

    function toggleFavorite() {
      if (movie.value) store.toggleFavorite(movie.value)
    }

    function addToWatchList() {
      if (movie.value) store.toggleWatchList(movie.value)
    }

    onMounted(() => {
      fetchMovie()
    })

    return {
      movie,
      error,
      toggleFavorite,
      addToWatchList,
      posterUrl
    }
  }
}
</script>

<style scoped>
.details-container {
  max-width: 600px;
  margin: 2rem auto;
  color: white;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.poster {
  width: 300px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0,0,0,0.6);
  margin: 0 auto 1.5rem;
  display: block;
}
.overview {
  margin-top: 1rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #ddd;
}
.rating {
  color: #f1c40f;
  margin: 1rem 0;
  font-weight: 600;
  font-size: 1.1rem;
}
.actions button {
  margin: 0.5rem 0.8rem;
  padding: 0.5rem 1.4rem;
  background: #1db954;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: 600;
  min-width: 120px;
}
.actions button:hover {
  background: #17a445;
}
</style>
