<script setup>
//import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'

const swiperModules = [Autoplay, Pagination, Navigation]

const onSwiper = () => {
  //
}

const onSlideChange = () => {
  //
}
</script>
<template>
  <div class="defpd">
    <div class="part1-txt">
      <div
        class="txtsh font1 mb2 w2animation animation-duration-1000 animation-delay-500 animation-ease-in-out"
        v-animateonscroll.once="{ enterClass: 'fadeinleft opacity0', leaveClass: 'fadeoutleft' }"
      >
        DREAM IT! MAKE IT HAPPEN
      </div>
      <div class="lineh0">
        <div
          class="txtsh font4 bold lineh w2animation animation-duration-1000 animation-delay-1000 animation-ease-in-out"
          v-animateonscroll.once="{ enterClass: 'fadeinleft opacity0', leaveClass: 'fadeoutleft' }"
        >
          WELCOME TO
        </div>
        <div
          class="txtsh font7 bold red bold8 w2animation animation-duration-1000 animation-delay-1200 animation-ease-in-out"
          v-animateonscroll.once="{ enterClass: 'fadeinleft opacity0', leaveClass: 'fadeoutleft' }"
        >
          WIZCON
        </div>
      </div>
      <div
        class="txtsh colordb font1 mt2 w2animation animation-duration-1000 animation-delay-1500 animation-ease-in-out"
        v-animateonscroll.once="{ enterClass: 'fadeinleft opacity0', leaveClass: 'fadeoutleft' }"
      >
        위즈컨은 스마트 단말 제조 및 B2C2B 온라인 서비스를 제공하는 기업에서 10년 이상 서비스기획과
        개발, 사업화를 추진해 온 핵심 인력과<br />
        굴지의 IT 서비스 회사에서 다양한 산업 전반에 걸친 정보시스템 컨설팅 및 구축 경험을 보유한 IT
        Specialist들이 모여 설립한 회사입니다.
      </div>
    </div>
  </div>
  <swiper
    :slides-per-view="1"
    :space-between="0"
    :speed="1000"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    :pagination="{
      /*
      clickable: true,
      renderBullet: function (index, className) {
        return `<span class='${className} custom_blul1' data='${index}'></span>`
      }
      */
      type: 'progressbar'
    }"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false
    }"
    :modules="swiperModules"
    class="h100vh works_p_slider"
  >
    <swiper-slide>
      <div class="h100 visual-img img1"></div>
    </swiper-slide>
    <swiper-slide>
      <div class="h100 visual-img img2"></div>
    </swiper-slide>
    <swiper-slide>
      <div class="h100 visual-img img3"></div>
    </swiper-slide>
  </swiper>
</template>

<style scoped lang="scss"></style>
