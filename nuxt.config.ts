// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [
    '@/assets/css/tailwind.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['vue-clerk/nuxt', '@nuxthub/core', '@nuxt/image'],
  clerk: {
    appearance: {},
  },
  routeRules: {
    '/proxy/**': { proxy: '/api/**', cors: false },
  },
  runtimeConfig: {
    public: {
      supabase_url: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabase_key: process.env.NUXT_PUBLIC_SUPABASE_KEY,
      clerk_private: process.env.NUXT_CLERK_SECRET_KEY,
      clerk_webhook: process.env.NUXT_CLERK_WEBHOOK_KEY
    }
  }
})