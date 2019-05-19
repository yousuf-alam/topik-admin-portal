import axios from 'axios';
import globalvariables from '../../globalvariables';

const ADMIN_URL = globalvariables.ADMIN_URL;
const notiModule = {
    namespaced: true, // This is V.V.I for module wise accessing, 
    // Otherwise this obj will be available globally .
    state: { 
        allNotiCounter: 0,
        unreadNotiCounter: 0,

     },
    mutations: { 
        SET_ALL_NOTI_COUNT(state, parm) {
            state.allNotiCounter = parm;
        },
        SET_UNREAD_NOTI_COUNT(state, parm) {
            state.unreadNotiCount = parm;
        }
     },
    actions: { 
        countAllNoti({commit}) {
            return new Promise((resolve, reject) => {
                axios.get(`${ADMIN_URL}/api/count-all-noti`)
                .then(res => {
                    commit('SET_ALL_NOTI_COUNT', res.data); 
                    resolve(res);
                }).catch(error => {
                    reject(error)
                }); 
            });
        },
        countUnreadNoti({commit}) {
            return new Promise((resolve, reject) => {
                axios.get(`${ADMIN_URL}/api/count-unread-noti`)
                .then(res => {
                    commit('SET_UNREAD_NOTI_COUNT', res.data); 
                    resolve(res);
                }).catch(error => {
                   reject(error); 
                });
            })
        },
                
     },
    getters: { 
        allNotiCounter: state => state.allNotiCounter,
        unreadNotiCounter: state => state.unreadNotiCounter
     }
}

export default notiModule;