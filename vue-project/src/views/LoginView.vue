<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

      <!-- 헤더 -->
      <div class="text-center mb-8">
        <div class="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
          <img src="/images/ms-icon-310x310.png" alt="아이콘"/>
        </div>
        <h1 class="text-2xl font-bold text-gray-800 mb-2">갓생 프로젝트</h1>
        <p class="text-gray-600">친구들과 갓생 살자</p>
      </div>

      <!-- 로딩 상태 -->
      <div v-if="isLoading || !isKakaoInitialized" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600">
          {{ !isKakaoInitialized ? '카카오 SDK 로딩 중...' : '로그인 중...' }}
        </p>
      </div>

      <!-- 로그인 버튼 -->
      <div v-else class="space-y-4">
        <button
            @click="handleKakaoLogin"
            class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-3 transition-all duration-200 transform hover:scale-105"
        >
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3c5.5 0 10 3.58 10 8 0 4.42-4.5 8-10 8-1.12 0-2.2-.16-3.22-.46L3 21l1.94-5.78C3.86 14.36 2 11.64 2 8.5 2 6.01 6.5 3 12 3z"/>
          </svg>
          카카오톡으로 시작하기
        </button>

        <!-- 에러 메시지 -->
        <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-4">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="text-sm text-red-700">{{ errorMessage }}</p>
          </div>
        </div>

        <!-- 약관 동의 -->
        <p class="text-xs text-gray-500 text-center">
          로그인 시 <a href="#" class="text-blue-600 hover:underline">이용약관</a>과
          <a href="#" class="text-blue-600 hover:underline">개인정보처리방침</a>에 동의합니다.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useKakao } from '@/composables/useKakao'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const { isKakaoInitialized, initKakao, isKakaoReallyInitialized } = useKakao()
const authStore = useAuthStore()

const errorMessage = ref('')
const isLoading = computed(() => authStore.isLoading)

onMounted(async () => {
  await initKakao()
  await authStore.restoreToken()

  if (authStore.isAuthenticated) {
    await router.push('/dashboard')
  }
})

const handleKakaoLogin = async () => {
  errorMessage.value = ''

  // 초기화가 안 되어 있으면 다시 시도
  if (!isKakaoReallyInitialized()) {
    await initKakao()
  }

  try {
    await authStore.kakaoLogin()
    await router.push('/dashboard')
  } catch (error: any) {
    console.error('로그인 실패:', error)
    errorMessage.value = error.message || '로그인에 실패했습니다. 다시 시도해주세요.'
  }
}
</script>
