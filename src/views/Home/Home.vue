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
          SEJA BEM-VINDO(A) AO <span class="green-text">TOKA</span> SNOOKER BAR
          !!
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
      <div class="footer-top">
        <div class="footer-section">
          <h3 class="footer-title">Localização</h3>
          <p>Rua Coronel Alfredo Flaquer, 386<br />Centro, Santo André - SP</p>
        </div>

        <div class="footer-section">
          <h3 class="footer-title">Horário de Funcionamento</h3>
          <ul>
            <li>Domingo a Quinta: 19h - 01h</li>
            <li>Sexta e Sábado: 19h - 03h</li>
          </ul>
        </div>

        <div class="footer-section">
          <h3 class="footer-title">Fale Conosco</h3>
          <p>(11) 4432-2419</p>
          <p>contato@tokasnookerbar.com.br</p>
        </div>

        <div class="footer-section">
          <h3 class="footer-title">Redes Sociais</h3>
          <div class="social-icons">
            <a href="#" aria-label="Instagram">
              <img src="/insta.png" alt="Instagram" />
            </a>
            <a href="#" aria-label="Facebook">
              <img src="/facebook.png" alt="Facebook" />
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>
          © {{ new Date().getFullYear() }} Toka Snooker Bar — Todos os direitos
          reservados.
        </p>
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
      const params = new URLSearchParams(window.location.search);
      const mesaParam = params.get("mesa");
      if (mesaParam) {
        sessionStorage.setItem("mesa", mesaParam);
        console.log("Mesa detectada:", mesaParam);
      }
    });

    onUnmounted(() => clearInterval(intervalId));

    return { promocoes, currentIndex, slidesToShow, nextSlide, prevSlide };
  },
};
</script>


<style src="./home.css"></style>
