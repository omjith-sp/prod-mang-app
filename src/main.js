import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from "pinia";
import router from "./router";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'


createApp(App).use(router,createPinia()).mount("#app");
