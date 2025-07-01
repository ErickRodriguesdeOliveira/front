import { createRouter, createWebHistory } from 'vue-router'
import Login from '../login/Login.vue'
import Register from '../login/Register.vue'
import Home from '../home/home.vue'
import MovieDetail from '../views/MovieDetail.vue'
import Favorites from '../views/Favorites.vue'
import WatchList from '../views/WatchList.vue'

// Definição das rotas da aplicação
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/filme/:id',
    name: 'MovieDetail',
    component: MovieDetail,
    meta: { requiresAuth: true }
  },
  {
    path: '/favoritos',
    name: 'Favorites',
    component: Favorites,
    meta: { requiresAuth: true }
  },
  {
    path: '/assistir-depois',
    name: 'WatchList',
    component: WatchList,
    meta: { requiresAuth: true }
  }
]

// Criação do roteador com histórico HTML5
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Middleware de autenticação utilizando Pinia
import { useAuthStore } from '../store/authStore'
import { storeToRefs } from 'pinia'

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const { isLoggedIn } = storeToRefs(auth)

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    next({ name: 'Login' }) // Redireciona para login pelo nome da rota
  } else {
    next()
  }
})

export default router
