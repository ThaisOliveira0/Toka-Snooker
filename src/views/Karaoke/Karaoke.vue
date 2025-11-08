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
import { ref, computed, onMounted } from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
import Header from '@/components/layout/Header.vue'
import karaokeService from '@/service/karaokeService' 
import './karaoke.css'

const search = ref('')
const selected = ref('')
const songs = ref([]) 

const formatDuration = (seconds) => {
  const min = Math.floor(seconds / 60)
  const sec = seconds % 60
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

onMounted(async () => {
  try {
    const data = await karaokeService.getSongs()
    songs.value = data.map((m) => ({
      name: m.nome,
      singer: m.artista,
      length: formatDuration(m.duracao),
      genre: m.genero,
      id: m.id
    }))
  } catch (err) {
    console.error('Erro ao carregar músicas:', err)
  }
})

const filteredSongs = computed(() =>
  songs.value.filter(m =>
    m.name.toLowerCase().includes(search.value.toLowerCase()) ||
    m.singer.toLowerCase().includes(search.value.toLowerCase())
  )
)

const bgColor = (index) => {
  const colors = ['bg-green', 'bg-gray']
  return colors[index % colors.length]
}
</script>
