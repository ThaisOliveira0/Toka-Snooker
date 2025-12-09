<template>
  <div class="login-container">
    <div class="login-header">
      <button @click="$router.push({ name: 'home' })" class="login-back-button"><i class="fa-solid fa-angle-left"></i>
</button>
      <img src="@/assets/images/logo.png" alt="Logo" class="login-logo" />
    </div>

    <p class="login-info-text">Para fazer pedidos ou solicitar músicas no karaokê:</p>
    <h2 class="login-title">FAÇA LOGIN</h2>

    <div class="login-avatar">
      <img src="@/assets/images/user-icon.png" alt="Avatar" />
    </div>

    <form class="login-form" @submit.prevent="handleLogin">
      <div class="login-input-group">
        <i class="fas fa-user"></i>
        <input type="email" v-model="email" placeholder="E-mail" required />
      </div>

      <div class="login-input-group">
        <i class="fas fa-lock"></i>
        <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Senha" required />
        <i @click="togglePassword" class="fas fa-eye login-toggle-eye"></i>
      </div>

      <p class="login-forgot-password" @click="goToForgot">Esqueci a senha</p>

      <p class="login-register">
        Ainda não possui uma conta?
        <span class="link" @click="goToRegister">Clique aqui!</span>
      </p>

      <button class="login-button" type="submit" :disabled="loading">
        <span v-if="!loading">Entrar</span>
        <i v-else class="fas fa-spinner fa-spin"></i>
      </button>

      <p v-if="errorMessage" class="login-error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import './Login.css'
import { login } from "@/service/authService.js";

export default {
  data() {
    return {
      loading: false,
      email: "",
      password: "",
      showPassword: false,
      errorMessage: "",
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },

    async handleLogin() {
      this.errorMessage = "";
      this.loading = true;
      try {
        const { token } = await login(this.email, this.password);

        if (token) {
          sessionStorage.setItem("token", token);
          this.$router.push("/");
        } else {
          this.errorMessage = "Erro ao fazer login. Tente novamente.";
        }
      } catch (error) {
        console.error("Erro no login:", error);
        this.errorMessage =
          error.response?.data?.mensagem || "E-mail ou senha inválidos!";
      } finally {
        this.loading = false;
      }
    },


    goToRegister() {
      this.$router.push("/cadastro");
    },

    goToForgot() {
      this.$router.push("/recuperar-senha");
    },
  },
};
</script>
