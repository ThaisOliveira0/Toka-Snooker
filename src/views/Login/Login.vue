<template>
  <div class="login-container">
    <div class="header">
      <!-- <img src="@/assets/logo.png" alt="Logo" class="logo" /> -->
    </div>

    <p class="info-text">Para fazer pedidos ou solicitar músicas no karaokê:</p>
    <h2 class="login-title">FAÇA LOGIN</h2>

    <div class="avatar">
      <img src="@/assets/images/user-icon.png" alt="Avatar" />
    </div>

    <form class="login-form" @submit.prevent="handleLogin">
      <div class="input-group">
        <i class="fas fa-user"></i>
        <input type="email" v-model="email" placeholder="E-mail" required />
      </div>

      <div class="input-group">
        <i class="fas fa-lock"></i>
        <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Senha" required />
        <i @click="togglePassword" class="fas fa-eye toggle-eye"></i>
      </div>

      <p class="forgot-password">Esqueci a senha</p>

      <p class="register">
        Ainda não possui uma conta? <span class="link" @click="goToRegister">Clique aqui!</span>
      </p>

      <button class="login-button" type="submit">Entrar</button>
    </form>
  </div>
</template>

<script>
import './Login.css'
export default {
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    handleLogin() {
      console.log('Email:', this.email, 'Senha:', this.password);
    },
    goToRegister() {
      this.$router.push('/cadastro');
    },
  },
};
</script>

