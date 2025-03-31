
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/useAuthStore';
  
  const email = ref('');
  const password = ref('');
  const authStore = useAuthStore();
  const error = ref<string | null>(null);
  const loading = ref(false);
  
  const handleLogin = async () => {
    error.value = null;
    loading.value = true;
    
    const success = await authStore.login(email.value, password.value);
    
    if (!success) {
      error.value = authStore.error || 'Login failed';
    } else {
      // Redirect or update UI
    }
    
    loading.value = false;
  };
  </script>
  <template>
    <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 class="text-2xl font-bold mb-6">Login</h2>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
          >
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
          >
        </div>
        
        <div v-if="error" class="text-red-500 text-sm">
          {{ error }}
        </div>
        
        <button
          type="submit"
          :disabled="loading"
          class="w-full flex justify-center py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <span v-if="!loading">Login</span>
          <span v-else>Logging in...</span>
        </button>
      </form>
    </div>
  </template>