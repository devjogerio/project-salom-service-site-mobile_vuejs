/**
 * Utilitário para geração de links do WhatsApp
 */

const WHATSAPP_NUMBER = '5595991522205';

export const createWhatsAppLink = (message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

export const getAppointmentMessage = (serviceName: string, customerName?: string): string => {
  const greeting = customerName ? `Olá Cléia, meu nome é ${customerName}.` : 'Olá Cléia.';
  return `${greeting} Gostaria de agendar o serviço *${serviceName}*. Poderia me informar os horários disponíveis?`;
};

export const getGeneralContactMessage = (): string => {
  return 'Olá Cléia, gostaria de saber mais sobre seus serviços de Nail Design.';
};
