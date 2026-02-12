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

    <!-- Sistema de Navegação (Filtros) -->
    <div class="sticky top-0 z-30 bg-gray-50/95 dark:bg-gray-950/95 backdrop-blur-sm py-4 mb-8 -mx-4 px-4 border-b border-gray-100 dark:border-gray-800 md:static md:bg-transparent md:border-none md:p-0 md:mx-0 transition-all duration-300">
      <div class="flex gap-3 overflow-x-auto pb-2 w-full justify-start md:justify-center no-scrollbar px-2">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="setFilter(cat)"
          class="relative flex-shrink-0 font-bold transition-all duration-300 transform select-none rounded-2xl cursor-pointer"
          :class="filter === cat
            ? 'bg-pink-600 text-white shadow-lg shadow-pink-200 dark:shadow-pink-900/20 ring-2 ring-pink-600 ring-offset-2 dark:ring-offset-gray-900 scale-105'
            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-pink-50 dark:hover:bg-pink-900/30 hover:text-pink-600 dark:hover:text-pink-400 hover:border-pink-200 dark:hover:border-pink-800 shadow-sm hover:-translate-y-0.5'"
          :style="{
            fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
            padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(1rem, 2vw, 1.5rem)'
          }"
        >
          {{ cat.charAt(0).toUpperCase() + cat.slice(1) }}
        </button>
      </div>
    </div>

    <!-- Grid de Serviços -->
    <div 
      class="grid gap-6"
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
