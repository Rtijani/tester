import { useGameStore } from '@/stores/useGameStore'
import { onMounted, onUnmounted } from 'vue'

export function usePaddleControls() {
  const store = useGameStore()

  const handleKeyDown = (e: KeyboardEvent) => {
    const moveAmount = 15 // Consistent movement speed
    if (e.code === 'Space') {
      e.preventDefault()
      store.togglePause()
      return
    }
    // Left paddle controls (W/S keys)
    if (e.key === 'w') store.movePaddle('left', -moveAmount)
    if (e.key === 's') store.movePaddle('left', moveAmount)
    
    // Right paddle controls (Arrow keys)
    if (e.key === 'ArrowUp') store.movePaddle('right', -moveAmount)
    if (e.key === 'ArrowDown') store.movePaddle('right', moveAmount)
  }

  onMounted(() => window.addEventListener('keydown', handleKeyDown))
  onUnmounted(() => window.removeEventListener('keydown', handleKeyDown))
}