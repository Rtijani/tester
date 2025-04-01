<script setup lang="ts">
import { useChat } from '@/composables/useChat'
import { ref, computed } from 'vue'
import type { ChatUser, Message } from '@/composables/useChat'

const { 
  messages, 
  chatUsers, 
  activeConversation,
  sendMessage,
  sendGameInvite,
  blockUser,
  unblockUser
} = useChat()

const newMessage = ref('')
const selectedUser = ref<ChatUser | null>(null)

// Filter messages for current conversation
const filteredMessages = computed(() => 
  messages.value.filter((m: Message) => 
    m.senderId === activeConversation.value || 
    m.senderId === 'current-user-id'
  )
)

const handleSend = () => {
  if (newMessage.value.trim()) {
    sendMessage(newMessage.value)
    newMessage.value = ''
  }
}

const handleUserSelect = (user: ChatUser) => {
  activeConversation.value = user.id
  selectedUser.value = user
}

const acceptInvite = (messageId: string) => {
  console.log('Accepted invite from message', messageId)
}

const declineInvite = (messageId: string) => {
  console.log('Declined invite:', messageId)
}
</script>

<template>
  <div class="flex h-[250px] border w-full border-gray-200 rounded-lg">
    <!-- User List -->
    <div class="w-1/3 border-r p-2 overflow-y-auto">
      <div 
        v-for="user in chatUsers" 
        :key="user.id"
        @click="handleUserSelect(user)"
        class="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-lg"
        :class="{ 'bg-blue-50': activeConversation === user.id }"
      >
        <img 
          :src="user.avatarUrl" 
          class="w-8 h-8 rounded-full mr-2"
        >
        <div>
          <p class="font-medium">{{ user.displayName }}</p>
          <p class="text-xs text-gray-500">
            {{ user.isOnline ? 'Online' : 'Offline' }}
          </p>
        </div>
        <button 
          v-if="user.isBlocked"
          @click.stop="unblockUser(user.id)"
          class="ml-auto text-xs text-red-500"
        >
          Unblock
        </button>
      </div>
    </div>

    <!-- Chat Area -->
    <div class="flex-1 flex flex-col">
      <!-- Messages -->
      <div class="flex-1 p-2 overflow-y-auto">
  <div 
     v-for="message in filteredMessages"
    class="mb-2"
    :class="{ 'text-right': message.senderId === 'current-user-id' }"
  >
          <div 
            class="inline-block p-2 rounded-lg max-w-[80%]"
            :class="{
              'bg-blue-300': message.senderId === 'current-user-id',
              'bg-gray-300': message.senderId !== 'current-user-id',
              'border-2 border-green-300': message.isInvite
            }"
          >
            <p>{{ message.content }}</p>
            <p class="text-xs text-gray-500 mt-1">
              {{ new Date(message.timestamp).toLocaleTimeString() }}
            </p>
            
            <!-- Game Invite Section -->
            <div v-if="message.isInvite" class="mt-2">
              <p class="font-bold">🎮 Game Invite</p>
              <div class="flex gap-2 mt-1">
                <button 
                  @click="acceptInvite(message.id)"
                  class="px-2 py-1 bg-green-500 text-white rounded text-sm"
                >
                  Accept
                </button>
                <button 
                  @click="declineInvite(message.id)"
                  class="px-2 py-1 bg-red-500 text-white rounded text-sm"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Message Input -->
      <div class="p-2 border-t">
        <div class="flex gap-2">
          <input
            v-model="newMessage"
            @keyup.enter="handleSend"
            placeholder="Type a message..."
            class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          <button
            @click="handleSend"
            class="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
          <button
            @click="sendGameInvite"
            class="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            title="Send game invite"
          >
            🎮
          </button>
        </div>
      </div>
    </div>

    <!-- User Profile Sidebar -->
    <div 
      v-if="selectedUser"
      class="w-1/4 border-l p-4 overflow-y-auto"
    >
      <img 
        :src="selectedUser.avatarUrl" 
        class="w-20 h-20 rounded-full mx-auto mb-4"
      >
      <h3 class="text-lg font-bold text-center">{{ selectedUser.displayName }}</h3>
      <p class="text-center text-sm mb-4">
        {{ selectedUser.isOnline ? '🟢 Online' : '🔴 Offline' }}
      </p>
      
      <div class="flex justify-center gap-4 my-4" v-if="selectedUser.stats">
        <div class="text-center">
          <p class="text-xl font-bold text-green-600">{{ selectedUser.stats.wins }}</p>
          <p class="text-xs text-gray-500">Wins</p>
        </div>
        <div class="text-center">
          <p class="text-xl font-bold text-red-600">{{ selectedUser.stats.losses }}</p>
          <p class="text-xs text-gray-500">Losses</p>
        </div>
      </div>
      
      <button
        @click="blockUser(selectedUser.id)"
        v-if="!selectedUser.isBlocked"
        class="w-full py-2 bg-red-50 text-red-500 rounded-lg mb-2"
      >
        Block User
      </button>
      <button
        @click="unblockUser(selectedUser.id)"
        v-else
        class="w-full py-2 bg-green-50 text-green-500 rounded-lg mb-2"
      >
        Unblock User
      </button>
      
      <button
        @click="sendGameInvite"
        class="w-full py-2 bg-blue-500 text-white rounded-lg"
      >
        Challenge to Game
      </button>
    </div>
  </div>
</template>