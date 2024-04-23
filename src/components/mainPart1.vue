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
        class="font1 mb2 w2animation animation-duration-1000 animation-delay-500 animation-ease-in-out"
        v-animateonscroll.once="{ enterClass: 'fadeinleft opacity0', leaveClass: 'fadeoutleft' }"
      >
        DREAM IT! MAKE IT HAPPEN
      </div>
      <div
        class="font3-5 bold lineh w2animation animation-duration-1000 animation-delay-1000 animation-ease-in-out"
        v-animateonscroll.once="{ enterClass: 'fadeinleft opacity0', leaveClass: 'fadeoutleft' }"
      >
        WELCOME TO
      </div>
      <div
        class="font3-5 bold red bold8 w2animation animation-duration-1000 animation-delay-1200 animation-ease-in-out"
        v-animateonscroll.once="{ enterClass: 'fadeinleft opacity0', leaveClass: 'fadeoutleft' }"
      >
        WIZCON
      </div>
      <div
        class="font1 mt2 w2animation animation-duration-1000 animation-delay-1500 animation-ease-in-out"
        v-animateonscroll.once="{ enterClass: 'fadeinleft opacity0', leaveClass: 'fadeoutleft' }"
      >
        회원들의 전문적 지식과 기술을 향상시키고, 지속 가능한 사회 발전을 위한 노력을 기울이고
        있습니다.
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
      clickable: true,
      renderBullet: function (index, className) {
        return `<span class='${className} custom_blul1' data='${index}'></span>`
      }
    }"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false
    }"
    :modules="swiperModules"
    class="h100vh"
  >
    <swiper-slide>
      <div class="h100 visual-img img1"></div>
    </swiper-slide>
    <swiper-slide>
      <div class="h100 visual-img img2"></div>
    </swiper-slide>
  </swiper>
</template>

<style scoped lang="scss"></style>
