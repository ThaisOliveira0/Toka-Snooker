import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faSearch,
  faCheck,
  faUser,
  faEnvelope,
  faPhone,
  faLock,
  faEye,
  faEyeSlash
} from '@fortawesome/free-solid-svg-icons'

library.add(faSearch, faCheck, faUser, faEnvelope, faPhone, faLock, faEye, faEyeSlash)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)

// Configurando Vue3Toastify
app.use(Vue3Toastify, {
  autoClose: 3000,
  position: "top-right"
})

app.mount('#app')
