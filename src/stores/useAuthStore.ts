import { defineStore } from 'pinia';

interface User {
  id: string;
  name: string;
  email: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    loading: false,
    error: null as string | null
  }),
  actions: {
    async login(email: string, password: string) {
      this.loading = true;
      this.error = null;
      
      try {
        // Mock authentication (replace with actual API call)
        if (email === 'user@example.com' && password === 'password') {
          this.user = {
            id: '1',
            name: 'Test User',
            email: email
          };
          localStorage.setItem('user', JSON.stringify(this.user));
          return true;
        } else {
          throw new Error('Invalid credentials');
        }
      } catch (err) {
        this.error = (err as Error).message;
        return false;
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
    },
    initialize() {
      const user = localStorage.getItem('user');
      if (user) {
        this.user = JSON.parse(user);
      }
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.user
  }
});