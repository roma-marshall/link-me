import { createApp } from 'vue'
import './style.css'
import { initializeApp } from 'firebase/app'
import firebaseConfig from './firebase/config'
import router from './router/router'
import App from './App.vue'

initializeApp(firebaseConfig)
createApp(App)
  .use(router)
  .mount('#app')
