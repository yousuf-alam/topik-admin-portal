import axios from 'axios';
import _ from 'lodash';
import globalvariables from '../../globalvariables';

const BASE_URL = globalvariables.BASE_URL;
const notiModule = {
    namespaced: true, // This is V.V.I for module wise accessing, 
    // Otherwise this obj will be available globally .
    state: { 
        merged_notifications: []
     },
    mutations: { 
        MERGE_TO_ALL_NOTIFICATIONS(state, newNoti) {
  
            const notificationsObj = _.keyBy(state.merged_notifications, 'id');
            const newNotiObj = _.keyBy(newNoti, 'id');
            
            let mergedNotiObj = Object.assign({}, notificationsObj);
            mergedNotiObj = Object.assign(mergedNotiObj, newNotiObj);
            
            const mergedNotiArray = [];
            for (let key in mergedNotiObj) {
                if (mergedNotiObj.hasOwnProperty(key)) {
                        mergedNotiArray.push(mergedNotiObj[key])
                }
            }
            state.merged_notifications = [...mergedNotiArray];

            state.merged_notifications.sort(function(a, b) {
                const dateA = new Date(a.created_at);
                const dateB = new Date(b.created_at);
                return dateB - dateA;
            });
        }
     },
    actions: { 
        fetchNotifications({commit}, parmObj) {
            const { perPageItem, pageNumber } = parmObj;
            return new Promise((resolve, reject) => {
                axios.get(`${BASE_URL}/api/notifications/${perPageItem}/${pageNumber}`)
                .then(res => {
                    console.log('store, noti_module : ', res);
                    const newNoti = _.map(res.data.notifications, item => {
                        return {...item, ...{data: JSON.parse(item.data)}};
                    });
                    resolve(newNoti);
                }).catch(error => {
                    reject(error);
                })
            })

        },
        /* fetchNotifications & fetchScrollNotifications are slight different, 
           we dispatched fetchNotifications from fetchScrollNotifications, 
           And COMMITTED MERGE_TO_ALL_NOTIFICATIONS from fetchScrollNotifications, 
           Because fetchNotifications will only be used for notification fetching by 
           perPageItem & pageNumber
        */
        fetchScrollNotifications({ commit, dispatch}, parmObj) {
            return new Promise((resolve, reject) => {
                dispatch('fetchNotifications', parmObj)
                .then(newNoti => {
                    commit('MERGE_TO_ALL_NOTIFICATIONS', newNoti);
                    resolve(newNoti) 
                }).catch(error => {
                    reject(error);
                })
            })

        },   
     },
    getters: { 
        merged_notifications: state => state.merged_notifications,// Do Not Use without dispatching action.
     }
}

export default notiModule;