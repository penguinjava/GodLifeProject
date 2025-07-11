
<script setup lang="ts">
import { onMounted } from 'vue'
import Header from '@/components/Header.vue'
import TabBar from "@/components/TabBar.vue"

// 아이폰 뷰포트 높이 보정 및 상태바 처리
onMounted(() => {
  const setVh = () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  setVh()
  window.addEventListener('resize', setVh)
  window.addEventListener('orientationchange', setVh)

  // 아이폰 상태바 스크롤 방지
  document.body.style.position = 'fixed'
  document.body.style.width = '100%'
  document.body.style.height = '100%'
  document.body.style.overflow = 'hidden'
})
</script>

<template>
  <div class="app-container">
    <!-- 고정 헤더 -->
    <Header />

    <!-- 스크롤 가능한 메인 영역 -->
    <main class="main-content">
      <slot />
    </main>

    <!-- 고정 하단 탭바 -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
      <TabBar />
    </nav>
  </div>
</template>

<style scoped>
.app-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  background: white;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  /* 헤더 높이(64px) + 탭바 높이(64px) 제외 */
  height: calc(var(--vh, 1vh) * 100 - 128px);
  /* TabBar가 콘텐츠를 가리지 않도록 하단 패딩 추가 */
  padding-bottom: calc(64px + env(safe-area-inset-bottom, 16px));
}

/* 아이폰 스크롤바 숨김 */
.main-content::-webkit-scrollbar {
  display: none;
}
</style>