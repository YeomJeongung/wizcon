import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alertL', () => ({
  alertLObj: {},
  alertLCnt: '',
  alertLYn: false,
  alertL(t,c) {
    this.alertLObj.title = t
    this.alertLObj.cnt = c
    this.alertLYn = true;
  },
  alertLClose(){
    this.alertLYn = false;
  },
  alertView(){
    return this.alertLYn
  }
}))
