// src/composables/useChat.ts
import { ref, computed } from 'vue'
import type { Ref } from 'vue'

export interface Message {
  id: string
  senderId: string
  content: string
  timestamp: Date
  isInvite?: boolean
}

export interface ChatUser {
  id: string
  displayName: string
  avatarUrl: string
  isOnline: boolean
  isBlocked: boolean
  stats?: {
    wins: number
    losses: number
  }
}

export function useChat() {
  const messages: Ref<Message[]> = ref([])
  const activeConversation: Ref<string|null> = ref(null)
  const chatUsers: Ref<ChatUser[]> = ref([
    {
      id: '1',
      displayName: 'Player One',
      avatarUrl: '/default-avatar.png',// i have to learn how to import this
      isOnline: true,
      isBlocked: false,
      stats: { wins: 10, losses: 5 }
    },
    {
      id: '2',
      displayName: 'Player Two',
      avatarUrl: '/default-avatar.png',
      isOnline: false,
      isBlocked: false,
      stats: { wins: 8, losses: 7 }
    }
  ])

  const sendMessage = (content: string) => {
    if (!activeConversation.value) return
    
    const newMessage: Message = {
      id: crypto.randomUUID(),
      senderId: 'current-user-id',
      content,
      timestamp: new Date()
    }
    messages.value.push(newMessage)
  }

  const sendGameInvite = () => {
    if (!activeConversation.value) return
    
    const invite: Message = {
      id: crypto.randomUUID(),
      senderId: 'current-user-id',
      content: 'I challenge you to a game!',
      timestamp: new Date(),
      isInvite: true
    }
    messages.value.push(invite)
  }

  const blockUser = (userId: string) => {
    const user = chatUsers.value.find(u => u.id === userId)
    if (user) user.isBlocked = true
  }

  const unblockUser = (userId: string) => {
    const user = chatUsers.value.find(u => u.id === userId)
    if (user) user.isBlocked = false
  }

  return {
    messages,
    chatUsers,
    activeConversation,
    sendMessage,
    sendGameInvite,
    blockUser,
    unblockUser
  }
}