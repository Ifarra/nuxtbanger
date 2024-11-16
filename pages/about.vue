<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 class="text-4xl font-bold text-blue-600">Welcome to My Nuxt.js App</h1>
      <p class="mt-4 text-lg text-gray-700">This is a simple homepage styled with Tailwind CSS.</p>
      <nuxt-link to="/" class="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Go to Home Page
      </nuxt-link>
    </div>
  </template>
  
  <script>
  export default {
    head() {
      return {
        title: 'Home',
        meta: [
          { hid: 'description', name: 'description', content: 'A simple homepage using Nuxt.js and Tailwind CSS.' }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>