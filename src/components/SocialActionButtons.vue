<script setup lang="ts">
import { MessageCircle, Instagram, Calendar } from 'lucide-vue-next';
import { createWhatsAppLink, getGeneralContactMessage } from '@/utils/whatsapp';

const whatsappLink = createWhatsAppLink(getGeneralContactMessage());

const scrollToAppointment = (e: Event) => {
  e.preventDefault();
  const element = document.getElementById('agendamento');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<template>
  <div class="w-full max-w-md mx-auto mt-6 px-4">
    <div class="flex justify-between items-center gap-3">
      <!-- WhatsApp Button -->
      <a
        :href="whatsappLink" 
        target="_blank"
        rel="noopener noreferrer"
        class="flex-1 flex flex-col items-center justify-center py-3 px-2 rounded-xl bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 border border-green-100 dark:border-green-800 transition-all duration-300 group shadow-sm hover:shadow-md cursor-pointer"
        aria-label="Contato via WhatsApp"
      >
        <MessageCircle class="w-9 h-9 text-green-600 dark:text-green-300 mb-2 p-1.5 bg-white dark:bg-green-800 rounded-full shadow-sm group-hover:scale-110 transition-transform" />
        <span class="text-xs font-semibold text-green-700 dark:text-green-300 font-montserrat">WhatsApp</span>
      </a>

      <!-- Instagram Button -->
      <a
        href="https://instagram.com/cleiagomes_naildesigner"
        target="_blank"
        rel="noopener noreferrer"
        class="flex-1 flex flex-col items-center justify-center py-3 px-2 rounded-xl bg-pink-50 dark:bg-pink-900/20 hover:bg-pink-100 dark:hover:bg-pink-900/30 border border-pink-100 dark:border-pink-800 transition-all duration-300 group shadow-sm hover:shadow-md cursor-pointer"
        aria-label="Perfil do Instagram"
      >
        <Instagram class="w-9 h-9 text-pink-600 dark:text-pink-300 mb-2 p-1.5 bg-white dark:bg-pink-800 rounded-full shadow-sm group-hover:scale-110 transition-transform" />
        <span class="text-xs font-semibold text-pink-700 dark:text-pink-300 font-montserrat">Instagram</span>
      </a>

      <!-- Agendamento Button -->
      <a
        href="#agendamento"
        @click="scrollToAppointment"
        class="flex-1 flex flex-col items-center justify-center py-3 px-2 rounded-xl bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 border border-purple-100 dark:border-purple-800 transition-all duration-300 group shadow-sm hover:shadow-md cursor-pointer"
        aria-label="Ir para Agendamento"
      >
        <Calendar class="w-9 h-9 text-purple-600 dark:text-purple-300 mb-2 p-1.5 bg-white dark:bg-purple-800 rounded-full shadow-sm group-hover:scale-110 transition-transform" />
        <span class="text-xs font-semibold text-purple-700 dark:text-purple-300 font-montserrat">Agendar</span>
      </a>
    </div>
  </div>
</template>
