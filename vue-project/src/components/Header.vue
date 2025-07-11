<script setup lang="ts">
import LogoutButton from '@/button/LogoutButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const home = () =>{
  router.push('/');
}
</script>

<template>
  <div class="sticky top-0 z-50 flex items-center justify-center h-16 bg-white border-b border-gray-200 px-8 shadow-sm">
    <div class="flex items-center space-x-3" @click="home">
      <img src="/images/apple-touch-icon.png" alt="로고" class="w-10 h-10" />
      <h1 class="text-lg font-semibold text-gray-800">갓생 프로젝트!</h1>
    </div>
    <div class="ml-auto pr-1">
      <LogoutButton />
    </div>
  </div>
</template>