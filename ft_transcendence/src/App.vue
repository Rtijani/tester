<script setup lang="ts">
import { RouterView } from 'vue-router'
import Test from './views/GameView.vue' // Keep your test component if needed
</script>

<template>
  <!-- Main app container -->
  <div class="min-h-screen bg-white-100">
    <!-- You can keep your test components visible or conditionally render them -->
    <Test v-if="false" /> <!-- Set to false to hide, true to show for testing -->
    
    <!-- This will render your GameView when navigating to / -->
    <RouterView />
  </div>
</template>

<style>
/* Optional: Add base styles if needed */
body {
  margin: 0;
  font-family: sans-serif;
}
</style>