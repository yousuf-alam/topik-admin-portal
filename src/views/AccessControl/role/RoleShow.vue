<template>
    <div class="customcard">
        <div>
            <h3>Role Id: {{role.id}}</h3>
            <h3>Role Name: <span class="text-primary">{{role.name}}</span></h3>
            <div>
                <h3>List of Permissions Under This Role</h3>
                <div class="px-5">
                    <div v-for="row in totalPermission" :key="row.id">
                        <input 
                            type="checkbox" :id="row.id" :value="row" 
                            v-model="checkedPermissions" 
                        >
                        <label :for="row.id" class="col-6 ">{{row.name}}</label>
                    </div>
                </div>


            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';
export default {
    name: 'RoleShow',
    data() {
        return {
            role: {id: '', name: ''}, 
            totalPermission: [],
            checkedPermissions: [],
        }
    },
    created() {
        const Base_URL = process.env.VUE_APP_ADMIN_URL;
        const role_id = this.$route.params.id;
        axios.get(`${Base_URL}/api/roles/${role_id}`)
            .then(response => {
                console.log('RoleShow === === === ', response)
                const allpermissions = response.data.allpermissions;
                const role = response.data.role;
                this.role.id = role.id;
                this.role.name = role.name;
                const permissionIdsUnderRole = _.map(role.permissions, 'id');
                this.totalPermission = allpermissions.map(el => ({ 
                    ...el, ...{ rolehaspermission: permissionIdsUnderRole.includes(el.id) } }));
                // console.log('Yesssssssssssssss', this.totalPermission);
                this.synchronizeCheckedBoxs();
            }).catch(error => {
                console.log('RoleShow, Error === ', error);
            })
    },



    methods: {
        checkIfRoleHasThisPermission(role_id) {

        },
        synchronizeCheckedBoxs() {
            this.totalPermission.forEach(element => {
                if (element.rolehaspermission) {
                    this.checkedPermissions.push(element);
                }
            }); 
            console.log('###### ', this.totalPermission);
        }
    }
}
</script>

<style>

</style>
