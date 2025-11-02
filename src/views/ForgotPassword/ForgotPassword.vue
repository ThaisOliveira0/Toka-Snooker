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

        <input type="email" placeholder="E-mail" class="input-email" v-model="email" />

        <button class="recover-button" @click="handleRecover">
            RECUPERAR SENHA
        </button>

        <p v-if="message" class="recover-message">{{ message }}</p>
        <p v-if="error" class="recover-error">{{ error }}</p>

        <a href="/login" class="back-link">Voltar para a tela de login!</a>
    </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { sendCode } from "@/service/authService.js";

export default {
    name: "forgotPassword",
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

                sessionStorage.setItem('recoveryUserId', response.userId);
                sessionStorage.setItem('recoveryEmail', email.value);

                message.value = "Código enviado para o seu e-mail!";
                error.value = "";

                router.push('/inserir-codigo'); 
            } catch (err) {
                console.error("Erro ao enviar código:", err);
                error.value =
                    err.response?.data?.message || "Erro ao tentar recuperar a senha.";
                message.value = "";
            }
        };


        return { email, message, error, handleRecover };
    },
};
</script>

<style src="./ForgotPassword.css"></style>
