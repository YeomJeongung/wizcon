<script setup>
import { ref, reactive } from 'vue';
const netitem = ref([
  {
    etitle : 'DEVELOPMENT AND NETWORKING',
    ktitle : '비즈니스 네트워킹',
    img : '/src/assets/images/icon.svg'
  },
  {
    etitle : 'TRAINING PROGRAMS',
    ktitle : '교육 및 훈련 프로그램',
    img : '/src/assets/images/icon.svg'
  },
  {
    etitle : 'PROVISION OF DATA',
    ktitle : '정보 및 자료 제공',
    img : '/src/assets/images/icon.svg'
  }
]);

//mouse 오버시 
const targets = ref([]);
const targetOffsets = reactive([]);
const targetIdxRef = ref(0);
const mouseleaveOff = ref(true);

const handleMouseMove = (event) => {
const targetIndex = targets.value.findIndex(target => target.contains(event.target));
mouseleaveOff.value = false;
  if (targetIndex !== -1) {
    const parentElement = targets.value[targetIndex].parentNode;
    const targetRect = targets.value[targetIndex].getBoundingClientRect();
    const relativeLeft = targetRect.left - parentElement.getBoundingClientRect().left;
    targetOffsets[targetIndex] = relativeLeft;
    targetIdxRef.value = targetIndex;
  }
};
const handleMouseLeave = () => {
  mouseleaveOff.value = true;
}
</script>
<template>
  <div class="part3-wrap box1">
    <div class="part3-txt flx-col flx-v">
      <h2 class="flx-row flx-v flx-c w2animation animation-duration-1000 animation-delay-500 animation-ease-in-out"
      v-animateonscroll.once="{ enterClass: 'fadeinleft opacity0', leaveClass: 'fadeoutleft opacity0' }"
      >
        <span class="red-line">서비스분야</span>
      </h2>

      <div class="flx-row flx-v flx-c font2-5 bold lineh w2animation animation-duration-1000 animation-delay-1000 animation-ease-in-out"
        v-animateonscroll.once="{ enterClass: 'fadeinleft opacity0', leaveClass: 'fadeoutleft opacity0' }"
        >
          <span class="txt-center mt3">협력과 지식 공유를 촉진하여<br />전반적인 산업 환경을 개선하겠습니다.</span>
        </div>
        <div class="flx-row flx-v flx-c font1 mt2 colorddd w2animation animation-duration-1000 animation-delay-1000 animation-ease-in-out"
        v-animateonscroll.once="{ enterClass: 'fadeinleft opacity0', leaveClass: 'fadeoutleft opacity0' }"
        >
        <span class="txt-center">환경 친화적인 기술과 관행을 촉진하며, 사회적 책임을 다하는 기업 문화를 선도합니다.</span>
      </div>
      <div class="nodrag blackbox flx-row animation-duration-1000 animation-delay-1000 animation-ease-in-out"
      v-animateonscroll.once="{ enterClass: 'fadein opacity0', leaveClass: 'fadeout opacity0' }"
      @mouseleave="handleMouseLeave"
      >
        <div :class="[mouseleaveOff ? 'off':'on','overEl2']" :style="{ left:  targetOffsets[targetIdxRef] + 'px'}"></div>
        <div ref="targets" @mousemove="handleMouseMove" class="item flx-col flx-v" v-for="(item, idx) in netitem" :key="idx">
          <span class="icon">
            <img :src="`${ item.img }`" width="70" />
          </span>
          <div class="txt flx-col flx-v">
            <span>{{ item.etitle }}</span>
            <span class="font1-5 bold">{{ item.ktitle }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="part3-visual"></div>
  </div>
</template>

<style scoped lang="scss">
</style>
