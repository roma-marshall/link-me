<template>
  <div>
    <div class="flex flex-col justify-center mx-2 md:mx-10 my-10">
      <div class="flex justify-between">
        <a @click="router.push(`/user/${auth.currentUser.uid}`)" class="cursor-pointer p-3 border border-gray-300 bg-gray-100 rounded-full">
          <svg class="text-gray-500 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </a>
        <a @click="handleSignOut" class="cursor-pointer p-3 border border-gray-300 bg-gray-100 rounded-full">
          <svg class="text-gray-500 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
          </svg>
        </a>
      </div>

      <div class="mx-auto mt-10 mb-3">
        <svg class="text-gray-500 w-40 h-40" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      </div>

      <div class="flex flex-col items-center text-center space-y-5">

        <!-- Username -->
        <div class="max-w-sm mx-auto w-full">
          <div class="flex">
            <span class="inline-flex items-center px-3 text-base text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
              <svg class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </span>
            <input v-model="username" type="text" class="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-base p-2.5" placeholder="@username">
          </div>
        </div>

        <!-- Description -->
        <div class="max-w-sm mx-auto w-full">
          <div class="flex">
            <span class="inline-flex items-center px-3 text-base text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
              <svg class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
            </span>
            <textarea v-model="description" v-html="description" type="text" class="resize-none rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-base p-2.5" placeholder="description"></textarea>
          </div>
        </div>

        <!-- Links -->
        <div class="max-w-sm mx-auto w-full">
          <div :key="index" v-for="(i, index) in title">
            <div v-if="!hiddenIndices.has(index)" :class="{ 'transform -translate-x-full opacity-0': swipeOutIndex === index }" class="flex mb-4 w-full transition-all duration-500 ease-out">
              <span class="inline-flex items-center px-3 text-base text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
              <svg class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
              </svg>
            </span>
              <div class="flex flex-col w-full">
                <input @keyup.enter="saveUserData" v-model="title[index]" type="text" class="rounded-none bg-gray-50 border-b-0 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-base p-2.5" placeholder="title">
                <input @keyup.enter="saveUserData" v-model="link[index]" type="text" class="rounded-none bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-base p-2.5" placeholder="link">
              </div>
              <span @click="removeLink(index)" class="cursor-pointer inline-flex items-center px-3 text-base text-gray-900 bg-gray-200 border border-s-0 border-gray-300 rounded-e-md">
                <svg class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <a v-if="isActive" @click="addNewLink" class="cursor-pointer p-3 border border-gray-300 bg-gray-100 rounded-full">
          <svg class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </a>

        <!-- Save data -->
        <a @click="saveUserData" class="btn">Save</a>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'
import { getAuth, signOut } from 'firebase/auth'
import { useNotification } from '@kyvg/vue3-notification'

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
const isActive = ref(true)
const swipeOutIndex = ref(null)
const hiddenIndices = ref(new Set())

const getUserData = async () => {
  const user = auth.currentUser

  if (user) {
    const uid = user.uid
    const userDoc = await getDoc(doc(db, 'users', uid))

    if (userDoc.exists()) {
      const userData = userDoc.data()
      username.value = userData.username
      description.value = userData.description
      title.value = userData.title
      link.value = userData.link
    } else {
      console.log('No user data was found')
    }
  }
}

const removeLink = async (indexToDelete) => {
  const user = auth.currentUser

  if (isActive.value === false) {
    title.value = title.value.filter(item => item !== '')
    link.value = link.value.filter(item => item !== '')
    isActive.value = true
  } else {
    if (user) {
      const uid = user.uid
      const docRef = doc(db, 'users', uid)
      const userDoc = await getDoc(docRef)

      if (userDoc.exists()) {
        const userData = userDoc.data()
        const titles = userData.title || []
        const links = userData.link || []

        swipeOutIndex.value = indexToDelete
        setTimeout(() => {
          hiddenIndices.value.add(indexToDelete)
          swipeOutIndex.value = null
          isActive.value = true
        }, 500)

        if (indexToDelete >= 0 && indexToDelete < titles.length) {
          titles.splice(indexToDelete, 1)
          links.splice(indexToDelete, 1)
          await updateDoc(docRef, {
            title: titles,
            link: links
          })

          notify({
            title: 'Removed',
            type: 'notification',
            speed: 500,
            duration: 1500,
            ignoreDuplicates: true
          })
        } else {
          console.error('Index out of range')
        }
      } else {
        console.log('No user data was found')
      }
    }
  }
}

const addNewLink = () => {
  title.value.push('')
  link.value.push('')
  isActive.value = false
}

const saveUserData = async () => {
  const user = auth.currentUser
  const hasEmptyStringTitle = title.value.some(item => item === '')
  const hasEmptyStringLink = link.value.some(item => item === '')

  if (user && (!hasEmptyStringTitle && !hasEmptyStringLink)) {
    const uid = user.uid

    await setDoc(doc(db, 'users', uid), {
      username: username.value,
      description: description.value,
      title: title.value,
      link: link.value
    })

    isActive.value = true

    notify({
      title: 'Saved',
      type: 'notification',
      speed: 500,
      duration: 1500,
      ignoreDuplicates: true
    })
  } else {
    notify({
      title: 'Empty string',
      type: 'notification',
      speed: 500,
      duration: 1500,
      ignoreDuplicates: true
    })
  }
}

const handleSignOut = async () => {
  try {
    await signOut(auth)
    await router.push('/login')
  } catch (error) {
    console.log(error.code)
  }
}

onMounted(() => {
  uid.value = route.params.id
  getUserData()
})
</script>