import { createWebHistory, createRouter } from 'vue-router'

import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Signup from '../components/Signup.vue'
import UserWithId from '../components/UserWithId.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/user/:id', component: UserWithId },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router