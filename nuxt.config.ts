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
  runtimeConfig: {
    public: {
      supabase_url: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabase_key: process.env.NUXT_PUBLIC_SUPABASE_KEY
    }
  }
})