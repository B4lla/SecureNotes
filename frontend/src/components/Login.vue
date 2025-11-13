<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-gray-950">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-cyan-900/20 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-800/20 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-800/20 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
    </div>

    <div class="max-w-md w-full relative z-10">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-extrabold text-white mb-2">
          SecureNotes
        </h1>
      </div>

      <div class="bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800 p-8 relative">
        <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-700 to-transparent"></div>
        
        <h2 class="text-2xl font-bold mb-6 text-center text-white">
          Login
        </h2>
        
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-gray-400 mb-2.5">
              User
            </label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-600 group-focus-within:text-cyan-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                v-model="username"
                type="text"
                required
                class="w-full pl-12 pr-4 py-3.5 bg-gray-950/70 border border-gray-800 rounded-xl focus:ring-2 focus:ring-cyan-600/50 focus:border-cyan-600 outline-none transition-all duration-300 text-gray-100 placeholder-gray-600"
                placeholder="Enter your user"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-400 mb-2.5">
              Password
            </label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-600 group-focus-within:text-cyan-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                v-model="password"
                type="password"
                required
                class="w-full pl-12 pr-4 py-3.5 bg-gray-950/70 border border-gray-800 rounded-xl focus:ring-2 focus:ring-cyan-600/50 focus:border-cyan-600 outline-none transition-all duration-300 text-gray-100 placeholder-gray-600"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div v-if="error" class="bg-red-500/10 border border-red-800 rounded-xl p-4 text-red-400 text-sm flex items-start space-x-3">
            <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            <span>{{ error }}</span>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full relative group bg-cyan-700 hover:bg-cyan-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-900/30 hover:shadow-cyan-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!loading" class="flex items-center justify-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Login
            </span>
            <span v-else class="flex items-center justify-center">
              <svg class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Loading...
            </span>
          </button>
        </form>

        <div class="mt-8 text-center">
          <p class="text-gray-400 text-sm">
            <router-link to="/register" class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-300 hover:to-purple-300 font-semibold transition-all ml-1">
              Register
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '../utils/api.js';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
      loading: false
    };
  },
  methods: {
    async handleLogin() {
      this.error = '';
      this.loading = true;

      try {
        const response = await login(this.username, this.password);
        
        if (response.error) {
          this.error = response.error;
        } else {
          localStorage.setItem('token', response.token);
          localStorage.setItem('masterPassword', this.password);
          this.$router.push('/dashboard');
        }
      } catch (err) {
        this.error = 'Error while connecting to the server';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>