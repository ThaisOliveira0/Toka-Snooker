import api from "@/service/api"; 

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
      return response.data;
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      return { sucesso: false, mensagem: "Erro ao criar pedido." };
    }
  },

  async getComanda(userId) {
    try {
      const response = await api.get(`/comandas/usuario/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao carregar comanda:", error);
      return null;
    }
  },
};
