import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'


const vuexPersist = new VuexPersist({
  key: 'my-app',
  storage: localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    baseUrl:"https://cert9.ltd/",
    baseUrlFile:'https://cert9.ltd/uploads/',
    app:{},
    session:{
     
      active:false,
      keep:false,
      push:0,
      readpush:false,
      user:{}
    }

  },
  mutations: {
      start_session(state,payload){
        state.session.active=payload.active
        state.session.keep =true
        state.session.readpush=true
      
        state.session.user=payload
        console.log(payload)
      },
      active_user(state,payload){
        state.session.active=true
      },
      stop_session(state){
        state.session.keep=false
        state.session.active=false
        state.session.push=0
        state.session.user={}
      },

      update_push(state,payload){
       
          
      state.session.push=payload-state.session.push

      },

      init_push(state){
       state.session.push=0
      }

  },
  actions: {



  }
})
