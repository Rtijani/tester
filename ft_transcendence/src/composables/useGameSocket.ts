// src/composables/useGameSocket.ts
import { ref } from 'vue'

export function useGameSocket() {
  const isConnected = ref(false)
  let socket: WebSocket | null = null

  const connect = (roomId: string, onMessage: (data: any) => void) => {
    isConnected.value = false
    socket = new WebSocket(`wss://yourserver.com/game/${roomId}`)

    socket.onopen = () => {
      isConnected.value = true
    }

    socket.onmessage = (event) => {
      onMessage(JSON.parse(event.data))
    }

    socket.onerror = () => {
      isConnected.value = false
    }

    socket.onclose = () => {
      isConnected.value = false
    }
  }

  const send = (data: any) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(data))
    }
  }

  return {
    connect,
    send,
    isConnected // Now properly exposed
  }
}