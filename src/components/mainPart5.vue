<template>
  <Loading v-if="loading" />
  <ConfirmDialog group="headless">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="flex flx-col p-5">
        <span class="font-bold font1 block mb-2">{{ message.header }}</span>
        <p class="mb-0 pdr5 font0-5">{{ message.message }}</p>
        <div class="flex flx-c-e gap-2 mt-4">
          <Button
            v-if="message.rejectLabel !== ''"
            :label="message.rejectLabel"
            outlined
            @click="rejectCallback"
            class="w-[8rem] c-btn-gray font0-5"
          ></Button>
          <Button
            :label="message.acceptLabel"
            @click="acceptCallback"
            class="w-[8rem] c-btn-red font0-5"
          ></Button>
        </div>
      </div>
    </template>
  </ConfirmDialog>

  <Sidebar v-model:visible="qnaVisible" class="p-sidebar-md">
    <template #header>
      <div class="flex align-items-center gap-2">
        <span class="font-bold">Customer Inquiry</span>
      </div>
    </template>
    <div>
      <h3>제목</h3>
      <div class="flex flex-column gap-2">
        <label for="title"></label>
        <InputText
          id="title"
          v-model="itemNameTxt.value.value"
          @input="itemNameTxt.validate"
          placeholder=""
          aria-describedby="title-help"
        />
        <small id="title-help">{{ itemNameTxt.error.value }}</small>
      </div>
      <h3 class="mt1">문의 내용</h3>
      <div class="flex flex-column gap-2">
        <label for="cont"></label>
        <Textarea
          id="cont"
          aria-describedby="cont-help"
          v-model="longTextTxt.value.value"
          @input="longTextTxt.validate"
          rows="10"
          cols="30"
          placeholder=""
        />
        <small id="cont-help">{{ longTextTxt.error.value }}</small>
      </div>
      <h3 class="mt1">E-mail</h3>
      <div class="flex flex-column gap-2">
        <label for="email"></label>
        <InputText
          id="email"
          v-model="emailTxt.value.value"
          @input="emailTxt.validate"
          placeholder=""
          aria-describedby="email-help"
        />
        <small id="email-help" style="margin-bottom: 0.5rem">{{ emailTxt.error.value }}</small>
      </div>
      <div class="font0-5 color999">
        WIZCON에서는 개인정보를 수집하지 않습니다. 문의하기를 통해 제공된 이메일 주소는 주로 연락을
        위한 목적으로 사용되며, Monday.com의 서비스를 통해 안전하게 보관됩니다. 또한, 고객 요청이
        있을 시 이메일 주소는 바로 삭제됩니다.
      </div>
    </div>

    <div class="flex flex-column align-items-center mt2">
      <Button @click="confirm1()" class="c-btn-red" label="문의하기"></Button>
    </div>
  </Sidebar>
  <div class="copy">
    <div class="copy-menu">
      <div class="contents flx-row flx-bet flx-v">
        <button
          class="qna norbtn colorfff bgred h100 font1 flx-row flx-c flx-v gap0-5"
          @click="qnaVisible = true"
        >
          <span>문의하기</span>
        </button>
        <div class="copy-menu-items flx-row">
          <div class="item">© 2024 WIZCON. All rights reserved.</div>
        </div>
      </div>
    </div>
    <div class="contents">
      <div class="box1 copy-right flx-row gap3 flx-v-t">
        <div class="copy-logo flx-sh flx-col flx-v">
          <img src="@/assets/images/logo.svg" alt="logo" width="150" />
        </div>
        <div class="w100 font0-5 lineh2">
          서울특별시 마포구 만리재로 83, 나경빌딩 12F(공덕동 115-62)<br />
          사업자 번호 : 830-86-00588 상호 : 위즈컨 대표 : 박정수<br />
          고객센터 : 070-8802-4200 팩스 : 02-701-9531 이메일 : wizcon@wiz-con.com
        </div>
        <div class="font0-5 w30">
          <h3 class="font1 colorfff">Contact us</h3>
          <div class="font2 red bold mt1">070-8802-4200</div>
          <div class="lineh2 mt1">
            Fax : 02-701-9531<br />
            Email : wizcon@wiz-con.com
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Sidebar from 'primevue/sidebar'
import { useConfirm } from 'primevue/useconfirm'
import ConfirmDialog from 'primevue/confirmdialog'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import { useValidation } from '../assets/js/useValidation'
import Loading from './loading.vue'
const confirm = useConfirm()
const loading = ref(false)
const confirm1 = () => {
  confirm.require({
    group: 'headless',
    message: '작성하신 내용으로 문의하시겠습니까?',
    header: 'Customer Inquiry',
    rejectClass: 'c-btn-gray',
    acceptClass: 'c-btn-red',
    rejectLabel: '취소',
    acceptLabel: '문의하기',
    accept: () => {
      if (itemNameTxt.isValid.value && emailTxt.isValid.value && longTextTxt.isValid.value) {
        loading.value = true
        qnaQuery()
      } else {
        // 유효하지 않은 필드에 p-invalid 클래스 추가
        if (!itemNameTxt.isValid.value) {
          itemNameTxt.validate()
        }
        if (!emailTxt.isValid.value) {
          emailTxt.validate()
        }
        if (!longTextTxt.isValid.value) {
          longTextTxt.validate()
        }
      }
    },
    reject: () => {
      //
    }
  })
}

const today = new Date()
const year = today.getFullYear() // 년도
const month = today.getMonth() + 1 // 월
const date = today.getDate() // 날짜
const setdate = `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`

const qnaVisible = ref(false)
const boardId = '1865416115' // 보드의 고유 ID

const itemNameTxt = useValidation('', (value) => {
  return value ? '' : '제목은 필수 입니다.'
})
const longTextTxt = useValidation('', (value) => {
  return value ? '' : '내용은 필수 입니다.'
})
const emailTxt = useValidation('', (value) => {
  if (!value) {
    return '이메일은 필수 입니다.'
  } else {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : '이메일이 아닙니다.'
  }
})

// Monday.com API 엑세스 토큰
const accessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjM0OTMyMDc4NiwiYWFpIjoxMSwidWlkIjo1NzEyODc1NywiaWFkIjoiMjAyNC0wNC0xOVQwMToxNzozNS4wNTBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjE3MzU2NDQsInJnbiI6ImFwc2UyIn0.DYngEzESkkGDmr1t_YXSvJhoFCKQC7DpeSXQs0XgUNw'

const qnaQuery = () => {
  const itemName = itemNameTxt.value.value
  const columnValues = {
    long_text: longTextTxt.value.value,
    text5: emailTxt.value.value,
    date4: setdate
  }

  // GraphQL 쿼리 문자열
  const query = `
      mutation CreateItem($boardId: ID!, $itemName: String!, $columnValues: JSON!) {
        create_item(
          board_id: $boardId,
          item_name: $itemName,
          column_values: $columnValues
        ) {
          id
        }
      }
    `

  // GraphQL 변수
  const variables = {
    boardId: boardId,
    itemName: itemName,
    columnValues: JSON.stringify(columnValues)
  }

  // Monday.com API 엔드포인트
  const apiUrl = 'https://api.monday.com/v2'

  // GraphQL 요청 보내기
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken
    },
    body: JSON.stringify({
      query: query,
      variables: variables
    })
  })
    .then((response) => response.json())
    .then((data) => {
      confirm.require({
        group: 'headless',
        message: '문의가 등록되었습니다.',
        header: 'Customer Inquiry',
        rejectClass: 'c-btn-gray dpnone',
        acceptClass: 'c-btn-red',
        rejectLabel: '',
        acceptLabel: '확인',
        accept: () => {
          qnaReset()
        },
        reject: () => {
          qnaReset()
        }
      })
    })
    .catch((error) => {
      //console.error('항목을 생성하는 동안 오류가 발생했습니다.', error)
      confirm.require({
        group: 'headless',
        message: '오류가 발생했습니다.',
        header: 'Customer Inquiry',
        rejectClass: 'c-btn-gray dpnone',
        acceptClass: 'c-btn-red',
        rejectLabel: '',
        acceptLabel: '확인',
        accept: () => {
          qnaReset()
        },
        reject: () => {
          qnaReset()
        }
      })
      qnaReset()
    })
}

const qnaReset = () => {
  qnaVisible.value = false
  itemNameTxt.value.value = ''
  longTextTxt.value.value = ''
  emailTxt.value.value = ''

  itemNameTxt.isValid.value = false
  longTextTxt.isValid.value = false
  emailTxt.isValid.value = false

  loading.value = false
}

onMounted(() => {
  fetch('https://api.monday.com/v2', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken
    },
    body: JSON.stringify({
      query: `
      query {
        boards(ids: 1865416115) 
        { name state permissions 
          items_page(limit: 100) {
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
    })
  })
    .then((res) => res.json())
    .then((res) => {})
})
</script>

<style scoped></style>
