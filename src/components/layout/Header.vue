<template>
  <header class="app-header">
    <button class="back-button" @click="goBack">
      &lt;
    </button>
    <h1 class="title">
      <slot>Default Title</slot>
    </h1>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  backRoute: {
    type: [String, Object], 
    default: () => ({ name: 'home' })
  }
})

const goBack = () => {
  router.push(props.backRoute)
}
</script>


<style scoped>
.app-header {
  display: flex;
  align-items: center;
  background: #adafb3;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  margin-bottom: 12px;
}

.back-button {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 2px 2px;
  border-radius: 6px;
  color: #ffffff;
  transition: background 0.2s, transform 0.2s;
}

.back-button:hover {
  background: rgba(0, 0, 0, 0.05);
  transform: scale(1.05);
}

.title {
  flex: 1;
  font-size: 1.3rem;
  font-weight: 500;
  text-align: center;
  color: #ffffff;
}

</style>
