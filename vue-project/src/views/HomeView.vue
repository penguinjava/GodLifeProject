<template>
  <div class="home-container">
    <!-- 상단 콘텐츠 -->
    <div class="space-y-4">
      <DailyQuote />
      <DailyStats />
    </div>

    <!-- 메인 콘텐츠 -->
    <div class="space-y-6 mt-6 pb-4">
      <TodoList />
      <GoalButton />
    </div>
  </div>
</template>

<script setup lang="ts">
import DailyQuote from '@/components/home/DailyQuote.vue'
import DailyStats from '@/components/home/DailyStats.vue'
import TodoList from '@/components/home/TodoList.vue'
import GoalButton from '@/components/home/GoalButton.vue'
</script>

<style scoped>
.home-container {
  padding: 1rem;
  background: linear-gradient(to bottom right, #dbeafe, #fae8ff);
  min-height: calc(100vh - 128px);
  min-height: calc(var(--vh, 1vh) * 100 - 128px);
}
</style>