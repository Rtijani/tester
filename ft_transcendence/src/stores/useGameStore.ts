// src/stores/useGameStore.ts
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    score: [0, 0] as [number, number],
    isPaused: false,
    gameEnded: false,
    winner: null as null | 0 | 1,
    ball: {
      x: 400,
      y: 250,
      dx: 4,
      dy: 4
    },
    paddles: {
      left: { y: 250 },
      right: { y: 250 }
    }
  }),

  actions: {
    // Paddle movement with boundaries
    movePaddle(player: 'left' | 'right', deltaY: number) {
      const paddleHeight = 100;
      const newY = this.paddles[player].y + deltaY
      this.paddles[player].y = Math.max(0, Math.min(600 - paddleHeight, newY))
    },

    // Ball control
    resetBall(direction: 'left' | 'right' = 'left') {
      this.ball = {
        x: 400,
        y: 250,
        dx: direction === 'left' ? -4 : 4,
        dy: (Math.random() * 4 - 2)
      }
    },

    // Game states
    togglePause() {
      this.isPaused = !this.isPaused
      //console.log('Pause state:', this.isPaused)
    },

    resetGame() {
      this.score = [0, 0]
      this.resetBall()
      this.isPaused = false
      this.gameEnded = false
      this.winner = null
    },

    // Scoring with game end check
    incrementScore(player: 0 | 1) {
      this.score[player]++
      
      if (this.score[player] >= 5) {
        this.gameEnded = true
        this.winner = player
        this.isPaused = true
      } else {
        this.resetBall(player === 0 ? 'right' : 'left')
      }
    }
  }
})