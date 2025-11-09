import axios from "axios";

const API_BASE_URL = "http://192.168.0.208:3000";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "x-api-key": 12345,
    },
});

export default {
    async getSongs() {
        try {
            const response = await api.get("/musicas");
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar musicas:", error);
            return [];
        }

    },
async sendSong(id_musica, id_comanda) {
    try {
      const response = await api.post("/musica-pedido", {
        id_musica,
        id_comanda,
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao enviar música:", error);
      return null;
    }
  },
}