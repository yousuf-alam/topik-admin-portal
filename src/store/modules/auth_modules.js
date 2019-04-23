import axios from 'axios';
const ROOT_URL = 'http://romoni-new.test';
const LS_TOKEN_KEY_NAME = 'token';


const authModule = {
    namespaced: true, 
    state: {
        status: '',
        token: localStorage.getItem(LS_TOKEN_KEY_NAME) || '',
        user: { }
      },
    mutations: {
        auth_request(state) {
          state.status = 'loading'
        },
        auth_success(state, obj) {  
          state.status = 'success'
          state.token = obj.token;
          state.user = obj.user;
        },
        auth_error(state) {
          state.status = 'error'
        },
        logout(state) {
          state.status = ''
          state.token = ''
        },
    
      },
    actions: {
        login({ commit }, userdata) {
          // console.log('auth_modules .... login.... fired');
          return new Promise((resolve, reject) => {
            commit('auth_request');
            axios({ url: `${ROOT_URL}/api/login`, data: userdata, method: 'POST' })
              .then(resp => {

                const token = resp.data.access_token;
                const user = resp.data.user;

                localStorage.setItem(LS_TOKEN_KEY_NAME, token);
                console.log('Login success', token, user);

                // Add the following line:
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                commit('auth_success', {token, user});
                resolve(resp);
              })
              .catch(err => {
                commit('auth_error'); 
                localStorage.removeItem(LS_TOKEN_KEY_NAME); 
                reject(err);
              })
          })
        },
        register({ commit }, user) {
          return new Promise((resolve, reject) => {
            commit('auth_request')
            axios({ url: `${ROOT_URL}/register`, data: user, method: 'POST' })
              .then(resp => {
                const token = resp.data.access_token
                const user = resp.data.user
                localStorage.setItem(LS_TOKEN_KEY_NAME, token)
                // Add the following line:
                axios.defaults.headers.common['Authorization'] = token
                commit('auth_success', token, user)
                resolve(resp)
              })
              .catch(err => {
                commit('auth_error', err)
                localStorage.removeItem(LS_TOKEN_KEY_NAME)
                reject(err)
              })
          })
        },
        logout({ commit }) {
          return new Promise((resolve /*, reject */) => {
            commit('logout')
            localStorage.removeItem(LS_TOKEN_KEY_NAME)
            delete axios.defaults.headers.common['Authorization']
            resolve()
          })
        }
      },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    }
}

// console.log('authModule.state ', authModule.state.user );
export default authModule;
