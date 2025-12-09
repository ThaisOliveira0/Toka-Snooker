<template>
  <div class="confirm-order">
    <Header :backRoute="{ name: 'menu' }"> CONFIRMAR PEDIDO </Header>

    <div v-if="cart.length === 0" class="empty-cart">
      Seu carrinho está vazio.
    </div>

    <div v-else class="cart-items">
      <div v-for="item in cart" :key="item.id" class="cart-card">
        
        <div class="cart-left">
          <div class="cart-info">
            <h4>{{ item.name }}</h4>
            <p>{{ item.subtitle }}</p>

            <p v-if="item.observacao" class="item-observation">
              Obs: {{ item.observacao }}
            </p>
          </div>
        </div>

        <div class="cart-right">
          <strong class="cart-price">
            R$ {{ (item.price * item.quantity).toFixed(2) }}
          </strong>

          <div class="quantity">
            <button @click="decreaseItem(item)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseItem(item)">+</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="cart.length" class="total-footer">
      <div class="total-row">
        <span>Total</span>
        <strong>R$ {{ total.toFixed(2) }}</strong>
      </div>

      <button class="confirm-btn" @click="confirmOrder" :disabled="loading">
        <i v-if="loading" class="fas fa-spinner fa-spin"></i>
        <span v-else>Confirmar Pedido</span>
      </button>
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
const loading = ref(false);
const userId = ref(null);

onMounted(() => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) cart.value = JSON.parse(storedCart);

  const decoded = getDecodedToken();
  if (decoded?.id) userId.value = decoded.id;
});

const total = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

const increaseItem = (item) => {
  item.quantity++;
  saveCart();
};

const decreaseItem = (item) => {
  if (item.quantity > 1) item.quantity--;
  else cart.value = cart.value.filter(i => i.id !== item.id);
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

  loading.value = true;

  const mesa = sessionStorage.getItem("mesa");

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

      valor_total: Number(total.value)
    };

    await orderService.createPedido(pedido);

    toast.success("Pedido enviado com sucesso!");
    localStorage.removeItem("cart");
    cart.value = [];
  } catch (error) {
    toast.error("Erro ao confirmar o pedido.");
  } finally {
    loading.value = false;
  }
};
</script>
