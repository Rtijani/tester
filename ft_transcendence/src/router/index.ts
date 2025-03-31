import { createRouter, createWebHistory } from 'vue-router'

/*const router = createRouter({
  history: createWebHistory(),
  routes: [
  
    {
      path: '/game',
      component: () => import('@views/GameView.vue') // Using @views alias
    }
  ]
})

export default router*/

import GameView from '@/views/GameView.vue'

const routes = [
  {
    path: '/login',
    name: 'game',
    component: () => import('@/views/GameView.vue')
}]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router