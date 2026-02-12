import { ref, watch, onMounted } from 'vue';

// Estado global para garantir sincronização entre componentes
const isDark = ref(false);

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value;
  };

  const initTheme = () => {
    // Verifica preferência salva ou do sistema
    const userTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (userTheme === 'dark' || (!userTheme && systemDark)) {
      isDark.value = true;
    } else {
      isDark.value = false;
    }
    
    // Aplica a classe inicial
    updateDocumentClass();
  };

  const updateDocumentClass = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Observa mudanças para persistir e atualizar DOM
  watch(isDark, () => {
    updateDocumentClass();
  });

  onMounted(() => {
    initTheme();
  });

  return {
    isDark,
    toggleTheme
  };
}
