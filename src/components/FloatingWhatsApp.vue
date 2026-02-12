<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { MessageCircle } from 'lucide-vue-next';
import { createWhatsAppLink, getGeneralContactMessage } from '@/utils/whatsapp';

const isVisible = ref(false);
const whatsappLink = createWhatsAppLink(getGeneralContactMessage());

const handleScroll = () => {
  const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  isVisible.value = scrollPercentage > 45;
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
    <a
      v-if="isVisible"
      :href="whatsappLink"
      target="_blank"
      rel="noopener noreferrer"
      class="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95"
      aria-label="Fale conosco no WhatsApp"
    >
      <MessageCircle :size="32" />
      <span class="absolute right-full mr-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-lg text-sm font-medium shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
        Fale conosco
      </span>
    </a>
  </transition>
</template>
