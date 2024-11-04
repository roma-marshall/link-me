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
            <div class="mb-5">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input v-model="email" type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
            </div>
            <div class="mb-5">
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input v-model="password" type="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
            </div>
<!--            <div class="mb-5">-->
<!--              <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>-->
<!--              <input type="password" id="repeat-password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />-->
<!--            </div>-->
            <div class="flex items-start mb-5">
              <div class="flex items-center h-5">
                <input id="terms" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
              </div>
              <label for="terms" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
            </div>
            <a @click="signUp" class="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</a>
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

const signUp = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    await sendEmailVerification(auth.currentUser)

    await setDoc(doc(db, "users", auth.currentUser.uid), {
      username: auth.currentUser.email.slice(0, 5),
      description: 'A UFO flew in and posted this caption here',
      websiteTitle: '',
      websiteLink: '',
      tgLink: '',
      instLink: '',
      tiktokLink: '',
    })
    await router.push('/profile')
    notify({
      title: 'An account has been created',
      type: 'notification',
      speed: 500,
      duration: 1500,
      ignoreDuplicates: true
    })
  } catch (error) {
    console.log(error.code)
  }
}
</script>