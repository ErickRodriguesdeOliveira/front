<template>
  <form class="review-form" @submit.prevent="submitReview">
    <h3>Deixe sua avaliação</h3>
    <input type="text" v-model="author" placeholder="Seu nome" required />
    <select v-model.number="rating" required>
      <option disabled value="">Nota</option>
      <option v-for="n in 5" :key="n" :value="n">{{ n }} estrela{{ n > 1 ? 's' : '' }}</option>
    </select>
    <textarea v-model="comment" placeholder="Comentário" required></textarea>
    <button type="submit">Enviar avaliação</button>
  </form>
</template>

<script>
export default {
  emits: ['new-review'],
  data() {
    return {
      author: '',
      rating: null,
      comment: ''
    }
  },
  methods: {
    submitReview() {
      const review = {
        author: this.author,
        rating: this.rating,
        comment: this.comment
      }
      this.$emit('new-review', review)
      this.author = ''
      this.rating = null
      this.comment = ''
    }
  }
}
</script>

<style scoped>
.review-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}
input, select, textarea {
  padding: 0.5rem;
  border-radius: 6px;
  border: none;
  background-color: #222;
  color: white;
  resize: vertical;
}
button {
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  background-color: #f1c40f;
  color: #111;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: #d1b30f;
}
</style>
