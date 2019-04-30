<template>
    <div class="customcard">
        <h3>Edit user</h3>
        <div v-if="initial_data_fetched" class="d-flex justify-content-center">
            <div class="col-8">
                <form @submit.prevent>
                <div class="form-group">
                    <label for="name">Enter Name</label>
                    <input type="text" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter name"
                        v-model="name" @keyup="nameKeyUp">
                    <span id="nameHelp" class="form-text text-danger">
                        {{name_warning}}
                    </span>
                </div>
                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input type="text" class="form-control" id="phone" aria-describedby="phoneHelp" placeholder="Enter phone number"
                        v-model="phone" @keyup="phoneKeyUp">
                    <span id="phoneHelp" class="form-text text-danger">
                       {{ phone_warning }}
                    </span>
                </div>

                <div class="mx-1 my-2">
                    <h3 class="text-danger"> {{ role_warning }} </h3>
                    <CheckRoles :savedCheckedRoles="checked_roles" @role-checked="checkedRolesFun" />
                    <span class="text-danger"> {{ checked_roles_warning }} </span>
                </div>
                <button type="submit" class="btn btn-primary" :disabled="disableSubmitBtn"
                 @click="handleSubmit">Submit</button>
                </form>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import CheckRoles from './CheckRoles';
import _ from 'lodash';
export default {
    name: 'EditUser',
    components: {
        CheckRoles, 
    },
    data() {
        return {
            name: '',
            name_warning: '',
            phone: '',
            phone_warning: '',
            
            role_warning: '',

            checked_roles: [], 
            checked_roles_warning: '',
            created_user: null,
            initial_data_fetched: false
        }
    },
    created() {
        this.fetchUserById();
    },
    computed: {
        disableSubmitBtn: function() {
            const data = this.$data;
            // console.log('DATA === ', data);
            let rule =  this.name.length === 0 || this.phone.length === 0 ||  
                    this.name_warning.length > 0 || this.phone_warning.length > 0 ;
            return rule;
        }
    },
    methods: {
        handleSubmit() {
            this.nameKeyUp();
            this.phoneKeyUp();
            if(this.disableSubmitBtn === true || this.checked_roles.length === 0) {
                if (this.checked_roles.length === 0) {
                    this.checked_roles_warning = "You haven't select any roles"; 
                }
                return; 
            }
            // console.log('Yes , you are prepeared to do action. . . . ');
            const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
            const formvalues = {};
            formvalues.name = this.name;
            formvalues.phone = this.phone;
            formvalues.role_ids = _.map(this.checked_roles, 'id');

            const config = { headers: {'Content-Type': 'application/json'} };
            const user_id = this.$route.params.id;
            const URL = `${ADMIN_URL}/api/users/${user_id}`;
            axios.put(URL, formvalues, config)
                .then(response => {
                    // console.log('Update Response === ', response);
                    this.handleResponse(response);
                }).catch(error => {
                    // console.log('User Edit error', error)
                });
        }, 
        
        handleResponse(response) {
            if (response.status === 200) {
                const data = response.data;
                if (Object.prototype.hasOwnProperty.call(data, 'phone')) {
                    this.phone_warning = data.phone[0];
                } 
                if (Object.prototype.hasOwnProperty.call(data, 'role_warning')) {
                    this.role_warning = data.role_warning;
                }
            } else if (response.status === 204) {
                alert('User updated successfully');
                this.$router.push({name: 'Users'});
            }
        }, 
        
        checkedRolesFun(parm) {
            this.checked_roles = parm;
            this.checked_roles_warning = '';
        },
        nameKeyUp() { 
            if (this.name.length === 0) {
                this.name_warning = 'Enter name';
            } else if (this.name.trim().length === 0) {
                this.name_warning = 'Name cant be empty';
            } else if (this.name.length > 100) {
                this.name_warning = 'Name must be less than 100 letters';
            } else {
                this.name_warning = '';
            }
        },
        phoneKeyUp() {
            const phoneIsValid = this.$gbvar.is_valid_phone(this.phone);
            if (phoneIsValid === false) {
                this.phone_warning = 'Invalid phone number';
            } else { 
                this.phone_warning = '';
            }

            if(this.phone.length < 11 || this.phone.length > 11) {
                this.phone_warning = 'Enter a valid phone number';
            } 
            if (this.phone.length === 0) { 
                this.phone_warning = ''; 
            }
        },

        fetchUserById() {
            const user_id = this.$route.params.id;
            const ADMIN_URL = this.$gbvar.ADMIN_URL;
            axios.get(`${ADMIN_URL}/api/users/${user_id}`)
                .then(res => {
                    const respData = {...res.data};
                    this.checked_roles = respData.roles;
                    _.map(this.checked_roles, role => {
                        delete role['pivot']; // Because, All roles fetched in CheckRoles.vue have no "pivot" key.
                    })
                    this.name = res.data.name;
                    this.phone = res.data.phone;
                    this.initial_data_fetched = true;
                    
                }).catch(err => {
                    console.log('Error ...___...', err.response);
                })
        }

    }
}
</script>

<style>

</style>
