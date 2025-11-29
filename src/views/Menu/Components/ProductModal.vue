<template>
  <div class="menu-modal" @click.self="$emit('close')">
    <div class="menu-modal-content">
      <button class="menu-close" @click="$emit('close')">×</button>

      <img :src="item.image" alt="item" class="menu-modal-img" />

      <h3>{{ item.name }}</h3>
      <p class="menu-modal-description">{{ item.description }}</p>

      <div class="menu-modal-price">
        Preço: R$ {{ item.price.toFixed(2) }}
      </div>

      <textarea
        v-model="localObservacao"
        placeholder="Observações (ex: sem gelo, copo separado...)"
        class="menu-modal-observation"
      ></textarea>

<div class="menu-modal-actions">
  <button @click="emit('decrease', item)">-</button>
  <span>{{ item.quantity }}</span>
  <button @click="emit('add', item)">+</button>
</div>


      <button
        class="menu-modal-add"
        @click="handleAdd"
      >
        Adicionar ao Carrinho
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  item: { type: Object, required: true }
})
const emit = defineEmits(['close', 'add', 'decrease', 'confirm'])

const localObservacao = ref(props.item.observacao || '')

watch(localObservacao, (val) => {
  props.item.observacao = val
})

const handleAdd = () => {
  emit('confirm', props.item)
  emit('close')
}
</script>

<style scoped>
.menu-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
}
.menu-modal-content {
  background: white;
  border-radius: 1rem;
  padding: 20px;
  max-width: 400px;
  width: 90%;
  position: relative;
  text-align: center;
}
.menu-modal-img {
  width: 100%;
  border-radius: 12px;
  margin-bottom: 10px;
}
.menu-close {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
}
.menu-modal-description {
  font-size: 14px;
  color: #555;
  margin: 10px 0;
}
.menu-modal-price {
  font-weight: bold;
  margin: 10px 0;
}
.menu-modal-observation {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 10px 0;
}
.menu-modal-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 15px 0;
}
.menu-modal-add {
  background-color: #ffb703;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}
</style>
