<template>
   <header class="z-30 w-full px-2 py-4 bg-white sm:px-4 fixed shadow-lg">
  <div class="flex items-center justify-between mx-auto max-w-7xl">
    <NuxtLink to="/" title="Kutty Home Page" class="flex items-center gap-4">
      <img src="../public/astolfo.png" alt="" class="h-8 w-8 ">
      <span class="font-extrabold text-2xl bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 text-transparent">Banger :3</span>
    </NuxtLink>
    <div class="relative hidden space-x-1 md:inline-flex" x-data="{ one: false, two: false, guh: false }">
      <div class="relative">
        <button class="flex items-center rounded-full btn btn-sm btn-white" x-on:click="one = true">
          Features
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            class="flex-none w-4 h-4 ml-1 -mr-1 transition duration-200 ease-out transform"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div
          class="absolute top-0 z-50 w-screen max-w-md p-2 mx-0 my-12 text-sm text-gray-800 transform bg-white rounded shadow lg:left-1/2 lg:-translate-x-1/2"
          x-show.transition.in.opacity.out.opacity="one"
          x-on:click.away="one = false"
          x-cloak
        >
          <div class="grid grid-cols-2 gap-2 mb-2">
            <a href="#" class="px-3 py-2 transition rounded hover:bg-gray-200 hover:text-primary">
              <p class="font-semibold">Shared Inbox</p>
              Manage conversations at scale
            </a>
            <a href="#" class="px-3 py-2 transition rounded hover:bg-gray-200 hover:text-primary">
              <p class="font-semibold">Reporting</p>
              Real-time data at your fingertips
            </a>
            <a href="#" class="px-3 py-2 transition rounded hover:bg-gray-200 hover:text-primary">
              <p class="font-semibold">Knowledge Base</p>
              Instant answers for customers
            </a>
            <a href="#" class="px-3 py-2 transition rounded hover:bg-gray-200 hover:text-primary">
              <p class="font-semibold">Live Chat</p>
              Make your website more useful
            </a>
            <a href="#" class="px-3 py-2 transition rounded hover:bg-gray-200 hover:text-primary">
              <p class="font-semibold">In-app Messaging</p>
              Engage people on your website
            </a>
          </div>
          <a href="#" class="flex items-center justify-center p-3 font-medium transition bg-gray-200 rounded text-primary hover:bg-gray-300">
            View all features
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
              class="w-4 h-4 ml-1"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
      <div class="relative">
        <button class="flex items-center rounded-full btn btn-sm btn-white" x-on:click="two = true">
          Blog
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            class="flex-none w-4 h-4 ml-1 -mr-1 transition duration-200 ease-out transform"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div
          class="absolute top-0 z-50 w-screen max-w-md p-2 mx-0 my-12 text-sm text-gray-800 transform bg-white rounded shadow lg:left-1/2 lg:-translate-x-1/2"
          x-show.transition.in.opacity.out.opacity="two"
          x-on:click.away="two = false"
          x-cloak
        >
          <p class="pt-2 pl-3 mb-1 text-xs font-semibold tracking-wide text-gray-500 uppercase">Our popular posts</p>
          <div class="flex flex-col space-y-1 font-medium text-gray-800">
            <a href="#" class="px-3 py-2 transition rounded hover:bg-gray-200 hover:text-primary"> Enable suspect commits, unminify JS, and track releases with Vercel and Sentry </a>
            <a href="#" class="px-3 py-2 transition rounded hover:bg-gray-200 hover:text-primary">Asynchronous CSV Exports with Discover</a>
            <a href="#" class="px-3 py-2 transition rounded hover:bg-gray-200 hover:text-primary"> Automate Release Management with the Sentry Release GitHub Action </a>
            <a href="#" class="flex items-center justify-center p-3 transition bg-gray-200 rounded text-primary hover:bg-gray-300">
              View all blog posts
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
                class="w-4 h-4 ml-1"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <NuxtLink v-if="!sessionId" to="/picture" class="rounded-full btn btn-sm btn-white">Pictures</NuxtLink>
      <div v-else class="relative">
        <button class="flex items-center rounded-full btn btn-sm btn-white" x-on:click="guh = true">
          Pictures
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            class="flex-none w-4 h-4 ml-1 -mr-1 transition duration-200 ease-out transform"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div
          class="absolute top-0 z-50 w-screen max-w-md p-2 mx-0 my-12 text-sm text-gray-800 transform bg-white rounded shadow lg:left-1/2 lg:-translate-x-1/2"
          x-show.transition.in.opacity.out.opacity="guh"
          x-on:click.away="guh = false"
          x-cloak
        >
          <p class="pt-2 pl-3 mb-1 text-xs font-semibold tracking-wide text-gray-500 uppercase">Picture collection</p>
          <div class="flex flex-col space-y-1 font-medium text-gray-800">
            <NuxtLink to="/collection/public" class="px-3 py-2 transition rounded hover:bg-gray-200 hover:text-primary">Public Collection</NuxtLink>
            <NuxtLink to="/collection/private" class="px-3 py-2 transition rounded hover:bg-gray-200 hover:text-primary">Private Collection</NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center space-x-1">
      <div v-if="!sessionId" class="pl-8">
        <NuxtLink to="/sign-in" class="hidden rounded-full btn btn-sm btn-white md:inline-flex">Sign in</NuxtLink>
        <NuxtLink to="/sign-up" class="rounded-full btn btn-sm btn-dark">Sign up</NuxtLink>
      </div>
      <div v-else :sign-out-options="{ sessionId }"  class="pl-4 md:pl-20">
        <SignOutButton class="btn btn-primary" />
      </div>
      
      <div class="inline-flex md:hidden" x-data="{ open: false }">
        <button class="flex-none px-2 btn btn-white btn-sm" x-on:click="open = true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            class="w-5 h-5"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <span class="sr-only">Open Menu</span>
        </button>
        <div class="absolute top-0 left-0 right-0 z-50 flex flex-col p-2 m-2 space-y-1 bg-white rounded shadow" x-show.transition="open" x-on:click.away="open = false" x-cloak>
          <button class="self-end flex-none px-2 btn btn-link btn-icon" x-on:click="open = false">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <span class="sr-only">Close Menu</span>
          </button>
          <div class="grid grid-cols-2 gap-1" v-if="sessionId">
            <a href="/collection/private" class="px-3 py-2 transition rounded hover:bg-gray-200 hover:text-primary">Private Collection</a>
            <a href="/collection/public" class="px-3 py-2 transition rounded hover:bg-gray-200 hover:text-primary">Public Collection</a>
          </div>
          <p class="pt-2 pl-3 text-xs font-semibold tracking-wide text-gray-500 uppercase">Features</p>
          <div class="grid grid-cols-2 gap-1">
            <a href="#" class="px-3 py-2 transition rounded hover:bg-gray-200 hover:text-primary">Shared Inbox</a>
            <a href="#" class="px-3 py-2 transition rounded hover:bg-gray-200 hover:text-primary">Reporting</a>
            <a href="#" class="px-3 py-2 transition rounded hover:bg-gray-200 hover:text-primary">Knowledge Base</a>
            <a href="#" class="px-3 py-2 transition rounded hover:bg-gray-200 hover:text-primary">Live Chat</a>
            <a href="#" class="px-3 py-2 transition rounded hover:bg-gray-200 hover:text-primary">In-app Messaging</a>
          </div>
          <a href="#" class="flex items-center justify-center p-3 font-medium transition bg-gray-200 rounded text-primary hover:bg-gray-300">
            View all features
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
              class="w-4 h-4 ml-1"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</header>
</template>


<script setup>

const { sessionId } = useAuth()

useHead({
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    script: [
      {
        src: 'https://cdn.jsdelivr.net/npm/kutty@latest/dist/kutty.min.js',
        async: true,
      },
    ],
})
</script>
