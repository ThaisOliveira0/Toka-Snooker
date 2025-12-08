<template>
  <div class="container">
    <Header>KARAOKE</Header>

    <div class="status-card" @click="openQueueModal">
      <p class="status-label">Tempo estimado de espera:</p>

      <!-- TEMPO REAL DA ROTA -->
      <p class="status-time">
        {{ userQueueData?.tempo_est_ate_cantar_formatado || "—" }}
      </p>

      <i class="fas fa-sync-alt reload-icon" @click.stop="fetchQueuePosition"></i>
    </div>


    <div class="search-box">
      <input v-model="search" type="text" placeholder="Pesquise sua música..." class="search-input" />
      <button class="search-button">
        <i class="fas fa-search"></i>
      </button>
    </div>

    <div class="song-list">
      <div v-if="loading" class="loading-songs">
        <i class="fas fa-spinner fa-spin"></i>
      </div>

      <div v-else v-for="(song, index) in filteredSongs" :key="song.id ?? song.name"
        :class="['song-card', bgColor(index), selected === song.id ? 'selected' : '']" @click="selected = song.id">
        <div class="song-info">
          <label class="custom-radio">
            <input type="radio" name="musica" :value="song.id" v-model="selected" />
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


    <div v-if="selected && userQueueData?.esta_na_fila !== 1" class="selected-music">
      <div class="selected-info">
        <p>Música selecionada:</p>
        <p><strong>{{ selectedSongName }}</strong></p>
      </div>
      <button class="confirm-button" @click="confirmSong" :disabled="confirmLoading">
  <i v-if="confirmLoading" class="fas fa-spinner fa-spin"></i>
  <span v-else>
    <i class="fas fa-check"></i> Confirmar
  </span>
</button>

    </div>
  </div>
  <InfoModal :show="queueModalOpen" :selectedSong="userQueueData?.esta_na_fila === 1
    ? { name: userQueueData.musica_nome, singer: userQueueData.musica_artista }
    : songs.find(m => m.id === selected) || {}" :queueTime="userQueueData?.tempo_est_ate_cantar_formatado || '—'"
    :queueEnteredAt="userQueueData?.data_entrada_fila || null" :queuePosition="queuePosition"
    @close="queueModalOpen = false" @leave="handleLeaveQueue" />

</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
import Header from '@/components/layout/Header.vue'
import { getDecodedToken } from '@/service/authService.js'
import karaokeService from '@/service/karaokeService'
import './Karaoke.css'
import InfoModal from './components/InfoModal.vue'
import { toast } from "vue3-toastify";

const queueModalOpen = ref(false)
const requestTime = ref('')
const queuePosition = ref(null)
const queueLoading = ref(true)
const search = ref('')
const loading = ref(true)
const selected = ref(null)
const songs = ref([])
const userQueueData = ref(null)
const confirmLoading = ref(false)

const formatDuration = (seconds) => {
  const min = Math.floor(seconds / 60)
  const sec = seconds % 60
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

const openQueueModal = () => {
  if (userQueueData.value?.esta_na_fila === 1) {
    queueModalOpen.value = true
    return
  }

  if (!selected.value) {
    toast.info("Nenhuma música selecionada!");
    return;
  }

  const now = new Date();
  requestTime.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  queueModalOpen.value = true;
}

const handleLeaveQueue = () => {
  queueModalOpen.value = false
  selected.value = null
  userQueueData.value = null
}

onMounted(async () => {
  loading.value = true
  try {
    const data = await karaokeService.getSongs()
    if (!Array.isArray(data)) return

    songs.value = data.map((m) => ({
      name: m.nome ?? m.name,
      singer: m.artista ?? m.singer ?? 'Desconhecido',
      length: formatDuration(Number(m.duracao ?? m.duration ?? 0)),
      genre: m.genero ?? m.genre,
      id: m.id ?? m._id ?? null
    }))

    await fetchQueuePosition()

  } catch (err) {
    console.error('Erro ao carregar músicas:', err)
  } finally {
    loading.value = false
  }
})


const fetchQueuePosition = async () => {
  const user = getDecodedToken();
  if (!user) return;

  const id_usuario = user.id;

  queueLoading.value = true;
  try {
    const response = await karaokeService.getUser(id_usuario);

    if (response && response.id_usuario) {
      userQueueData.value = response;
      queuePosition.value = response.posicao;

      if (response.esta_na_fila === 1) {
        selected.value = response.id_musica;
      }

    } else {
      userQueueData.value = null;
      queuePosition.value = null;
    }

  } catch (err) {
    console.error("Erro ao buscar posição na fila:", err);
    userQueueData.value = null;
    queuePosition.value = null;
  } finally {
    queueLoading.value = false;
  }
};

const confirmSong = async () => {
  if (!selected.value) {
    return toast.warning("Selecione uma música!");
  }

  const user = getDecodedToken();
  if (!user) {
    toast.error("Usuário não autenticado.");
    return;
  }

  const id_usuario = user.id;
  const id_musica = selected.value;

  confirmLoading.value = true;  

  try {
    const response = await karaokeService.sendSong(id_musica, id_usuario);

    if (response && response.sucesso) {
      toast.success("Música adicionada à fila com sucesso!");
      selected.value = null;

      await fetchQueuePosition();
    } else {
      toast.info("Requisição enviada, mas a resposta não está no formato esperado.");
    }

  } catch (error) {
    console.error("Erro ao enviar música:", error);
    toast.error("Erro ao adicionar música.");
  } finally {
    confirmLoading.value = false; 
  }
};



const filteredSongs = computed(() =>
  songs.value.filter(m =>
    (m.name || '').toLowerCase().includes(search.value.toLowerCase()) ||
    (m.singer || '').toLowerCase().includes(search.value.toLowerCase())
  )
)

const selectedSongName = computed(() => {
  const s = songs.value.find(m => m.id === selected.value)
  return s ? s.name : ''
})

const bgColor = (index) => {
  const colors = ['bg-green', 'bg-gray']
  return colors[index % colors.length]
}
</script>
