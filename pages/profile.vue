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
import { useAuth } from 'vue-clerk'
import { createClient } from '@supabase/supabase-js'
const config = useRuntimeConfig()
const supabase = createClient(config.public.supabase_url, config.public.supabase_key)

//import createSupabaseClient from '@/plugins/clerkSupabase'; // Ensure this file is correctly set up


//const supabase = createSupabaseClient();

const { userId } = useAuth()

const data = ref([]);
const newItem = ref('');
const editItem = ref(null);
const editItemName = ref('');

// Fetch data from Supabase
const fetchData = async () => {
  const { data: items, error } = await supabase
    .from('items')
    .select('*').eq('u_id', userId.value);
  
  if (error) {
    console.error(error);
  } else {
    data.value = items;
  }
};

// Create a new item
const createItem = async () => {
  if (!newItem.value) return;

  const { error } = await supabase
    .from('items')
    .insert([{ name: newItem.value, u_id: userId.value }]); // Adjust based on your table structure

  if (error) {
    console.error(error);
  } else {
    newItem.value = '';
    fetchData(); // Refresh the data
  }
};

// Prepare to edit an item
const prepareEdit = (item) => {
  editItem.value = item;
  editItemName.value = item.name; // Adjust based on your table structure
};

// Update an item
const updateItem = async () => {
  if (!editItem.value || !editItemName.value) return;

  const { error } = await supabase
    .from('items')
    .update({ name: editItemName.value }) // Adjust based on your table structure
    .eq('id', editItem.value.id); // Ensure you have the correct identifier

  if (error) {
    console.error(error);
  } else {
    editItem.value = null;
    editItemName.value = '';
    fetchData(); // Refresh the data
  }
};

// Delete an item
const deleteItem = async (id) => {
  const { error } = await supabase
    .from('items')
    .delete()
    .eq('id', id); // Ensure you have the correct identifier

  if (error) {
    console.error(error);
  } else {
    fetchData(); // Refresh the data
  }
};

// Initial data fetch
fetchData();
</script>

<template>
  <div>
    <h1>My Supabase Data</h1>
    <input v-model="newItem" placeholder="Add new item" />
    <button @click="createItem">Create</button>
    <ul>
      <li v-for="item in data" :key="item.id">
        <span v-if="editItem?.id !== item.id">{{ item.name }}</span>
        <input
          v-if="editItem?.id === item.id"
          v-model="editItemName"
          @blur="updateItem"
          @keyup.enter="updateItem"
        />
        <button v-if="editItem?.id !== item.id" @click="prepareEdit(item)">Edit</button>
        <button @click="deleteItem(item.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>