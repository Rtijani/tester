<!-- src/components/ui/GameControls.vue -->
<template>
    <div class="flex gap-4 justify-center mt-4">
      <button 
        @click="store.togglePause"
        class="px-4 py-2 bg-yellow-500 rounded"
      >
        {{ store.isPaused ? 'Resume' : 'Pause' }}
      </button>
      <button 
        @click="store.resetGame"
        class="px-4 py-2 bg-red-500 rounded"
      >
        Reset
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useGameStore } from '@/stores/useGameStore'
  const store = useGameStore()
  </script>