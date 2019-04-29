import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

import AuthModule from './modules/auth_modules';
import RoleModule from './modules/role_module';

if (localStorage.token) {
  const token = localStorage.token;
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  axios.defaults.headers.common['Accept'] = 'application/json';
  //React Example:  store.dispatch( setCurrentUser (JSON.parse(localStorage.userData)) ); // Soooooo vital...
}

const store = new Vuex.Store({
  strict: true, 
  modules: {
    auth: AuthModule,
    role: RoleModule,
    
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









