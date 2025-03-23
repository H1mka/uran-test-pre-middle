import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { inputMask } from '@/directives'

const app = createApp(App)

app.directive('mask', inputMask)

app.mount('#app')
