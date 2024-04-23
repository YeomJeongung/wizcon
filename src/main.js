import 'primevue/resources/themes/aura-light-green/theme.css'
import './assets/use.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import AnimateOnScroll from 'primevue/animateonscroll';
import Tooltip from 'primevue/tooltip';
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue);
app.directive('tooltip', Tooltip);
app.directive('animateonscroll', AnimateOnScroll);
app.mount('#app')
