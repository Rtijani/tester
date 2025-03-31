// src/lib/game/engine.ts
/*import { PongPhysics } from './physics'
import { useGameStore } from '@/stores/useGameStore'

export class GameEngine {
  static start() {
    const store = useGameStore()

    const frame = () => {
      if (!store.isPaused) {
        // Updated physics call (no need to pass canvasHeight now)
        PongPhysics.updateBall(
          store.ball,
          store.paddles.left,
          store.paddles.right
        )

        // Scoring check (uses PongPhysics.CANVAS_WIDTH internally)
        const scoringPlayer = PongPhysics.checkScore(store.ball)
        if (scoringPlayer !== null) {
          store.incrementScore(scoringPlayer)
        }

        const debugFrame = () => {
            console.log(
              `Ball: X=${store.ball.x.toFixed(1)}/${PongPhysics.CANVAS_WIDTH}, ` +
              `Y=${store.ball.y.toFixed(1)}/${PongPhysics.CANVAS_HEIGHT}`
            )
            frame()
          }
          // requestAnimationFrame(debugFrame) // Use instead of frame()
      }
      requestAnimationFrame(frame)
    }
    frame()
  }
  
}*/
// src/lib/game/engine.ts
import { useGameStore } from '@/stores/useGameStore'

export const GameEngine = {
  running: false,
  
  start() {
    if (!this.running) {
      this.running = true
      this.gameLoop()
    }
  },

  gameLoop() {
    const store = useGameStore()
    
    // Update ball position
    store.ball.x += store.ball.dx
    store.ball.y += store.ball.dy
    
    // Add collision detection
    this.checkWallCollision()
    this.checkPaddleCollision()
    
    if (this.running) {
      requestAnimationFrame(this.gameLoop.bind(this))
    }
  },

  checkWallCollision() {
    const store = useGameStore()
    // Top and bottom walls
    if (store.ball.y <= 0 || store.ball.y >= 500) {
      store.ball.dy *= -1
    }
  },

  checkPaddleCollision() {
    const store = useGameStore()
    // Add your paddle collision logic here
  }
}