import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    title:'lkj',
    label:'my',
    ways:'1'
  },
  mutations:{
  	newTitle(state,msg){
      state.title=msg
    },
    newTab(state,lab){
    	state.label=lab
    },
    newGread(state,way){
      state.ways = way
    }
  }
})

export default store