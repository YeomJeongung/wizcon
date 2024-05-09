import { defineStore } from 'pinia'

export const useTabStore = defineStore('tab', () => ({
  tabItems: [],
  curtabItems: [],
  curIdx: 0,
  previousNumbers: [],
  idGenList: {},
  getTabItems() {
    return this.tabItems
  },
  getTabIdx() {
    return this.curIdx
  },
  setTabIdx(idx) {
    setTimeout(() => {
      this.curIdx = idx
    })
  },
  getCurTabItems() {
    return this.curtabItems
  },
  delCurTabItems() {
    this.curtabItems = []
  },
  setIdGen(min,max){
    let num;
    do {
        num = Math.floor(Math.random() * (max - min + 1) + min);
    } while (this.previousNumbers.includes(num));
    
    this.previousNumbers.push(num);
    return num;
  },
  addTabItem(item) {
    // 중복 체크
    const idgen = this.setIdGen(100,10000);
    if (!this.tabItems.some((existingItem) => existingItem.id === item.id)) {
      this.idGenList[item.id] = idgen;
      this.tabItems.push({ ...item })
    }
    
    let matchedValue = null;
    const isMatch = Object.entries(this.idGenList).some(([key, value]) => {
      if (key.toString() === item.id.toString()) {
        matchedValue = value;
        return true;
      }
    });

    if(isMatch){
      this.idGenList[item.id] = matchedValue;
      item['idgen'] = matchedValue
    }

    this.addCurTabItem({ ...item })
    this.setTabIdx(this.tabItems.findIndex((fitem) => fitem.id === item.id))

  },
  addCurTabItem(item) {
    this.delCurTabItems()
    this.curtabItems.push(item)
  },
  closeTab(id) {
    const index = this.tabItems.findIndex((item) => item.id === id)
    this.setTabIdx(index)
    this.tabItems.splice(index, 1)
    if (this.tabItems.length > 0) {
      let newIndex = index

      if (newIndex === this.tabItems.length) {
        newIndex = index - 1
      }
      this.setTabIdx(newIndex)
      this.addCurTabItem(this.tabItems[newIndex])
    }

    if (this.tabItems.length === 0) {
      this.delCurTabItems()
    }
    
    //idgen tab 삭제
    const obj = this.idGenList;
    if (Object.prototype.hasOwnProperty.call(obj, id)) {
      delete obj[id];
    }
  }
}))
