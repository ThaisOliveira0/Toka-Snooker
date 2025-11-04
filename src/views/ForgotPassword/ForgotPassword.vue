<template>
  <div class="recover-container">
    <div class="recover-header">
      <button @click="$router.push({ name: 'login' })" class="recover-back-button">&lt;</button>
      <img src="@/assets/images/logo.png" alt="Logo" class="recover-logo" />
    </div>

    <div class="recover-icon">
      <img src="@/assets/images/recover-icon.png" alt="Recuperar senha" />
    </div>

    <h2 class="recover-title">ESQUECEU A SENHA?</h2>
    <p class="recover-text">
      Informe o e-mail para o qual deseja redefinir a sua senha:
    </p>

    <form class="recover-form" @submit.prevent="handleRecover">
      <div class="recover-input-group">
        <i class="fas fa-envelope"></i>
        <input type="email" v-model="email" placeholder="E-mail" required />
      </div>

      <button class="recover-button" type="submit">
        Recuperar Senha
      </button>

      <p v-if="message" class="recover-message">{{ message }}</p>
      <p v-if="error" class="recover-error">{{ error }}</p>
    </form>

  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { sendCode } from "@/service/authService.js";
import "./ForgotPassword.css";

export default {
  name: "ForgotPassword",
  setup() {
    const email = ref("");
    const message = ref("");
    const error = ref("");
    const router = useRouter();

    const handleRecover = async () => {
      if (!email.value.trim()) {
        error.value = "Informe um e-mail válido.";
        message.value = "";
        return;
      }

      try {
        const response = await sendCode(email.value);
        sessionStorage.setItem("recoveryUserId", response.userId);
        sessionStorage.setItem("recoveryEmail", email.value);
        message.value = "Código enviado para o seu e-mail!";
        error.value = "";
        router.push("/inserir-codigo");
      } catch (err) {
        console.error("Erro ao enviar código:", err);
        error.value =
          err.response?.data?.message ||
          "Erro ao tentar recuperar a senha.";
        message.value = "";
      }
    };

    return { email, message, error, handleRecover };
  },
};
</script>

<style src="./ForgotPassword.css"></style>
