<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Moon, Sun } from 'lucide-vue-next';

const isDark = ref(false);
const mounted = ref(false);

onMounted(() => {
  // Check system preference or localStorage
  const userTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (userTheme === 'dark' || (!userTheme && systemDark)) {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  } else {
    isDark.value = false;
    document.documentElement.classList.remove('dark');
  }
  mounted.value = true;
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};
</script>

<template>
  <div v-if="mounted" class="flex items-center justify-center mb-4">
    <button
      @click="toggleTheme"
      class="relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
      :class="isDark ? 'bg-gray-700' : 'bg-pink-100'"
      aria-label="Alternar tema"
    >
      <span class="sr-only">Alternar tema</span>
      <span
        class="inline-block h-6 w-6 transform rounded-full shadow-md transition-transform duration-300 flex items-center justify-center"
        :class="isDark ? 'translate-x-9 bg-gray-900' : 'translate-x-1 bg-white'"
      >
        <Moon v-if="isDark" class="h-4 w-4 text-yellow-300" />
        <Sun v-else class="h-4 w-4 text-orange-400" />
      </span>
    </button>
  </div>
  <div v-else class="w-10 h-6"></div>
</template>
