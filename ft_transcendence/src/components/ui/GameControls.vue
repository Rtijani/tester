<script setup lang="ts">
import { useGameStore } from '@/stores/useGameStore'
const store = useGameStore()
</script>

<template>
  <div class="flex gap-4">
    <button @click="store.togglePause">
      {{ store.isPaused ? 'Resume' : 'Pause' }}
    </button>
    <button @click="store.resetGame">
      Reset Game
    </button>
  </div>
</template>