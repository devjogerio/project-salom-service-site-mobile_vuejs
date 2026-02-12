<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue';
import { X, ChevronLeft, ChevronRight, Clock, Banknote, Calendar, CheckCircle, AlertCircle, Send } from 'lucide-vue-next';
import type { Service } from '@/types/service';
import { createWhatsAppLink, getAppointmentMessage } from '@/utils/whatsapp';

const props = defineProps<{
  service: Service;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const currentImageIndex = ref(0);
const isPaused = ref(false);
let timer: ReturnType<typeof setInterval> | null = null;

// Usar todas as imagens da galeria ou a imagem principal como fallback
const images = computed(() => {
  if (props.service.gallery && props.service.gallery.length > 0) {
    return props.service.gallery;
  }
  return [props.service.image];
});

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.value.length;
};

const prevImage = () => {
  currentImageIndex.value = (currentImageIndex.value - 1 + images.value.length) % images.value.length;
};

const startRotation = () => {
  stopRotation();
  if (images.value.length <= 1) return;
  
  timer = setInterval(() => {
    if (!isPaused.value) {
      nextImage();
    }
  }, 4000);
};

const stopRotation = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    currentImageIndex.value = 0;
    startRotation();
  } else {
    stopRotation();
  }
});

onUnmounted(() => {
  stopRotation();
});

const onClose = () => {
  stopRotation();
  emit('close');
};

const openWhatsApp = () => {
  const message = getAppointmentMessage(props.service.name);
  const link = createWhatsAppLink(message);
  window.open(link, '_blank');
  onClose();
};
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200">
    <div 
      class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 transition-colors duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <!-- Header com Carrossel -->
      <div 
        class="relative h-80 w-full bg-gray-100 dark:bg-gray-800 group"
        @mouseenter="isPaused = true"
        @mouseleave="isPaused = false"
      >
        <div class="relative w-full h-full overflow-hidden">
          <div 
            v-for="(img, index) in images"
            :key="index"
            class="absolute inset-0 transition-opacity duration-500 ease-in-out"
            :class="index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'"
          >
            <img
              :src="img"
              :alt="`${service.name} - Imagem ${index + 1}`"
              class="object-cover w-full h-full"
            />
          </div>
        </div>
        
        <!-- Botão Fechar -->
        <button
          @click="onClose"
          class="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-20 cursor-pointer"
          aria-label="Fechar modal"
        >
          <X :size="20" />
        </button>

        <!-- Controles do Carrossel (só mostra se houver > 1 imagem) -->
        <template v-if="images.length > 1">
          <button
            @click.stop="prevImage"
            class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full backdrop-blur-md transition-all cursor-pointer z-20 opacity-0 group-hover:opacity-100"
            aria-label="Imagem anterior"
          >
            <ChevronLeft :size="24" />
          </button>
          <button
            @click.stop="nextImage"
            class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full backdrop-blur-md transition-all cursor-pointer z-20 opacity-0 group-hover:opacity-100"
            aria-label="Próxima imagem"
          >
            <ChevronRight :size="24" />
          </button>

          <!-- Indicadores -->
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            <div
              v-for="(_, idx) in images"
              :key="idx"
              class="h-1.5 rounded-full transition-all duration-300"
              :class="idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 w-1.5'"
            ></div>
          </div>
        </template>
      </div>

      <!-- Conteúdo do Serviço -->
      <div class="p-6 overflow-y-auto custom-scrollbar">
        <div class="flex justify-between items-start mb-2">
          <h2 id="modal-title" class="text-2xl font-bold font-montserrat text-gray-900 dark:text-white transition-colors duration-300">
            {{ service.name }}
          </h2>
          <span class="bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
            {{ service.category }}
          </span>
        </div>

        <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6 transition-colors duration-300">
          <div class="flex items-center gap-1.5">
            <Clock :size="16" />
            <span>{{ service.duration }} min</span>
          </div>
          <div class="flex items-center gap-1.5">
            <Banknote :size="16" />
            <span>Valor a combinar</span>
          </div>
        </div>

        <div class="prose prose-sm dark:prose-invert max-w-none mb-6">
          <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">Sobre o Serviço</h3>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
            {{ service.description }}
          </p>
        </div>

        <!-- Detalhes Adicionais -->
        <div v-if="service.details" class="space-y-4 mb-8">
          <div v-if="service.details.products_used && service.details.products_used.length > 0">
            <h4 class="font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
              <CheckCircle :size="16" class="text-green-500" />
              Produtos Utilizados
            </h4>
            <ul class="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm ml-1 space-y-1">
              <li v-for="product in service.details.products_used" :key="product">
                {{ product }}
              </li>
            </ul>
          </div>

          <div v-if="service.details.contraindications && service.details.contraindications.length > 0">
            <h4 class="font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertCircle :size="16" />
              Contraindicações
            </h4>
            <ul class="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm ml-1 space-y-1">
              <li v-for="ci in service.details.contraindications" :key="ci">
                {{ ci }}
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-auto pt-4 flex gap-3">
          <button 
            @click="openWhatsApp"
            class="flex-1 bg-green-500 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-green-600 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send :size="20" />
            Agendar Agora
          </button>
          
          <button 
            @click="onClose"
            class="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors active:scale-95 text-sm flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <X :size="16" />
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 20px;
}
</style>
