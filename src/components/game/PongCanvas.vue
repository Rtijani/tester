<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useGameStore } from '@/stores/useGameStore'
import ChatInterface from '@/components/chat/ChatInterface.vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const store = useGameStore()
let animationFrameId: number

/* Game loop: Updates the game state and handles collisions */
const gameLoop = () => {
  if (store.isPaused || store.gameEnded) {
    animationFrameId = requestAnimationFrame(gameLoop)
    return
  }

  /* Update ball position */
  store.ball.x += store.ball.dx
  store.ball.y += store.ball.dy

  /* Wall collision (top/bottom) */
  if (store.ball.y - 8 <= 0 || store.ball.y + 8 >= 600) {
    store.ball.dy *= -1
  }

  /* Paddle collision detection */
  const checkPaddleCollision = (paddleY: number, paddleX: number) => {
    if (Math.abs(store.ball.x - paddleX) < 15 && Math.abs(store.ball.y - paddleY) < 60) {
      store.ball.dx *= -1.05
      store.ball.dy += (store.ball.y - paddleY) * 0.03
    }
  }

  checkPaddleCollision(store.paddles.left.y, 20)
  checkPaddleCollision(store.paddles.right.y, 780)

  /* Scoring system */
  if (store.ball.x - 8 <= 0) {
    store.incrementScore(1) // Right player scores
  } else if (store.ball.x + 8 >= 800) {
    store.incrementScore(0) // Left player scores
  }

  animationFrameId = requestAnimationFrame(gameLoop)
}

/* Keyboard controls for paddle movement and pausing */
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.code === 'Space') {
    e.preventDefault() // Prevent default spacebar behavior
    store.togglePause()
    return
  }
  const moveAmount = 15

  /* Left paddle (Player 1) controls */
  if (e.key === 'w') store.movePaddle('left', -moveAmount)
  if (e.key === 's') store.movePaddle('left', moveAmount)

  /* Right paddle (Player 2) controls */
  if (e.key === 'i') store.movePaddle('right', -moveAmount)
  if (e.key === 'k') store.movePaddle('right', moveAmount)
}

/* Initialize game and start loop */
onMounted(() => {
  store.resetGame()
  gameLoop()
  window.addEventListener('keydown', handleKeyDown)
})

/* Cleanup event listeners and animations */
onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('keydown', handleKeyDown)
})

/* Watch store state and update canvas accordingly */
watch(
  () => store.$state,
  () => {
    const ctx = canvasRef.value?.getContext('2d')
    if (!ctx) return

    /* Clear canvas before redrawing */
    ctx.clearRect(0, 0, 800, 600)

    /* Draw ball */
    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.arc(store.ball.x, store.ball.y, 8, 0, Math.PI * 2)
    ctx.fill()

    /* Draw paddles */
    ctx.fillStyle = 'white'
    ctx.fillRect(20, store.paddles.left.y - 50, 10, 100)
    ctx.fillRect(780, store.paddles.right.y - 50, 10, 100)
  },
  { deep: true }
)
</script>

<template>
  <!-- Game canvas for rendering the game -->
  <canvas 
    ref="canvasRef"
    width="800"
    height="600"
    class="game-canvas bg-green-300 border border-gray-700"
  />

  <!-- Display winner message when game ends -->
  <div v-if="store.gameEnded" class="fixed inset-0 flex items-center justify-center bg-black/70 text-white">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4">
        Player {{ store.winner === 0 ? '1' : '2' }} Wins!
      </h1>
      <button @click="store.resetGame" class="px-6 py-2 bg-blue-600 rounded-lg text-xl hover:bg-blue-700">
        Play Again
      </button>
    </div>
  </div>

  <!-- Display pause overlay when game is paused -->
  <div v-if="store.isPaused" class="paused-overlay">
    GAME PAUSED
  </div>
</template>

<style>
/* Styling for the pause overlay */
.paused-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 2rem;
  z-index: 10;
}
</style>
