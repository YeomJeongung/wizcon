<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper/modules';

const swiperModules = [Pagination, Navigation];

const subslider = ref([
  {
    etitle : 'business1',
    ktitle : '비즈니스 네트워킹',
    img : '/src/assets/images/sample2.jpeg',
    contents : '여기에 글을 적어요. 어떤내용이 들어갈까요? 여기에 글을 적어요. 어떤내용이 들어갈까요? 여기에 글을 적어요. 어떤내용이 들어갈까요?'
  },
  {
    etitle : 'business2',
    ktitle : '비즈니스 네트워킹',
    img : '/src/assets/images/sample.jpg',
    contents : '여기에 글을 적어요. 어떤내용이 들어갈까요? 여기에 글을 적어요. 어떤내용이 들어갈까요? 여기에 글을 적어요. 어떤내용이 들어갈까요?'
  },
  {
    etitle : 'business3',
    ktitle : '비즈니스 네트워킹',
    img : '/src/assets/images/sample3.jpg',
    contents : '여기에 글을 적어요. 어떤내용이 들어갈까요? 여기에 글을 적어요. 어떤내용이 들어갈까요? 여기에 글을 적어요. 어떤내용이 들어갈까요?'
  }
  ,
  {
    etitle : 'business3',
    ktitle : '비즈니스 네트워킹',
    img : '/src/assets/images/sample3.jpg',
    contents : '여기에 글을 적어요. 어떤내용이 들어갈까요? 여기에 글을 적어요. 어떤내용이 들어갈까요? 여기에 글을 적어요. 어떤내용이 들어갈까요?'
  }
]);

//mouse 오버시 
const targets = ref([]);
const overEl = ref([]);
const targetIdxRef = ref(null);

const handleMouseMove = (event) => {
const targetIndex = targets.value.findIndex(target => target.contains(event.target));
overEl.value = false;
  if (targetIndex !== -1) {
    targetIdxRef.value = targetIndex;
  }
};
const handleMouseLeave = () => {
  targetIdxRef.value = null;
}

</script>
<template>
  <div class="box1-t contents flx-col flx-l">
      <h2 class="w2animation animation-duration-1000 animation-delay-500 animation-ease-in-out"
      v-animateonscroll.once="{ enterClass: 'fadeinleft opacity0', leaveClass: 'fadeoutleft opacity0' }"
      >
        <span class="red-line">사업안내</span>
      </h2>
      

      <div class="pdl11">
        <div class="font2-5 bold lineh w2animation animation-duration-1000 animation-delay-1000 animation-ease-in-out"
        v-animateonscroll.once="{ enterClass: 'fadeinleft opacity0', leaveClass: 'fadeoutleft opacity0' }"
        >
          협력과 지식 공유를 촉진하여<br />전반적인 산업 환경을 개선하겠습니다.
        </div>

        <div class="font1 mt3 color999 w2animation animation-duration-1000 animation-delay-1000 animation-ease-in-out"
        v-animateonscroll.once="{ enterClass: 'fadeinleft opacity0', leaveClass: 'fadeoutleft opacity0' }"
        >
          환경 친화적인 기술과 관행을 촉진하며, 사회적 책임을 다하는 기업 문화를 선도합니다.
        </div>
      </div>
  </div>


  <div class="box1-b nodrag subslider animation-duration-1000 animation-delay-1000 animation-ease-in-out"
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
          disableOnInteraction: false,
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
              <div :class="[targetIdxRef != idx ? 'off':'on','info-bottom']" >
                <span>{{ item.contents }}</span>
              </div>
              <div class="item" :style="`background-image: url(${ item.img })`"></div>
              <div ref="overEl" :class="[targetIdxRef != idx ? 'off':'on','overEl']"></div>
            </div>
          </swiper-slide>
        </template>
      </swiper>
      </div>
    </div>


</template>

<style scoped lang="scss">
</style>
