import { ServiceListSchema, ServiceSchema } from '@/types/schemas';
import type { Service } from '@/types/service';
import type { AppointmentRequest, AppointmentResponse } from '@/types/appointment';
import { z } from 'zod';

const isProd = import.meta.env.PROD;
const REPO_BASE = import.meta.env.BASE_URL.replace(/\/$/, ''); // Remove trailing slash

// Lógica de URL da API:
// Valor padrão hardcoded conforme solicitado, removendo dependência de .env
const API_URL = 'http://127.0.0.1:8000';

/**
 * Serviço para buscar serviços de beleza.
 * Conecta com a API Python (FastAPI).
 */
export async function fetchServices(): Promise<Service[]> {
  // Dados mockados para fallback
  const mockServices: Service[] = [
    {
      id: "1",
      name: "Corte de Cabelo",
      description: "Corte moderno e personalizado para realçar sua beleza natural.",
      price: 80.0,
      duration: 60,
      category: "Cabelo",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000&auto=format&fit=crop",
      gallery: []
    },
    {
      id: "2",
      name: "Manicure Completa",
      description: "Cuidados essenciais para suas unhas com esmaltação premium.",
      price: 45.0,
      duration: 45,
      category: "Unhas",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1000&auto=format&fit=crop",
      gallery: []
    },
    {
      id: "3",
      name: "Limpeza de Pele",
      description: "Tratamento profundo para renovar e hidratar sua pele.",
      price: 120.0,
      duration: 90,
      category: "Estética",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000&auto=format&fit=crop",
      gallery: []
    }
  ];

  // Em produção (GitHub Pages), usamos o JSON estático como fallback se não houver API configurada
  // Como removemos a dependência de variáveis de ambiente, assumimos o fallback estático em produção por padrão
  if (isProd) {
    try {
      console.log('Modo Produção Estático: Buscando serviços do JSON local...');
      const response = await fetch(`${REPO_BASE}/services_catalog.json`);
      if (!response.ok) throw new Error('Falha ao carregar catálogo estático');
      const data = await response.json();
      return ServiceListSchema.parse(data);
    } catch (error) {
      console.error('Erro ao carregar serviços estáticos, usando mock:', error);
      return mockServices;
    }
  }

  try {
    const response = await fetch(`${API_URL}/services`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar serviços: ${response.statusText}`);
    }
    const data = await response.json();
    
    // Validação de Schema com Zod
    try {
      return ServiceListSchema.parse(data);
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        console.error('Erro de validação de schema (Zod) ao buscar serviços:', (validationError as any).errors);
        throw new Error('Dados recebidos da API são inválidos.');
      }
      throw validationError;
    }
  } catch (error) {
    console.warn(
      'Falha ao conectar com a API, usando dados de fallback (mock).',
      error,
    );
    // Fallback silencioso para dados mockados em caso de erro de conexão (local ou prod)
    return mockServices;
  }
}

/**
 * Busca um serviço específico pelo ID.
 */
export async function fetchServiceById(id: string): Promise<Service | null> {
  try {
    const response = await fetch(`${API_URL}/services/${id}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Erro ao buscar serviço: ${response.statusText}`);
    }
    const data = await response.json();

    // Validação de Schema com Zod
    try {
      return ServiceSchema.parse(data);
    } catch (validationError) {
       if (validationError instanceof z.ZodError) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        console.error(`Erro de validação de schema (Zod) ao buscar serviço ${id}:`, (validationError as any).errors);
        throw new Error('Dados do serviço inválidos.');
      }
      throw validationError;
    }
  } catch (error) {
    console.error('Falha ao buscar serviço na API', error);
    throw error;
  }
}

/**
 * Realiza a criação de um agendamento via API.
 */
export async function createAppointment(
  params: AppointmentRequest,
): Promise<AppointmentResponse> {
  // Mock para produção estática (GitHub Pages)
  if (isProd && !import.meta.env.VITE_API_URL) {
    console.log('Modo Produção Estático: Simulando agendamento...');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'success',
          message: 'Agendamento simulado com sucesso! (Modo Estático)',
          appointment_id: 'mock-123',
          estimated_price: 0
        });
      }, 1000);
    });
  }

  // TODO: Implementar POST real quando API estiver disponível
  return {
    status: 'success',
    message: 'Agendamento realizado (Simulação)',
    appointment_id: '123',
    estimated_price: 0
  };
}
