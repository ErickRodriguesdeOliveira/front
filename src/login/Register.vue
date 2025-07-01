<template>
  <div class="auth-container">
    <form class="auth-box" @submit.prevent="register">
      <h2>Cadastro</h2>
      <input v-model="name" type="text" placeholder="Nome completo" required />
      <input v-model="email" type="email" placeholder="E-mail" required />
      <input v-model="password" type="password" placeholder="Senha" required />
      <button type="submit">Cadastrar</button>
      <p class="link-text">
        Já tem uma conta?
        <router-link to="/">Entrar</router-link>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      console.log('Cadastrado:', this.name, this.email)
      this.$router.push('/')
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
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.1);
  width: 300px; /* MESMA largura do login */
  text-align: center;
}

.auth-box h2 {
  margin-bottom: 1.2rem;
  color: #fff;
  font-size: 1.4rem;
}

.auth-box input {
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  border: none;
  border-radius: 5px;
  background: #2a2a2a;
  color: #fff;
  font-size: 0.9rem;
  box-sizing: border-box;
}

.auth-box button {
  width: 100%;
  padding: 0.6rem;
  background-color: #1db954;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  font-size: 0.95rem;
  cursor: pointer;
}

.link-text {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #aaa;
}

.link-text a {
  color: #1db954;
  text-decoration: none;
}
</style>
