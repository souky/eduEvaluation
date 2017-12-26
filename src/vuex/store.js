import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    title:'lkj',
    label:'my'
  },
  mutations:{
  	newTitle(state,msg){
      state.title=msg
    },
    newTab(state,lab){
    	state.label=lab
    }
  }
})

export default store