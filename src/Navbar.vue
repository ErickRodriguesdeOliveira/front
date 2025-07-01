<template>
  <nav class="navbar">
    <router-link to="/home" class="logo-link" @click.native="resetSearch">
      <div class="logo">Gustavo.<span class="movie">MOVIES</span></div>
    </router-link>

    <div class="nav-right">
      <input
        type="text"
        v-model="searchQuery"
        @keyup.enter="searchMovies"
        placeholder="Buscar filmes..."
        class="search-input"
      />
      <router-link to="/favoritos" class="nav-btn">Favoritos</router-link>
      <router-link to="/assistir-depois" class="nav-btn">Assistir depois</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    searchMovies() {
      if (this.searchQuery.trim()) {
        this.$emit('search', this.searchQuery)
      }
    },
    resetSearch() {
      this.searchQuery = ''
      this.$emit('search', '') // avisa App.vue para limpar busca
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #111;
  padding: 1rem 2rem;
  border-bottom: 1px solid #222;
}

.logo-link {
  text-decoration: none;
}

.logo {
  font-size: 1.4rem;
  font-weight: bold;
  background: linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.movie {
  color: white;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-input {
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  border: none;
  outline: none;
  background-color: #222;
  color: white;
  width: 180px;
}

.nav-btn {
  text-decoration: none;
  color: white;
  background-color: #222;
  padding: 0.4rem 0.8rem;
  border-radius: 5px;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.nav-btn:hover {
  background-color: #333;
}
</style>
