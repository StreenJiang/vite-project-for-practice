import { createApp } from 'vue'
// import '../../dist/css/style.css'
import '../assets/style.css'
import App from '../App.vue'
import router from './configs/routes.js'

createApp(App).use(router).mount('#app')
