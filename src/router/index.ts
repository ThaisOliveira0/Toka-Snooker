import { createRouter, createWebHistory } from 'vue-router'
import Menu from '@/views/Menu/Menu.vue'
import Home from '@/views//Home/Home.vue'
import Karaoke from '@/views/Karaoke/Karaoke.vue'
import Tab from '@/views/Tab/Tab.vue'


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
    ]
})

export default router
