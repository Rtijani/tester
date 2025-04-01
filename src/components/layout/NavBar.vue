<template>
    <nav class="bg-gray-800 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <router-link to="/" class="text-xl font-bold">Pong Game</router-link>
        
        <div v-if="authStore.isAuthenticated" class="flex items-center space-x-4">
          <span>Welcome, {{ authStore.user?.name }}</span>
          <button @click="authStore.logout()" class="px-3 py-1 bg-red-500 rounded">
            Logout
          </button>
        </div>
        
        <router-link v-else to="/login" class="px-3 py-1 bg-blue-500 rounded">
          Login
        </router-link>
      </div>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { useAuthStore } from '@/stores/useAuthStore';
  const authStore = useAuthStore();
  </script>