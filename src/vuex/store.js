import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    title:'lkj',
    label:'my',
    ways:'1',
    basisSubject:'',
    basisExmaid:'',
    subs:''
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
    },
    selectGread(state,sub){
      state.subs = sub
    },
    newBasisSubject(state,msg){
      state.basisSubject=msg
    },
    newBasisExmaid(state,msg){
      state.basisExmaid=msg
    },
  }
})

export default store