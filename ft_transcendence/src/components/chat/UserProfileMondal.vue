<!-- src/components/chat/UserProfileModal.vue -->
<script setup lang="ts">
import type { ChatUser } from '@/composables/useChat'

defineProps<{
  user: ChatUser
}>()

const emit = defineEmits(['close'])
</script>

<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg w-full max-w-md">
      <div class="text-center">
        <img 
          :src="user.avatarUrl" 
          class="w-24 h-24 rounded-full mx-auto mb-4"
        >
        <h2 class="text-2xl font-bold">{{ user.displayName }}</h2>
        
        <div class="flex justify-center gap-8 my-6" v-if="user.stats">
          <div>
            <p class="text-3xl font-bold text-green-800">{{ user.stats.wins }}</p>
            <p class="text-gray-500">Wins</p>
          </div>
          <div>
            <p class="text-3xl font-bold text-red-600">{{ user.stats.losses }}</p>
            <p class="text-gray-500">Losses</p>
          </div>
        </div>
        
        <button 
          @click="emit('close')"
          class="mt-4 px-6 py-2 bg-black-200 rounded-lg hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>