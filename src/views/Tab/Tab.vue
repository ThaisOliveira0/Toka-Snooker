<template>
  <div class="table-card">
    <Header>COMANDA</Header>

    <h3 class="table-title">{{ mesa }}</h3>

    <div class="section top-info" v-if="loaded">
      <div>
        <p class="label">TOTAL A PAGAR</p>
        <p class="value">R$ {{ totalGeral.toFixed(2) }}</p>
      </div>
      <div>
        <p class="label">DATA</p>
        <p class="value">{{ data }}</p>
      </div>
    </div>

    <div v-else class="loading">Carregando comanda...</div>

    <div v-if="pedidos.length" class="section pedidos">
      <h4>PEDIDOS</h4>
      <table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QTDE</th>
            <th>VALOR</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in pedidos" :key="i">
            <td>{{ item.nome }}</td>
            <td class="center">{{ item.quantidade }}</td>
            <td class="right">R$ {{ item.valor_unit.toFixed(2) }}</td>
          </tr>
          <tr>
            <td colspan="2" class="right"><strong>Total:</strong></td>
            <td class="right">R$ {{ totalPedidos.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="musicas.length" class="section musica-pedido">
      <h4>KARAOKÊ</h4>
      <table>
        <thead>
          <tr>
            <th>MÚSICA</th>
            <th>QTDE</th>
            <th>VALOR</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(musica, i) in musicas" :key="i">
            <td>{{ musica.nome }}</td>
            <td class="center">{{ musica.quantidade }}</td>
            <td class="right">R$ {{ musica.valor.toFixed(2) }}</td>
          </tr>
          <tr>
            <td colspan="2" class="right"><strong>Total:</strong></td>
            <td class="right">R$ {{ totalMusicas.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Header from "@/components/layout/Header.vue";
import ordersService from "../../service/ordersService";
import { getDecodedToken } from "@/service/authService";

const mesa = ref("Mesa —");
const data = ref("");
const pedidos = ref([]);
const musicas = ref([]);
const loaded = ref(false);

const totalPedidos = computed(() =>
  pedidos.value.reduce(
    (sum, item) => sum + (item.valor_unit || 0) * (item.quantidade || 1),
    0
  )
);

const totalMusicas = computed(() =>
  musicas.value.reduce(
    (sum, m) => sum + (m.valor || 0) * (m.qtde_pedidos || 1),
    0
  )
);

const totalGeral = computed(() => totalPedidos.value + totalMusicas.value);

onMounted(async () => {
  try {
    const decoded = getDecodedToken();
    if (!decoded) {
      console.error("Nenhum token encontrado ou inválido.");
      return;
    }

    const userId = decoded.id;
    const dataComanda = await ordersService.getComanda(userId);
    if (!dataComanda) {
      console.warn("Nenhuma comanda encontrada para este usuário.");
      return;
    }

    mesa.value = `Mesa ${dataComanda.mesa ?? "—"}`;
    data.value = new Date(dataComanda.data_abertura ?? new Date()).toLocaleDateString("pt-BR");

    pedidos.value = dataComanda.pedido?.flatMap(p => p.itens) ?? [];
    musicas.value = dataComanda.musica_pedido ?? [];


    loaded.value = true;
  } catch (error) {
    console.error("Erro ao carregar a comanda:", error);
  }
});

</script>


<style src="./Tab.css"></style>
