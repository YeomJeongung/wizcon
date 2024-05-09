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
  tabMatch(id){
    let matchedValue = null;
    let rt = false;
    Object.entries(this.idGenList).some(([key, value]) => {
      if (key.toString() === id.toString()) {
        matchedValue = value;
        rt = true;
      }
    });
    return [rt,matchedValue];
  },
  addTabItem(item) {
    // 중복 체크
    const idgen = this.setIdGen(100,10000);
    if (!this.tabItems.some((existingItem) => existingItem.id === item.id)) {
      this.idGenList[item.id] = idgen;
      this.tabItems.push({ ...item })
    }

    const isMatch = this.tabMatch(item.id);
    if(isMatch[0]){
      this.idGenList[item.id] = isMatch[1];
      item['idgen'] = isMatch[1]
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

      const isMatch = this.tabMatch(this.tabItems[newIndex].id);
      if(isMatch[0]){
        this.tabItems[newIndex].idgen = isMatch[1]
      }
      
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
