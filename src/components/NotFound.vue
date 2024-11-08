<template>
  <div class="flex flex-col justify-center space-y-10 h-screen mx-2 my-auto">
    <div>
      <figure class="max-w-screen-md mx-auto text-center">
        <svg class="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
          <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
        </svg>
        <blockquote>
          <p class="text-2xl italic font-medium text-gray-900 dark:text-white">
            "A UFO flew in and stole this page, we're sorry about that."
          </p>
        </blockquote>
      </figure>
    </div>
    <div>
      <router-link class="flex justify-center mx-auto hover:bg-black/90 bg-black rounded-lg py-3 px-16 w-fit text-white" to="/signup">Go Home</router-link>
    </div>
  </div>
</template>