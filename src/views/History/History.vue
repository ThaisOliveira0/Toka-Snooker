<template>
  <div class="historico">
    <header class="historico-header">
      <button class="back">&lt;</button>
      <h2>HISTÓRICO</h2>
    </header>

    <div class="comanda-lista">
      <div
        v-for="comanda in comandas"
        :key="comanda.data"
        class="comanda-item"
      >
        <span class="data">Data: {{ comanda.data }}</span>
        <span class="status-icon">
          <template v-if="comanda.status === 'pendente'">
            ⚠️
          </template>
          <template v-else>
            ✅
          </template>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
    import './History.css'
const comandas = [
  { data: '07/04/2025', status: 'pendente' },
  { data: '08/03/2025', status: 'finalizada' },
  { data: '02/02/2025', status: 'finalizada' },
  { data: '20/01/2025', status: 'finalizada' },
  { data: '20/12/2024', status: 'finalizada' },
  { data: '13/11/2024', status: 'finalizada' },
  { data: '14/10/2024', status: 'finalizada' },
  { data: '02/07/2024', status: 'finalizada' },
  { data: '26/03/2024', status: 'finalizada' }
]
</script>

