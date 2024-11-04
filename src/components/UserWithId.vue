<template>
  <div>
    <div class="flex flex-col">
      <div class="md:flex justify-around my-10">
        <a @click="$router.push('/profile')" class="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Settings</a>
        <div>Public page</div>
        <div>The user with ID: {{ $route.params.id }}</div>
        <div>The user with ID: {{ uid }}</div>
      </div>
    </div>

    <hr class="mb-10" />

    <div class="flex flex-col justify-center mx-5">

      <div class="mx-auto">
        <svg class="w-20 h-20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      </div>

      <div class="flex flex-col items-center text-center mx-auto">
        <span class="text-lg font-bold">@{{ username }}</span>
        <span class="w-3/4">{{ description }}</span>
      </div>

      <div v-if="websiteLink" class="flex flex-col mt-10">
        <a :href="websiteLink" target="_blank" class="flex justify-center py-4 md:w-1/2 md:mx-auto relative border border-black rounded-full bg-gray-200 cursor-pointer">
          <svg class="w-6 h-6 absolute left-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
          </svg>
          <span>{{ websiteTitle ? websiteTitle : websiteLink }}</span>
        </a>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const route = useRoute()
const db = getFirestore()
const uid = ref()
const username = ref()
const description = ref()
const websiteTitle = ref()
const websiteLink = ref()

const getUserData = async () => {
  const userDoc = await getDoc(doc(db, "users", uid.value))

  if (userDoc.exists()) {
    const userData = userDoc.data()
    username.value = userData.username
    description.value = userData.description
    websiteTitle.value = userData.websiteTitle
    websiteLink.value = userData.websiteLink
  } else {
    console.log("No user data was found")
    //todo: redirect to 404 page
  }
}

onMounted(() => {
  uid.value = route.params.id
  getUserData()
})
</script>