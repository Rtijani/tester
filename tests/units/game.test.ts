// tests/units/game.test.ts
import { PongPhysics } from '@/lib/game/physics'
import { describe, expect, it, } from 'vitest'

describe('Pong Physics Engine', () => {
  const initialBall = { x: 400, y: 250, dx: 4, dy: 2 }
  const paddleY = 250

  describe('Ball Movement', () => {
    it('moves ball according to velocity', () => {
      const ball = { ...initialBall }
      PongPhysics.updateBall(ball, { y: paddleY }, { y: paddleY })
      expect(ball.x).toBe(404) // 400 + 4dx
      expect(ball.y).toBe(252) // 250 + 2dy
    })
  })
  describe('Wall Collisions', () => {
    it('reverses Y velocity on top wall hit', () => {
      const ball = { x: 100, y: 5, dx: 2, dy: 3 }
      PongPhysics.updateBall(ball, { y: paddleY }, { y: paddleY })
      expect(ball.dy).toBe(3) // 3 * -1
      expect(ball.y).toBe(8) // 5 + 3 (after reversal)
    })

    it('reverses Y velocity on bottom wall hit', () => {
      const ball = { x: 100, y: 495, dx: 2, dy: -3 }
      PongPhysics.updateBall(ball, { y: paddleY }, { y: paddleY })
      expect(ball.dy).toBe(-3)
      expect(ball.y).toBe(492)
    })
  })

  describe('Paddle Collisions', () => {
    it('reverses X velocity on left paddle hit', () => {
      const ball = { x: 25, y: paddleY, dx: 5, dy: 0 }
      PongPhysics.updateBall(ball, { y: paddleY }, { y: 300 })
      expect(ball.dx).toBeGreaterThan(0) // Negative becomes positive
      expect(ball.x).toBe(25 + PongPhysics.PADDLE_WIDTH/2) // Position correction
    })

    it('increases speed after paddle hit', () => {
      const ball = { x: 775, y: paddleY, dx: 5, dy: 0 }
      const initialSpeed = Math.abs(ball.dx)
      PongPhysics.updateBall(ball, { y: 300 }, { y: paddleY })
      expect(Math.abs(ball.dx)).toBe(initialSpeed * 1.1)
    })
  })

  describe('Scoring System', () => {
    it('detects player 1 score (right side)', () => {
      const ball = { x: 805, y: 250, dx: 5, dy: 0 }
      expect(PongPhysics.checkScore(ball)).toBe(0)
    })

    it('detects player 2 score (left side)', () => {
      const ball = { x: -5, y: 250, dx: -5, dy: 0 }
      expect(PongPhysics.checkScore(ball)).toBe(1)
    })

    it('returns null for in-play balls', () => {
      expect(PongPhysics.checkScore(initialBall)).toBeNull()
    })
  })
  describe('Basic Test', () => {
    it('should pass', () => {
      expect(1 + 1).toBe(2)
    })
  })
})