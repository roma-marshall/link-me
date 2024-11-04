<template>
  <div class="flex flex-col">
    <div class="flex justify-around my-10">
      <div>Public page</div>
      <a @click="$router.push('/profile')">settings</a>
      <h1>The user with ID: {{ $route.params.id }}</h1>
    </div>
  </div>
</template>

<script setup>

</script>