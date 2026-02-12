<script setup lang="ts">
import { ref, computed } from 'vue';
import { X, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import type { Service } from '@/types/service';

const props = defineProps<{
  service: Service;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const currentImageIndex = ref(0);

// Garantir que temos 3 imagens para o carrossel
const images = computed(() => {
  const imgs = props.service.gallery && props.service.gallery.length > 0 
    ? props.service.gallery.slice(0, 3) 
    : [props.service.image, props.service.image, props.service.image];

  while (imgs.length < 3) {
    imgs.push(props.service.image);
  }
  return imgs;
});

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.value.length;
};

const prevImage = () => {
  currentImageIndex.value = (currentImageIndex.value - 1 + images.value.length) % images.value.length;
};

const onClose = () => {
  emit('close');
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
      <!-- Header com Botão Fechar -->
      <div class="relative h-80 w-full bg-gray-100 dark:bg-gray-800">
        <img
          :src="images[currentImageIndex]"
          :alt="`${service.name} - Imagem ${currentImageIndex + 1}`"
          class="object-cover w-full h-full"
        />
        
        <!-- Botão Fechar -->
        <button
          @click="onClose"
          class="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10 cursor-pointer"
          aria-label="Fechar modal"
        >
          <X :size="20" />
        </button>

        <!-- Controles do Carrossel -->
        <button
          @click.stop="prevImage"
          class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full backdrop-blur-md transition-all cursor-pointer"
          aria-label="Imagem anterior"
        >
          <ChevronLeft :size="24" />
        </button>
        <button
          @click.stop="nextImage"
          class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full backdrop-blur-md transition-all cursor-pointer"
          aria-label="Próxima imagem"
        >
          <ChevronRight :size="24" />
        </button>

        <!-- Indicadores -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          <div
            v-for="(_, idx) in images"
            :key="idx"
            class="h-2 rounded-full transition-all"
            :class="idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50 w-2'"
          ></div>
        </div>
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

        <button 
          @click="onClose"
          class="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors active:scale-95 cursor-pointer"
        >
          Fechar
        </button>
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
