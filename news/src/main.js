import { createApp } from 'vue'
// import { createPinia } from 'pinia'

import Particles from 'particles.vue3'
import App from './App.vue'
import router from './router'
import '@/util/axios.config.js'
import pinia from './stores'

const app = createApp(App)

// app.use(createPinia())
app.use(router)
app.use(Particles)
app.use(pinia)
app.mount('#app')
