<template>
  <div class="flex flex-col">
    <div class="flex justify-around my-10">
      <a @click="router.push(`/user/${auth.currentUser.uid}`)" class="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Go to your page</a>
      <a @click="handleSignOut" class="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Out</a>
    </div>
    <div class="flex flex-col mx-auto my-10">
      <div>EmailVerified: {{ auth.currentUser.emailVerified }}</div>
      <div>The user with ID: {{ auth.currentUser.uid }}</div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { getAuth, signOut } from 'firebase/auth'

const router = useRouter()
const auth = getAuth()

const handleSignOut = async () => {
  try {
    await signOut(auth)
    await router.push('/login')
    console.log('Successfully log out!')
  } catch (error) {
    console.log(error.code)
  }
}
</script>