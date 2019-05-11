import axios from 'axios';
import _ from 'lodash';
import CryptoJS from 'crypto-js';

const ROOT_URL = process.env.VUE_APP_ADMIN_URL;
import globalvariables from '../../globalvariables';

/* 
this.$gbvar is not working in vuex, because it's a vue instance, 
So we have to go through like this, "in every palce in store". OR WILL FIX IN FUTURE */
const LS_TOKEN_KEY_NAME =  globalvariables.LS_TOKEN_KEY_NAME; 
const LS_USER_KEY_NAME = globalvariables.LS_USER_KEY_NAME;
const LS_PERMISSION_KEY_NAME = globalvariables.LS_PERMISSION_KEY_NAME; 

export const getDecodedValueFromLS = (lsKey, dataType) => {
  if( localStorage.getItem(lsKey)) {
    const ciphertext = localStorage.getItem(lsKey); 
    const bytes = CryptoJS.AES.decrypt(ciphertext, globalvariables.SECRET_KEY);
    const decryptedStringData = bytes.toString(CryptoJS.enc.Utf8);
    if (dataType === 'string') {
      return decryptedStringData;
    }
    return JSON.parse(decryptedStringData);
   } 
  if (dataType === 'string') {
    return '';
  } else if (dataType === 'array') {
    return [];
  } else if (dataType === 'object') {
    return { };
  }  
}



const setKeyEncodedValueInLS = (lsKey, value) => {
  const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
  const ciphertext = CryptoJS.AES.encrypt(stringValue, globalvariables.SECRET_KEY).toString();
  localStorage.setItem(lsKey, ciphertext);
}

const authModule = {
    namespaced: true, 
    state: {
        status: '',
        token: getDecodedValueFromLS(LS_TOKEN_KEY_NAME, 'string') ,
        user_permissions: getDecodedValueFromLS(LS_PERMISSION_KEY_NAME, 'array'),
        user: getDecodedValueFromLS(LS_USER_KEY_NAME, 'object'),
      },
    mutations: {
        auth_request(state) {
          state.status = 'loading'
        },
        auth_success(state, obj) {  
          state.status = 'success'
          state.token = obj.token;
          state.user = obj.user;
          state.user_permissions = obj.user_permissions;
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
                // console.log('Login success', resp );
                const token = resp.data.access_token;
                const user = resp.data.user;
                const user_permissions = _.map(resp.data.user_permissions, 'name');

                // localStorage.setItem();
                //localStorage.setItem('token', token)
                setKeyEncodedValueInLS(LS_TOKEN_KEY_NAME, token);
                setKeyEncodedValueInLS(LS_USER_KEY_NAME, user);
                setKeyEncodedValueInLS(LS_PERMISSION_KEY_NAME, user_permissions);

                // Add the following line:
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                axios.defaults.headers.common['Accept'] = 'application/json';
                
                commit('auth_success', {token, user, user_permissions});
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
          /*
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
          */
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
        authUser: state => state.user,
        bearerToken: state => state.token,
        hasPermission: state => (permission_name) => {
          if (typeof(permission_name) === 'object') {
            return permission_name.some(item => state.user_permissions.includes(item));  
          }
          return state.user_permissions.includes(permission_name)
        },
    }
}

// console.log('authModule.state ', authModule.state.user );
export default authModule;
