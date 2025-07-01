<template>
  <div>
    <Navbar v-if="showNavbar" @search="handleSearch" />
    <router-view :searchQuery="searchQuery" @show-toast="showToast" />

    <div v-if="toastMessage" class="toast">{{ toastMessage }}</div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navbar from './Navbar.vue'

const route = useRoute()
const router = useRouter()

const searchQuery = ref('')
const toastMessage = ref('')
const showNavbar = computed(() => route.path !== '/' && route.path !== '/register')

// Redireciona para /home com a query de busca
function handleSearch(query) {
  searchQuery.value = query
  router.push({ name: 'home', query: { q: query } })
}

// Exibe a mensagem do toast
function showToast(message) {
  toastMessage.value = message
  setTimeout(() => {
    toastMessage.value = ''
  }, 3000)
}
</script>

<style>
body {
  background-color: #111;
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
}

.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #222;
  color: #fff;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  font-size: 0.9rem;
  z-index: 1000;
  transition: opacity 0.3s ease;
}
</style>
