import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

import AuthModule from './modules/auth_modules';

const store = new Vuex.Store({
  strict: true, 
  modules: {
    auth: AuthModule,

  }, 
  state: { 
    
  },
  mutations: { 

  },
  actions: { 

  },
  getters: { 

  }
})


export default store;









