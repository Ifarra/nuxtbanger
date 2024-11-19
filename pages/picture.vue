<template>
<StickyHeader />
<PicctureGrid />
<AppFooter />
</template>


<script setup>
useHead({
  title: 'Homepage',
  meta: [
    { name: 'description', content: "cute pic" },
    { name: 'og:title', content: 'Homepage' },
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
})
</script>
