<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import type { Service } from '@/types/service';

const props = defineProps<{
  services: Service[];
  category: string;
}>();

const currentIndex = ref(0);

// Filtrar serviços pela categoria
const filteredServices = computed(() => {
  return props.category === 'todos' 
    ? props.services 
    : props.services.filter(s => s.category === props.category);
});

// Extrair imagens
const images = computed(() => {
  return filteredServices.value
    .map(s => s.image)
    .filter(img => img)
    .slice(0, 5);
});

let timer: number | null = null;

const startRotation = () => {
  if (timer) clearInterval(timer);
  if (images.value.length === 0) return;
  
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.value.length;
  }, 5000);
};

// Reiniciar timer quando imagens ou categoria mudar
watch([images, () => props.category], () => {
  currentIndex.value = 0;
  startRotation();
});

onMounted(() => {
  startRotation();
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <div 
    v-if="images.length > 0"
    class="relative w-full overflow-hidden rounded-[2rem] mb-10 shadow-xl group"
    :style="{ height: 'clamp(250px, 40vw, 500px)' }"
  >
    <!-- Imagens -->
    <div class="relative w-full h-full">
      <div 
        v-for="(img, index) in images"
        :key="index"
        class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        :class="index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'"
      >
         <img
          :src="img"
          :alt="`Destaque ${category} ${index + 1}`"
          class="object-cover w-full h-full"
        />
        <!-- Overlay gradiente -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>
    </div>

    <!-- Título da Categoria sobreposto -->
    <div class="absolute bottom-8 left-6 md:left-10 text-white z-20 animate-in slide-in-from-bottom-4 duration-700 fade-in pr-6">
      <span 
        class="font-bold uppercase tracking-widest bg-pink-600 rounded-full mb-3 inline-block shadow-sm"
        :style="{
          fontSize: 'clamp(0.65rem, 1.5vw, 0.875rem)',
          padding: 'clamp(0.25rem, 0.5vw, 0.5rem) clamp(0.75rem, 1.5vw, 1rem)'
        }"
      >
        {{ category === 'todos' ? 'Destaques' : category }}
      </span>
      <h3 class="text-2xl md:text-4xl font-bold font-montserrat leading-tight">
        {{ category === 'todos' ? 'Excelência em Beleza' : `Especialista em ${category}` }}
      </h3>
    </div>

    <!-- Indicadores -->
    <div class="absolute bottom-6 right-6 md:right-10 z-20 flex gap-2">
      <div 
        v-for="(_, index) in images"
        :key="index"
        class="h-1.5 rounded-full transition-all duration-300"
        :class="index === currentIndex ? 'w-8 bg-pink-500' : 'w-2 bg-white/50'"
      ></div>
    </div>
  </div>
</template>
