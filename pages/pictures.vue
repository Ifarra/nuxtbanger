<template>
    <div>
      <h1>Pictures</h1>
      <form @submit.prevent="addPicture">
        <input v-model="newPicture.picture_url" placeholder="Picture URL" />
        <button type="submit">Add Picture</button>
      </form>
  
      <ul>
        <li v-for="picture in pictures" :key="picture.id">
          <img :src="picture.picture_url" alt="Picture" />
          <p>{{ picture.u_name }}</p>
          <button @click="deletePicture(picture.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { createClient } from '@supabase/supabase-js'
  import { useAuth, useUser } from 'vue-clerk'
  
  export default {
    setup() {
      const { userId } = useAuth();
      const { user } = useUser()
      const pictures = ref([]);
      const newPicture = ref({
        u_id: '',
        u_name: '',
        picture_url: '',
      });

      const config = useRuntimeConfig()
      const supabase = createClient(config.public.supabase_url, config.public.supabase_key)
  
      const fetchPictures = async () => {
        const { data, error } = await supabase.from('pictures').select('*');
        if (error) console.error(error);
        else pictures.value = data;
      };
  
      const addPicture = async () => {
        newPicture.value.u_id = userId.value; 
        newPicture.value.u_name = user.value ? user.value.fullName : 'Anonymous';
        const { data, error } = await supabase.from('pictures').insert([newPicture.value]);
        if (error) console.error(error);
        else {
          pictures.value.push(data[0]);
          newPicture.value = { u_id: '', u_name: '', picture_url: '' };
        }
      };
  
      const deletePicture = async (id) => {
        const { error } = await supabase.from('pictures').delete().match({ id });
        if (error) console.error(error);
        else {
          pictures.value = pictures.value.filter(picture => picture.id !== id);
        }
      };
  
      // Fetch pictures on component mount
      fetchPictures();
  
      return {
        pictures,
        newPicture,
        addPicture,
        deletePicture,
      };
    },
  };
  </script>
  