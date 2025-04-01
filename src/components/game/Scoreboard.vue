<!-- src/components/game/Scoreboard.vue -->
<template>
  <div class="scoreboard flex justify-between items-center px-8 py-4 bg-gray-800/50 text-white backdrop-blur-sm">
    <!-- Player Score -->
    <div class="text-center">
      <h3 class="text-lg font-semibold text-blue-400">ME</h3>
      <p class="text-3xl font-mono">{{ playerScore }}</p>
    </div>

    <!-- VS Separator -->
    <div class="mx-4 text-xl font-bold">VS</div>

    <!-- Opponent Score -->
    <div class="text-center">
      <h3 class="text-lg font-semibold text-red-400">OPPONENT</h3>
      <p class="text-3xl font-mono">{{ opponentScore }}</p>
    </div>

    <!-- Connection Status -->
    <div class="ml-auto flex items-center gap-4">
      <div 
        class="w-3 h-3 rounded-full"
        :class="connectionStatusClass"
      ></div>
      <span class="text-sm">
        {{ connectionStatusText }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/useGameStore'
import { useGameSocket } from '@/composables/useGameSocket'

type ConnectionStatus = 'connected' | 'disconnected' | 'connecting'

const store = useGameStore()
const { isConnected } = useGameSocket()

// Reactive score values
const playerScore = computed<number>(() => store.score[0])
const opponentScore = computed<number>(() => store.score[1])

// Connection status with type safety
const connectionStatus = computed<ConnectionStatus>(() => {
  return isConnected.value ? 'connected' : 'disconnected'
})

const connectionStatusClass = computed<string>(() => {
  return {
    connected: 'bg-green-500',
    disconnected: 'bg-red-500',
    connecting: 'bg-yellow-300'
  }[connectionStatus.value]
})

const connectionStatusText = computed<string>(() => {
  return {
    connected: 'Online',
    disconnected: 'Offline',
    connecting: 'Connecting...'
  }[connectionStatus.value]
})
</script>

<style scoped>
.scoreboard {
  border-bottom: 1px solid #374151; /* gray-700 */
}
</style>