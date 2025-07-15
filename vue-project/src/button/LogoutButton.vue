<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <button
      class="w-9 h-9 rounded-full bg-white hover:shadow-md flex items-center justify-center transition"
      @click="logout"
  >
    <img
        alt="로그아웃"
        class="w-6 h-6"
        src="/images/logout-icon.png"
    />
  </button>
</template>

<style scoped>

</style>