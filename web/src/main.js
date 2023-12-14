import persist from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Particles from 'particles.vue3'
const pinia=createPinia()
const app = createApp(App)

pinia.use(persist)
app.use(pinia)
app.use(router)
app.use(Particles)

app.mount('#app')
