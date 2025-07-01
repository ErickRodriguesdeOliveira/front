<template>
  <div class="app">
    <div v-if="toastMessage" class="toast">
      {{ toastMessage }}
    </div>

    <section
      v-for="(section, index) in visibleSections"
      :key="index"
      class="carousel-section"
    >
      <h2 class="section-title">{{ section.title }}</h2>
      <div class="carousel-wrapper">
        <button class="arrow left" @click="scrollLeft(index)">&#10094;</button>

        <div class="carousel" :ref="el => setCarouselRef(el, index)">
          <MovieCard
            v-for="movie in section.movies"
            :key="movie.id"
            :title="movie.title"
            :image="'https://image.tmdb.org/t/p/w300' + movie.poster_path"
            :rating="movie.vote_average"
            :movie="movie"
            @show-toast="showToast"
          />
        </div>

        <button class="arrow right" @click="scrollRight(index)">&#10095;</button>
      </div>
    </section>
  </div>
</template>

<script>
import MovieCard from '../MovieCard.vue'
import { useMovieStore } from '../store/movieStore'

export default {
  components: { MovieCard },
  props: {
    searchQuery: String
  },
  data() {
    return {
      apiKey: '33623d85704b6445392be4a75bcff31e',
      sections: [
        { title: 'Filmes Populares', fetch: this.fetchPopular, movies: [] },
        { title: 'Ação', genreId: 28, movies: [] },
        { title: 'Comédia', genreId: 35, movies: [] },
        { title: 'Drama', genreId: 18, movies: [] },
        { title: 'Terror', genreId: 27, movies: [] }
      ],
      carouselRefs: [],
      toastMessage: null,
      toastTimeout: null
    }
  },
  computed: {
    store() {
      return useMovieStore()
    },
    visibleSections() {
      if (this.searchQuery && this.searchQuery.trim() !== '') {
        return [this.sections[0]]
      }
      return this.sections
    }
  },
  methods: {
    showToast(msg) {
      this.toastMessage = msg
      clearTimeout(this.toastTimeout)
      this.toastTimeout = setTimeout(() => {
        this.toastMessage = null
      }, 3000)
    },
    setCarouselRef(el, index) {
      if (el) this.carouselRefs[index] = el
    },
    async fetchPopular() {
      // Limpa antes para evitar duplicações
      this.sections[0].movies = []
      const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=pt-BR`)
      const data = await res.json()
      this.sections[0].movies = data.results
      this.sections[0].title = 'Filmes Populares'
    },
    async fetchGenre(index, genreId) {
      this.sections[index].movies = []
      const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=pt-BR&with_genres=${genreId}`)
      const data = await res.json()
      this.sections[index].movies = data.results
    },
    async fetchAllSections() {
      // Limpa todas as listas antes de popular
      this.sections.forEach(section => (section.movies = []))
      await this.fetchPopular()
      for (let i = 1; i < this.sections.length; i++) {
        await this.fetchGenre(i, this.sections[i].genreId)
      }
    },
    async searchMovies(query) {
      // Limpa antes
      this.sections[0].movies = []
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=pt-BR&query=${query}`)
      const data = await res.json()
      this.sections[0].movies = data.results
      this.sections[0].title = 'Resultados da Busca'
    },
    scrollLeft(index) {
      if (this.carouselRefs[index]) {
        this.carouselRefs[index].scrollLeft -= 400
      }
    },
    scrollRight(index) {
      if (this.carouselRefs[index]) {
        this.carouselRefs[index].scrollLeft += 400
      }
    }
  },
  watch: {
    searchQuery(newQuery) {
      if (newQuery && newQuery.trim()) {
        this.searchMovies(newQuery)
      } else {
        this.sections[0].title = 'Filmes Populares'
        this.fetchAllSections()
      }
    }
  },
  mounted() {
    this.fetchAllSections()
  }
}
</script>

<style scoped>
.app {
  background-color: #111;
  color: #fff;
  min-height: 100vh;
  padding: 1rem;
  font-family: 'Segoe UI', sans-serif;
}

.toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #444;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  z-index: 9999;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
  animation: fadeInOut 3s ease forwards;
  font-size: 0.95rem;
}

@keyframes fadeInOut {
  0% { opacity: 0; transform: translate(-50%, -10px); }
  10% { opacity: 1; transform: translate(-50%, 0); }
  90% { opacity: 1; }
  100% { opacity: 0; transform: translate(-50%, -10px); }
}

.section-title {
  margin: 2rem 1rem 1rem;
  font-size: 1.4rem;
  font-weight: bold;
  color: #fff;
}

.carousel-section {
  position: relative;
}

.carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.carousel {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 1rem;
  padding: 1rem 2rem;
  width: 100%;
}

.carousel::-webkit-scrollbar {
  display: none;
}

.carousel > * {
  flex: 0 0 auto;
  width: 160px;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  z-index: 10;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
}

.arrow:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-50%) scale(1.1);
}

.arrow.left {
  left: 10px;
}

.arrow.right {
  right: 10px;
}
</style>
