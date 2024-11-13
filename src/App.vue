<template>
  <div class="bg-main">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <notifications position="top left" />
  </div>
</template>

<script setup>

</script>