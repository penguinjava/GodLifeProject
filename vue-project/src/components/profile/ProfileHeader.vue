
<script setup lang="ts">
interface Props {
  name?: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  name: '갓생러',
  description: '매일 성장하는 중 🌱'
})

defineEmits<{
  editProfile: []
}>()
</script>

<template>
  <div class="bg-white rounded-2xl shadow-lg p-6 mb-6 text-center">
    <div class="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
      <span class="text-3xl text-white">👤</span>
    </div>
    <h1 class="text-xl font-bold text-gray-800 mb-1">{{ name }}</h1>
    <p class="text-gray-600">{{ description }}</p>

    <!-- 프로필 등록 버튼 -->
    <button
        @click="$emit('editProfile')"
        class="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition-colors"
    >
      프로필 수정
    </button>
  </div>
</template>