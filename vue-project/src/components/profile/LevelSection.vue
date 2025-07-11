<script setup lang="ts">
interface Props {
  currentLevel?: number
  levelTitle?: string
  totalExp?: number
  currentExp?: number
  nextLevelExp?: number
  expPercentage?: number
}

withDefaults(defineProps<Props>(), {
  currentLevel: 5,
  levelTitle: '갓생 실천가',
  totalExp: 142,
  currentExp: 22,
  nextLevelExp: 80,
  expPercentage: 27.5
})
</script>

<template>
  <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
    <h2 class="text-xl font-semibold mb-4 flex items-center">
      <span class="mr-2">🏅</span>
      갓생 레벨
    </h2>
    <div class="text-center">
      <!-- 레벨 표시 -->
      <div class="text-4xl font-bold text-purple-600 mb-2">Lv.{{ currentLevel }}</div>
      <div class="text-lg font-medium text-gray-700 mb-2">{{ levelTitle }}</div>

      <!-- 총 갓생점수 표시 -->
      <div class="text-lg font-semibold text-blue-600 mb-4">
        총 갓생점수: {{ totalExp }}점
      </div>

      <!-- 갓생점수 진행 바 -->
      <div class="w-full bg-gray-200 rounded-full h-3 mb-2">
        <div
            class="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
            :style="{ width: `${expPercentage}%` }"
        ></div>
      </div>
      <div class="text-sm text-gray-600">
        {{ currentExp }} / {{ nextLevelExp }} 갓생점수
        <span class="text-purple-600 font-medium">({{ nextLevelExp - currentExp }}점까지 레벨업!)</span>
      </div>
    </div>
  </div>
</template>