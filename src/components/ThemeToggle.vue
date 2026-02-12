<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';
import { Moon, Sun } from 'lucide-vue-next';
import { ref, onMounted } from 'vue';

const { isDark, toggleTheme } = useTheme();
const mounted = ref(false);

onMounted(() => {
  mounted.value = true;
});
</script>

<template>
  <div v-if="mounted" class="theme-toggle-wrapper">
    <button
      @click="toggleTheme"
      class="relative inline-flex h-8 w-16 items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 cursor-pointer"
      :class="isDark ? 'bg-gray-700' : 'bg-pink-100'"
      aria-label="Alternar tema entre claro e escuro"
      role="switch"
      :aria-checked="isDark"
      @keydown.space.prevent="toggleTheme"
      @keydown.enter.prevent="toggleTheme"
    >
      <span class="sr-only">Alternar tema</span>
      <span
        class="inline-block h-6 w-6 transform rounded-full shadow-md transition-all duration-300 ease-in-out flex items-center justify-center bg-white dark:bg-gray-800"
        :class="isDark ? 'translate-x-9' : 'translate-x-1'"
      >
        <Moon v-if="isDark" class="h-4 w-4 text-yellow-300 transition-colors duration-300" />
        <Sun v-else class="h-4 w-4 text-orange-400 transition-colors duration-300" />
      </span>
    </button>
  </div>
  <div v-else class="w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
</template>

<style scoped>
/* Ensure smooth transitions for color, background, and border */
.theme-toggle-wrapper :deep(*) {
  transition-property: color, background-color, border-color, transform, opacity;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); /* ease-in-out */
}
</style>
