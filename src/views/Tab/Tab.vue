<template>
    <div class="tab-container">
      <header class="header">
        <button class="back-btn">&lt;</button>
        <h1>COMANDA</h1>
      </header>
  
      <div class="top-info">
        <div>
          <p class="label">TOTAL A PAGAR</p>
          <p class="value">R$ 51,00</p>
        </div>
        <div>
          <p class="label">DATA</p>
          <p class="value">08/03/2025</p>
        </div>
        <div>
          <p class="label">MESA</p>
          <p class="value">12</p>
        </div>
      </div>
  
      <!-- <h2 class="finalizada">COMANDA FINALIZADA</h2> -->
  
      <section class="box pedidos">
        <h3 class="title-order">PEDIDOS</h3>
        <div class="table-header">
          <span>ITEM</span>
          <span>QTDE</span>
          <span>VALOR</span>
        </div>
        <div class="table-row">
          <span>X-Tudo</span>
          <span>1</span>
          <span>R$ 25,00</span>
        </div>
        <div class="table-row">
          <span>X-Burguer</span>
          <span>1</span>
          <span>R$ 20,00</span>
        </div>
        <p class="total">Total: R$ 45,00</p>
      </section>
  
      <section class="box karaoke">
        <h3 class="title-kareoke">KARAOKE</h3>
        <div class="table-header">
          <span>MÚSICA</span>
          <span>QTDE</span>
          <span>VALOR</span>
        </div>
        <div class="table-row">
          <span>Girls just wanna have fun</span>
          <span>1</span>
          <span>R$ 3,00</span>
        </div>
        <div class="table-row">
          <span>Evidências</span>
          <span>1</span>
          <span>R$ 3,00</span>
        </div>
        <p class="total">Total: R$ 6,00</p>
      </section>
  
      <section class="box sinuca">
        <h3 class="title-snooker">SINUCA</h3>
        <p>Esse serviço não foi utilizado.</p>
        <p class="total">Total: R$ 0,00</p>
      </section>
  
      <button class="history-btn">VER HISTÓRICO</button>
    </div>
  </template>
  
  <style src="./Tab.css"></style>
  