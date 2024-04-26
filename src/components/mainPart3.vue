<script setup>
import { ref, reactive } from 'vue'
const netitem = ref([
  {
    etitle: 'O2O 형태의 다양한 비즈니스 모델<br />적용/추진 가능',
    ktitle: ''
  },
  {
    etitle: '솔루션 도입으로 비즈니스/온라인 환경 구축 위한 비용 감소',
    ktitle: ''
  },
  {
    etitle: '‘빅데이터 기반 매칭 알고리즘’을 통한 높은 매칭 신뢰도 제공',
    ktitle: ''
  },
  {
    etitle: '플랫폼 사업 전반의 축적 경험 활용',
    ktitle: ''
  }
])

import image1 from '@/assets/images/icon_analyse.svg'
import image2 from '@/assets/images/icon_dollar.svg'
import image3 from '@/assets/images/icon_chart.svg'
import image4 from '@/assets/images/icon_handshake.svg'

const imgPath = [image1, image2, image3, image4]

//mouse 오버시
const targets = ref([])
const targetOffsets = reactive([])
const targetIdxRef = ref(0)
const mouseleaveOff = ref(true)

const handleMouseMove = (event) => {
  const targetIndex = targets.value.findIndex((target) => target.contains(event.target))
  mouseleaveOff.value = false
  if (targetIndex !== -1) {
    const parentElement = targets.value[targetIndex].parentNode
    const targetRect = targets.value[targetIndex].getBoundingClientRect()
    const relativeLeft = targetRect.left - parentElement.getBoundingClientRect().left
    targetOffsets[targetIndex] = relativeLeft
    targetIdxRef.value = targetIndex
  }
}
const handleMouseLeave = () => {
  mouseleaveOff.value = true
}
</script>
<template>
  <div class="part3-wrap box1">
    <div class="part3-txt flx-col flx-v">
      <h2
        class="flx-row flx-v flx-c w2animation animation-duration-1000 animation-delay-500 animation-ease-in-out"
        v-animateonscroll.once="{
          enterClass: 'fadeinleft opacity0',
          leaveClass: 'fadeoutleft opacity0'
        }"
      >
        <span class="red-line">WIZCON Matching Platform</span>
      </h2>

      <div
        class="flx-row flx-v flx-c font2-5 bold lineh w2animation animation-duration-1000 animation-delay-1000 animation-ease-in-out"
        v-animateonscroll.once="{
          enterClass: 'fadeinleft opacity0',
          leaveClass: 'fadeoutleft opacity0'
        }"
      >
        <span class="txt-center mt3"
          >위즈컨 W-Platform을 통한 최적의 플랫폼 서비스 구축으로<br />
          수요/공급 기반 매칭 비즈니스의 성공을 실현할 수 있습니다.</span
        >
      </div>
      <div
        class="flx-row flx-v flx-c font1 mt2 colorddd w2animation animation-duration-1000 animation-delay-1000 animation-ease-in-out"
        v-animateonscroll.once="{
          enterClass: 'fadeinleft opacity0',
          leaveClass: 'fadeoutleft opacity0'
        }"
      >
        <span class="txt-center"
          >온라인 및 O2O 비즈니스에 대한 요구사항을 효과적으로 지원하여 효율적인 사업 추진이 가능한
          빅데이터 기반의 매칭 플랫폼 입니다.</span
        >
      </div>
      <div
        class="nodrag blackbox flx-row animation-duration-1000 animation-delay-1000 animation-ease-in-out"
        v-animateonscroll.once="{ enterClass: 'fadein opacity0', leaveClass: 'fadeout opacity0' }"
        @mouseleave="handleMouseLeave"
      >
        <div
          :class="[mouseleaveOff ? 'off' : 'on', 'overEl2']"
          :style="{ left: targetOffsets[targetIdxRef] + 'px' }"
        ></div>
        <div
          ref="targets"
          @mousemove="handleMouseMove"
          class="item flx-col flx-v"
          v-for="(item, idx) in netitem"
          :key="idx"
        >
          <span class="icon">
            <img :src="`${imgPath[idx]}`" width="70" />
          </span>
          <div class="txt flx-col flx-v">
            <span v-if="item.etitle" v-html="item.etitle"></span>
            <span class="font1-5 bold" v-if="item.ktitle" v-html="item.ktitle"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="part3-visual"></div>
  </div>
</template>

<style scoped lang="scss"></style>
