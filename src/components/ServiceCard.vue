<script setup lang="ts">
import { ref } from 'vue';
import { Clock, Banknote, Info, Calendar, Send } from 'lucide-vue-next';
import type { Service } from '@/types/service';
import ServiceModal from './ServiceModal.vue';
import { createWhatsAppLink, getAppointmentMessage } from '@/utils/whatsapp';

const props = defineProps<{
  service: Service;
}>();

const isModalOpen = ref(false);

const openWhatsApp = () => {
  const message = getAppointmentMessage(props.service.name);
  const link = createWhatsAppLink(message);
  window.open(link, '_blank');
};
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full group">
    <!-- Imagem do Serviço -->
    <div class="relative h-64 w-full overflow-hidden">
      <img
        :src="service.image"
        :alt="service.name"
        class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div class="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wide shadow-sm">
        {{ service.category }}
      </div>
    </div>

    <!-- Conteúdo -->
    <div class="p-5 flex flex-col flex-grow">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 transition-colors duration-300">
        {{ service.name }}
      </h3>
      
      <p class="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-grow transition-colors duration-300">
        {{ service.description }}
      </p>

      <!-- Detalhes: Preço e Duração -->
      <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div class="flex items-center gap-2 text-gray-700 dark:text-gray-300 transition-colors duration-300">
          <Banknote :size="18" class="text-pink-600 dark:text-pink-400" />
          <span class="font-bold text-lg">Valor a combinar</span>
        </div>
        
        <div class="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300">
          <Clock :size="16" />
          <span>{{ service.duration }} min</span>
        </div>
      </div>

      <!-- Botões de Ação -->
      <div class="mt-4 flex gap-3">
        <button 
          @click="openWhatsApp"
          class="flex-1 bg-green-500 text-white font-bold py-3 rounded-xl hover:bg-green-600 transition-colors active:scale-95 text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:shadow-lg duration-300"
        >
          <Send :size="16" />
          Agendar
        </button>
        <button 
          @click="isModalOpen = true"
          class="flex-1 bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 font-bold py-3 rounded-xl hover:bg-pink-100 dark:hover:bg-pink-900/40 transition-colors active:scale-95 text-sm flex items-center justify-center gap-1.5 cursor-pointer border border-pink-100 dark:border-pink-800"
        >
          <Info :size="16" />
          Detalhes
        </button>
      </div>
    </div>
  </div>

  <ServiceModal 
    :service="service" 
    :isOpen="isModalOpen" 
    @close="isModalOpen = false" 
  />
</template>
