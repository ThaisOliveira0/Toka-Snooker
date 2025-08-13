<template>
  <div class="home-container">
    <div class="header">
      <img src="@/assets/images/logo.png" alt="Logo" class="logo" />
    </div>

    <div class="welcome-section">
      <img src="@/assets/images/personagem.png" alt="Personagem" class="character" />
      <div class="speech">
        <p class="highlight">SEJA BEM-VINDO(A) AO <span class="red-text">TOKA</span> SNOOKER BAR !!</p>
        <p class="subtitle">Onde a Música Encontra a Tacada Perfeita!</p>
      </div>
    </div>

    <div class="menu-buttons">
      <div class="menu-item">
        <div class="icon-box">
          <img src="@/assets/images/icon-menu.png" alt="Menu" />
        </div>
        <span>Menu</span>
      </div>
      <div class="menu-item">
        <div class="icon-box">
          <img src="@/assets/images/icon-sinuca.png" alt="Sinuca" />
        </div>
        <span>Sinuca</span>
      </div>
      <div class="menu-item">
        <div class="icon-box">
          <img src="@/assets/images/icon-karaoke.png" alt="Karaokê" />
        </div>
        <span>Karaokê</span>
      </div>
      <div class="menu-item">
        <div class="icon-box">
          <img src="@/assets/images/icon-comanda.png" alt="Comanda" />
        </div>
        <span>Comanda</span>
      </div>
    </div>

    <div class="promotions">
      <img src="@/assets/images/promo1.png" alt="Promoção 1" />
      <img src="@/assets/images/promo2.png" alt="Promoção 2" />
      <img src="@/assets/images/promo3.png" alt="Promoção 3" />
    </div>

    <div class="about-section">
      <h2>Sobre o Toka Snooker Bar</h2>
      <p>
        Localizado no coração de Santo André, o Toka Snooker Bar é o lugar ideal para quem aprecia
        uma partida de sinuca, momentos de descontração com amigos e familiares, além de se divertir
        com sessões animadas de karaokê. Com um ambiente acolhedor e vibrante, oferecemos uma
        variedade de cervejas e drinks para acompanhar seus momentos de lazer.
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
        <p class="footer-title">📱 Nos siga também nas redes sociais</p>
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
export default {
  name: "Home",
};
</script>

<style src="./home.css"></style>
