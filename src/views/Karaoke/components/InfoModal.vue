<template>
    <div v-if="show" class="queue-modal-overlay" @click.self="closeModal">
        <div class="queue-modal-container">
            <h2>Detalhes da fila</h2>

            <div class="queue-modal-info">
                <div class="queue-info-box">
                    <p class="queue-label">Tempo estimado de espera:</p>
                    <p class="queue-value">15min 30 seg</p>
                </div>

                <div class="queue-info-box">
                    <p class="queue-label">Entrou na fila:</p>
                    <p class="queue-value">{{ requestTime }}</p>
                </div>

                <div class="queue-info-box">
                    <p class="queue-label">Música selecionada:</p>
                    <p class="queue-value">{{ selectedSong.name || 'No song selected' }}</p>
                </div>
            </div>


            <button class="queue-btn-leave" @click="leaveQueue">Sair da fila</button>
        </div>
    </div>
</template>

<script setup>
import karaokeService from '@/service/karaokeService'
import { getDecodedToken } from '@/service/authservice.js'

const props = defineProps({
    show: Boolean,
    selectedSong: Object,
    requestTime: String,
})

const emit = defineEmits(['close', 'leave'])

const closeModal = () => emit('close')

const leaveQueue = async () => {
    const user = getDecodedToken()
    if (!user) {
        alert("Usuário não autenticado.")
        return
    }

    const id_usuario = user.id
    const response = await karaokeService.exitLine(id_usuario)

    if (response && (response.success || response.status === "ok")) {
        alert("Você saiu da fila!")
        emit('leave')
    } else {
        alert("Erro ao sair da fila, veja console.")
    }
}
</script>

<style scoped>
.queue-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.queue-modal-container {
    background: #0f1115;
    color: white;
    border-radius: 16px;
    padding: 24px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.queue-info-box {
    background: #0f1115;
    padding: 12px 16px;
    border-radius: 12px;
    margin-bottom: 12px;
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
}


.queue-label {
    font-weight: 600;
    font-size: 14px;
    color: #ffffff;
    margin-bottom: 4px;
}

.queue-value {
    font-size: 16px;
    font-weight: bold;
    color: #22c55e;
}

.queue-btn-leave {
    margin-top: 20px;
    padding: 10px 20px;
    background: #ef4444;
    border: none;
    border-radius: 9999px;
    font-weight: bold;
    color: white;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
}

.queue-btn-leave:hover {
    background: #dc2626;
    transform: scale(1.05);
}
</style>
