<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <button
      @click="logout"
      class="w-9 h-9 rounded-full bg-white hover:shadow-md flex items-center justify-center transition"
  >
    <img
        src="/images/logout-icon.png"
        alt="로그아웃"
        class="w-6 h-6"
    />
  </button>
</template>

<style scoped>

</style>