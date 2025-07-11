
<script setup lang="ts">
interface Props {
  quote?: string
  author?: string
}

withDefaults(defineProps<Props>(), {
  quote: '성공은 준비된 자에게 온다',
  author: '벤자민 프랭클린'
})
</script>

<template>
  <div class="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 mb-6 text-white text-center">
    <h2 class="text-xl font-semibold mb-3">💡 오늘의 명언</h2>
    <p class="text-lg italic mb-2">"{{ quote }}"</p>
    <p class="text-sm opacity-80">- {{ author }}</p>
  </div>
</template>