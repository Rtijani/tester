// src/types/game.d.ts
interface BallState {
    x: number
    y: number
    dx: number
    dy: number
  }
  
  interface PaddlesState {
    left: { y: number }
    right: { y: number }
  }
  
  type ScoreState = [number, number]
  
  interface GameState {
    ball: BallState
    paddles: PaddlesState
    score: ScoreState
    isPaused: boolean
  }
  
  type SocketMessage = 
    | { type: 'GAME_STATE', state: GameState }
    | { type: 'PADDLE_UPDATE', player: 'left' | 'right', y: number }
    | { type: 'SCORE_UPDATE', player: 0 | 1 }
    | { type: 'GAME_PAUSE' }
    | { type: 'GAME_RESET' }