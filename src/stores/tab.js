import { defineStore } from 'pinia'

export const useTabStore = defineStore('tab', () => ({
  tabItems: [],
  curtabItems: [],
  curIdx: 0,
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
  addTabItem(item) {
    // 중복 체크
    if (!this.tabItems.some((existingItem) => existingItem.id === item.id)) {
      this.tabItems.push({ ...item })
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
  }
}))
