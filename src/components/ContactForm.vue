<script setup lang="ts">
import { ref } from 'vue';
import { MessageSquare, Send } from 'lucide-vue-next';

const message = ref('');

const handleSubmit = () => {
  const phone = import.meta.env.VITE_WHATSAPP_NUMBER || '5586989038050';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message.value)}`;
  window.open(url, '_blank');
  message.value = '';
};
</script>

<template>
  <section class="py-12 px-6 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
    <div class="max-w-2xl mx-auto text-center">
      <div class="flex items-center justify-center gap-3 mb-6">
        <MessageSquare class="text-pink-600 dark:text-pink-500" :size="28" />
        <h2 class="text-2xl font-bold font-montserrat text-gray-800 dark:text-white transition-colors duration-300">
          Ficou com dúvidas?
        </h2>
      </div>
      
      <p class="text-gray-500 dark:text-gray-400 mb-8 transition-colors duration-300">
        Envie uma mensagem direta para nosso WhatsApp e responderemos o mais breve possível.
      </p>

      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
        <textarea
          required
          v-model="message"
          class="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all resize-none h-32 placeholder-gray-400 dark:placeholder-gray-500"
          placeholder="Escreva sua dúvida aqui..."
        ></textarea>

        <button
          type="submit"
          class="w-full bg-gray-900 dark:bg-pink-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-black dark:hover:bg-pink-700 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Send :size="20" />
          Enviar Mensagem
        </button>
      </form>
    </div>
  </section>
</template>
