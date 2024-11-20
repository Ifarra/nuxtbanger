<template>
    <StickyHeader />
    <PicctureGrid v-if="collection == 'public'"/>
    <PrivateGrid v-if="collection == 'private'"/>
    <AppFooter />
    </template>
    
    
    <script setup>
    definePageMeta({
        middleware: 'auth',
        auth: {
            guestRedirectUrl: '/sign-in',
            // permission: 'org:invoices:create',
            // role: 'org:billing'
            // condition: (has) => has('org:invoices:create')
        }
    })

    const route = useRoute()
    const collection = route.params.collection;

    useHead({
      title: 'Banger - ' + collection,
      meta: [
        { name: 'description', content: "cute pic" },
        { name: 'og:title', content: 'Homepage' },
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ]
    })
    </script>
    