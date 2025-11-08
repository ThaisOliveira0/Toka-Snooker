import axios from "axios";

const API_BASE_URL = "http://192.168.0.208:3000";


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'x-api-key': 12345
  }
});

export default {
  async getAllProdutos() {
    try {
      const response = await api.get("/produtos/")
      return response.data
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
      return { data: [] }
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
}