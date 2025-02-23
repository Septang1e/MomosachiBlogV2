import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "boxicons/css/boxicons.css"

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {initElementIconsVue} from "@/plugins";
import CalenderHeatmap from "vue3-calendar-heatmap"

// Themes


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(CalenderHeatmap)

initElementIconsVue(app)

app.mount('#app')
