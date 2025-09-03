<template>
  <div class="login-container">
    <div class="login-header">
      <button @click="$router.push({ name: 'home' })" class="login-back-button">&lt;</button>
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

      <button class="login-button" type="submit">Entrar</button>

      <p v-if="errorMessage" class="login-error">{{ errorMessage }}</p>
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
      errorMessage: ''
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },

    handleLogin() {
      // Simulando dados vindos do backend
      const fakeUser = {
        email: "teste@bar.com",
        password: "123456",
        token: "fake-jwt-token-123"
      };

      if (this.email === fakeUser.email && this.password === fakeUser.password) {
        // Salva o token como se fosse do backend
        localStorage.setItem("token", fakeUser.token);
        localStorage.setItem("user", JSON.stringify({ email: fakeUser.email }));

        // Redireciona para rota protegida (karaokê por exemplo)
        this.$router.push({ name: "karaoke" });
      } else {
        this.errorMessage = "E-mail ou senha inválidos!";
      }
    },

    goToRegister() {
      this.$router.push('/cadastro');
    },

    goToForgot() {
      this.$router.push('/recuperar-senha');
    }
  },
};
</script>
