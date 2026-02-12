<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 text-gray-900 dark:text-gray-100 font-sans antialiased selection:bg-pink-500 selection:text-white">
    <RouterView />
  </div>
</template>
