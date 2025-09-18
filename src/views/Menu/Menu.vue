<template> 
  <div class="menu">

    <Header>
      CARDÁPIO
    </Header>

    <div class="menu-tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab" 
        :class="{ active: tab === activeTab }" 
        @click="scrollToCategory(tab)"
      >
        {{ tab }}
      </button>
    </div>

    <div v-for="(group, category) in groupedItems" :key="category" :id="category">
      <h3 class="menu-category-title">{{ category.toUpperCase() }}</h3>

      <div v-for="item in group" :key="item.id" class="menu-card">
        <img :src="item.icon" alt="icon" class="menu-icon" />
        <div class="menu-info">
          <h4>{{ item.name }}</h4>
          <p>{{ item.subtitle }}</p>
        </div>

        <div class="menu-actions">
          <div class="menu-price">R$ {{ item.price.toFixed(2) }}</div>

          <div class="menu-add-to-cart">
            <template v-if="!item.quantity || item.quantity === 0">
              <button @click.stop="addItem(item)">+</button>
            </template>
            <template v-else>
              <button @click.stop="decreaseItem(item)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click.stop="addItem(item)">+</button>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedItem" class="menu-modal" @click.self="selectedItem = null">
      <div class="menu-modal-content">
        <button class="menu-close" @click="selectedItem = null">×</button>
        <img :src="selectedItem.image" alt="item" />
        <p>{{ selectedItem.description }}</p>
      </div>
    </div>
  </div>

  <div 
    v-if="cart.length > 0" 
    class="menu-cart-bar" 
    @click="$router.push({ name: 'ConfirmOrder' })"
  >
    <span>{{ cart.length }} item(s) no carrinho</span>
    <span>Total: R$ {{ cartTotal.toFixed(2) }}</span>
    <button class="menu-cart-button">Ver Carrinho</button>
  </div>
</template>


<script setup>
import { ref, computed, watch } from 'vue'
import Header from '@/components/layout/Header.vue'
import "./menu.css"

const tabs = ref(['Lanches', 'Coquetéis', 'Doses e Drinks'])
const selectedItem = ref(null)
const activeTab = ref('Lanches')

const items = ref([
  {
    id: 1,
    category: 'Lanches',
    name: 'X-Tudo',
    subtitle: 'pão com tudo que tem num x-tudo',
    price: 25,
    icon: 'https://img.icons8.com/emoji/48/hamburger-emoji.png',
    image: 'https://via.placeholder.com/150',
    description: 'O X-Tudo é um lanche completo...',
    quantity: 0,
    ingredients: [
      { name: 'Bacon', selected: true },
      { name: 'Queijo', selected: true },
      { name: 'Alface', selected: true }
    ]
  },
  {
    id: 2,
    category: 'Coquetéis',
    name: 'Mojito',
    subtitle: 'drink alcoólico',
    price: 25,
    icon: 'https://img.icons8.com/color/48/cocktail.png',
    image: 'https://via.placeholder.com/150',
    description: 'Mojito é um coquetel cubano refrescante...',
    quantity: 0,
    ingredients: [
      { name: 'Rum', selected: true },
      { name: 'Hortelã', selected: true }
    ]
  },
  {
    id: 3,
    category: 'Doses e Drinks',
    name: 'Caipirinha',
    subtitle: 'clássico brasileiro',
    price: 20,
    icon: 'https://img.icons8.com/color/48/lime.png',
    image: 'https://via.placeholder.com/150',
    description: 'Caipirinha feita com cachaça, limão, açúcar e gelo.',
    quantity: 0,
    ingredients: [
      { name: 'Limão', selected: true },
      { name: 'Açúcar', selected: true }
    ]
  }
])

// Modal
const openModal = (item) => {
  selectedItem.value = item
}

const scrollToCategory = (category) => {
  activeTab.value = category
  const el = document.getElementById(category)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const groupedItems = computed(() => {
  const groups = {}
  items.value.forEach(item => {
    if (!groups[item.category]) groups[item.category] = []
    groups[item.category].push(item)
  })
  return groups
})

const addItem = (item) => {
  item.quantity++
}

const decreaseItem = (item) => {
  if (item.quantity > 0) item.quantity--
}

// Computed do carrinho
const cart = computed(() => {
  return items.value.filter(item => item.quantity > 0)
})

const cartTotal = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

// 🔹 Sempre que o carrinho mudar, salvar no localStorage
watch(cart, (newCart) => {
  localStorage.setItem('cart', JSON.stringify(newCart))
}, { deep: true })
</script>
