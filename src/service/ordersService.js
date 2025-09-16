import api from "./api";

// PEDIDOS 

// Listar todos os pedidos do usuário
export function getOrders(params = {}) {
  return api.get("/orders", { params });
}

// Criar um novo pedido 
export function createOrder(data) {
  return api.post("/orders", data);
}

// Deletar pedido 
export function deleteOrder(id) {
  return api.delete(`/orders/${id}`);
}

//  info do pedido
export function getOrder(id) {
  return api.get(`/orders/${id}`);
}

// comanda 
export function getTabInfo(id) {
  return api.get(`/orders/${id}/summary`);
}

// Histórico de pedidos
export function getOrdersHistory() {
  return api.get("/orders/history");
}

//  CARRINHO 

// itens do carrinho
export function getCart() {
  return api.get("/cart");
}

// Adicionar item ao carrinho
export function addToCart(data) {
  return api.post("/cart", data);
}

// Atualizar item do carrinho
export function updateCartItem(itemId, data) {
  return api.put(`/cart/${itemId}`, data);
}

// Remover item do carrinho
export function removeCartItem(itemId) {
  return api.delete(`/cart/${itemId}`);
}

// Limpar carrinho
export function clearCart() {
  return api.delete("/cart");
}
