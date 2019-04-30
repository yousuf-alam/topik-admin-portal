<template>
    <div class="customcard">
        <h3>Create a new user.</h3>
        <div class="d-flex justify-content-center">
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
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Password"
                        v-model="password" @keyup="passwordKeyUp">
                    <span id="phoneHelp" class="form-text text-danger">
                        {{ password_warning }}
                    </span>
                </div>
                <div class="form-group">
                    <label for="password_confirmation">Confirm Password</label>
                    <input type="password" class="form-control" id="password_confirmation" placeholder="Confirm Password"
                        v-model="password_confirmation" @keyup="passwordConfirmKeyUp">
                    <span id="phoneHelp" class="form-text text-danger">
                        {{ password_confirmation_warning }}
                    </span>
                </div>
                <div class="mx-1 my-2">
                    <CheckRoles @role-checked="checkedRolesFun" />
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
    name: 'CreateUser',
    components: {
        CheckRoles, 
    },
    data() {
        return {
            name: '',
            name_warning: '',
            phone: '',
            phone_warning: '',
            password: '',
            password_warning: '', 
            password_confirmation: '',
            password_confirmation_warning: '',
            checked_roles: [], 
            checked_roles_warning: '',
            created_user: null,

        }
    },
    computed: {
        disableSubmitBtn: function() {
            const data = this.$data;
            // console.log('DATA === ', data);
            let rule =  this.name.length === 0 || this.phone.length === 0 || 
                    this.password.length === 0 || this.password_confirmation.length === 0 || 
                    this.name_warning.length > 0 || this.phone_warning.length > 0 ||
                    this.password_warning.length > 0 || this.password_confirmation_warning.length > 0;
            return rule;
        }
    },
    methods: {
        handleSubmit() {
            this.nameKeyUp();
            this.phoneKeyUp();
            this.passwordKeyUp();
            this.passwordConfirmKeyUp();
            if(this.disableSubmitBtn === true || this.checked_roles.length === 0) {
                if (this.checked_roles.length === 0) {
                    this.checked_roles_warning = "You haven't select any roles"; 
                }
                return; 
            }
            // console.log('Yes , you are prepeared to do action. . . . ');
            const Base_URL = process.env.VUE_APP_ADMIN_URL;
            // console.log(Base_URL);
            const formvalues = {};
            formvalues.name = this.name;
            formvalues.phone = this.phone
            formvalues.password = this.password;
            formvalues.password_confirmation = this.password_confirmation;

            axios.post(`${Base_URL}/api/users`, formvalues)
                .then(res => {
                    //console.log('Response === ', res);
                    this.handleResponse(res);
                }).catch(error => {
                    //console.log('Error === ', error.response)
                })
        }, 
        handleResponse(res) {
            if (res.status === 200) {
                const dataObj = res.data;
                const keys = Object.keys(dataObj);
                keys.forEach(element => {
                    const warning_msg = dataObj[element][0];
                    if (element === 'name') {
                        this.name_warning = warning_msg;
                    } else if (element === 'phone') {
                        this.phone_warning = warning_msg;
                    } else if (element === 'password') {
                        this.password_warning = warning_msg;
                    }
                });
                // console.log('inside handle =--------= ', res.data, res.data.length, data, data.length);
            } else if (res.status === 201) {
                this.created_user = res.data.user; 
                const user_id = this.created_user.id;
                const role_ids = _.map(this.checked_roles, 'id');
                const formvalues = {user_id, role_ids};
                const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
                axios.post(`${ADMIN_URL}/api/user/assignroles`, formvalues)
                    .then(res => {
                        // console.log('And Final Response ', res)
                        alert('User create and Role assigned successfully');
                        this.$router.push({name: 'Users'});
                    }).catch(error => {
                        // console.log('Error ... ', error);
                    });
            }

        }, 
        checkedRolesFun(parm) {
            // console.log(JSON.stringify(parm));
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
        passwordKeyUp() {
            if (this.password.length < 6 && this.password.length > 0) {
                this.password_warning = 'Password must be at least 6 char long';
            } else { 
                this.password_warning = ''; 
            } 
        },
        passwordConfirmKeyUp() {

            if (this.password !==  this.password_confirmation) {
                this.password_confirmation_warning = 'Password not matched';
            } else {
                 this.password_confirmation_warning = ''; 
            }

        }


    }
}
</script>

<style>

</style>
