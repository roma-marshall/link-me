<template>
  <div>
    <div class="flex flex-col justify-center mx-2 md:mx-10 my-10">
      <div class="flex justify-between">
        <a @click="$router.push('/settings')" v-if="auth?.currentUser?.uid === uid" class="cursor-pointer p-3 border border-gray-300 bg-gray-100 rounded-full">
          <svg class="text-gray-500 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </a>

        <div @click="copyPath" class="cursor-pointer p-3 ml-auto mr-0 border border-gray-300 bg-gray-100 rounded-full">
          <svg class="text-gray-500 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
          </svg>
        </div>
      </div>

      <div class="mx-auto mt-10 mb-3">
        <svg class="text-gray-500 w-40 h-40" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      </div>

      <div class="flex flex-col items-center text-center mx-auto space-y-2">
        <div class="flex space-x-2">
          <div class="text-lg font-bold">@{{ username }}</div>
          <a @click="$router.push('/settings')" v-if="auth?.currentUser?.uid === uid" class="cursor-pointer my-auto">
            <svg v-if="auth?.currentUser?.uid === uid" class="text-gray-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
          </a>
        </div>
        <span class="w-3/4">{{ description }}</span>
      </div>

      <div class="flex flex-col space-y-5 mt-10">
        <div v-for="(item, index) in title" v-if="title" class="flex flex-col">
          <a :href="link[index]" target="_blank" class="flex justify-center py-4 md:w-1/2 md:mx-auto relative border border-black rounded-full bg-gray-200 cursor-pointer">
            <svg class="text-gray-500 w-6 h-6 absolute left-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
            </svg>
            <span>{{ title[index] }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { useClipboard } from '@vueuse/core'
import { useNotification } from '@kyvg/vue3-notification'
import { useRouter } from 'vue-router'

const { copy } = useClipboard()
const { notify }  = useNotification()

const router = useRouter()
const auth = getAuth()
const route = useRoute()
const db = getFirestore()
const uid = ref()
const username = ref()
const description = ref()
const title = ref([])
const link = ref([])

const getUserData = async () => {
  const userDoc = await getDoc(doc(db, 'users', uid.value))

  if (userDoc.exists()) {
    const userData = userDoc.data()
    username.value = userData.username
    description.value = userData.description
    title.value = userData.title
    link.value = userData.link
  } else {
    console.log('No user data was found')
    router.push('/signup')
    notify({
      title: 'Wrong URL',
      type: 'notification',
      speed: 500,
      duration: 1500,
      ignoreDuplicates: true
    })
  }
}

const copyPath = () => {
  copy(window.location.href)
  notify({
    title: 'Copied',
    type: 'notification',
    speed: 500,
    duration: 1500,
    ignoreDuplicates: true
  })
}

onMounted(() => {
  uid.value = route.params.id
  getUserData()
})
</script>