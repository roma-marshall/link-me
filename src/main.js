import { createApp } from 'vue'
import { initializeApp } from 'firebase/app'
import firebaseConfig from './firebase/config'
import router from './router/router'
import './style.css'
import notifications from '@kyvg/vue3-notification'
import App from './App.vue'

initializeApp(firebaseConfig)
createApp(App)
  .use(router)
  .use(notifications)
  .mount('#app')
