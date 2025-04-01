<!-- src/views/GameView.vue -->
<template>
  <div class="min-h-screen bg-green-900 text-white flex flex-col items-center justify-center p-4">
    <!-- Game Title -->
    <h1 class="text-3xl font-bold mb-8">Almighty Pong Game</h1>
    
    <!-- Start Button -->
    <button 
      v-if="!gameActive"
      @click="startLocalGame"
      class="px-8 py-4 bg-gray-700 rounded-lg text-2xl font-bold hover:bg-gray-600 transition mb-8"
    >
      Login
    </button>
    
    <!-- Game Container -->
    <div v-if="gameActive" class="game-container">
      <Scoreboard />
      <PongCanvas 
        game-mode="local"
        class="border-2 border-gray-700 rounded-lg"
      />
    </div>
    
    <!-- where i control the paddle movements for players -->
    <div v-if="gameActive" class="mt-8 text-center">
      <div class="flex gap-16 justify-center">
        <div>
          <h3 class="text-xl text-gray-400 mb-2">Player 1</h3>
          <p class="text-gray-300">W (▲) / S (▼)</p>
        </div>
        <div>
          <h3 class="text-xl text-gray-400 mb-2">Player 2</h3>
          <p class="text-gray-300">Arrow Keys</p>
        </div>
      </div>
      <p class="text-gray-400 mt-4">Press SPACE to Pause</p>
    </div>
  </div>
  <div class="container mx-auto p-4">
    <ChatInterface />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PongCanvas from '@/components/game/PongCanvas.vue'
import Scoreboard from '@/components/game/Scoreboard.vue'



const gameActive = ref(false)

const startLocalGame = () => {
  gameActive.value = true // to activate the game
}
</script>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
</style>