<template>
  <div class="verify-container">
    <div class="header">
      <img src="" alt="Logo" class="logo" />
    </div>

    <img src="" alt="Verificar Código" class="icon" />

    <h2 class="verify-title">VERIFICAÇÃO DE CÓDIGO</h2>
    <p class="verify-text">
      Informe o código de verificação enviado para o seu e-mail:
    </p>

    <input
      type="text"
      placeholder="Digite o código"
      class="input-code"
      v-model="code"
    />
    <button class="verify-button" @click="EnterCodeCode">VERIFICAR</button>

    <a href="/login" class="back-link">Voltar para a tela de login!</a>
  </div>
</template>

<script>
export default {
  name: "EnterCode",
  data() {
    return {
      code: "",
    };
  },
  methods: {
    verifyCode() {
      console.log("Código digitado:", this.code);
    },
  },
};
</script>

<style src="./EnterCode.css"></style>
