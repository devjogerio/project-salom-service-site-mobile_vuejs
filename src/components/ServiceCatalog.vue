<script setup lang="ts">
import { ref, computed } from 'vue';
import { Loader2 } from 'lucide-vue-next';
import { useServices } from '@/composables/useServices';
import ServiceCard from './ServiceCard.vue';
import CategoryCarousel from './CategoryCarousel.vue';

type Category = 'todos' | 'Cabelo' | 'Unhas' | 'Estética';

const { services, loading } = useServices();
const filter = ref<Category>('todos');

const categories: Category[] = ['todos', 'Cabelo', 'Unhas', 'Estética'];

const filteredServices = computed(() => {
  return filter.value === 'todos' 
    ? services.value 
    : services.value.filter(s => s.category === filter.value);
});

const setFilter = (cat: Category) => {
  filter.value = cat;
};
</script>

<template>
  <section v-if="loading" id="catalogo" class="py-16 px-4 bg-gray-50 dark:bg-gray-900 flex justify-center items-center min-h-[400px] transition-colors duration-300">
    <div class="flex flex-col items-center gap-4">
      <Loader2 class="w-10 h-10 text-pink-600 dark:text-pink-400 animate-spin" />
      <p class="text-gray-500 dark:text-gray-400 font-medium">Carregando serviços...</p>
    </div>
  </section>

  <section v-else id="catalogo" class="py-8 px-4 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
    <!-- Cabeçalho da seção com Título -->
    <div class="flex flex-col items-center mb-8 text-center px-4">
      <h2 
        class="font-bold font-montserrat text-gray-800 dark:text-white mb-2 transition-colors duration-300"
        style="font-size: clamp(1.75rem, 4vw, 2.5rem)"
      >
        Nossos Serviços
      </h2>
      <p 
        class="text-gray-500 dark:text-gray-400 max-w-lg mx-auto transition-colors duration-300"
        style="font-size: clamp(0.875rem, 1.2vw, 1.125rem)"
      >
        Explore nossas especialidades e encontre o tratamento perfeito para você.
      </p>
    </div>

    <!-- Carrossel de Destaque por Categoria -->
    <CategoryCarousel :key="filter" :services="services" :category="filter" />

    <!-- Grid de Serviços -->
    <div 
      class="grid gap-6 mt-8"
      style="grid-template-columns: repeat(auto-fill, minmax(clamp(280px, 100%, 350px), 1fr))"
    >
      <ServiceCard 
        v-for="service in filteredServices" 
        :key="service.id" 
        :service="service" 
      />
    </div>

    <p v-if="filteredServices.length === 0" class="text-center text-gray-500 dark:text-gray-400 py-8 transition-colors duration-300">
      Nenhum serviço encontrado nesta categoria.
    </p>
  </section>
</template>
