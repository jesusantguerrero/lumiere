import { createApp } from 'vue'
import App from './App.vue'

import "./assets/styles/main.css";
import "atmosphere-ui/dist/style.css"
import router from "./router";


createApp(App)
.use(router)
.mount('#app')
