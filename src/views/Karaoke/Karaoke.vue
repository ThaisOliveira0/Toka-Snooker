<template>
  <div class="container">
    <Header>
      KARAOKE
    </Header>

    <!-- <div class="status-card">
      <p class="status-text">
        Sua posição na fila: <span class="status-position">5</span>
      </p>
      <p class="status-text">
        Tempo estimado de espera: <span class="status-time">15min 20s</span>
      </p>
    </div> -->

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
          <label class="custom-radio">
            <input
              type="radio"
              name="musica"
              :value="song.name"
              v-model="selected"
            />
            <span class="radio-mark"></span>
          </label>
          <div>
            <p class="song-name">{{ song.name }}</p>
            <p class="song-singer">{{ song.singer }}</p>
          </div>
        </div>
        <span class="song-length">Duração:<br>{{ song.length }}</span>
      </div>
    </div>

    <div v-if="selected" class="selected-music">
      <div class="selected-info">
        <p>Música selecionada:</p>
        <p><strong>{{ selected }}</strong></p>
      </div>
      <button class="confirm-button">
        <i class="fas fa-check"></i> Confirmar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
import Header from '@/components/layout/Header.vue'
import './karaoke.css'

const search = ref('')
const selected = ref('')

const songs = ref([
  { "name": "Shape of You", "singer": "Ed Sheeran", "length": "03:53" },
  { "name": "Levitating", "singer": "Dua Lipa", "length": "03:23" },
  { "name": "Peaches", "singer": "Justin Bieber", "length": "03:18" },
  { "name": "Drivers License", "singer": "Olivia Rodrigo", "length": "04:02" },
  { "name": "Bad Habits", "singer": "Ed Sheeran", "length": "03:51" },
  { "name": "Stay", "singer": "The Kid LAROI, Justin Bieber", "length": "02:21" },
  { "name": "Good 4 U", "singer": "Olivia Rodrigo", "length": "02:58" },
  { "name": "Save Your Tears", "singer": "The Weeknd", "length": "03:35" },
  { "name": "Montero", "singer": "Lil Nas X", "length": "02:18" },
  { "name": "Butter", "singer": "BTS", "length": "02:44" },
  { "name": "Blinding Lights", "singer": "The Weeknd", "length": "03:20" },
  { "name": "Industry Baby", "singer": "Lil Nas X, Jack Harlow", "length": "03:32" },
  { "name": "Kiss Me More", "singer": "Doja Cat, SZA", "length": "03:28" },
  { "name": "As It Was", "singer": "Harry Styles", "length": "02:47" },
  { "name": "Shivers", "singer": "Ed Sheeran", "length": "03:27" },
  { "name": "Heat Waves", "singer": "Glass Animals", "length": "03:58" },
  { "name": "Easy On Me", "singer": "Adele", "length": "03:45" },
  { "name": "Stay With Me", "singer": "Sam Smith", "length": "02:52" },
  { "name": "Savage Love", "singer": "Jawsh 685, Jason Derulo", "length": "02:51" },
  { "name": "Happier Than Ever", "singer": "Billie Eilish", "length": "04:58" }
])

const filteredSongs = computed(() =>
  songs.value.filter(m =>
    m.name.toLowerCase().includes(search.value.toLowerCase()) ||
    m.singer.toLowerCase().includes(search.value.toLowerCase())
  )
)

const bgColor = (index) => {
  const colors = [ 'bg-green', 'bg-gray',]
  return colors[index % colors.length]
}
</script>
