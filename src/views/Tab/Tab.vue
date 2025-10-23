<template>
  <div class="table-card">
    <Header>COMANDA</Header>

    <h3 class="table-title">Mesa 12</h3>

    <div class="section top-info">
      <div>
        <p class="label">TOTAL A PAGAR</p>
        <p class="value">R$ 51,00</p>
      </div>
      <div>
        <p class="label">DATA</p>
        <p class="value">08/03/2025</p>
      </div>
    </div>

    <div class="section pedidos">
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
          <tr>
            <td>X-Tudo</td>
            <td class="center">1</td>
            <td class="right">R$ 25,00</td>
          </tr>
          <tr>
            <td>X-Burguer</td>
            <td class="center">1</td>
            <td class="right">R$ 20,00</td>
          </tr>
          <tr>
            <td colspan="2" class="right"><strong>Total:</strong></td>
            <td class="right">R$ 45,00</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section musica-pedido">
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
          <tr>
            <td>Girls just wanna have fun</td>
            <td class="center">1</td>
            <td class="right">R$ 3,00</td>
          </tr>
          <tr>
            <td>Evidências</td>
            <td class="center">1</td>
            <td class="right">R$ 3,00</td>
          </tr>
          <tr>
            <td colspan="2" class="right"><strong>Total:</strong></td>
            <td class="right">R$ 6,00</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
<script setup>
import Header from "@/components/layout/Header.vue";
</script>

  
  <style src="./Tab.css"></style>
  