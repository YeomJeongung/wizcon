<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation } from 'swiper/modules'

const swiperModules = [Pagination, Navigation]

const subslider = ref([
  {
    etitle: '‘매칭 플랫폼’ 및 통합 인증 서비스 구축/유지보수',
    ktitle: '플랫폼 Business',
    contents:
      '교육, 레슨, 채용, 의료, 사무 등의 다양한 분야에서 위즈컨 ‘매칭 플랫폼’이 활용된 플랫폼 비즈니스를 실현하고 있으며, ‘Keycloak’ 솔루션 통해 SSO/인증 구현과 개인정보보호, 위치정보보호법을 준수한 통한 통합 인증 서비스를 구축/유지보수합니다.'
  },
  {
    etitle: 'IT 컨설팅, 시스템 통합, 시스템 운영',
    ktitle: 'SI/SM Business',
    contents:
      '웹/앱 환경에서의 AS, 쇼핑몰, 챗봇 등 대고객 B2C 서비스 개발 및 유지보수를 전문으로, 서비스 기획, 디자인, 퍼블리싱부터 개발까지 모든 단계를 자사 인력으로 보유하고 있어 고객의 요구를 신속하게 반영할 수 있습니다.<br /><br />또한, 고객사가 보유한 시스템을 위즈컨으로 이관하거나 고객사 내부 시스템 운영을 위해 자사와 협력사, 프리랜서를 파견하여 최상의 서비스를 제공합니다.'
  },
  {
    etitle: '기획 및 퍼블리싱, Front/Back-end 개발 기술 보유',
    ktitle: '보유 기술',
    contents: `
    <ul class="liststyle">
      <li>서비스 기획 및 UI/UX, 퍼블리싱 • 프로그래밍</li>
      <li>프로그래밍
        <ol>
          <li>Front : Vue.js, Java Script, jQuery 포함</li>
          <li>Server : Spring 기반 프레임워크(전자정부프레임워크 등), Spring Boot 등</li>
          <li>기타 : Node.js, Express.js</li>
          <li>앱 : Hybird 앱개발</li>
        </ol>  
      </li>
      <li>Database : Oracle, MS-SQL, MariaDB, mySQL 등</li>
      <li>TA, AA</li>
    </ul>
    `
  }
])

import image1 from '@/assets/images/business_01.jpg'
import image2 from '@/assets/images/business_02.jpg'
import image3 from '@/assets/images/business_03.jpg'

const imgPath = [image1, image2, image3]

//mouse 오버시
const targets = ref([])
const overEl = ref([])
const targetIdxRef = ref(null)

const handleMouseMove = (event) => {
  const targetIndex = targets.value.findIndex((target) => target.contains(event.target))
  overEl.value = false
  if (targetIndex !== -1) {
    targetIdxRef.value = targetIndex
  }
}
const handleMouseLeave = () => {
  targetIdxRef.value = null
}
</script>
<template>
  <div class="box1-t contents flx-col flx-l">
    <h2
      class="w2animation animation-duration-500 animation-ease-in-out"
      v-animateonscroll.once="{
        enterClass: 'fadeinleft opacity0',
        leaveClass: 'fadeoutleft opacity0'
      }"
    >
      <span class="red-line">BUSINESS</span>
    </h2>

    <div class="pdl11">
      <div
        class="font2-3 bold lineh w2animation animation-duration-500 animation-ease-in-out"
        v-animateonscroll.once="{
          enterClass: 'fadeinleft opacity0',
          leaveClass: 'fadeoutleft opacity0'
        }"
      >
        온라인 매칭 플랫폼 활용한 사업 추진 및<br />B2C 시스템 구축/유지보수에 전문화된 역량을
        가지고 있습니다.
      </div>

      <div
        class="font1 mt3 color999 w2animation animation-duration-500 animation-ease-in-out"
        v-animateonscroll.once="{
          enterClass: 'fadeinleft opacity0',
          leaveClass: 'fadeoutleft opacity0'
        }"
      >
        다양한 산업 전반에 걸친 정보시스템 컨설팅 및 구축 경험을 보유하였습니다.
      </div>
    </div>
  </div>

  <div
    class="box1-b nodrag subslider animation-duration-500 animation-ease-in-out"
    v-animateonscroll.once="{ enterClass: 'fadein opacity0', leaveClass: 'fadeout opacity0' }"
  >
    <div @mouseleave="handleMouseLeave">
      <swiper
        :slides-per-view="3"
        :space-between="0"
        :speed="500"
        :navigation="true"
        :autoplay="{
          delay: 3500,
          disableOnInteraction: false
        }"
        class=""
        :modules="swiperModules"
      >
        <template v-for="(item, idx) in subslider" :key="idx">
          <swiper-slide>
            <div class="item-wrap" ref="targets" @mousemove="handleMouseMove">
              <div class="info">
                <h3>{{ item.ktitle }}</h3>
                <span>{{ item.etitle }}</span>
              </div>
              <div :class="[targetIdxRef != idx ? 'off' : 'on', 'info-bottom']">
                <span v-html="item.contents"></span>
              </div>
              <div class="item" :style="`background-image: url(${imgPath[idx]})`"></div>
              <div ref="overEl" :class="[targetIdxRef != idx ? 'off' : 'on', 'overEl']"></div>
            </div>
          </swiper-slide>
        </template>
      </swiper>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
