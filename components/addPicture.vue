<template>
    <div>
      <button @click="promptForUrl">Add Picture</button>
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
      // ... existing code ...

      const promptForUrl = () => {
        const url = prompt("Enter picture URL:");
        if(url){
            newPicture.value.picture_url = url;
            addPicture()
        }
      };

      // ... existing code ...
      return {
        // ... existing properties ...
        promptForUrl
      };
    },
  };
  </script>
