import { useGameStore } from '@/stores/useGameStore'
import { onMounted, onUnmounted } from 'vue'

export function usePaddleControls() {
  const store = useGameStore()
  const GAME_HEIGHT = 600 // Matches your canvas height

  const handleKeyDown = (e: KeyboardEvent) => {
    const moveAmount = 15
      // Convert to lowercase for case-insensitive checking
      const key = e.key.toLowerCase()

      // Prevent default actions (like scrolling)
    if (['w', 's', 'o', 'l', ' '].includes(key)) {
      e.preventDefault()
    }


    // Space to pause
    if (e.code === 'Space') {
      e.preventDefault()
      store.togglePause()
      return
    }

    // Left paddle controls (W/S keys)
    if (key === 'w') {
      store.movePaddle('left', -moveAmount)
    }
    else if (key === 's') {
      store.movePaddle('left', moveAmount)
    }
    
    // Right paddle controls (I/K keys)
    if (key === 'i') {
      store.movePaddle('right', -moveAmount)
    }
    else if (key === 'k') {
      store.movePaddle('right', moveAmount)
    }

    /* Boundary checks
    if (store.paddles.left.y < 50) store.paddles.left.y = 50
    if (store.paddles.left.y > GAME_HEIGHT - 50) store.paddles.left.y = GAME_HEIGHT - 50
    if (store.paddles.right.y < 50) store.paddles.right.y = 50
    if (store.paddles.right.y > GAME_HEIGHT - 50) store.paddles.right.y = GAME_HEIGHT - 50
  }*/

    const paddleMoves: Record<string, () => void> = {
      'w': () => store.movePaddle('left', -moveAmount),
      's': () => store.movePaddle('left', moveAmount),
      'o': () => store.movePaddle('right', -moveAmount),
      'l': () => store.movePaddle('right', moveAmount)
    }

    if (paddleMoves[key]) paddleMoves[key]()
  }
  onMounted(() => {window.addEventListener('keydown', handleKeyDown)})
  onUnmounted(() => {window.removeEventListener('keydown', handleKeyDown)})
}
