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

