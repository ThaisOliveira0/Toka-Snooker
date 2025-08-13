import { createRouter, createWebHistory } from 'vue-router'
import Menu from '@/views/Menu/Menu.vue'
import Home from '@/views//Home/Home.vue'
import Karaoke from '@/views/Karaoke/Karaoke.vue'
import Tab from '@/views/Tab/Tab.vue'
import History from '@/views/History/History.vue'
import Login from '@/views/Login/Login.vue'
import SignUp from '@/views/SignUp/SignUp.vue'
import ForgotPassword from '@/views/ForgotPassword/ForgotPassword.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/menu',
            name: 'menu',
            component: Menu,
        },
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/karaoke',
            name: 'karaoke',
            component: Karaoke
        },
        {
            path: '/comanda',
            name: 'tab',
            component: Tab
        },
        {
            path: '/historico',
            name: 'history',
            component: History
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/cadastro',
            name: 'signUp',
            component: SignUp
        },
        {
            path: '/recuperar-senha',
            name: 'forgotPassword',
            component: ForgotPassword
        },
    ]
})

export default router
