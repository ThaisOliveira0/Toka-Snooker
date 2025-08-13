<template>
  <div class="login-container">
    <div class="header">
      <!-- <img src="@/assets/logo.png" alt="Logo" class="logo" /> -->
    </div>

    <p class="info-text">Para criar sua conta e aproveitar o karaokê:</p>
    <h2 class="login-title">FAÇA SEU CADASTRO</h2>

    <div class="avatar">
      <img src="@/assets/images/user-icon.png" alt="Avatar" />
    </div>

    <form class="login-form" @submit.prevent="handleRegister">
      <div class="input-group">
        <font-awesome-icon icon="user" />
        <input type="text" v-model="name" placeholder="Nome completo" required />
      </div>

      <div class="input-group">
        <font-awesome-icon icon="id-card" />
        <input type="text" v-model="cpf" placeholder="CPF" maxlength="14" required />
      </div>

      <div class="input-group">
        <font-awesome-icon icon="envelope" />
        <input type="email" v-model="email" placeholder="E-mail" required />
      </div>

      <div class="input-group">
        <font-awesome-icon icon="phone" />
        <input type="tel" v-model="phone" placeholder="Telefone" maxlength="15" required />
      </div>

      <div class="input-group">
        <font-awesome-icon icon="lock" />
        <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Senha" required />
        <font-awesome-icon
          @click="togglePassword"
          :icon="showPassword ? 'eye-slash' : 'eye'"
          class="toggle-eye"
        />
      </div>

      <div class="input-group">
        <font-awesome-icon icon="lock" />
        <input :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword" placeholder="Confirmar senha" required />
        <font-awesome-icon
          @click="toggleConfirmPassword"
          :icon="showConfirmPassword ? 'eye-slash' : 'eye'"
          class="toggle-eye"
        />
      </div>

      <button class="login-button" type="submit">Cadastrar</button>
    </form>
  </div>
</template>

<script>
    import './SignUp.css'
export default {
  data() {
    return {
      name: '',
      cpf: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    handleRegister() {
      if (this.password !== this.confirmPassword) {
        alert('As senhas não conferem!');
        return;
      }
      console.log('Cadastro:', {
        name: this.name,
        cpf: this.cpf,
        email: this.email,
        phone: this.phone,
        password: this.password,
      });
    },
  },
};
</script>


