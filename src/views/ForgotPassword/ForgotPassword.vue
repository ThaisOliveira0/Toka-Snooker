<template>
    <div class="recover-container">
        <div class="header">
            <img src="" alt="Logo" class="logo" />
        </div>

        <img src="" alt="Recuperar senha" class="icon" />

        <h2 class="recover-title">ESQUECEU A SENHA ?</h2>
        <p class="recover-text">
            Informe o e-mail para o qual deseja redefinir a sua senha:
        </p>

        <input type="email" placeholder="E-mail" class="input-email" />
        <button class="recover-button">RECUPERAR SENHA</button>

        <a href="/login" class="back-link">Voltar para a tela de login!</a>
    </div>
</template>

<script>
export default {
    name: "forgotPassword",
};
</script>

<style src="./ForgotPassword.css"></style>
