import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import Vue from 'vue'
import HighchartsVue from 'highcharts-vue'


createApp(App).use(router,HighchartsVue).mount('#app')
