// src/lib/game/engine.ts
import { useGameStore } from '@/stores/useGameStore'

export const GameEngine = {
  running: false,
  lastTime: 0,
  
  start() {
    if (!this.running) {
      this.running = true
      this.lastTime = performance.now()
    }
  },

  stop() {
    this.running = false
  },

  gameLoop(timestamp: number) {
    const store = useGameStore()
    const deltaTime = timestamp - this.lastTime
    this.lastTime = timestamp

    if (!store.isPaused && !store.gameEnded) {
      // Update ball position with deltaTime for consistent speed
      store.ball.x += store.ball.dx * (deltaTime / 16) // Normalize to 60fps
      store.ball.y += store.ball.dy * (deltaTime / 16)

      // Collision detection
      this.checkWallCollision(store)
      this.checkPaddleCollision(store)
    }

    if (this.running) {
      requestAnimationFrame(this.gameLoop.bind(this))
    }
  },

  checkWallCollision(store: ReturnType<typeof useGameStore>) {
    // Top and bottom walls
    if (store.ball.y <= 0 || store.ball.y >= 600) { // Match your canvas height
      store.ball.dy *= -1
      // Clamp position to prevent sticking
      store.ball.y = Math.max(0, Math.min(600, store.ball.y))
    }
  },

  checkPaddleCollision(store: ReturnType<typeof useGameStore>) {
    const paddleWidth = 10
    const paddleHeight = 100

    // Left paddle (positioned at x=20)
    if (store.ball.x <= 20 + paddleWidth &&
        store.ball.x >= 20 &&
        Math.abs(store.ball.y - store.paddles.left.y) < paddleHeight/2) {
      store.ball.dx = Math.abs(store.ball.dx) // Ensure moving right
      store.ball.x = 20 + paddleWidth + 1 // Prevent sticking
    }

    // Right paddle (positioned at x=780)
    if (store.ball.x >= 780 - paddleWidth &&
        store.ball.x <= 780 &&
        Math.abs(store.ball.y - store.paddles.right.y) < paddleHeight/2) {
      store.ball.dx = -Math.abs(store.ball.dx) // Ensure moving left
      store.ball.x = 780 - paddleWidth - 1 // Prevent sticking
    }
  }
}