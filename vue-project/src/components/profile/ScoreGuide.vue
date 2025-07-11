<script setup lang="ts">
</script>

<template>
  <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
    <h2 class="text-xl font-semibold mb-4 flex items-center">
      <span class="mr-2">💎</span>
      갓생점수 획득 기준
    </h2>
    <div class="space-y-3">
      <div class="flex items-center p-3 bg-green-50 rounded-xl">
        <span class="text-xl mr-3">✅</span>
        <div class="flex-1">
          <div class="font-medium text-gray-800">일일 목표 달성</div>
          <div class="text-sm text-gray-600">하루 목표를 완료하면 10점</div>
        </div>
        <div class="text-green-600 font-bold">+10점</div>
      </div>

      <div class="flex items-center p-3 bg-blue-50 rounded-xl">
        <span class="text-xl mr-3">🔥</span>
        <div class="flex-1">
          <div class="font-medium text-gray-800">연속 달성</div>
          <div class="text-sm text-gray-600">3일 연속 +5점, 7일 연속 +15점</div>
        </div>
        <div class="text-blue-600 font-bold">+5~15점</div>
      </div>

      <div class="flex items-center p-3 bg-purple-50 rounded-xl">
        <span class="text-xl mr-3">🏆</span>
        <div class="flex-1">
          <div class="font-medium text-gray-800">특별 달성</div>
          <div class="text-sm text-gray-600">챌린지 완료, 마일스톤 달성</div>
        </div>
        <div class="text-purple-600 font-bold">+20~50점</div>
      </div>
    </div>
  </div>
</template>