<template>
  <div class="schedule-container">
    <CalendarHeader
        :current-year="currentYear"
        :current-month="currentMonth"
        :view-mode="viewMode"
        @prev-month="goToPrevMonth"
        @next-month="goToNextMonth"
        @go-to-today="goToToday"
        @change-view-mode="changeViewMode"
    />

    <MonthlyCalendar
        v-if="viewMode === 'monthly'"
        :calendar-days="calendarDays"
        :selected-date="selectedDate"
        @select-date="selectDate"
    />

    <!-- TODO: 주별 캘린더 컴포넌트 추가 예정 -->
    <div v-else class="bg-white rounded-2xl shadow-lg p-6 mb-6 text-center">
      <div class="text-4xl mb-2">🚧</div>
      <p class="text-gray-600">주별 보기는 준비중입니다!</p>
    </div>

    <div class="pb-4">
      <ScheduleDetail
          :selected-date="selectedDate"
          :selected-month="currentMonth"
          :selected-year="currentYear"
          :daily-goals="selectedDateGoals"
          :completion-rate="selectedDateCompletionRate"
          @toggle-goal="handleToggleGoal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CalendarHeader from '@/components/schedule/CalendarHeader.vue'
import MonthlyCalendar from '@/components/schedule/MonthlyCalendar.vue'
import ScheduleDetail from '@/components/schedule/ScheduleDetail.vue'

const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth() + 1)
const selectedDate = ref<number | null>(null)
const viewMode = ref<'monthly' | 'weekly'>('monthly')

// 공통목표 템플릿 (점수 제거)
const commonGoalsTemplate = ref([
  {
    id: 1,
    title: '성경읽기',
    description: '매일 1장씩',
    icon: '📖'
  },
  {
    id: 2,
    title: '기도하기',
    description: '아침, 저녁 기도',
    icon: '🙏'
  },
  {
    id: 3,
    title: '운동하기',
    description: '30분 이상',
    icon: '💪'
  },
  {
    id: 4,
    title: '감사일기',
    description: '감사한 일 3가지',
    icon: '✨'
  }
])

// TODO: API 연동 예정
const dailyProgress = ref([
  { date: 1, month: currentMonth.value, year: currentYear.value, completionRate: 100 },
  { date: 2, month: currentMonth.value, year: currentYear.value, completionRate: 75 },
  { date: 3, month: currentMonth.value, year: currentYear.value, completionRate: 50 },
  { date: 4, month: currentMonth.value, year: currentYear.value, completionRate: 25 },
  { date: 5, month: currentMonth.value, year: currentYear.value, completionRate: 100 },
])

const dailyGoalCompletions = ref([
  { date: 1, month: currentMonth.value, year: currentYear.value, goalId: 1, completed: true },
  { date: 1, month: currentMonth.value, year: currentYear.value, goalId: 2, completed: true },
  { date: 1, month: currentMonth.value, year: currentYear.value, goalId: 3, completed: true },
  { date: 1, month: currentMonth.value, year: currentYear.value, goalId: 4, completed: true },
])

// 목표 달성 토글 (과거 날짜 차단 추가)
const handleToggleGoal = (goalId: number) => {
  if (!selectedDate.value) return

  // 과거 날짜는 수정 불가
  const today = new Date()
  const selectedDateObj = new Date(currentYear.value, currentMonth.value - 1, selectedDate.value)
  const todayDateObj = new Date(today.getFullYear(), today.getMonth(), today.getDate())

  if (selectedDateObj < todayDateObj) {
    return // 과거 날짜는 수정 불가
  }

  const existingCompletion = dailyGoalCompletions.value.find(c =>
      c.date === selectedDate.value &&
      c.month === currentMonth.value &&
      c.year === currentYear.value &&
      c.goalId === goalId
  )

  if (existingCompletion) {
    existingCompletion.completed = !existingCompletion.completed
  } else {
    dailyGoalCompletions.value.push({
      date: selectedDate.value,
      month: currentMonth.value,
      year: currentYear.value,
      goalId: goalId,
      completed: true
    })
  }

  // 달성률 재계산
  updateCompletionRate()
}

// 달성률 업데이트
const updateCompletionRate = () => {
  if (!selectedDate.value) return

  const completedGoals = dailyGoalCompletions.value.filter(c =>
      c.date === selectedDate.value &&
      c.month === currentMonth.value &&
      c.year === currentYear.value &&
      c.completed
  ).length

  const totalGoals = commonGoalsTemplate.value.length
  const rate = Math.round((completedGoals / totalGoals) * 100)

  // 기존 진행률 데이터 업데이트 또는 추가
  const existingProgress = dailyProgress.value.find(p =>
      p.date === selectedDate.value &&
      p.month === currentMonth.value &&
      p.year === currentYear.value
  )

  if (existingProgress) {
    existingProgress.completionRate = rate
  } else {
    dailyProgress.value.push({
      date: selectedDate.value,
      month: currentMonth.value,
      year: currentYear.value,
      completionRate: rate
    })
  }
}

// 뷰모드 변경
const changeViewMode = (mode: 'monthly' | 'weekly') => {
  viewMode.value = mode
}

// 달성률 계산
const getCompletionRate = (date: number, month: number, year: number) => {
  const progress = dailyProgress.value.find(p =>
      p.date === date && p.month === month && p.year === year
  )
  return progress ? progress.completionRate : 0
}

const calendarDays = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value
  const firstDay = new Date(year, month - 1, 1)
  const lastDay = new Date(year, month, 0)
  const firstDayOfWeek = firstDay.getDay()
  const daysInMonth = lastDay.getDate()

  const days = []
  const today = new Date()
  const isCurrentMonth = year === today.getFullYear() && month - 1 === today.getMonth()
  const todayDate = today.getDate()

  // 이전 달 날짜들
  const prevMonth = month === 1 ? 12 : month - 1
  const prevYear = month === 1 ? year - 1 : year
  const daysInPrevMonth = new Date(prevYear, prevMonth, 0).getDate()

  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    days.push({
      date: daysInPrevMonth - i,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
      completionRate: 0
    })
  }

  // 현재 달 날짜들
  for (let date = 1; date <= daysInMonth; date++) {
    days.push({
      date,
      isCurrentMonth: true,
      isToday: isCurrentMonth && date === todayDate,
      isSelected: selectedDate.value === date,
      completionRate: getCompletionRate(date, month, year)
    })
  }

  // 다음 달 날짜들
  const remainingDays = 42 - days.length
  for (let date = 1; date <= remainingDays; date++) {
    days.push({
      date,
      isCurrentMonth: false,
      isToday: false,
      isSelected: false,
      completionRate: 0
    })
  }

  return days
})

const selectedDateGoals = computed(() => {
  if (!selectedDate.value) return []

  return commonGoalsTemplate.value.map(goal => {
    const completion = dailyGoalCompletions.value.find(c =>
        c.date === selectedDate.value &&
        c.month === currentMonth.value &&
        c.year === currentYear.value &&
        c.goalId === goal.id
    )

    return {
      ...goal,
      completed: completion ? completion.completed : false
    }
  })
})

const selectedDateCompletionRate = computed(() => {
  if (!selectedDate.value) return 0
  return getCompletionRate(selectedDate.value, currentMonth.value, currentYear.value)
})

const goToPrevMonth = () => {
  if (currentMonth.value === 1) {
    currentMonth.value = 12
    currentYear.value--
  } else {
    currentMonth.value--
  }
  selectedDate.value = null
}

const goToNextMonth = () => {
  if (currentMonth.value === 12) {
    currentMonth.value = 1
    currentYear.value++
  } else {
    currentMonth.value++
  }
  selectedDate.value = null
}

const goToToday = () => {
  const today = new Date()
  currentYear.value = today.getFullYear()
  currentMonth.value = today.getMonth() + 1
  selectedDate.value = today.getDate()
}

const selectDate = (date: number) => {
  selectedDate.value = date
}
</script>

<style scoped>
.schedule-container {
  padding: 1rem;
  background: linear-gradient(to bottom right, #dbeafe, #fae8ff);
  min-height: calc(100vh - 128px);
  min-height: calc(var(--vh, 1vh) * 100 - 128px);
}
</style>