<template>
  <div class="confirm-order">
    <header class="header">
      <button class="back" @click="$router.push({ name: 'menu' })">&lt;</button>
      <h2>CONFIRMAR PEDIDO</h2>
    </header>

    <div v-if="cart.length === 0" class="empty-cart">
      Seu carrinho está vazio.
    </div>

    <div v-else class="cart-items">
      <div v-for="item in cart" :key="item.id" class="cart-card">
        <div class="info">
          <h4>{{ item.name }}</h4>
          <p>{{ item.subtitle }}</p>
        </div>

        <div class="actions">
          <div class="price">
            R$ {{ (item.price * item.quantity).toFixed(2) }}
          </div>
          <div class="quantity">
            <button @click="decreaseItem(item)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseItem(item)">+</button>
          </div>
          <button class="edit" @click="editItem(item)">Editar Ingredientes</button>
        </div>
      </div>
    </div>

    <div class="total-section" v-if="cart.length">
      <div class="total">
        Total: R$ {{ total.toFixed(2) }}
      </div>
      <button class="confirm" @click="confirmOrder">Confirmar Pedido</button>
    </div>

    <!-- Modal de edição -->
    <div v-if="editingItem" class="modal" @click.self="editingItem = null">
      <div class="modal-content">
        <button class="close" @click="editingItem = null">×</button>
        <div class="ingredients">
          <label
            v-for="ingredient in editingItem.ingredients || []"
            :key="ingredient.name"
          >
            <input type="checkbox" v-model="ingredient.selected" />
            {{ ingredient.name }}
          </label>
        </div>
        <button @click="saveEdit">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import './ConfirmOrder.css'


const cart = ref([])

const editingItem = ref(null)

onMounted(() => {
  const storedCart = localStorage.getItem('cart')
  if (storedCart) {
    cart.value = JSON.parse(storedCart)
  }
})

const total = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

const increaseItem = (item) => {
  item.quantity++
  saveCart()
}

const decreaseItem = (item) => {
  if (item.quantity > 1) {
    item.quantity--
    saveCart()
  }
}

const editItem = (item) => {
  editingItem.value = item
}

const saveEdit = () => {
  editingItem.value = null
  saveCart()
}

const confirmOrder = () => {
  alert('Pedido confirmado!')
  localStorage.removeItem('cart')
  cart.value = []
}

const saveCart = () => {
  localStorage.setItem('cart', JSON.stringify(cart.value))
}
</script>
