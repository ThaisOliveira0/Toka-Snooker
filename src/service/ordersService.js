import axios from "axios";
import { getToken } from "@/service/authService"; 

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "x-api-key": import.meta.env.VITE_API_KEY,
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  async getAllProdutos() {
    try {
      const response = await api.get("/produtos/");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      return { data: [] };
    }
  },

  async createPedido(pedido) {
    try {
      const response = await api.post("/pedidos", pedido);
      return response;
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      return { sucesso: false, mensagem: "Erro ao criar pedido." };
    }
  },

  async getComanda(userId) {
    try {
      const response = await api.get(`/comandas/usuario/${userId}`);
      console.log(response);
      
      return response.data;
    } catch (error) {
      console.error("Erro ao carregar comanda:", error);
      return null;
    }
  },
};
