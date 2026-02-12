import { ref, onMounted } from 'vue';
import type { Service } from '@/types/service';
import { fetchServices } from '@/services/beautyService';

/**
 * Composable useServices.
 * Responsável por gerenciar o estado da lista de serviços no frontend.
 * Abstrai a lógica de busca (fetch), carregamento (loading) e tratamento de erros.
 */
export function useServices() {
  // Estado para armazenar a lista de serviços
  const services = ref<Service[]>([]);

  // Estado para controlar o indicador de carregamento (spinner)
  const loading = ref(true);

  // Estado para armazenar mensagens de erro, caso ocorram
  const error = ref<string | null>(null);

  // onMounted executa a lógica de busca quando o componente é montado
  onMounted(async () => {
    try {
      loading.value = true;
      // Chama o serviço de busca (que faz a requisição para a API Python)
      const data = await fetchServices();
      services.value = data;
    } catch (err) {
      console.error('Erro ao carregar serviços:', err);
      error.value = 'Erro ao carregar catálogo de serviços.';
    } finally {
      loading.value = false;
    }
  });

  return { services, loading, error };
}
