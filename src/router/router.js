import { createWebHistory, createRouter } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import Home from '../components/Home.vue'
import Settings from '../components/Settings.vue'
import Login from '../components/Login.vue'
import Signup from '../components/Signup.vue'
import Profile from '../components/Profile.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/settings', component: Settings, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/user/:id', component: Profile },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  await getCurrentUser()
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next()
    } else {
      alert('Only registered users have access')
      next('/login')
    }
  } else {
    next()
  }
})

export default router