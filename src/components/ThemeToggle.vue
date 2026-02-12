<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next';
import { useTheme } from '@/composables/useTheme';

const { isDark, toggleTheme } = useTheme();
</script>

<template>
  <div class="flex items-center justify-center my-4">
    <button
      @click="toggleTheme"
      class="relative inline-flex h-8 w-16 items-center rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 cursor-pointer border border-transparent transition-colors duration-300"
      :class="isDark ? 'bg-gray-700' : 'bg-pink-100'"
      aria-label="Alternar entre tema claro e escuro"
      role="switch"
      :aria-checked="isDark"
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
</template>
