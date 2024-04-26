<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import ScrollTops from 'primevue/scrolltop'
import mainPart1 from './mainPart1.vue'
import mainPart2 from './mainPart2.vue'
import mainPart3 from './mainPart3.vue'
import mainPart4 from './mainPart4.vue'
import mainPart5 from './mainPart5.vue'

const scrollTop = ref(0)
const addTopbg = ref(false)
const mainRef = ref(null)
const businessRef = ref(null)
const platformRef = ref(null)
const worksRef = ref(null)
const scrollref = ref(null)
const handleScroll = () => {
  // 스크롤 이벤트 처리 로직
  scrollTop.value = document.documentElement.scrollTop || document.body.scrollTop
  if (scrollTop.value > 99) {
    addTopbg.value = true
  } else {
    addTopbg.value = false
  }
  //scroll시
  const refs = [mainRef, businessRef, platformRef, worksRef]
  const refNames = refs
    .map((ref) => {
      const element = ref.value // ref로부터 엘리먼트 가져오기
      return element ? element.id || null : null // 엘리먼트의 id 반환
    })
    .filter((name) => name !== null) // null이 아닌 값만 필터링

  let maxVisibleRatio = 0
  let maxVisibleIndex = -1

  refs.forEach((refItem, index) => {
    const element = refItem.value
    if (!element) return

    const rect = element.getBoundingClientRect()
    const elementHeight = rect.height
    const visibleHeight = Math.min(window.innerHeight, rect.bottom) - Math.max(0, rect.top)
    const visibleRatio = visibleHeight / elementHeight

    // 요소의 절반 이상이 화면에 보이면 이벤트 발생
    if (visibleRatio >= 0.5 && visibleRatio > maxVisibleRatio) {
      maxVisibleRatio = visibleRatio
      maxVisibleIndex = index
    }
  })
  if (maxVisibleIndex !== -1) {
    // 이벤트 처리
    if (scrollref.value !== refNames[maxVisibleIndex]) {
      toggleActive(refNames[maxVisibleIndex])
    }
    scrollref.value = refNames[maxVisibleIndex]
  }
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  toggleActive('main')
  scrollref.value = 'main'
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

//새로고침시 스크롤 위치
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

//토글 클래스
const isActive = ref({
  main: false,
  business: false,
  platform: false,
  works: false
})
const isActiveName = ref(null)

const toggleActive = (itemName, event) => {
  isActiveName.value = itemName
  isActive.value = {
    ...Object.fromEntries(
      Object.entries(isActive.value).map(([key, value]) => [key, key === itemName])
    )
  }

  if (event === 'click') {
    const targetElement = document.querySelector(`#${itemName}`)
    const targetOffsetTop = targetElement.offsetTop - 96
    window.scrollTo({
      top: targetOffsetTop,
      behavior: 'smooth' // 부드러운 스크롤을 위해 smooth 속성 사용
    })
  }
}
</script>
<template>
  <ScrollTops />
  <div class="top-fixed nodrag">
    <div class="logo">
      <div class="flx-row defpd flx-v h100">
        <h1
          class="animation-duration-1000 animation-ease-in-out"
          v-animateonscroll.once="{
            enterClass: 'fadeinleft opacity0',
            leaveClass: 'fadeoutleft opacity0'
          }"
        >
          <img src="@/assets/images/logo.svg" alt="logo" />
        </h1>
        <ul class="menu flx-row gap3 font1 flx-v w100 flx-c" role="list">
          <li @click="toggleActive('main', 'click')" :class="{ on: isActive.main }">MAIN</li>
          <li @click="toggleActive('business', 'click')" :class="{ on: isActive.business }">
            BUSINESS
          </li>
          <li @click="toggleActive('platform', 'click')" :class="{ on: isActive.platform }">
            PLATFORM
          </li>
          <li @click="toggleActive('works', 'click')" :class="{ on: isActive.works }">WORKS</li>
        </ul>
      </div>
    </div>
    <div :class="[addTopbg ? 'on' : 'off', 'blur']"></div>
  </div>
  <div class="h100">
    <div ref="mainRef" id="main" class="h100 slider-wrap nodrag">
      <mainPart1 />
    </div>
    <div ref="businessRef" id="business" class="box-white">
      <mainPart2 />
    </div>
    <div ref="platformRef" id="platform">
      <mainPart3 />
    </div>
    <div ref="worksRef" id="works" class="box-white">
      <mainPart4 />
    </div>
    <div>
      <mainPart5 />
    </div>
  </div>
</template>

<style scoped></style>
