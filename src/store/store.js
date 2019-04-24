import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

import AuthModule from './modules/auth_modules';

if (localStorage.token) {
  const token = localStorage.token;
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //React Example:  store.dispatch( setCurrentUser (JSON.parse(localStorage.userData)) ); // Soooooo vital...
}

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









