<script setup>
  const mailto = () => {
    window.location.href = 'mailto:wizcon@wiz-con.com'
  }
</script>
<template>
  <div class="copy">
    <div class="copy-menu">
      <div class="contents flx-row flx-bet flx-v">
        <button class="qna norbtn colorfff bgred h100 font1 flx-row flx-c flx-v gap0-5" @click="mailto">
          <span>문의하기</span>
        </button>
        <div class="copy-menu-items flx-row">
          <div class="item">© 2024 WIZCON. All rights reserved. 
          </div>
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
          <div class="font2 red bold mt1">
            070-8802-4200
          </div>
          <div class="lineh2 mt1">
            Fax : 02-701-9531<br />
            Email : wizcon@wiz-con.com
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
</style>
