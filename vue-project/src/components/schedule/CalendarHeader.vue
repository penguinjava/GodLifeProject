<script setup lang="ts">
interface Props {
  currentYear?: number
  currentMonth?: number
  viewMode?: 'monthly' | 'weekly'
}

withDefaults(defineProps<Props>(), {
  currentYear: new Date().getFullYear(),
  currentMonth: new Date().getMonth() + 1,
  viewMode: 'monthly'
})

defineEmits<{
  prevMonth: []
  nextMonth: []
  goToToday: []
  changeViewMode: [mode: 'monthly' | 'weekly']
}>()

const monthNames = [
  '1월', '2월', '3월', '4월', '5월', '6월',
  '7월', '8월', '9월', '10월', '11월', '12월'
]
</script>

<template>
  <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
    <!-- 상단: 날짜 네비게이션 -->
    <div class="flex items-center justify-between mb-4">
      <button
          @click="$emit('prevMonth')"
          class="p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <span class="text-xl">←</span>
      </button>

      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-800">
          {{ currentYear }}년 {{ monthNames[currentMonth - 1] }}
        </h1>
        <p class="text-sm text-gray-600">
          {{ viewMode === 'monthly' ? '월별' : '주별' }} 스탬프 달력
        </p>
      </div>

      <button
          @click="$emit('nextMonth')"
          class="p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <span class="text-xl">→</span>
      </button>
    </div>

    <!-- 하단: 컨트롤 버튼들 -->
    <div class="flex items-center justify-between">
      <!-- 월별/주별 전환 -->
      <div class="flex bg-gray-100 rounded-lg p-1">
        <button
            @click="$emit('changeViewMode', 'monthly')"
            class="px-3 py-1 rounded-md text-sm font-medium transition-colors"
            :class="viewMode === 'monthly'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-800'"
        >
          📅 월별
        </button>
        <button
            @click="$emit('changeViewMode', 'weekly')"
            class="px-3 py-1 rounded-md text-sm font-medium transition-colors"
            :class="viewMode === 'weekly'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-800'"
        >
          📊 주별
        </button>
      </div>

      <!-- 오늘로 이동 -->
      <button
          @click="$emit('goToToday')"
          class="px-4 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition-colors"
      >
        오늘로 이동
      </button>
    </div>
  </div>
</template>