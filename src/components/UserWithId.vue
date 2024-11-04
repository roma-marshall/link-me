<template>
  <div>
    <h1>UserWithId</h1>
    <h1>The user with ID: {{ $route.params.id }}</h1>
    <button @click="handleSignOut">sign out</button>
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