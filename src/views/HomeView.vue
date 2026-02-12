<script setup lang="ts">
import ThemeToggle from '@/components/ThemeToggle.vue';
import ProfileHeader from '@/components/ProfileHeader.vue';
import SocialActionButtons from '@/components/SocialActionButtons.vue';
import ServiceCatalog from '@/components/ServiceCatalog.vue';
import AppointmentScheduler from '@/components/AppointmentScheduler.vue';
import ContactForm from '@/components/ContactForm.vue';
</script>

<template>
  <div class="max-w-md mx-auto bg-white dark:bg-gray-900 min-h-screen shadow-2xl overflow-hidden flex flex-col transition-colors duration-300 relative">
    <!-- Theme Toggle Fixed Position -->
    <div class="absolute top-5 right-5 z-50 transition-all duration-300">
      <ThemeToggle />
    </div>

    <main class="flex-grow flex flex-col">
      <ProfileHeader />
      
      <SocialActionButtons />
      
      <div class="flex-grow space-y-4">
        <ServiceCatalog />
        <AppointmentScheduler />
        <ContactForm />
      </div>
    </main>

    <footer class="py-8 px-6 text-center text-gray-400 dark:text-gray-500 text-sm border-t border-gray-50 dark:border-gray-800 mt-8 bg-white dark:bg-gray-900 transition-colors duration-300">
      <p>© 2024 Salom Beauty. Todos os direitos reservados.</p>
      <p class="mt-2 text-xs">Design com ❤️ para sua beleza</p>
    </footer>
  </div>
</template>
