import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import router from '../../router'

window.wpsType = "ppt"

const app = createApp(App)

app.use(router.createRouter(createRouter, createWebHistory, createWebHashHistory))

app.mount('#app')

