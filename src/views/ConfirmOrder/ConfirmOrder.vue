<template>
  <div class="confirm-order">
    <Header :backRoute="{ name: 'menu' }"> CONFIRMAR PEDIDO </Header>

    <div v-if="cart.length === 0" class="empty-cart">
      Seu carrinho está vazio.
    </div>

    <div v-else class="cart-items">
      <div v-for="item in cart" :key="item.id" class="cart-card">
        <div class="info">
          <h4>{{ item.name }}</h4>
          <p>{{ item.subtitle }}</p>

        <p v-if="item.observacao" class="item-observation">
            Obs: {{ item.observacao }}
            </p>
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
          <button class="edit" @click="editItem(item)">
            Editar Ingredientes
          </button>
        </div>
      </div>
    </div>

    <div class="total-section" v-if="cart.length">
      <div class="total">Total: R$ {{ total.toFixed(2) }}</div>
      <button class="confirm" @click="confirmOrder" :disabled="loading">
        <span v-if="loading">Enviando...</span>
        <span v-else>Confirmar Pedido</span>
      </button>
    </div>

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

        <textarea
          v-model="editingItem.observation"
          placeholder="Observação do item (ex: sem cebola, sem sal...)"
          class="obs-field"
        ></textarea>

        <button @click="saveEdit">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Header from "@/components/layout/Header.vue";
import orderService from "@/service/ordersService.js";
import { toast } from "vue3-toastify"; 
import { getDecodedToken } from "@/service/authService"; 
import "./ConfirmOrder.css";

const cart = ref([]);
const editingItem = ref(null);
const loading = ref(false);
const userId = ref(null);

onMounted(() => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) cart.value = JSON.parse(storedCart);

  const decoded = getDecodedToken();
  if (decoded && decoded.id) {
    userId.value = decoded.id;
  } else {
    console.error("Não foi possível obter o ID do usuário.");
  }
});

const total = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

const increaseItem = (item) => { item.quantity++; saveCart(); };
const decreaseItem = (item) => {
  if (item.quantity > 1) item.quantity--;
  else cart.value = cart.value.filter(i => i.id !== item.id);
  saveCart();
};

const editItem = (item) => { editingItem.value = item; };

const saveEdit = () => { 
  editingItem.value = null; 
  saveCart(); 
};

const saveCart = () => { 
  localStorage.setItem("cart", JSON.stringify(cart.value)); 
};

const confirmOrder = async () => {
  if (!cart.value.length) return;
  if (!userId.value) {
    toast.error("Usuário não identificado. Faça login novamente.");
    return;
  }

  const mesa = sessionStorage.getItem("mesa"); 
  loading.value = true;

  try {
    const pedido = {
      id_usuario: userId.value, 
      status: "PENDENTE",
      mesa: mesa ? Number(mesa) : null,

      produtos: cart.value.map(item => ({
        id_produto: item.id,
        quantidade: item.quantity,
        valor_unit: Number(item.price),
        observacao: item.observacao || "" 
      })),

      valor_total: Number(total.value),
    };

    await orderService.createPedido(pedido);

    toast.success("Pedido enviado com sucesso!");
    localStorage.removeItem("cart");
    cart.value = [];
  } catch (error) {
    console.error("Erro ao enviar pedido:", error);
    toast.error("Erro ao confirmar o pedido. Tente novamente.");
  } finally {
    loading.value = false;
  }
};
</script>
