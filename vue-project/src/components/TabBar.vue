
<script setup lang="ts">
// 왼쪽 메뉴 - 일정
const leftNavItem = {
  icon: 'images/scheduleButton.png',
  to: '/schedule'
}

// 오른쪽 메뉴
const rightNavItem = {
  icon: 'images/profileButton.png',
  to: '/profile'
}
</script>

<template>
  <div class="relative flex items-center justify-between h-16 bg-white border-t border-gray-200 px-8">
    <!-- 왼쪽 메뉴 -->
    <router-link
        :to="leftNavItem.to"
        class="flex items-center justify-center py-2 transition-colors duration-200 hover:scale-105"
    >
      <div class="w-16 h-16">
        <img :src="leftNavItem.icon" alt="schedule" class="w-full h-full object-contain"/>
      </div>
    </router-link>

    <!-- 중앙 홈 버튼 (위로 올라감) -->
    <div class="absolute left-1/2 transform -translate-x-1/2 -top-8">
      <router-link
          to="/"
          class="flex items-center justify-center w-22 h-22 bg-white border-4 border-sky-400 rounded-full shadow-lg transition-all duration-200 hover:scale-105 hover:border-sky-500"
      >
        <img src="/images/homeButton.png" alt="home" class="w-20 h-20 object-contain"/>
      </router-link>
    </div>

    <!-- 오른쪽 메뉴 -->
    <router-link
        :to="rightNavItem.to"
        class="flex items-center justify-center py-2 transition-colors duration-200 hover:scale-105"
    >
      <div class="w-16 h-16">
        <img :src="rightNavItem.icon" alt="profile" class="w-full h-full object-contain"/>
      </div>
    </router-link>
  </div>
</template>