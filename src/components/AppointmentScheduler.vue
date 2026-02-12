<script setup lang="ts">
import { ref } from 'vue';
import { User, Phone, CheckCircle2, Loader2, AlertCircle, Check } from 'lucide-vue-next';
import { createAppointment } from '@/services/beautyService';
import { useServices } from '@/composables/useServices';
import type { AppointmentResponse } from '@/types/appointment';

const { services } = useServices();

const selectedServiceId = ref('');
const customerName = ref('');
const customerPhone = ref('');
const date = ref('');
const time = ref('');

const loading = ref(false);
const result = ref<AppointmentResponse | null>(null);
const error = ref<string | null>(null);

const handleSubmit = async () => {
  error.value = null;
  
  if (!selectedServiceId.value || !customerName.value || !customerPhone.value || !date.value || !time.value) {
    error.value = 'Por favor, preencha todos os campos.';
    return;
  }

  loading.value = true;

  try {
    const response = await createAppointment({
      service_id: selectedServiceId.value,
      customer_name: customerName.value,
      customer_phone: customerPhone.value,
      date: date.value,
      time: time.value,
    });
    result.value = response;
  } catch (err) {
    error.value = 'Erro ao realizar agendamento. Tente novamente.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  result.value = null;
  customerName.value = '';
  customerPhone.value = '';
  date.value = '';
  time.value = '';
  selectedServiceId.value = '';
};
</script>

<template>
  <!-- Se agendamento confirmado -->
  <section v-if="result" id="agendamento" class="py-12 px-6 bg-green-50 dark:bg-green-900/10 rounded-3xl mx-4 my-8 border border-green-100 dark:border-green-800 text-center transition-colors duration-300">
    <div class="flex justify-center mb-4">
      <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center transition-colors duration-300">
        <CheckCircle2 class="w-8 h-8 text-green-600 dark:text-green-400" />
      </div>
    </div>
    <h3 class="text-2xl font-bold text-green-800 dark:text-green-300 mb-2 transition-colors duration-300">Agendamento Confirmado!</h3>
    <p class="text-green-700 dark:text-green-400 mb-6 transition-colors duration-300">{{ result.message }}</p>
    <div class="bg-white dark:bg-gray-800 p-4 rounded-xl inline-block shadow-sm border border-green-100 dark:border-green-800 transition-colors duration-300">
      <p class="text-sm text-gray-500 dark:text-gray-400">ID do Agendamento</p>
      <p class="font-mono font-bold text-gray-800 dark:text-white">{{ result.appointment_id }}</p>
    </div>
    <button
      @click="resetForm"
      class="block mx-auto mt-8 text-green-700 dark:text-green-400 font-bold hover:underline transition-colors duration-300 cursor-pointer"
    >
      Realizar novo agendamento
    </button>
  </section>

  <!-- Formulário de Agendamento -->
  <section v-else id="agendamento" class="py-12 px-4 md:px-8 bg-white dark:bg-gray-800 max-w-4xl mx-auto rounded-3xl transition-colors duration-300">
    <div class="text-center mb-10">
      <h2 class="text-3xl font-bold font-montserrat text-gray-800 dark:text-white mb-2 transition-colors duration-300">
        Agende seu Horário
      </h2>
      <p class="text-gray-500 dark:text-gray-400 transition-colors duration-300">Escolha o serviço e o melhor momento para você.</p>
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

        <!-- Telefone -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-montserrat">Seu WhatsApp</label>
          <div class="relative">
            <Phone class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" :size="20" />
            <input
              type="tel"
              v-model="customerPhone"
              required
              class="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
              placeholder="(00) 00000-0000"
            />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Data -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-montserrat">Data Preferida</label>
          <input
            type="date"
            v-model="date"
            required
            class="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <!-- Horário -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-montserrat">Horário Preferido</label>
          <input
            type="time"
            v-model="time"
            required
            class="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      <div v-if="error" class="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-center gap-3">
        <AlertCircle :size="20" />
        <p class="text-sm font-medium">{{ error }}</p>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-pink-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-pink-200 dark:shadow-none hover:bg-pink-700 transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
      >
        <Loader2 v-if="loading" class="animate-spin" :size="20" />
        <span v-else class="flex items-center gap-2">
          <Check :size="20" />
          Confirmar Agendamento
        </span>
      </button>
    </form>
  </section>
</template>
