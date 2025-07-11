
<script setup lang="ts">
import { computed } from 'vue'

interface CommonGoal {
  id: number
  title: string
  description: string
  icon: string
  completed: boolean
}

interface Props {
  selectedDate?: number | null
  selectedMonth?: number
  selectedYear?: number
  dailyGoals?: CommonGoal[]
  completionRate?: number
}

const props = withDefaults(defineProps<Props>(), {
  selectedDate: null,
  selectedMonth: new Date().getMonth() + 1,
  selectedYear: new Date().getFullYear(),
  dailyGoals: () => [],
  completionRate: 0
})

defineEmits<{
  toggleGoal: [goalId: number]
}>()

// 선택된 날짜가 과거인지 확인
const isPastDate = computed(() => {
  if (!props.selectedDate) return false

  const today = new Date()
  const selectedDateObj = new Date(props.selectedYear, props.selectedMonth - 1, props.selectedDate)
  const todayDateObj = new Date(today.getFullYear(), today.getMonth(), today.getDate())

  return selectedDateObj < todayDateObj
})

// 달성률에 따른 스탬프 가져오기
const getStampEmoji = (rate: number) => {
  const stampMap: Record<number, string> = {
    0: '😴',
    25: '🌱',
    50: '🌿',
    75: '🌻',
    100: '⭐'
  }
  return stampMap[rate] || '😴'
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
    <div v-if="selectedDate" class="mb-4">
      <h2 class="text-xl font-semibold flex items-center">
        <span class="mr-2">📋</span>
        {{ selectedYear }}년 {{ selectedMonth }}월 {{ selectedDate }}일
        <span v-if="isPastDate" class="ml-2 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          📖 기록보기
        </span>
      </h2>
    </div>

    <div v-if="!selectedDate" class="text-center py-8 text-gray-500">
      <span class="block text-4xl mb-2">📅</span>
      <p>날짜를 선택하면 그 날의 목표 달성 현황을 확인할 수 있어요!</p>
      <p class="text-sm mt-2">스탬프를 모아보세요! 🌱 → 🌿 → 🌻 → ⭐</p>
    </div>

    <div v-else>
      <!-- 과거 날짜 알림 -->
      <div v-if="isPastDate" class="mb-4 p-3 bg-gray-50 rounded-xl text-center">
        <div class="text-3xl mb-2">{{ getStampEmoji(completionRate) }}</div>
        <p class="text-sm text-gray-600">
          이 날의 기록입니다. 과거 날짜는 수정할 수 없어요.
        </p>
      </div>

      <!-- 목표 목록 -->
      <div v-if="dailyGoals.length > 0">
        <h3 class="text-lg font-semibold mb-3 flex items-center">
          <span class="mr-2">🎯</span>
          {{ isPastDate ? '목표 기록' : '목표 달성하기' }}
        </h3>

        <div class="space-y-2">
          <!-- 과거 날짜: 읽기 전용 -->
          <div
              v-if="isPastDate"
              v-for="goal in dailyGoals"
              :key="goal.id"
              class="flex items-center p-4 rounded-xl border-2"
              :class="goal.completed
              ? 'bg-green-50 border-green-200'
              : 'bg-gray-50 border-gray-200'"
          >
            <div class="flex items-center justify-center w-12 h-12 rounded-full mr-4"
                 :class="goal.completed ? 'bg-green-500' : 'bg-gray-300'">
              <span v-if="goal.completed" class="text-white text-lg">✓</span>
              <span v-else class="text-2xl">{{ goal.icon }}</span>
            </div>

            <div class="flex-1 text-left">
              <div class="font-medium text-lg"
                   :class="goal.completed ? 'line-through text-gray-600' : 'text-gray-800'">
                {{ goal.title }}
              </div>
              <div class="text-sm text-gray-600">{{ goal.description }}</div>
            </div>

            <div class="text-sm font-medium"
                 :class="goal.completed ? 'text-green-600' : 'text-gray-400'">
              {{ goal.completed ? '완료됨' : '미완료' }}
            </div>
          </div>

          <!-- 현재/미래 날짜: 클릭 가능 -->
          <button
              v-else
              v-for="goal in dailyGoals"
              :key="goal.id"
              @click="$emit('toggleGoal', goal.id)"
              class="w-full flex items-center p-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02]"
              :class="goal.completed
              ? 'bg-green-50 border-green-200 hover:bg-green-100'
              : 'bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-blue-50'"
          >
            <div class="flex items-center justify-center w-12 h-12 rounded-full mr-4"
                 :class="goal.completed ? 'bg-green-500' : 'bg-gray-300'">
              <span v-if="goal.completed" class="text-white text-lg">✓</span>
              <span v-else class="text-2xl">{{ goal.icon }}</span>
            </div>

            <div class="flex-1 text-left">
              <div class="font-medium text-lg"
                   :class="goal.completed ? 'line-through text-gray-600' : 'text-gray-800'">
                {{ goal.title }}
              </div>
              <div class="text-sm text-gray-600">{{ goal.description }}</div>
            </div>

            <div class="text-sm text-gray-400">
              {{ goal.completed ? '완료!' : '클릭하기' }}
            </div>
          </button>
        </div>
      </div>

      <!-- 응원 메시지 (현재/미래 날짜만) -->
      <div v-if="!isPastDate" class="mt-4 p-4 bg-blue-50 rounded-xl text-center">
        <div class="text-sm text-blue-700">
          💪 클릭해서 목표를 달성하고 스탬프를 모아보세요!
        </div>
      </div>
    </div>
  </div>
</template>