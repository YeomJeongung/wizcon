import { defineStore } from 'pinia'

export const useTabStore = defineStore('tab', () => ({
  tabItems: [],
  curtabItems: [],
  curIdx: -1,
  previousNumbers: [],
  idGenList: {},
  tabLocalsId: 'tab_data_56894666',
  tabLocalsIdx: 'tab_idx_56894666',
  tabLocalsCur: 'tab_cur_56894666',
  dashboardItem : { id: 'dashboard', name: 'dashboard', url: 'dashboard.vue' },

  // 탭 아이템 리스트 반환
  getTabItems() {
    return this.tabItems;
  },
  // 현재 탭 인덱스 반환
  getTabIdx() {
    return this.curIdx;
  },
  // 탭 인덱스 설정
  setTabIdx(idx) {
    // 비동기 처리를 위해 setTimeout 사용
    setTimeout(() => {
      this.curIdx = idx;
    });
  },
  // 현재 탭 아이템 리스트 반환
  getCurTabItems() {
    return this.curtabItems;
  },
  // 현재 탭 아이템 삭제
  delCurTabItems() {
    this.curtabItems = [];
  },
  // 고유 ID 생성
  setIdGen(min, max) {
    let num;
    do {
      num = Math.floor(Math.random() * (max - min + 1) + min);
    } while (this.previousNumbers.includes(num));
    
    this.previousNumbers.push(num);
    return num;
  },
  // 로컬 스토리지에서 특정 아이템 삭제
  delLocalsItem(id) {
    const arr = [];
    const beforeLocals = JSON.parse(this.getLocalsItems());
    if (Array.isArray(beforeLocals)) {
      const beforeLocalsFilter = beforeLocals.filter(item => typeof item === 'object' && item.id !== id);
      arr.push(...beforeLocalsFilter);
    }
    localStorage.setItem(this.tabLocalsId, JSON.stringify(arr));
  },
  // 로컬 스토리지에 아이템 추가
  setLocalsItems(item) {
    const arr = [];
    if (this.getLocalsItems()) {
      const beforeLocals = JSON.parse(this.getLocalsItems());
      if (beforeLocals.some((existingItem) => existingItem.id === item.id)) {
        return;
      }
      if (Array.isArray(beforeLocals)) {
        const beforeLocalsFilter = beforeLocals.filter(item => typeof item === 'object');
        arr.push(...beforeLocalsFilter);
      }
    }
    arr.push(item);
    localStorage.setItem(this.tabLocalsId, JSON.stringify(arr));
  },
  // 로컬 스토리지에 저장된 아이템 추가
  addLocals() {
    if (this.getLocalsItems()) {
      const locals = JSON.parse(this.getLocalsItems());
      locals.forEach(item => {
        this.addTabItem(item, 'mount');  
      });
      this.initLocalCur();
    }
  },
  getLocalsItems() {
    // 로컬 스토리지에서 아이템 가져오기, 없으면 빈 문자열 반환
    return localStorage.getItem(this.tabLocalsId) || '';
  },
  setLocalIdx(idx) {
    // 로컬 스토리지에 인덱스 설정
    localStorage.setItem(this.tabLocalsIdx, JSON.stringify(idx));
  },
  setLocalCur(cur) {
    // 로컬 스토리지에 현재 아이템 설정
    localStorage.setItem(this.tabLocalsCur, JSON.stringify(cur));
  },
  initLocalIdx() {
    // 로컬 스토리지에서 인덱스 가져와서 탭 인덱스로 설정
    const idx = JSON.parse(localStorage.getItem(this.tabLocalsIdx));
    this.setTabIdx(idx);
  },
  initLocalCur() {
    // 로컬 스토리지에서 현재 아이템 가져와서 현재 탭 아이템으로 추가 및 초기화
    const cur = JSON.parse(localStorage.getItem(this.tabLocalsCur));
    this.addCurTabItem(cur);
    this.initLocalIdx();
  },
  delLocalId() {
    // 로컬 스토리지에서 인덱스 제거
    localStorage.removeItem(this.tabLocalsId);
  },
  delLocalIdx() {
    // 로컬 스토리지에서 인덱스 제거
    localStorage.removeItem(this.tabLocalsIdx);
  },
  delLocalCur() {
    // 로컬 스토리지에서 현재 아이템 제거
    localStorage.removeItem(this.tabLocalsCur);
  },
  tabMatch(id) {
    // 탭 아이디에 해당하는 아이템을 찾아 매치된 값을 반환
    let matchedValue = null;
    let rt = false;
    Object.entries(this.idGenList).some(([key, value]) => {
      if (key.toString() === id.toString()) {
        matchedValue = value;
        rt = true;
      }
    });
    return [rt, matchedValue];
  },  
  addTabItem(item, type) {
    // ID 생성 및 중복 검사
    const idgen = this.setIdGen(100, 100000);
    if (!this.tabItems.some((existingItem) => existingItem.id === item.id)) {
      this.idGenList[item.id] = idgen;
      this.tabItems.push({ ...item });
    }
    
    // 매치된 값이 있는 경우 idgen 업데이트
    const isMatch = this.tabMatch(item.id);
    if (isMatch[0]) {
      this.idGenList[item.id] = isMatch[1];
      item['idgen'] = isMatch[1];
    }
    
    if (type !== 'mount') {
      // 현재 탭 추가
      this.addCurTabItem({ ...item });
      this.setTabIdx(this.tabItems.findIndex((fitem) => fitem.id === item.id));
      // 로컬 아이템 설정
      this.setLocalsItems(item);
      //this.setUrl(item.url);
      this.setLocalIdx(this.tabItems.findIndex((fitem) => fitem.id === item.id));
      this.setLocalCur({ ...item });
    }
    
  },
  setUrl(url) {
  // URL을 해시로 설정
  window.location.hash = `#${url}`;
  },
  delUrl() {
    // URL 해시 제거
    window.location.hash = '';
  },
  addCurTabItem(item) {
    // 현재 탭 추가하기 전에 기존 탭 삭제
    this.delCurTabItems();
    // 현재 탭 아이템 추가
    this.curtabItems.push(item);
  },
  closeTab(id) {
    const index = this.tabItems.findIndex((item) => item.id === id);
    
    // 현재 탭 인덱스 설정
    this.setTabIdx(index);
    
    // 탭 아이템 삭제
    this.tabItems.splice(index, 1);
    
    if (this.tabItems.length > 0) {
      // 새로운 인덱스 설정
      let newIndex = index;
      if (newIndex === this.tabItems.length) {
        newIndex = index - 1;
      }
      this.setTabIdx(newIndex);
      
      // 매치된 값이 있다면 idgen 업데이트
      const isMatch = this.tabMatch(this.tabItems[newIndex].id);
      if (isMatch[0]) {
        this.tabItems[newIndex].idgen = isMatch[1];
      }
      
      // 현재 탭 추가
      this.addCurTabItem(this.tabItems[newIndex]);
      
      // URL 및 로컬 저장소 인덱스, 현재 항목 설정
      //this.setUrl(this.tabItems[newIndex].url);
      this.setLocalIdx(newIndex);
      this.setLocalCur(this.tabItems[newIndex]);
    } else {
      // 탭이 없는 경우 처리
      //this.delCurTabItems();
      //this.delUrl();
      this.addCurTabItem(this.dashboardItem);
      this.delLocalIdx();
      this.delLocalCur();
    }
    
    // idGenList 및 로컬 아이템 삭제
    delete this.idGenList[id];
    this.delLocalsItem(id);
  },
  dashboard(){
    this.addCurTabItem(this.dashboardItem);
    this.setTabIdx(-1);
    this.setLocalCur(this.dashboardItem);
    this.setLocalIdx(-1);
  },
  reloadTab(){
    this.tabItems = []
    this.delCurTabItems()
    this.delLocalIdx()
    this.delLocalId()
    this.delLocalCur()
  }
}))
