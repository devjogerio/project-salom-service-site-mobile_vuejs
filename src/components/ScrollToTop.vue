<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { ArrowUp } from 'lucide-vue-next';

const isVisible = ref(false);

const handleScroll = () => {
  const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  isVisible.value = scrollPercentage > 45;
};

const scrollToTop = (e: Event) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="translate-y-20 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-20 opacity-0"
  >
    <button
      v-if="isVisible"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer group"
      aria-label="Voltar ao topo"
    >
      <ArrowUp :size="28" />
      <span class="absolute right-full mr-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-lg text-sm font-medium shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
        Voltar ao topo
      </span>
    </button>
  </transition>
</template>
