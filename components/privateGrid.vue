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
              :src="picture.imageUrl"
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
                  <NuxtImg
                    :key="picture.id"
                    x-spread="trigger"
                    :src="picture.imageUrl"
                    class="w-full h-auto rounded-xl shadow"
                      @error="handleImageError"
                  />
                  <div class="my-10 flex flex-col gap-2 md:gap-5">
                    <article
                      class="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
                    >
                      <div class="w-full rounded-[10px] bg-white p-4 sm:p-6">
                        <div class="flex gap-2 md:gap-5 items-center">
                          <NuxtImg :src="picture.users.profileUrl" class="avatar" />
                          <div>
                            <h3 class="text-2xl font-medium text-gray-900">
                            {{ picture.imageTitle }}
                          </h3>
                          
                          <time class="block text-xs md:text-sm text-gray-500">
                          {{ new Date(picture.created_at).toLocaleDateString(undefined, {
                                            year: '2-digit',
                                            month: 'short',
                                            day: '2-digit',
                                            hour: 'numeric',
                                            minute: 'numeric'
                                          }) }} | by: {{ picture.users.userName }} 
                        </time>
                          </div>
                          
                        </div>
                        <div class="pt-2 md:pt-4 pl-2">
                          <p>
                            {{ picture.imageDescription }}
                          </p>
                        </div>

                        <div class="mt-4 flex flex-wrap gap-1">
                          <span
                            class="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600"
                          >
                            Anime
                          </span>

                          <span
                            class="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600"
                          >
                            Banger
                          </span>
                        </div>

                        <hr class="my-3 h-px border-0 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" />

                          <div>
                              <PictureLikes :imageId="picture.id" />
                          </div>

                      </div>
                    </article>
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
      userId: '',
      imageTitle: '',
      imageDescription: '',
      imageUrl: '',
      imagePublicity: 'private'
    });
    
    const config = useRuntimeConfig();
    const supabase = createClient(config.public.supabase_url, config.public.supabase_key);
    
    const limit = 10; // Maximum number of pictures to fetch
    let offset = 0; // Track the current offset for pagination

    const fetchPictures = async () => {
      if (!hasMorePictures.value) return; // Exit if there are no more pictures

      isLoading.value = true;
      const { data, error } = await supabase
        .from('images')
        .select(`
        *,
        users ( userName, profileUrl)
        `)
        .order('id', { ascending: false })
        .range(offset, offset + limit - 1)
        .filter('imagePublicity', 'eq', 'private')
        .filter('userId', 'eq', userId.value);

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
      let title;
      let description;
      if (url) {
        title = prompt("Enter picture title:");
        description = prompt("Enter picture description:");
      }
      if (url) {
        newPicture.value.imageUrl = url;
        newPicture.value.imageTitle = title? title : 'Untitled';
        newPicture.value.imageDescription = description? description : 'No description';
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
      newPicture.value.userId = userId.value;

      const { data, error } = await supabase.from('images').insert([newPicture.value]);
      if (error) {
        console.error(error);
      } else {
        // Refetch pictures after successful insertion
        pictures.value.unshift({
          userId: userId.value,
          imageTitle: newPicture.value.imageTitle,
          imageDescription: newPicture.value.imageDescription,
          imageUrl: newPicture.value.imageUrl,
          imagePublicity: newPicture.value.imagePublicity,
          users: { userName: user.value.fullName, profileUrl: user.value.imageUrl }, 
          created_at: new Date()
        });
        newPicture.value = { userId: '', imageTitle: '', imageDescription: '', imageUrl: ''}; // Reset newPicture
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