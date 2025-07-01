<template>
  <section class="reviews-container">
    <h3>Avaliações</h3>
    
    <ul v-if="reviews.length" class="reviews-list">
      <li v-for="(review, index) in reviews" :key="index" class="review-item">
        <strong>{{ review.author }}</strong> — 
        <span class="stars">
          <span v-for="n in 5" :key="n" :class="['star', n <= review.rating ? 'filled' : '']">★</span>
        </span>
        <div class="comment">{{ review.comment }}</div>
      </li>
    </ul>
    <p v-else class="no-reviews">Nenhuma avaliação ainda.</p>

    <h4>Adicionar Avaliação</h4>
    <form @submit.prevent="submitReview" class="review-form">
      <input 
        v-model="newReview.author" 
        type="text" 
        placeholder="Seu nome" 
        required 
      />
      <!-- Label adicionada para o campo Nota -->
      <label for="rating-select" style="color: #1db954; font-weight: 600; margin-bottom: 0.3rem; display: block;">
        Nota
      </label>
      <select id="rating-select" v-model.number="newReview.rating" required>
        <option disabled value="">Selecione a nota</option>
        <option v-for="n in 5" :key="n" :value="n">{{ n }} estrela{{ n > 1 ? 's' : '' }}</option>
      </select>
      <textarea 
        v-model="newReview.comment" 
        placeholder="Comentário" 
        required 
      ></textarea>
      <button type="submit" class="btn-submit">Enviar Avaliação</button>
    </form>
  </section>
</template>

<script>
import { ref } from 'vue'

export default {
  props: {
    movieId: {
      type: [String, Number],
      required: true
    }
  },
  setup() {
    const reviews = ref([])
    const newReview = ref({
      author: '',
      rating: null,
      comment: ''
    })

    function submitReview() {
      if (!newReview.value.author || !newReview.value.rating || !newReview.value.comment) return

      reviews.value.push({
        author: newReview.value.author,
        rating: newReview.value.rating,
        comment: newReview.value.comment
      })

      newReview.value.author = ''
      newReview.value.rating = null
      newReview.value.comment = ''
    }

    return {
      reviews,
      newReview,
      submitReview
    }
  }
}
</script>

<style scoped>
.reviews-container {
  margin-top: 3rem;
  color: white;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  background: #222;
  padding: 2rem 2.5rem;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0,0,0,0.8);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h3, h4 {
  font-weight: 700;
  margin-bottom: 1.2rem;
  color: #1db954;
  text-align: center;
  text-shadow: 0 0 6px #1db954aa;
}

.reviews-list {
  list-style: none;
  padding-left: 0;
  margin-bottom: 2rem;
  max-height: 260px;
  overflow-y: auto;
  border-radius: 8px;
}

.review-item {
  background: #2c2c2c;
  padding: 1rem 1.25rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: inset 0 0 8px #000c;
  font-size: 1rem;
  line-height: 1.4;
  text-align: left;
}

.review-item strong {
  font-weight: 700;
  color: #1db954;
  margin-right: 1rem;
}

.stars {
  font-size: 1.3rem;
  vertical-align: middle;
  user-select: none;
}

.star {
  color: #666;
  margin-right: 3px;
}

.star.filled {
  color: #f1c40f;
  text-shadow: 0 0 5px #f39c12;
}

.comment {
  margin-top: 0.5rem;
  color: #ddd;
  font-style: italic;
  white-space: pre-wrap;
}

.no-reviews {
  text-align: center;
  font-style: italic;
  color: #888;
  margin-bottom: 2rem;
}

.review-form input,
.review-form select,
.review-form textarea {
  display: block;
  margin-bottom: 1.2rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: none;
  background-color: #333;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s ease;
  box-sizing: border-box;
  resize: none;
}

.review-form input:focus,
.review-form select:focus,
.review-form textarea:focus {
  background-color: #444;
  outline: none;
  box-shadow: 0 0 10px #1db954cc;
}

.review-form textarea {
  height: 100px;
}

.btn-submit {
  background-color: #1db954;
  border: none;
  color: white;
  padding: 0.85rem 1.3rem;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.1rem;
  width: 100%;
  transition: background-color 0.3s ease;
  box-shadow: 0 0 12px #1db954cc;
}

.btn-submit:hover {
  background-color: #17a445;
  box-shadow: 0 0 20px #17a445dd;
}
</style>
