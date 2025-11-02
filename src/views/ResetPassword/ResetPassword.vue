<template>
  <div class="reset-container">
    <div class="header">
      <img src="" alt="Logo" class="logo" />
    </div>

    <h2 class="reset-title">REDEFINIR SENHA</h2>
    <p class="reset-text">
      Informe a nova senha para sua conta: <strong>{{ email }}</strong>
    </p>

    <div class="reset-form">
      <input
        type="password"
        placeholder="Nova senha"
        v-model="password"
      />
      <input
        type="password"
        placeholder="Confirmar nova senha"
        v-model="confirmPassword"
      />
      <button @click="handleReset">ALTERAR SENHA</button>

      <p v-if="message" class="reset-message">{{ message }}</p>
      <p v-if="error" class="reset-error">{{ error }}</p>
    </div>

    <a href="/login" class="back-link">Voltar para login</a>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { resetPassword } from "@/service/authService.js";
import './ResetPassword.css'

export default {
  name: "ResetPassword",
  setup() {
    const route = useRoute();
    const router = useRouter();

    const email = ref("");
    const userId = ref(null);
    const password = ref("");
    const confirmPassword = ref("");
    const message = ref("");
    const error = ref("");

onMounted(() => {
  email.value = sessionStorage.getItem("recoveryEmail") || "";
  userId.value = sessionStorage.getItem("recoveryUserId") || null;

  if (!email.value || !userId.value) {
    error.value = "Informações do usuário não foram encontradas. Volte e tente novamente.";
  }
});


   const handleReset = async () => {
  if (!password.value || password.value !== confirmPassword.value) {
    error.value = "As senhas não conferem!";
    message.value = "";
    return;
  }

  if (!userId.value) {
    error.value = "Usuário inválido.";
    return;
  }

  try {
    await resetPassword(userId.value, password.value);
    message.value = "Senha alterada com sucesso!";
    error.value = "";

    sessionStorage.removeItem("recoveryEmail");
    sessionStorage.removeItem("recoveryUserId");
    setTimeout(() => router.push("/login"), 1500);
  } catch (err) {
    console.error(err);
    error.value = err.response?.data?.message || "Erro ao alterar a senha.";
    message.value = "";
  }
};


    return { email, password, confirmPassword, message, error, handleReset };
  },
};
</script>

