import { createApp } from 'vue'
// import '../../dist/css/style.css'
import '../assets/style.css'
import App from '../App.vue'
import router from './configs/routes.js'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { definePreset } from '@primevue/themes'
import Theme from '@primevue/themes/aura'

const MyPreset = definePreset(Theme, {
    semantic: {
        primary: {
            0: '#ffffff',
            50: '{gray.50}',
            100: '{gray.100}',
            200: '{gray.200}',
            300: '{gray.300}',
            400: '{gray.400}',
            500: '{gray.500}',
            600: '{gray.600}',
            700: '{gray.700}',
            800: '{gray.800}',
            900: '{gray.900}',
            950: '{gray.950}'
        },
        colorScheme: {
            light: {
                formField: {
                    hoverBorderColor: '{primary.color}',
                }
            },
        }
    }
});


const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
        options: {
            darkModeSelector: false,
            cssLayer: false,
        },
    }
});
app.mount('#app')
