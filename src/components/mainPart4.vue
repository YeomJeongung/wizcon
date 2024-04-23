<script setup>
import { ref, onMounted } from 'vue'
import Image from 'primevue/image'
import Dialog from 'primevue/dialog'

import noimg from '@/assets/images/logo.svg'

const detailContents = ref('')
const detailTitle = ref('')
const dialogVisible = ref(false)
const detailDialog = (detail, title) => {
  const detailJson = JSON.parse(detail)
  if (detailJson?.text != '') {
    dialogVisible.value = true
    detailContents.value = detailJson?.text
    detailTitle.value = title
  }
}

//monday 연동
/*
query {
    boards(ids: 1857731749) 
    { name state permissions items_page { items 
      {
        name
        column_values {
          id
          value
        }
        assets {
          id
          url
          name
          public_url
        }
      }
    }}
  }
*/
const query = `
query {
    boards(ids: 1857731749) 
    { name state permissions 
      items_page {
      items 
      {
        name
        group {
          id
          title
        }
        column_values {
          id
          value
        }
        assets {
          id
          url
          name
          public_url
        }
      }
    }}
  }
`

const items = ref([])
onMounted(() => {
  fetch('https://api.monday.com/v2', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjM0OTMyMDc4NiwiYWFpIjoxMSwidWlkIjo1NzEyODc1NywiaWFkIjoiMjAyNC0wNC0xOVQwMToxNzozNS4wNTBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjE3MzU2NDQsInJnbiI6ImFwc2UyIn0.DYngEzESkkGDmr1t_YXSvJhoFCKQC7DpeSXQs0XgUNw'
    },
    body: JSON.stringify({
      query: query
    })
  })
    .then((res) => res.json())
    .then((res) => {
      items.value = res.data.boards[0].items_page
    })
})

const returnJsonData = (data, target) => {
  let json = JSON.parse(data)
  if (json && json[target]) {
    return json[target]
  } else {
    return ''
  }
}
const returnJsonDataFile = (data) => {
  let json = JSON.parse(data)
  if (json && json.files.length >= 1) {
    return true
  } else {
    return false
  }
}

const returnJsonDataFile2 = (data, target) => {
  let json = data[0]
  if (json && json[target]) return json[target]
}
</script>
<template>
  <div class="box1 contents flx-col flx-l">
    <h2
      class="w2animation animation-duration-1000 animation-delay-500 animation-ease-in-out"
      v-animateonscroll.once="{
        enterClass: 'fadeinleft opacity0',
        leaveClass: 'fadeoutleft opacity0'
      }"
    >
      <span class="red-line">사업안내</span>
    </h2>

    <div class="pdl11">
      <div
        class="font2-5 bold lineh w2animation animation-duration-1000 animation-delay-1000 animation-ease-in-out"
        v-animateonscroll.once="{
          enterClass: 'fadeinleft opacity0',
          leaveClass: 'fadeoutleft opacity0'
        }"
      >
        협력과 지식 공유를 촉진하여<br />전반적인 산업 환경을 개선하겠습니다.
      </div>

      <div
        class="font1 mt3 color999 w2animation animation-duration-1000 animation-delay-1000 animation-ease-in-out"
        v-animateonscroll.once="{
          enterClass: 'fadeinleft opacity0',
          leaveClass: 'fadeoutleft opacity0'
        }"
      >
        환경 친화적인 기술과 관행을 촉진하며, 사회적 책임을 다하는 기업 문화를 선도합니다.
      </div>
    </div>
    <div
      class="w100 animation-duration-1000 animation-delay-1000 animation-ease-in-out"
      v-animateonscroll.once="{ enterClass: 'fadein opacity0', leaveClass: 'fadeout opacity0' }"
    >
      <div class="webzins flx-row flx-wrap gap3">
        <template v-for="(item, idx) in items" :key="idx">
          <div
            class="item flx-row flx-v gap2"
            style="width: calc(50% - 1.5rem)"
            v-for="(itemIn, idxs) in item"
            :key="idxs"
          >
            <div class="img">
              <template v-if="returnJsonDataFile(itemIn.column_values[4].value) == true">
                <Image
                  :src="`${returnJsonDataFile2(itemIn.assets, 'public_url')}`"
                  alt="Image"
                  preview
                />
              </template>
              <template v-else>
                <div class="noimg">
                  <Image :src="noimg" alt="Image" />
                </div>
              </template>
            </div>
            <div class="info flx-col h100">
              <span class="red mb1 txtline t_1">{{
                returnJsonData(itemIn.column_values[2].value, 'date')
              }}</span>
              <template v-if="itemIn.column_values[3].value == null">
                <h3 :class="['font1-5 mb1 txtline t_2']">
                  {{ itemIn.name }}
                </h3>
              </template>
              <h3
                v-else
                :class="[
                  'font1-5 mb1 txtline t_2',
                  JSON.parse(itemIn.column_values[3].value)?.text != '' ? 'hand' : ''
                ]"
                @click="detailDialog(itemIn.column_values[3].value, itemIn.name)"
                v-tooltip.top="{
                  value: JSON.parse(itemIn.column_values[3].value)?.text != '' ? 'Detail' : '',
                  pt: {
                    arrow: {
                      style: {
                        borderTopColor: '#ef4136'
                      }
                    },
                    text: 'bgred'
                  }
                }"
              >
                {{ itemIn.name }}
              </h3>
              <div class="color999 txtline t_3">
                {{ itemIn.column_values[1].value.replace(/"/g, '') }}
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <br />

    <Dialog
      v-model:visible="dialogVisible"
      maximizable
      modal
      :header="detailTitle"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <pre>{{ detailContents }}</pre>
    </Dialog>
  </div>
</template>

<style scoped></style>
