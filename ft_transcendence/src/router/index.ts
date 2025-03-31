import { createRouter, createWebHistory } from 'vue-router'
import GameView from '@/views/GameView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/game', 
      component: GameView  // Direct import (no lazy-loading for main views)
    },
    { 
      path: '/', 
      redirect: '/game'  // Auto-redirect to /game
    }
  ]
})

export default router