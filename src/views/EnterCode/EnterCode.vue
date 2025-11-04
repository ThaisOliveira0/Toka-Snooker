<template>
  <div class="verify-container">
    <div class="verify-header">
      <button @click="$router.push({ name: 'forgotPassword' })" class="verify-back-button">&lt;</button>
      <img src="@/assets/images/logo.png" alt="Logo" class="verify-logo" />
    </div>

    <div class="verify-icon">
      <!-- <img src="@/assets/images/verify-icon.png" alt="Verificar Código" /> -->
    </div>

    <h2 class="verify-title">VERIFICAÇÃO DE CÓDIGO</h2>
    <p class="verify-text">
      Informe o código de verificação enviado para o seu e-mail:
      <strong>{{ email }}</strong>
    </p>

    <div class="code-inputs">
      <input
        v-for="(digit, index) in codeDigits"
        :key="index"
        type="text"
        maxlength="1"
        class="code-box"
        v-model="codeDigits[index]"
        @input="focusNext(index)"
        @keydown.backspace="focusPrev(index, $event)"
      />
    </div>

    <button class="verify-button" @click="handleVerify">
      Verificar
    </button>

    <p v-if="message" class="verify-message">{{ message }}</p>
    <p v-if="error" class="verify-error">{{ error }}</p>

  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { verifyCode } from "@/service/authService.js";
import { useRouter } from "vue-router";
import "./EnterCode.css";

export default {
  name: "EnterCode",
  setup() {
    const router = useRouter();
    const email = ref("");
    const codeDigits = ref(["", "", "", "", "", ""]);
    const message = ref("");
    const error = ref("");

    onMounted(() => {
      email.value = sessionStorage.getItem("recoveryEmail") || "";
    });

    const focusNext = (index) => {
      if (codeDigits.value[index].length === 1 && index < 5) {
        const next = document.querySelectorAll(".code-box")[index + 1];
        next.focus();
      }
    };

    const focusPrev = (index, event) => {
      if (codeDigits.value[index] === "" && index > 0) {
        const prev = document.querySelectorAll(".code-box")[index - 1];
        prev.focus();
      }
    };

    const handleVerify = async () => {
      const code = codeDigits.value.join("");
      if (code.length < 6) {
        error.value = "Informe o código completo!";
        message.value = "";
        return;
      }

      try {
        const response = await verifyCode(email.value, code);
        sessionStorage.setItem("recoveryUserId", response.id);
        message.value = "Código verificado com sucesso!";
        error.value = "";
        router.push("/redefinir-senha");
      } catch (err) {
        console.error("Erro ao verificar código:", err);
        error.value = err.response?.data?.message || "Código inválido.";
        message.value = "";
      }
    };

    return { email, codeDigits, focusNext, focusPrev, handleVerify, message, error };
  },
};
</script>
