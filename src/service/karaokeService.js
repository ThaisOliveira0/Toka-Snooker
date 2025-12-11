import api from "@/service/api"; 

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

async getRelevance() {
  try {
    const response = await api.get("/fila/relevancia");
    return response.data?.relevancia ?? null;
  } catch (error) {
    console.error("Erro ao buscar relevância:", error);
    return null;
  }
},


async sendSong(id_musica, id_usuario,mesa) {
  console.log(mesa);
  
  try {
    const relevancia = await this.getRelevance(); 

    const response = await api.post(
      `/fila/${id_usuario}`,
      { id_musica, mesa},
      { params: { relevancia } }  
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar música:", error);
    return null;
  }
},

async exitLine(id_usuario) {
  try {
    const relevancia = await this.getRelevance();

    const response = await api.patch(
      `/fila/sair/${id_usuario}`,
      {},
      { params: { relevancia } }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao sair da fila:", error);
    return null;
  }
},

  async getUser(id_usuario) {
    try {
      const response = await api.get(`/fila/usuario/${id_usuario}`);
      
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      return null;
    }
  },

  async updateLine(relevancia) {
    try {
      const response = await api.patch(`/fila/atualizar/${relevancia}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar fila:", error);
      return null;
    }
  },
};
