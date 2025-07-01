<template>
  <div class="movie-card">
    <router-link :to="`/filme/${movie.id}`" class="movie-link">
      <img :src="image" :alt="title" class="movie-poster" />
      <div class="movie-info">
        <h3 class="movie-title">{{ title }}</h3>
        <p class="movie-rating">
          {{ rating.toFixed(1) }}
          <img :src="starIcon" alt="estrela" class="icon star-icon" />
        </p>
      </div>
    </router-link>

    <div class="movie-actions">
      <button class="btn" @click="handleFavorite">
        <img :src="heartIcon" alt="favorito" class="icon" />
        {{ isFavorite ? 'Remover favorito' : 'Favorito' }}
      </button>
      <button class="btn" @click="handleWatchLater">
        <img :src="clockIcon" alt="assistir depois" class="icon" />
        {{ isInWatchList ? 'Remover da lista' : 'Assistir depois' }}
      </button>
    </div>
  </div>
</template>

<script>
import { useMovieStore } from './store/movieStore'
import starIcon from './assets/star.png'
import heartIcon from './assets/heart.png'
import clockIcon from './assets/clock.png'
import { computed } from 'vue'

export default {
  props: {
    title: String,
    rating: Number,
    image: String,
    movie: Object,
  },
  emits: ['show-toast'],
  setup(props, { emit }) {
    const store = useMovieStore()

    const isFavorite = computed(() =>
      store.favorites.some((m) => m.id === props.movie.id)
    )

    const isInWatchList = computed(() =>
      store.watchList.some((m) => m.id === props.movie.id)
    )

    function handleFavorite() {
      store.toggleFavorite(props.movie)
      emit(
        'show-toast',
        isFavorite.value
          ? ` "${props.movie.title}" foi adicionado dos favoritos.`
          : ` "${props.movie.title}" foi removido aos favoritos!`
      )
    }

    function handleWatchLater() {
      store.toggleWatchList(props.movie)
      emit(
        'show-toast',
        isInWatchList.value
          ? `s"${props.movie.title}" foi adicionado de Assistir depois.`
          : ` "${props.movie.title}" foi removido à lista Assistir depois!`
      )
    }

    return {
      handleFavorite,
      handleWatchLater,
      starIcon,
      heartIcon,
      clockIcon,
      isFavorite,
      isInWatchList,
    }
  }
}
</script>

<style scoped>
.movie-card {
  width: 180px;
  background: #1c1c1c;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s;
}

.movie-card:hover {
  transform: scale(1.03);
}

.movie-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.movie-poster {
  width: 100%;
  height: 270px;
  object-fit: cover;
  border-bottom: 1px solid #333;
}

.movie-info {
  padding: 0.5rem;
}

.movie-title {
  font-size: 0.95rem;
  font-weight: bold;
  margin: 0;
}

.movie-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #f1c40f;
  font-size: 0.85rem;
  margin-top: 4px;
}

.movie-actions {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0.5rem;
  margin-top: auto;
}

.btn {
  background-color: #2c2c2c;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn:hover {
  background-color: #3b3b3b;
}

.icon {
  width: 16px;
  height: 16px;
}

.star-icon {
  width: 14px;
  height: 14px;
}
</style>
