import { defineStore } from 'pinia'

const PADDLE_HEIGHT = 100
const GAME_HEIGHT = 600
const BASE_SPEED = 4

export const useGameStore = defineStore('game', {
  state: () => ({
    score: [0, 0] as [number, number],
    isPaused: false,
    gameEnded: false,
    winner: null as null | 0 | 1,
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    ball: {
      x: 400,
      y: 250,
      dx: BASE_SPEED,
      dy: 0,
      baseSpeed: BASE_SPEED
    },
    paddles: {
      left: { y: 250 },
      right: { y: 250 }
    }
  }),

  actions: {
    movePaddle(player: 'left' | 'right', deltaY: number) {
      if (typeof deltaY !== 'number' || isNaN(deltaY)) return
      
      const newY = this.paddles[player].y + deltaY
      this.paddles[player].y = Math.max(0, Math.min(GAME_HEIGHT - PADDLE_HEIGHT, newY))
    },

    resetBall(direction: 'left' | 'right' = 'left') {
      const speed = this.ball.baseSpeed * (this.difficulty === 'easy' ? 0.75 : this.difficulty === 'hard' ? 1.25 : 1)
      this.ball = {
        x: 400,
        y: 250,
        dx: direction === 'left' ? -speed : speed,
        dy: (Math.random() * 4 - 2),
        baseSpeed: this.ball.baseSpeed
      }
    },

    togglePause() {
      this.isPaused = !this.isPaused
    },

    resetGame() {
      this.score = [0, 0]
      this.resetBall()
      this.isPaused = false
      this.gameEnded = false
      this.winner = null
    },

    incrementScore(player: 0 | 1) {
      this.score[player]++
      if (this.score[player] >= 5) {
        this.gameEnded = true
        this.winner = player
      } else {
        this.resetBall(player === 0 ? 'right' : 'left')
      }
    },

    setDifficulty(level: 'easy' | 'medium' | 'hard') {
      this.difficulty = level
      const speed = BASE_SPEED * (level === 'easy' ? 0.75 : level === 'hard' ? 1.25 : 1)
      this.ball.baseSpeed = speed
      this.ball.dx = Math.sign(this.ball.dx) * speed
    }
  }
})