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
  const user = await getCurrentUser()

  // If the user is authenticated and trying to visit a page where they shouldn't be
  if (user) {
    // Redirect to settings if user is logged in and trying to visit login, signup, or home
    if (to.path === '/home' || to.path === '/login' || to.path === '/signup') {
      next('/settings')
    } else {
      next()  // Continue to the requested route
    }
  } else {
    // If user is not authenticated, handle access restrictions
    if (to.matched.some(record => record.meta.requiresAuth)) {
      alert('Only registered users have access')
      next('/login')
    } else {
      next()  // Continue to the requested route if no auth is required
    }
  }
})

export default router