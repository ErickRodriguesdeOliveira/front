<template>
  <span class="star" :class="{ filled }">&#9733;</span>
</template>

<script>
export default {
  props: {
    filled: Boolean
  }
}
</script>

<style scoped>
.star {
  font-size: 1.1rem;
  color: #555;
}
.star.filled {
  color: #f1c40f;
}
</style>
