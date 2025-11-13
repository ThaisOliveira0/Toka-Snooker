<template>
  <div class="menu">
    <Header>CARDÁPIO</Header>

    <!-- Tabs -->
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

    <!-- Categorias -->
    <div v-for="(group, category) in groupedItems" :key="category" :id="category">
      <h3 class="menu-category-title">{{ category.toUpperCase() }}</h3>

      <div
        v-for="item in group"
        :key="item.id"
        class="menu-card"
        @click="openModal(item)"
      >
        <img :src="item.icon" alt="icon" class="menu-icon" />
        <div class="menu-info">
          <h4>{{ item.name }}</h4>
          <p>{{ item.subtitle }}</p>
        </div>

        <div class="menu-actions">
          <div class="menu-price">R$ {{ item.price.toFixed(2) }}</div>

          <div class="menu-add-to-cart" @click.stop>
            <template v-if="!item.quantity || item.quantity === 0">
              <button @click="addItem(item)">+</button>
            </template>
            <template v-else>
              <button @click="decreaseItem(item)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="addItem(item)">+</button>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal separado -->
    <ProductModal
      v-if="selectedItem"
      :item="selectedItem"
      @close="closeModal"
      @add="addItem"
      @decrease="decreaseItem"
      @confirm="handleConfirm"
    />

    <!-- Carrinho -->
    <div
      v-if="cart.length > 0"
      class="menu-cart-bar"
      @click="$router.push({ name: 'ConfirmOrder' })"
    >
      <span>{{ cart.length }} item(s) no carrinho</span>
      <span>Total: R$ {{ cartTotal.toFixed(2) }}</span>
      <button class="menu-cart-button">Ver Carrinho</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import Header from '@/components/layout/Header.vue'
import ProductModal from './Components/ProductModal.vue'
import orderService from "@/service/ordersService.js";
import "./Menu.css"

const tabs = ref([])
const selectedItem = ref(null)
const activeTab = ref('Cervejas')
const items = ref([])

const openModal = (item) => selectedItem.value = { ...item }
const closeModal = () => selectedItem.value = null

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

const addItem = (item) => item.quantity = (item.quantity || 0) + 1
const decreaseItem = (item) => { if (item.quantity > 0) item.quantity-- }

const handleConfirm = (item) => {
  const index = items.value.findIndex(i => i.id === item.id)
  if (index !== -1) items.value[index] = { ...item }
}

const cart = computed(() => items.value.filter(item => item.quantity > 0))
const cartTotal = computed(() => cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0))

watch(cart, (newCart) => {
  localStorage.setItem('cart', JSON.stringify(newCart))
}, { deep: true })

onMounted(async () => {
  try {
    const response = await orderService.getAllProdutos();
    const produtos = response.data;

  //  const defaultIcons = {
   ////   Cervejas: new URL('@/assets/icons/eisenbahn600.jpg', import.meta.url).href,
     //// Coquetéis: new URL('@/assets/icons/eisenbahn600.jpg', import.meta.url).href,
    // // 'Doses e Drinks': new URL('@/assets/icons/eisenbahn600.jpg', import.meta.url).href,
   // //  default: new URL('@/assets/icons/eisenbahn600.jpg', import.meta.url).href
   // };

items.value = produtos.map(p => {
  const fotoPath = p.foto ? `/${encodeURIComponent(p.foto)}` : (defaultIcons[p.categoria] || defaultIcons.default);

  return {
    id: p.id,
    name: p.nome,
    subtitle: p.descricao,
    price: p.promo && p.promo > 0 ? p.preco_promo : p.preco,
    icon: fotoPath,
    image: fotoPath,
    description: p.descricao,
    category: p.categoria,
    quantity: 0,
    observacao: ''
  };
});


    tabs.value = [...new Set(items.value.map(i => i.category))];
  } catch (err) {
    console.error('Erro ao carregar produtos:', err);
  }
});

</script>
