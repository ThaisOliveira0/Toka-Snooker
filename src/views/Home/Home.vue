<template>
  <div class="home-container">
    <div class="header">
      <img src="@/assets/images/logo.png" alt="Logo" class="logo" />
       <router-link to="/login" class="login-icon">
        <i class="fas fa-user"></i>
      </router-link>
    </div>

    <div class="welcome-section">
      <img
        src="@/assets/images/personagem.png"
        alt="Personagem"
        class="character"
      />
      <div class="speech">
        <p class="highlight">
          SEJA BEM-VINDO(A) AO <span class="green-text">TOKA</span> SNOOKER BAR !!
        </p>
        <p class="subtitle">Onde a Música Encontra a Tacada Perfeita!</p>
      </div>
    </div>

    <div class="menu-buttons">
      <router-link to="/menu" class="menu-item">
        <div class="icon-box">
          <img src="@/assets/images/icon-menu.png" alt="Menu" />
        </div>
        <span>Menu</span>
      </router-link>

      <router-link to="/karaoke" class="menu-item">
        <div class="icon-box">
          <img src="@/assets/images/icon-karaoke.png" alt="Karaokê" />
        </div>
        <span>Karaokê</span>
      </router-link>

      <router-link to="/comanda" class="menu-item">
        <div class="icon-box">
          <img src="@/assets/images/icon-comanda.png" alt="Comanda" />
        </div>
        <span>Comanda</span>
      </router-link>
    </div>
    <div class="promotions-carousel">
      <div
        class="slides-wrapper"
        :style="{
          transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
        }"
      >
        <div
          class="promo-slide"
          v-for="(promo, index) in promocoes"
          :key="index"
        >
          <img :src="promo.imagem" :alt="promo.titulo" />
        </div>
      </div>

      <button @click="prevSlide" class="nav prev">‹</button>
      <button @click="nextSlide" class="nav next">›</button>
    </div>

    <div class="about-section">
      <h2>Sobre o Toka Snooker Bar</h2>
      <p>
        Localizado no coração de Santo André, o Toka Snooker Bar é o lugar ideal
        para quem aprecia uma partida de sinuca, momentos de descontração com
        amigos e familiares, além de se divertir com sessões animadas de
        karaokê. Com um ambiente acolhedor e vibrante, oferecemos uma variedade
        de cervejas e drinks para acompanhar seus momentos de lazer.
      </p>
    </div>

    <footer class="footer">
      <div class="footer-section">
        <p class="footer-title">📍 Localização:</p>
        <p>Rua Coronel Alfredo Flaquer, 386 - Centro, Santo André, SP</p>
      </div>

      <div class="footer-section">
        <p class="footer-title">🕒 Horário de Funcionamento:</p>
        <ul>
          <li>Domingo a Quinta-Feira: 19:00 - 01:00</li>
          <li>Sexta e Sábado: 19:00 - 03:00</li>
        </ul>
      </div>

      <div class="footer-section">
        <p class="footer-title">Nos siga também nas redes sociais</p>
        <div class="social-icons">
          <img src="@/assets/images/insta.png" alt="Instagram" />
          <img src="@/assets/images/facebook.png" alt="Facebook" />
        </div>
      </div>

      <div class="footer-section">
        <p>📞 Contato: (11) 4432-2419</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import promo1 from "@/assets/images/promo1.png";
import promo2 from "@/assets/images/promo2.png";
import promo3 from "@/assets/images/promo3.png";

export default {
  setup() {
    const promocoes = ref([
      { titulo: "Promo 1", imagem: promo1 },
      { titulo: "Promo 2", imagem: promo2 },
      { titulo: "Promo 3", imagem: promo3 },
    ]);

    const currentIndex = ref(0);
    const slidesToShow = 2;
    let intervalId;

    const nextSlide = () => {
      currentIndex.value =
        (currentIndex.value + 1) % (promocoes.value.length - slidesToShow + 1);
    };

    const prevSlide = () => {
      currentIndex.value =
        (currentIndex.value - 1 + (promocoes.value.length - slidesToShow + 1)) %
        (promocoes.value.length - slidesToShow + 1);
    };

    onMounted(() => {
      intervalId = setInterval(nextSlide, 3000);
    });

    onUnmounted(() => clearInterval(intervalId));

    return { promocoes, currentIndex, slidesToShow, nextSlide, prevSlide };
  },
};
</script>


<style src="./home.css"></style>
