// src/lib/game/physics.ts
type Ball = {
    x: number
    y: number
    dx: number
    dy: number
  }
  
  export class PongPhysics {
    static readonly CANVAS_WIDTH = 800
    static readonly CANVAS_HEIGHT = 600
    static readonly PADDLE_WIDTH = 10
    static readonly PADDLE_HEIGHT = 100
    static readonly MAX_BALL_SPEED = 10
    static readonly MIN_BALL_SPEED = 2
  
    static updateBall(
      ball: Ball,
      leftPaddle: { y: number },
      rightPaddle: { y: number }
    ) {
      // 1. Update position
      ball.x += ball.dx
      ball.y += ball.dy
  
      // 2. Boundary checks (Y-axis)
      if (ball.y <= 0 || ball.y >= this.CANVAS_HEIGHT) {
        ball.dy *= -1 // Reverse vertical direction
        ball.y = Math.max(0, Math.min(this.CANVAS_HEIGHT, ball.y)) // Clamp position
      }
  
      // 3. Paddle collision (X-axis + Y-axis)
      const checkPaddleCollision = (paddleX: number, paddleY: number) => {
        return (
          ball.x >= paddleX - this.PADDLE_WIDTH / 2 &&
          ball.x <= paddleX + this.PADDLE_WIDTH / 2 &&
          ball.y >= paddleY - this.PADDLE_HEIGHT / 2 &&
          ball.y <= paddleY + this.PADDLE_HEIGHT / 2
        )
      }
  
      // Left paddle (X=20, Y=paddleY)
      if (checkPaddleCollision(20, leftPaddle.y)) {
        const hitPosition = (ball.y - leftPaddle.y) / (this.PADDLE_HEIGHT / 2)
        ball.dx = Math.abs(ball.dx) * 1.1
        ball.dy = hitPosition * 5
        ball.x = 20 + this.PADDLE_WIDTH / 2 + 1
      }
      // Right paddle (X=780, Y=paddleY)
      if (checkPaddleCollision(780, rightPaddle.y)) {
        const hitPosition = (ball.y - rightPaddle.y) / (this.PADDLE_HEIGHT / 2)
        ball.dx = -Math.abs(ball.dx) * 1.1
        ball.dy = hitPosition * 5
        ball.x = 780 - this.PADDLE_WIDTH / 2 - 1
      }
    }
  
    
    static checkScore(ball: Ball): 0 | 1 | null {
      // X-boundary scoring
      if (ball.x <= 0) return 1 // Player 2 scores
      if (ball.x >= this.CANVAS_WIDTH) return 0 // Player 1 scores
  
      // Y-boundary safety (should never trigger if updateBall works)
      if (ball.y <= 0 || ball.y >= this.CANVAS_HEIGHT) {
        console.warn('Ball out of vertical bounds!')
        return null
      }
  
      return null
    }
  }