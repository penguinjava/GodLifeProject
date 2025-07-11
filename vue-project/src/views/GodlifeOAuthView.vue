<template>
  <div class="flex items-center justify-center h-screen bg-white text-gray-800">
    <div class="text-center">
      <div class="mb-4 text-xl font-semibold">로그인 중입니다...</div>
      <div class="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
  const token = route.query.token

  if (token) {
    console.log('저장완료')
    authStore.setToken(token)

    setTimeout(() => {
      router.push('/')
    }, 500)
  } else {
    console.log('로그인 실패, /login 이동')
    router.push('/login')
  }
})
</script>
