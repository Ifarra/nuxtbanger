<template>
    <section class="px-4 pt-24 md:py-24 mx-auto max-w-7xl">
      <button v-if="sessionId" @click="promptForUrl" class="w-full btn btn btn-light-primary">Add Picture</button>
      <div class="p-5 sm:p-8">
        <div class="columns-2 md:columns-4 gap-4 space-y-4">
          <div v-if="isLoading" class="w-full h-48 bg-gray-300 rounded-xl animate-pulse" v-for="n in 6" :key="n"></div>
          <template v-else>
          <img
            v-for="picture in pictures"
            :key="picture.id"
            :src="picture.picture_url"
            class="w-full h-auto rounded-xl shadow"
              @error="handleImageError"
          />
          </template>
          <div v-if="pictures.length === 0 && !isLoading" class="text-center col-span-full">
            No pictures yet. Add some!
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { createClient } from '@supabase/supabase-js';
  import { useAuth, useUser } from 'vue-clerk';
  
  export default {
    setup() {
      const { userId, sessionId } = useAuth();
      const { user } = useUser();
      const pictures = ref([]);
      const isLoading = ref(true); 
      const newPicture = ref({
        u_id: '',
        u_name: '',
        picture_url: '',
      });
  
      const config = useRuntimeConfig();
      const supabase = createClient(config.public.supabase_url, config.public.supabase_key);
  
      const fetchPictures = async () => {
        const { data, error } = await supabase.from('pictures').select('*');
        if (error) {
          console.error(error);
        } else {
          pictures.value = data;
        }
        isLoading.value = false; 
      };
  
      const promptForUrl = () => {
        const url = prompt("Enter picture URL:");
        if (url) {
          newPicture.value.picture_url = url;
          addPicture();
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
          await fetchPictures();
          newPicture.value = { u_id: '', u_name: '', picture_url: '' }; // Reset newPicture
        }
      };
  
      const handleImageError = (event) => {
        event.target.src = '/placeholder.jpg'; 
      };
  
      // Fetch pictures when the component mounts
      fetchPictures();
  
      return {
        pictures,
        promptForUrl,
        sessionId,
        isLoading,
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