import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { useAuthStore } from '@/stores/useAuthStore'
import router from './router'

import './assets/styles/tailwind.css'


const app = createApp(App)
app.use(createPinia())


const authStore = useAuthStore();
authStore.initialize();

app.use(router)

createApp(App).mount('#app')