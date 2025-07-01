<template>
  <div v-if="visible" class="toast" :class="type">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: String,
    type: {
      type: String,
      default: 'success'
    }
  },
  data() {
    return {
      visible: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.visible = false
    }, 3000)
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #2ecc71;
  color: white;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  z-index: 9999;
  animation: fadeIn 0.3s ease;
  font-size: 0.9rem;
}
.toast.error {
  background: #e74c3c;
}
.toast.info {
  background: #3498db;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translate(-50%, -10px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
</style>
