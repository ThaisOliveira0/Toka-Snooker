<template>
  <div class="container">
    <div class="header">
      <button @click="$router.push({ name: 'home' })" class="back-button">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h1 class="title">KARAOKÊ <i class="fas fa-microphone"></i></h1>
    </div>

    <div class="status-card">
      <p class="status-text">
        Sua posição na fila: <span class="status-position">5</span>
      </p>
      <p class="status-text">
        Tempo estimado de espera: <span class="status-time">15min 20s</span>
      </p>
    </div>

    <div class="search-box">
      <input
        v-model="search"
        type="text"
        placeholder="Pesquise sua música..."
        class="search-input"
      />
      <button class="search-button">
        <i class="fas fa-search"></i>
      </button>
    </div>

    <div class="song-list">
      <div
        v-for="(song, index) in filteredSongs"
        :key="song.name"
        :class="['song-card', bgColor(index), selected === song.name ? 'selected' : '']"
        @click="selected = song.name"
      >
        <div class="song-info">
          <input
            type="radio"
            name="musica"
            :value="song.name"
            v-model="selected"
            class="song-radio"
          />
          <div>
            <p class="song-name">{{ song.name }}</p>
            <p class="song-singer">{{ song.singer }}</p>
          </div>
        </div>
        <span class="song-length">Duração:<br>{{ song.length }}</span>
      </div>
    </div>

    <div v-if="selected" class="selected-music">
      <p>Música selecionada: <strong>{{ selected }}</strong></p>
      <button class="confirm-button">
        <i class="fas fa-check"></i> Confirmar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
import './karaoke.css'

const search = ref('')
const selected = ref('')

const songs = ref([
  { name: 'Casca de Bala', singer: 'Thullio Milionário', length: '03:45' },
  { name: 'Pane no Sistema', singer: 'Grego, Paulo Pires, EaBest', length: '03:20' },
  { name: 'Blinding Lights', singer: 'The Weeknd', length: '02:50' },
  { name: 'Someone You Loved', singer: 'Lewis Capaldi', length: '03:10' },
  { name: 'Coração Partido', singer: 'Desconhecido', length: '03:40' }
])

const filteredSongs = computed(() =>
  songs.value.filter(m =>
    m.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

const bgColor = (index) => {
  const colors = ['bg-yellow', 'bg-blue', 'bg-green', 'bg-red', 'bg-yellow']
  return colors[index % colors.length]
}
</script>
