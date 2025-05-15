<template>
  <div class="menu">
    <header class="header">
      <button class="back">&lt;</button>
      <h2>Cardápio</h2>
    </header>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="{ active: tab === activeTab }"
        @click="scrollToCategory(tab)"
      >
        {{ tab }}
      </button>
    </div>

    <div
      v-for="(group, category) in groupedItems"
      :key="category"
      :id="category"
    >
      <h3>{{ category.toUpperCase() }}</h3>
      <div
        v-for="item in group"
        :key="item.id"
        class="card"
        @click="openModal(item)"
      >
        <img :src="item.icon" alt="icon" class="icon" />
        <div class="info">
          <h4>{{ item.name }}</h4>
          <p>{{ item.subtitle }}</p>
        </div>
        <div class="price">
          R$ {{ item.price.toFixed(2) }}
        </div>
      </div>
    </div>

    <div v-if="selectedItem" class="modal" @click.self="selectedItem = null">
      <div class="modal-content">
        <button class="close" @click="selectedItem = null">×</button>
        <img :src="selectedItem.image" alt="item" />
        <p>{{ selectedItem.description }}</p>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue'
import "./menu.css"

const tabs = ['Lanches', 'Coquetéis', 'Doses e Drinks']
const selectedItem = ref(null)

const items = ref([
  {
    id: 1,
    category: 'Lanches',
    name: 'X-Tudo',
    subtitle: 'pão com tudo que tem num x-tudo',
    price: 25,
    icon: 'https://img.icons8.com/emoji/48/hamburger-emoji.png',
    image: 'https://via.placeholder.com/150', 
    description: 'O X-Tudo é um lanche completo com hambúrguer, queijo, alface, tomate, bacon, ovo, milho, maionese, ketchup e mostarda, tudo servido em um pão macio.'
  },
  {
    id: 2,
    category: 'Coquetéis',
    name: 'Mojito',
    subtitle: 'drink alcoólico',
    price: 25,
    icon: 'https://img.icons8.com/color/48/cocktail.png',
    image: 'https://via.placeholder.com/150',
    description: 'Mojito é um coquetel cubano refrescante com rum branco, hortelã, limão, açúcar e água com gás.'
  },
  {
    id: 3,
    category: 'Doses e Drinks',
    name: 'Caipirinha',
    subtitle: 'clássico brasileiro',
    price: 20,
    icon: 'https://img.icons8.com/color/48/lime.png',
    image: 'https://via.placeholder.com/150',
    description: 'Caipirinha feita com cachaça, limão, açúcar e gelo.'
  }
])

const openModal = (item) => {
  selectedItem.value = item
}

const scrollToCategory = (category) => {
  const el = document.getElementById(category)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const groupedItems = computed(() => {
  const groups = {}
  items.value.forEach(item => {
    if (!groups[item.category]) groups[item.category] = []
    groups[item.category].push(item)
  })
  return groups
})
</script>

