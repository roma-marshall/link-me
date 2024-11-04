<template>
  <div class="flex justify-between">
    <div class="w-full">
      <div class="flex flex-col justify-around h-screen mx-10">
        <div class="flex">
          link me [logo]
        </div>

        <div class="flex flex-col space-y-10">
          <div class="flex flex-col space-y-4">
            <div class="text-6xl text-center">Welcome back!</div>
            <div class="text-lg text-center">Log in to your Link Me</div>
          </div>

          <form class="max-w-sm mx-auto w-full">
            <div class="mb-5">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input v-model="email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
            </div>
            <div class="mb-5">
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input v-model="password" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
<!--            <div class="flex items-start mb-5">-->
<!--              <div class="flex items-center h-5">-->
<!--                <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />-->
<!--              </div>-->
<!--              <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>-->
<!--            </div>-->
            <a @click="logIn" class="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log In</a>
          </form>
        </div>

        <div class="text-center">
          Don't have an account? <router-link to="/signup" class="underline text-blue-500">Sign up</router-link>
        </div>
      </div>
    </div>
    <div class="w-full hidden md:block">
      <img class="h-screen w-full" src="https://placeholder.pics/svg/768x1024/DEDEDE/555555" alt="placeholder">
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNotification } from '@kyvg/vue3-notification'

const { notify }  = useNotification()
const router = useRouter()
const email = ref()
const password = ref()
const auth = getAuth()

const logIn = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    await router.push('/profile')
  } catch (error) {
    switch (error.code) {
      case 'auth/invalid-email':
        notify({
          title: 'Invalid email',
          type: 'notification',
          speed: 500,
          duration: 1500,
          ignoreDuplicates: true
        })
        break
      case 'auth/missing-email':
        notify({
          title: 'Missing email',
          type: 'notification',
          speed: 500,
          duration: 1500,
          ignoreDuplicates: true
        })
        break
      case 'auth/missing-password':
        notify({
          title: 'Missing password',
          type: 'notification',
          speed: 500,
          duration: 1500,
          ignoreDuplicates: true
        })
        break
      case 'auth/invalid-credential':
        notify({
          title: 'Wrong email or password',
          type: 'notification',
          speed: 500,
          duration: 1500,
          ignoreDuplicates: true
        })
        break
      default:
        notify({
          title: 'Unexpected error. Try later',
          type: 'notification',
          speed: 500,
          duration: 1500,
          ignoreDuplicates: true
        })
        break
    }
  }
}
</script>