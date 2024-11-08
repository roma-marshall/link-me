<template>
  <div class="flex justify-between">
    <div class="w-full">
      <div class="flex flex-col justify-around h-screen mx-10">
        <div class="flex">
          link me [logo]
        </div>
        <div class="flex flex-col space-y-10">
          <div class="flex flex-col space-y-4">
            <div class="text-6xl text-center">Join Link Me</div>
            <div class="text-lg text-center">Sign up for free!</div>
          </div>

          <form class="max-w-sm mx-auto w-full">
            <div class="relative mb-5">
              <div class="absolute -translate-y-1/2 top-1/2 left-4">
                <svg class="text-gray-500 size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <input @keyup.enter="signUp" v-model="email" type="email" id="email" class="pl-12 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Email" required />
            </div>
            <div class="relative mb-5">
              <div class="absolute -translate-y-1/2 top-1/2 left-4">
                <svg class="text-gray-500 size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              </div>
              <input @keyup.enter="signUp" v-model="password" type="password" id="password" class="pl-12 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Password" required />
            </div>
            <div class="flex items-start mb-5">
              <div class="flex items-center h-5">
                <input v-model="isChecked" id="terms" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
              </div>
              <label for="terms" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
            </div>
            <button @click="signUp" :disabled="!isChecked" :class="{ 'bg-gray-500 hover:bg-gray-500 cursor-default' : !isChecked }" class="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
          </form>
        </div>

        <div class="text-center">
          Already have an account? <router-link to="/login" class="underline text-blue-500">Log In</router-link>
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
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { useNotification } from '@kyvg/vue3-notification'

const { notify }  = useNotification()
const router = useRouter()
const email = ref()
const password = ref()
const auth = getAuth()
const db = getFirestore()
const isChecked = ref(false)

const signUp = async () => {

  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    await sendEmailVerification(auth.currentUser)

    await setDoc(doc(db, 'users', auth.currentUser.uid), {
      username: auth.currentUser.email.slice(0, 5),
      description: 'A UFO flew in and posted this caption here',
      title: [],
      link: []
    })
    await router.push('/settings')
  } catch (error) {
    console.log(error.code)
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
      case 'auth/email-already-in-use':
        notify({
          title: 'Email already in use',
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