
<script setup lang="ts">
interface Props {
  completedTasks?: number
  totalTasks?: number
  streak?: number
}

withDefaults(defineProps<Props>(), {
  completedTasks: 3,
  totalTasks: 4,
  streak: 7
})
</script>

<template>
  <div class="grid grid-cols-2 gap-4 mb-6">
    <!-- 오늘의 달성률 -->
    <div class="bg-white rounded-xl shadow-lg p-4 text-center">
      <div class="text-2xl font-bold text-blue-600">{{ Math.round((completedTasks / totalTasks) * 100) }}%</div>
      <div class="text-sm text-gray-600 mt-1">오늘 달성률</div>
      <div class="text-xs text-gray-500 mt-1">{{ completedTasks }}/{{ totalTasks }} 완료</div>
    </div>

    <!-- 연속 기록 -->
    <div class="bg-white rounded-xl shadow-lg p-4 text-center">
      <div class="text-2xl font-bold text-purple-600">{{ streak }}일</div>
      <div class="text-sm text-gray-600 mt-1">연속 기록</div>
      <div class="text-xs text-gray-500 mt-1">🔥 갓생 스트릭</div>
    </div>
  </div>
</template>