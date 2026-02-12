<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { User, Phone, CheckCircle2, Loader2, AlertCircle, Check, Send } from 'lucide-vue-next';
import { useServices } from '@/composables/useServices';
import { createWhatsAppLink, getAppointmentMessage } from '@/utils/whatsapp';

const route = useRoute();
const { services } = useServices();

const selectedServiceId = ref('');
const customerName = ref('');
const customerPhone = ref('');

const loading = ref(false);
const error = ref<string | null>(null);

// Monitorar query params para pré-seleção
const checkServiceFromUrl = () => {
  const serviceId = route.query.serviceId as string;
  if (serviceId && services.value.some(s => s.id === serviceId)) {
    selectedServiceId.value = serviceId;
  }
};

onMounted(() => {
  checkServiceFromUrl();
});

watch(() => route.query.serviceId, () => {
  checkServiceFromUrl();
});

const handleSubmit = () => {
  error.value = null;
  
  if (!selectedServiceId.value) {
    error.value = 'Por favor, selecione um serviço.';
    return;
  }

  // Validação básica se campos forem preenchidos (opcionais para UX rápida, mas ideais para mensagem)
  // Vamos manter obrigatórios para ter uma mensagem bonita
  if (!customerName.value) {
     error.value = 'Por favor, digite seu nome.';
     return;
  }

  loading.value = true;

  try {
    const service = services.value.find(s => s.id === selectedServiceId.value);
    if (!service) throw new Error('Serviço não encontrado');

    const message = getAppointmentMessage(service.name, customerName.value);
    const link = createWhatsAppLink(message);
    
    // Abrir WhatsApp
    window.open(link, '_blank');
    
    // Resetar formulário ou dar feedback visual?
    // Vamos dar um feedback visual rápido e resetar
    
  } catch (err) {
    error.value = 'Erro ao processar. Tente novamente.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section id="agendamento" class="py-12 px-4 md:px-8 bg-white dark:bg-gray-800 max-w-4xl mx-auto rounded-3xl transition-colors duration-300">
    <div class="text-center mb-10">
      <h2 class="text-3xl font-bold font-montserrat text-gray-800 dark:text-white mb-2 transition-colors duration-300">
        Agende seu Horário
      </h2>
      <p class="text-gray-500 dark:text-gray-400 transition-colors duration-300">
        Escolha o serviço e finalize o agendamento diretamente no WhatsApp.
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6 bg-gray-50 dark:bg-gray-900 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <!-- Seleção de Serviço -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-montserrat">Serviço Desejado</label>
        <select
          v-model="selectedServiceId"
          required
          class="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all appearance-none"
        >
          <option value="" disabled>Selecione um serviço...</option>
          <option v-for="service in services" :key="service.id" :value="service.id">
            {{ service.name }} - {{ service.duration }} min
          </option>
        </select>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Nome -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-montserrat">Seu Nome</label>
          <div class="relative">
            <User class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" :size="20" />
            <input
              type="text"
              v-model="customerName"
              required
              class="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
              placeholder="Como podemos te chamar?"
            />
          </div>
        </div>

        <!-- Telefone (Opcional visualmente, mas útil se quisermos salvar no futuro, por enquanto mantemos como campo de contato) -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-montserrat">Seu WhatsApp</label>
          <div class="relative">
            <Phone class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" :size="20" />
            <input
              type="tel"
              v-model="customerPhone"
              class="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
              placeholder="(00) 00000-0000"
            />
          </div>
        </div>
      </div>

      <div v-if="error" class="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-center gap-3">
        <AlertCircle :size="20" />
        <p class="text-sm font-medium">{{ error }}</p>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-green-700 transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
      >
        <Loader2 v-if="loading" class="animate-spin" :size="20" />
        <span v-else class="flex items-center gap-2">
          <Send :size="20" />
          Enviar Agendamento no WhatsApp
        </span>
      </button>
    </form>
  </section>
</template>
