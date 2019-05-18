<template>
    <div class="customcard">
        <div>
            <div class="alert alert-primary alert-dismissible fade show"  role="alert" 
                v-if="showGetAlert && role.name==='superadmin'"> 
                {{$store.state.role.loadingStatus}}
                <button type="button"  class="close " data-dismiss="alert" 
                    aria-label="Close" @click="showGetAlert=false"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <h3>Role Id: {{role.id}}</h3>
            <h3>Role Name: <span class="text-primary">{{role.name}}</span></h3>

            <div>
                <h3>List of Permissions Under This Role</h3>
                <div class="px-5 py-2">
                    <input type="checkbox" id="checkall" v-model="checkall"
                        @change="checkAll">
                    <label for="checkall" class="col-6 ">Check All</label>                
                </div>
                <div class="px-5">
                    <div v-for="row in totalPermissions" :key="row.id">
                        <input 
                            type="checkbox" :id="row.id" :value="row" 
                            v-model="checkedPermissions" @change="checkSingle"
                        >
                        <label :for="row.id" class="col-6 ">{{row.name}}</label>
                    </div>
                </div>

                <button class="px-4 btn btn-primary" @click="handleSubmit">
                    Update 
                </button>
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
            checkall: false, 
            showGetAlert: true, 
            loading: '',
            role: {id: '', name: ''}, 
            totalPermissions: [],
            checkedPermissions: [],
        }
    },
    created() {
       this.fetchData();
    },

    methods: {
        fetchData() {
            this.$store.dispatch('role/getSingleRoleAndPermissions', this.$route.params.id)
                .then(response => {
                    this.role = this.$store.state.role.role;
                    this.totalPermissions = this.$store.state.role.totalPermissions;
                    this.checkedPermissions  = this.$store.getters['role/checkedPermissions'];
                }).catch(error => {
                    //console.log('RoleShow.vue, Error', error);
                })
        },
        checkAll(e) {
            this.checkedPermissions = e.target.checked ? this.totalPermissions : [] ;
        },
        checkSingle() {
            this.checkall = false;
        },
        handleSubmit() {
            if (this.checkedPermissions.length === 0) {
                return;
            }
            const permission_ids = _.map(this.checkedPermissions, 'id');

            const Base_URL = process.env.VUE_APP_ADMIN_URL;
            const URL = `${Base_URL}/roles/${this.$route.params.id}`;
            const config = { headers: {'Content-Type': 'application/json'} };
            axios.put(URL, permission_ids, config)
                .then(response => {
                    alert('Permissions Updated Successfully'); 
                    this.fetchData();
                    //console.log('Update response ', response);
                }).catch(error => {
                    //console.log('-----', error.response);
                })

        }

    }
}
</script>

<style>

</style>
