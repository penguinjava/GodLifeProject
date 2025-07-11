<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 pb-24">
    <ProfileHeader
        :name="profileData.name"
        :description="profileData.description"
        @edit-profile="handleEditProfile"
    />
    <LevelSection
        :current-level="levelData.currentLevel"
        :level-title="levelData.levelTitle"
        :total-exp="levelData.totalExp"
        :current-exp="levelData.currentExp"
        :next-level-exp="levelData.nextLevelExp"
        :exp-percentage="levelData.expPercentage"
    />
    <AchievementSection
        :achievements="displayedAchievements"
        :show-all="showAllAchievements"
        @toggle-show-all="toggleAchievements"
    />
    <ScoreGuide />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ProfileHeader from '@/components/profile/ProfileHeader.vue'
import LevelSection from '@/components/profile/LevelSection.vue'
import AchievementSection from '@/components/profile/AchievementSection.vue'
import ScoreGuide from '@/components/profile/ScoreGuide.vue'

// TODO: 이 데이터들은 API에서 받아올 예정
const profileData = ref({
  name: '갓생러',
  description: '매일 성장하는 중 🌱'
})

const levelData = ref({
  currentLevel: 5,
  levelTitle: '갓생 실천가',
  totalExp: 142,
  currentExp: 22,
  nextLevelExp: 80,
  expPercentage: 27.5
})

const achievements = ref([
  // 샘플 데이터 - API로 교체될 예정
])

// UI 상태
const showAllAchievements = ref(false)

const displayedAchievements = computed(() => {
  return showAllAchievements.value ? achievements.value : achievements.value.slice(0, 3)
})

// 메서드
const handleEditProfile = () => {
  // TODO: 프로필 수정 모달 또는 페이지로 이동
  console.log('프로필 수정 요청')
}

const toggleAchievements = () => {
  showAllAchievements.value = !showAllAchievements.value
}
</script>