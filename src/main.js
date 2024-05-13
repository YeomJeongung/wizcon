import 'primevue/resources/themes/aura-light-green/theme.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import AnimateOnScroll from 'primevue/animateonscroll'
import ConfirmationService from 'primevue/confirmationservice'
import Tooltip from 'primevue/tooltip'
import Ripple from 'primevue/ripple';
import App from './App.vue'
import router from '@/router/index.js'
import 'primeicons/primeicons.css'
const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue, { ripple: true })
app.directive('tooltip', Tooltip)
app.directive('animateonscroll', AnimateOnScroll)
app.directive('ripple', Ripple);
app.use(ConfirmationService)
app.use(router)
app.mount('#app')
