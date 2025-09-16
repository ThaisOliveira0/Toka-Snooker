<template>
  <div class="reset-container">
    <div class="header">
      <img src="" alt="Logo" class="logo" />
    </div>

    <img src="" alt="Resetar Senha" class="icon" />

    <h2 class="reset-title">REDEFINIR SENHA</h2>
    <p class="reset-text">
      Informe sua nova senha abaixo:
    </p>

    <input
      type="password"
      placeholder="Nova senha"
      class="input-password"
      v-model="password"
    />
    <input
      type="password"
      placeholder="Confirmar nova senha"
      class="input-password"
      v-model="confirmPassword"
    />

    <button class="reset-button" @click="resetPassword">REDEFINIR SENHA</button>

    <a href="/login" class="back-link">Voltar para a tela de login!</a>
  </div>
</template>

<script>
export default {
  name: "ResetPassword",
  data() {
    return {
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    resetPassword() {
      if (this.password !== this.confirmPassword) {
        alert("As senhas não coincidem!");
        return;
      }
      console.log("Nova senha:", this.password);
    },
  },
};
</script>

<style src="./ResetPassword.css"></style>
