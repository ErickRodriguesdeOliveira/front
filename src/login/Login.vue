<template>
  <div class="auth-container">
    <form class="auth-box" @submit.prevent="login">
      <h2>Meu Catálogo</h2>
      <input v-model="username" type="text" placeholder="Usuário" required />
      <input v-model="password" type="password" placeholder="Senha" required />
      <button type="submit">Entrar</button>
      <p class="link-text">
        Não tem uma conta?
        <router-link to="/register">Cadastre-se</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from '../store/authStore'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      if (this.username && this.password) {
        const auth = useAuthStore()
        auth.isLoggedIn = true
        this.$router.push('/home')
      } else {
        alert('Preencha todos os campos!')
      }
    }
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #111;
}

.auth-box {
  background-color: #1e1e1e;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 25px rgba(0, 255, 0, 0.08);
  width: 100%;
  max-width: 340px;
  text-align: center;
}

.auth-box h2 {
  margin-bottom: 1.5rem;
  color: #fff;
  font-size: 1.5rem;
}

.auth-box input,
.auth-box button {
  width: 100%;
  padding: 12px;
  margin-bottom: 1rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
}

.auth-box input {
  background-color: #2a2a2a;
  color: #fff;
}

.auth-box button {
  background-color: #1db954;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.auth-box button:hover {
  background-color: #17a74a;
}

.link-text {
  margin-top: 0.8rem;
  font-size: 0.9rem;
  color: #aaa;
}

.link-text a {
  color: #1db954;
  text-decoration: none;
  margin-left: 4px;
}
</style>
