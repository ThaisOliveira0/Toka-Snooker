import { createRouter, createWebHistory } from 'vue-router'
import Menu from '@/views/Menu/Menu.vue'
import Home from '@/views/Home/Home.vue'
import Karaoke from '@/views/Karaoke/Karaoke.vue'
import Tab from '@/views/Tab/Tab.vue'
import History from '@/views/History/History.vue'
import Login from '@/views/Login/Login.vue'
import SignUp from '@/views/SignUp/SignUp.vue'
import ForgotPassword from '@/views/ForgotPassword/ForgotPassword.vue'
import ConfirmOrder from '@/views/ConfirmOrder/ConfirmOrder.vue'
import EnterCode from '@/views/EnterCode/EnterCode.vue'
import ResetPassword from '@/views/ResetPassword/ResetPassword.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Públicas
    { path: '/', name: 'home', component: Home, meta: { public: true } },
    { path: '/menu', name: 'menu', component: Menu, meta: { public: true } },
    { path: '/login', name: 'login', component: Login, meta: { public: true } },
    { path: '/cadastro', name: 'signUp', component: SignUp, meta: { public: true } },
    { path: '/recuperar-senha', name: 'forgotPassword', component: ForgotPassword, meta: { public: true } },
    { path: '/inserir-codigo', name: 'enterCode', component: EnterCode, meta:{ public: true}},
    { path: '/redefinir-senha', name: 'resetPassword', component: ResetPassword, meta:{ public: true}},

    // Privadas
    { path: '/karaoke', name: 'karaoke', component: Karaoke, meta: { requiresAuth: true } },
    { path: '/comanda', name: 'tab', component: Tab, meta: { requiresAuth: false } },
    { path: '/historico', name: 'history', component: History, meta: { requiresAuth: false } },
    { path: '/confirmar-pedido', name: 'ConfirmOrder', component: ConfirmOrder, meta: { requiresAuth: false } },
  ]
})

function isAuthenticated() {
  return !!localStorage.getItem('token');
}

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'login' });
  } else {
    next(); 
  }
})

export default router
