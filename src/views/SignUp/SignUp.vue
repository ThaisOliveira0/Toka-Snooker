<template>
  <div class="signup-container">
    <div class="signup-header">
      <button @click="$router.push({ name: 'login' })" class="signup-back-button"><i class="fa-solid fa-angle-left"></i>
      </button>
      <img src="@/assets/images/logo.png" alt="Logo" class="signup-logo" />
    </div>

    <p class="signup-info-text">Para criar sua conta e aproveitar o karaokê:</p>
    <h2 class="signup-login-title">FAÇA SEU CADASTRO</h2>

    <div class="signup-avatar">
      <img src="@/assets/images/user-icon.png" alt="Avatar" />
    </div>

    <form class="signup-form" @submit.prevent="handleRegister">
      <div class="signup-input-group">
        <font-awesome-icon icon="user" />
        <input type="text" v-model="name" placeholder="Nome completo" required />
      </div>

      <!-- <div class="signup-input-group">
        <font-awesome-icon icon="id-card" />
        <input type="text" v-model="cpf" placeholder="CPF" maxlength="14" required />
      </div> -->

      <div class="signup-input-group">
        <font-awesome-icon icon="envelope" />
        <input type="email" v-model="email" placeholder="E-mail" required />
      </div>

      <div class="signup-input-group">
        <font-awesome-icon icon="phone" />
        <input type="tel" v-model="phone" placeholder="Telefone" maxlength="15" required @input="formatPhone"
          :class="{ 'input-error': phoneError }" />
      </div>

      <div class="signup-input-group">
        <font-awesome-icon icon="lock" />
        <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Senha" required />
        <font-awesome-icon @click="togglePassword" :icon="showPassword ? 'eye-slash' : 'eye'"
          class="signup-toggle-eye" />
      </div>

      <div class="signup-input-group">
        <font-awesome-icon icon="lock" />
        <input :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword" placeholder="Confirmar senha"
          required />
        <font-awesome-icon @click="toggleConfirmPassword" :icon="showConfirmPassword ? 'eye-slash' : 'eye'"
          class="signup-toggle-eye" />
      </div>

      <button class="signup-button" type="submit" :disabled="loading">
        <i v-if="loading" class="fas fa-spinner fa-spin"></i>
        <span v-else>Cadastrar</span>
      </button>

    </form>
  </div>
</template>


<script>
import { toast } from 'vue3-toastify';
import './SignUp.css'
import { register } from '@/service/authService.js'

export default {
  data() {
    return {
      name: '',
      loading: false,
      phoneError: false,
      cpf: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      errorMessage: ''
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    formatPhone(e) {
      let v = e.target.value.replace(/\D/g, "");

      if (v.length > 11) v = v.slice(0, 11);

      if (v.length <= 10) {

        v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
      } else {

        v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
      }

      this.phone = v;
    },

    async handleRegister() {
      const phoneDigits = this.phone.replace(/\D/g, "");

      if (phoneDigits.length < 10 || phoneDigits.length > 11) {
        this.phoneError = true;
        toast.warning("Digite um telefone válido antes de continuar!");
        return;
      }

      this.phoneError = false;

      if (this.password !== this.confirmPassword) {
        toast.warning('As senhas não conferem!');
        return;
      }

      this.loading = true;

      try {
        const response = await register(
          this.name,
          this.email,
          this.phone,
          this.password,
          'CLIENTE'
        );

        toast.success('Cadastro realizado com sucesso!');
        this.$router.push({ name: 'login' });

      } catch (error) {
        console.error('Erro no cadastro:', error.response?.data);

        const errorMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          'Erro ao cadastrar usuário!';

        this.errorMessage = errorMessage;
        toast.error(errorMessage);
      } finally {
        this.loading = false;
      }
    }

  }
};
</script>
