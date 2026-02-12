import { ref, onMounted } from 'vue';

const isDark = ref(false);

const updateTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    updateTheme();
  };

  const initTheme = () => {
    const userTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (userTheme === 'dark' || (!userTheme && systemDark)) {
      isDark.value = true;
    } else {
      isDark.value = false;
    }
    updateTheme();
  };

  onMounted(() => {
    initTheme();
    
    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        isDark.value = e.matches;
        updateTheme();
      }
    });
  });

  return {
    isDark,
    toggleTheme
  };
}
