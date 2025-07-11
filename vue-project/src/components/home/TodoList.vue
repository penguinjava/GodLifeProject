
<script setup lang="ts">
import { ref } from 'vue'

interface TodoItem {
  id: number
  title: string
  description: string
  icon: string
  completed: boolean
}

// 샘플 데이터 - 읽기 전용
const todos = ref<TodoItem[]>([
  {
    id: 1,
    title: '성경읽기',
    description: '매일 1장씩',
    icon: '📖',
    completed: true
  },
  {
    id: 2,
    title: '기도하기',
    description: '아침, 저녁 기도',
    icon: '🙏',
    completed: false
  },
  {
    id: 3,
    title: '운동하기',
    description: '30분 이상',
    icon: '💪',
    completed: true
  },
  {
    id: 4,
    title: '감사일기',
    description: '감사한 일 3가지',
    icon: '✨',
    completed: false
  }
])
</script>

<template>
  <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
    <h3 class="text-lg font-semibold mb-4 flex items-center">
      <span class="mr-2">📋</span>
      오늘의 할일
    </h3>

    <div v-if="todos.length === 0" class="text-center py-8 text-gray-500">
      <span class="block text-4xl mb-2">🌟</span>
      <p>오늘 할일이 없습니다</p>
    </div>

    <div v-else class="space-y-3">
      <div
          v-for="todo in todos"
          :key="todo.id"
          class="flex items-center p-3 rounded-xl"
          :class="todo.completed ? 'bg-green-50' : 'bg-gray-50'"
      >
        <!-- 아이콘 또는 체크 표시 -->
        <div class="flex items-center justify-center w-8 h-8 rounded-full mr-3"
             :class="todo.completed ? 'bg-green-500' : 'bg-gray-300'">
          <span v-if="todo.completed" class="text-white text-sm">✓</span>
          <span v-else class="text-lg">{{ todo.icon }}</span>
        </div>

        <!-- 내용 -->
        <div class="flex-1">
          <div class="font-medium"
               :class="todo.completed ? 'line-through text-gray-600' : 'text-gray-800'">
            {{ todo.title }}
          </div>
          <div class="text-sm text-gray-500">{{ todo.description }}</div>
        </div>

        <!-- 상태 표시 -->
        <div class="text-xs font-medium px-2 py-1 rounded-full"
             :class="todo.completed
               ? 'bg-green-100 text-green-700'
               : 'bg-gray-100 text-gray-600'">
          {{ todo.completed ? '완료' : '진행중' }}
        </div>
      </div>
    </div>
  </div>
</template>