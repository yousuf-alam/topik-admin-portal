<template>
    <div class="customcard">
        <h3>Create a new administrator.</h3>
        <div class="d-flex justify-content-center">
            <div class="col-8">
                <form @submit.prevent>
                <div class="form-group">
                    <label for="name">Enter Name</label>
                    <input type="text" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter name"
                        v-model="name" @keyup="handleNameKeyUp">
                    <span id="nameHelp" class="form-text text-danger">
                        {{name_warning}}
                    </span>
                </div>
                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input type="text" class="form-control" id="phone" aria-describedby="phoneHelp" placeholder="Enter phone number"
                        v-model="phone" @keyup="handlePhoneKeyUp">
                    <span id="phoneHelp" class="form-text text-danger">
                       {{ phone_warning }}
                    </span>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Password"
                        v-model="password" @keyup="handlePasswordKeyUp">
                    <span id="phoneHelp" class="form-text text-danger">
                        {{ password_warning }}
                    </span>
                </div>
                <div class="form-group">
                    <label for="password_confirmation">Confirm Password</label>
                    <input type="password" class="form-control" id="password_confirmation" placeholder="Confirm Password"
                        v-model="password_confirmation" @keyup="handlePasswordConfirmKeyUp">
                    <span id="phoneHelp" class="form-text text-danger">
                        {{ password_confirmation_warning }}
                    </span>
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
export default {
    name: 'CreateNewAdministrator',
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

        }
    },
    computed: {
        disableSubmitBtn: function() {
            let rule =  this.name.length === 0 || this.phone.length === 0 || 
                    this.password.length === 0 || this.password_confirmation.length === 0 || 
                    this.name_warning.length > 0 || this.phone_warning.length > 0 ||
                    this.password_warning.length > 0 || this.password_confirmation_warning.length > 0;
            return rule;
        }
    },
    methods: {
        handleSubmit() {
            this.handleNameKeyUp();
            this.handlePhoneKeyUp();
            this.handlePasswordKeyUp();
            this.handlePasswordConfirmKeyUp();
            if(this.disableSubmitBtn === true) {
                return; 
            }
            console.log('Yes , you are prepeared to do action. . . . ');
            const Base_URL = process.env.VUE_APP_ADMIN_URL;
            console.log(Base_URL);
            //axios.post()
        }, 
        handleNameKeyUp() { 
                if (this.name.length === 0) {
                    this.name_warning = 'Enter name';
                }
                else if (this.name.trim().length === 0) {
                    this.name_warning = 'Name cant be empty';
                }
                else if (this.name.length > 100) {
                    this.name_warning = 'Name must be less than 100 letters';
                } else {
                    this.name_warning = '';
                }
            },
        handlePhoneKeyUp() {
            const phoneIsValid = /(^()?(01){1}[23456789]{1}(\d){8})$/i.test(this.phone);
            if (phoneIsValid === false) {
                this.phone_warning = 'Invalid phone number';
            } else { 
                this.phone_warning = '';
            }

            if(this.phone.length < 11 || this.phone.length > 11) {
                this.phone_warning = 'Enter 11 digit phone number';
            } 
            if (this.phone.length === 0) { 
                this.phone_warning = ''; 
            }
            },
        handlePasswordKeyUp() {
            if (this.password.length < 6 && this.password.length > 0) {
                this.password_warning = 'Password must be at least 6 char long';
            } else { 
                this.password_warning = ''; 
            } 
            },
        handlePasswordConfirmKeyUp() {

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
