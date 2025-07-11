
<script setup lang="ts">
interface CalendarDay {
  date: number
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  completionRate: number
}

interface Props {
  calendarDays?: CalendarDay[]
  selectedDate?: number | null
}

withDefaults(defineProps<Props>(), {
  calendarDays: () => [],
  selectedDate: null
})

defineEmits<{
  selectDate: [date: number]
}>()

const weekDays = ['일', '월', '화', '수', '목', '금', '토']

// 달성률에 따른 스탬프 가져오기
const getStampEmoji = (completionRate: number) => {
  const stampMap: Record<number, string> = {
    0: '',
    25: '🌱',
    50: '🌿',
    75: '🌻',
    100: '⭐'
  }
  return stampMap[completionRate] || ''
}

// 달성률에 따른 배경색 가져오기
const getStampBackground = (completionRate: number, isSelected: boolean, isToday: boolean) => {
  if (isSelected) return 'bg-blue-500 text-white'
  if (isToday) return 'bg-blue-100 text-blue-600'

  const backgroundMap: Record<number, string> = {
    0: 'bg-gray-50 hover:bg-gray-100',
    25: 'bg-green-50 hover:bg-green-100',
    50: 'bg-green-100 hover:bg-green-150',
    75: 'bg-yellow-100 hover:bg-yellow-150',
    100: 'bg-yellow-200 hover:bg-yellow-250'
  }
  return backgroundMap[completionRate] || 'bg-gray-50 hover:bg-gray-100'
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
    <!-- 스탬프 레전드 -->
    <div class="mb-4 p-3 bg-gray-50 rounded-xl">
      <h3 class="text-sm font-medium text-gray-700 mb-2 text-center">📊 달성률 스탬프</h3>
      <div class="flex justify-center space-x-4 text-xs">
        <div class="flex items-center space-x-1">
          <span class="text-lg">🌱</span>
          <span class="text-gray-600">25%</span>
        </div>
        <div class="flex items-center space-x-1">
          <span class="text-lg">🌿</span>
          <span class="text-gray-600">50%</span>
        </div>
        <div class="flex items-center space-x-1">
          <span class="text-lg">🌻</span>
          <span class="text-gray-600">75%</span>
        </div>
        <div class="flex items-center space-x-1">
          <span class="text-lg">⭐</span>
          <span class="text-gray-600">100%</span>
        </div>
      </div>
    </div>

    <!-- 요일 헤더 -->
    <div class="grid grid-cols-7 gap-1 mb-2">
      <div
          v-for="day in weekDays"
          :key="day"
          class="text-center text-sm font-medium text-gray-600 py-2"
          :class="day === '일' ? 'text-red-500' : day === '토' ? 'text-blue-500' : ''"
      >
        {{ day }}
      </div>
    </div>

    <!-- 캘린더 그리드 -->
    <div class="grid grid-cols-7 gap-1">
      <button
          v-for="(day, index) in calendarDays"
          :key="index"
          @click="day.isCurrentMonth ? $emit('selectDate', day.date) : null"
          class="aspect-square p-2 rounded-lg relative transition-all duration-200 flex flex-col items-center justify-center"
          :class="[
          getStampBackground(day.completionRate, day.isSelected, day.isToday),
          {
            'text-gray-300': !day.isCurrentMonth,
            'text-gray-800': day.isCurrentMonth && !day.isToday && !day.isSelected,
            'cursor-pointer': day.isCurrentMonth,
            'cursor-default': !day.isCurrentMonth
          }
        ]"
          :disabled="!day.isCurrentMonth"
      >
        <!-- 날짜 -->
        <div class="text-xs font-medium mb-1">{{ day.date }}</div>

        <!-- 스탬프 -->
        <div v-if="day.isCurrentMonth && day.completionRate > 0" class="text-lg">
          {{ getStampEmoji(day.completionRate) }}
        </div>

        <!-- 빈 공간 (스탬프 없을 때도 높이 유지) -->
        <div v-else class="h-5"></div>
      </button>
    </div>
  </div>
</template>