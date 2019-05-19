import axios from 'axios';
const ROOT_URL = process.env.VUE_APP_ADMIN_URL;
import _ from 'lodash';

const roleModule = {
    namespaced: true, // //This is V.V.I for module wise accessing, 
    // Otherwise this obj will be available globally .
    state: { 
        loadingStatus: 'initial',
        role: {id: '', name: ''},
        totalPermissions: [],
     },
    mutations: { 
        SET_LOADING_STATUS(state, status) {
            state.loadingStatus = status;
        },
        SET_DATA(state, obj) {
            state.role.id = obj.role.id;
            state.role.name = obj.role.name;
            state.totalPermissions = obj.totalPermissions;
        }

     },
    actions: { 
        getSingleRoleAndPermissions({ commit }, role_id) {
            return new Promise((resolve, reject ) => {
                commit('SET_LOADING_STATUS', 'Loading...')
                axios.get(`${ROOT_URL}/api/roles/${role_id}`)
                .then(response => {
                    commit('SET_LOADING_STATUS', 'Data Loaded Successfully');
                    const allpermissions = response.data.allpermissions;
                    const role = response.data.role;
                    const permissionIdsUnderRole = _.map(role.permissions, 'id');
                    const totalPermissions = allpermissions.map(el => ({ 
                        ...el, ...{ rolehaspermission: permissionIdsUnderRole.includes(el.id) } }));
                    // const checkedPermissions = []; 
                    // totalPermissions.forEach(element => {
                    //     if (element.rolehaspermission) {
                    //         checkedPermissions.push(element);
                    //     }
                    // }); // This could also be stored in here (state), but we retrive this through getters.
                    commit('SET_DATA', {role, totalPermissions })
                    resolve(response);
                }).catch(error => {
                    //console.log('RoleShow, Error === ', error);
                    reject(error);
                })
            });
        },


     },
    getters: { 
        checkedPermissions: state => state.totalPermissions.filter((item) => {
          return item.rolehaspermission === true;
        })
     }
}

export default roleModule;
