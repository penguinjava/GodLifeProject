<template>
  <div id="app">
    <DefaultLayout>
      <router-view />
    </DefaultLayout>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import DefaultLayout from './layouts/DefaultLayout.vue'

// 아이폰 뷰포트 높이 보정
onMounted(() => {
  const setVh = () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  setVh()
  window.addEventListener('resize', setVh)
  window.addEventListener('orientationchange', setVh)
})
</script>

<style>
/* CSS 변수 초기화 */
:root {
  --vh: 1vh;
}

/* 앱 전체 높이 보정 */
#app {
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
}

</style>