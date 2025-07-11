
<script setup lang="ts">
interface Achievement {
  title: string
  date: string
  icon: string
}

interface Props {
  achievements?: Achievement[]
  showAll?: boolean
}

withDefaults(defineProps<Props>(), {
  achievements: () => [],
  showAll: false
})

defineEmits<{
  toggleShowAll: []
}>()
</script>

<template>
  <div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
    <h2 class="text-xl font-semibold mb-4 flex items-center">
      <span class="mr-2">🏆</span>
      달성한 목표
    </h2>
    <div v-if="achievements.length === 0" class="text-center py-8 text-gray-500">
      아직 달성한 목표가 없습니다 🎯
    </div>
    <div v-else class="space-y-3">
      <div
          v-for="(achievement, index) in achievements"
          :key="index"
          class="flex items-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl"
      >
        <span class="text-2xl mr-3">{{ achievement.icon }}</span>
        <div class="flex-1">
          <div class="font-medium text-gray-800">{{ achievement.title }}</div>
          <div class="text-sm text-gray-600">{{ achievement.date }}</div>
        </div>
      </div>

      <!-- 더보기/접기 버튼 - 부모에서 제어 -->
      <button
          v-if="achievements.length > 3"
          @click="$emit('toggleShowAll')"
          class="w-full py-3 font-medium transition-colors"
          :class="showAll ? 'text-gray-500 hover:text-gray-700' : 'text-blue-500 hover:text-blue-700'"
      >
        {{ showAll ? '접기' : `더보기 (${Math.max(0, achievements.length - 3)}개 더)` }}
      </button>
    </div>
  </div>
</template>