<template>
    <section class="px-4 pt-24 md:py-24 mx-auto max-w-7xl">
      <button v-if="sessionId" @click="promptForUrl" class="w-full btn btn btn-light-primary">Add Private Picture</button>
      <div class="py-5">
        <div class="masonry md:masonry-md space-y-4">
          <div v-if="isLoading" class="w-full h-60 bg-gray-300 rounded-xl animate-pulse" v-for="n in 9" :key="n"></div>
          <template v-else>
          <div x-data="drawer()" v-for="picture in pictures" :key="picture.id" class="break-inside">
            <NuxtImg
              x-spread="trigger"
              :src="picture.picture_url"
              class="w-full h-auto rounded-xl shadow"
                @error="handleImageError"
              placeholder
            />
            <div class="dialog dialog-lg" x-spread="drawer" x-cloak>
              <div class="drawer-content">
                <div class="dialog-header">Image detail
                  <button type="button" class="btn btn-light btn-sm btn-icon" aria-label="Close" x-on:click="close"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                </div>
                <div class="dialog-body">
                  <img
                    :key="picture.id"
                    x-spread="trigger"
                    :src="picture.picture_url"
                    class="w-full h-auto rounded-xl shadow"
                      @error="handleImageError"
                  />
                  <div class="my-10 flex flex-col gap-2 md:gap-5">
                    <p class="text-lg md:text-3xl font-extrabold">uploaded by : {{ picture.u_name }}</p>
                    <p class="text-sm md:text-2xl font-semibold">Upload date : {{ new Date(picture.created_at) }}</p>
                  </div>
                </div>
                <div class="dialog-footer">
                  <button type="button" class="btn btn-secondary" x-on:click="close">Close</button>
                  <button type="button" class="btn btn-primary" @click="downloadImage(picture.picture_url, picture.u_name, picture.id)">Download image</button>
                </div>
              </div>
            </div>
          </div>
          </template>
          <div v-if="pictures.length === 0 && !isLoading" class="text-center col-span-full">
            No pictures yet. Add some!
          </div>
        </div>
        
      </div>
      <div v-if="!hasMorePictures && !isLoading" class="text-center col-span-full mt-5">
            <p class="text-xl md:text-3xl text-pink-400">No more pictures to load.</p> 
      </div>
    </section>
  </template>
  
  <script>
import { ref, onMounted } from 'vue';
import { createClient } from '@supabase/supabase-js';
import { useAuth, useUser } from 'vue-clerk';

export default {
  setup() {
    const { userId, sessionId } = useAuth();
    const { user } = useUser();
    const pictures = ref([]);
    const isLoading = ref(true);
    const hasMorePictures = ref(true); // Track if there are more pictures
    const newPicture = ref({
      u_id: '',
      u_name: '',
      picture_url: '',
      publicity: 'private',
    });
    
    const config = useRuntimeConfig();
    const supabase = createClient(config.public.supabase_url, config.public.supabase_key);
    
    const limit = 10; // Maximum number of pictures to fetch
    let offset = 0; // Track the current offset for pagination

    const fetchPictures = async () => {
      if (!hasMorePictures.value) return; // Exit if there are no more pictures

      isLoading.value = true;
      const { data, error } = await supabase
        .from('pictures')
        .select('*')
        .range(offset, offset + limit - 1)
        .filter('u_id', 'eq', userId.value)
        .filter('publicity', 'eq', 'private')

      if (error) {
        console.error(error);
      } else {
        if (data.length < limit) {
          hasMorePictures.value = false; // No more pictures to load
        }
        pictures.value.push(...data); // Append new pictures to the list
        offset += limit; // Update offset for the next fetch
      }
      isLoading.value = false;
    };

    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.offsetHeight;
      if (scrollPosition >= documentHeight - 100 && !isLoading.value) {
        fetchPictures(); // Load more pictures when near the bottom
      }
    };

    const promptForUrl = () => {
      const url = prompt("Enter picture URL:");
      if (url) {
        newPicture.value.picture_url = url;
        addPicture();
      }
    };

    function getImageExtension(url) {
      // Regular expression to match image extensions
      const regex = /\.(jpg|jpeg|png|gif|bmp|svg|webp)([^\s]*)/i;
      const match = url.match(regex);
      
      // If a match is found, return the extension without extra characters
      return match ? match[1] : null;
    }

    const downloadImage = async (url, userName, id) => {
      try {
        //alternavite https://api.cors.lol/?url=
        const response = await fetch('https://wsrv.nl/?url=' + url + '&n=-1');
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${userName.replace(/\s+/g, '_')}_${id}.` + getImageExtension(url); // Specify the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading image:', error);
      }
    };

    const addPicture = async () => {
      newPicture.value.u_id = userId.value;
      newPicture.value.u_name = user.value ? user.value.fullName : 'Anonymous';

      const { data, error } = await supabase.from('pictures').insert([newPicture.value]);
      if (error) {
        console.error(error);
      } else {
        // Refetch pictures after successful insertion
        pictures.value.unshift({u_id: userId.value, u_name: user.value.fullName, picture_url: newPicture.value.picture_url, created_at: new Date()}); 
        newPicture.value = { u_id: '', u_name: '', picture_url: '', publicity: 'private' }; // Reset newPicture
      }
    };

    const handleImageError = (event) => {
      event.target.src = '/placeholder.jpg'; 
    };

    onMounted(() => {
      fetchPictures(); // Initial fetch
      window.addEventListener('scroll', handleScroll); // Add scroll listener
    });

    // Cleanup the event listener on unmount
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      pictures,
      promptForUrl,
      sessionId,
      isLoading,
      downloadImage,
      hasMorePictures, // Expose this variable to the template
    };
  },
};
</script>
  
  <style scoped>
  img {
    display: block !important;
    transition: all 0.3s ease; /* Smooth transition for hover effects */
  }
  </style>