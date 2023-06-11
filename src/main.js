import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'

import * as VueRouter from 'vue-router'

import Home from './pages/Home.vue'
import Register from './pages/Register.vue'
import Login from './pages/Login.vue'
import Dashboard from './pages/Dashboard.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/dashboard', component: Dashboard },
    { path: '/categories', component: () => import('./pages/Categories.vue'), name: 'categories' },
    { path: '/categories/:id', component: () => import('./pages/Category.vue'), name: 'category' },
    { path: '/games/:id', component: () => import('./pages/Game.vue'), name: 'game' },
    { path: '/platforms', component: () => import('./pages/Platforms.vue'), name: 'platforms' },
    { path: '/platforms/:id', component: () => import('./pages/Platform.vue'), name: 'platform' },
]

const router = VueRouter.createRouter({
history: VueRouter.createWebHashHistory(),
routes,
})

createApp(App)

.use(router)

.mount('#app')
