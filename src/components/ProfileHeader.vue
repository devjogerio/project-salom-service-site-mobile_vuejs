<script setup lang="ts">
import ThemeToggle from './ThemeToggle.vue';
</script>

<template>
  <header class="flex flex-col items-center justify-center pt-14 pb-10 px-5 bg-white dark:bg-gray-900 w-full border-b border-gray-50 dark:border-gray-800 transition-colors duration-300">
    <div class="relative mb-6">
      <div class="w-48 h-48 rounded-full border-[5px] border-pink-500 p-1.5 bg-white dark:bg-gray-800 shadow-xl overflow-hidden transition-colors duration-300">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop"
          alt="Foto de Perfil"
          class="rounded-full w-full h-full object-cover"
        />
      </div>
    </div>

    <div class="text-center space-y-1.5 w-full">
      <h1 class="text-4xl font-bold font-montserrat text-gray-900 dark:text-white transition-colors duration-300">
        Cléia Gomes
      </h1>
      <p class="text-xl text-pink-600 dark:text-pink-400 font-medium transition-colors duration-300">
        Nail Designer & Beauty Artist
      </p>
      <p class="text-base text-gray-500 dark:text-gray-400 max-w-sm mx-auto mt-2.5 transition-colors duration-300">
        Transformando beleza em arte. Especialista em alongamentos e design de unhas.
      </p>
      
      <!-- Toggle de Tema -->
      <div class="mt-4 flex justify-center">
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>
