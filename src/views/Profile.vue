<template>
  <div class="customcard">
    <h3>Edit Profile</h3>
    <div class="d-flex justify-content-center">
      <div class="col-8">
        <form @submit.prevent>
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter name"
                   v-model="user.name">
          </div>
          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input type="text" readonly class="form-control" id="phone" aria-describedby="phoneHelp" placeholder="Enter phone number"
                   v-model="user.phone">
          </div>
          <div class="form-group">
            <label for="name">Email</label>
            <input type="text" class="form-control" id="email" aria-describedby="nameHelp" placeholder="Enter Email"
                   v-model="user.email">
          </div>
          <div class="form-group">
            <label for="address">Address</label>
            <input type="text" class="form-control" id="address" placeholder="Enter Address"
                   v-model="user.address.address_details">
          </div>
          <div class="form-group">
            <label>Gender</label><br>
            <input type="radio"  value="female" v-model="user.gender">
            <label>Female</label>&nbsp;&nbsp;&nbsp;
            <input type="radio" value="male" v-model="user.gender">
            <label>Male</label>
          </div>
          <div class="form-group">
            <label class="col-md-3 control-label">Icon (PDF)</label>
              <div class="fileinput fileinput-new" data-provides="fileinput">
                <div class="fileinput-new thumbnail">
                  <img :src="url_avatar" style="width: 100px">
                </div>
                <span class="btn default btn-file">
                  <input name="icon_pdf" type="file" v-on:change="onAvatarChange">
                </span>
              </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password"
                   v-model="user.password" @keyup="passwordKeyUp">
            <span class="form-text text-danger">
                        {{ password_warning }}
            </span>
          </div>
          <div class="form-group">
            <label for="password_confirmation">Confirm Password</label>
            <input type="password" class="form-control" id="password_confirmation" placeholder="Confirm Password"
                   v-model="user.password_confirmation" @keyup="passwordConfirmKeyUp">
            <span  class="form-text text-danger">
                        {{ password_confirmation_warning }}
            </span>
          </div>
          <button type="submit" class="btn btn-primary btn-lg"
                  @click="handleSubmit">Update Profile</button>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
  const BASE_URL = process.env.VUE_APP_BASE_URL;
  export default {
    name: 'Profile',

    data() {
      return {
       user  : {address : {}},
       url_avatar: '',
       password_warning: '',
       password_confirmation: '',
       password_confirmation_warning: '',
      }
    },
    created() {
      this.fetchUser();
    },
    methods: {
      handleSubmit() {
        let formData = new FormData();
        formData.append('user_id', this.user.id);
        formData.append('name',  this.user.name);
        formData.append('email', this.user.email);
        formData.append('address', JSON.stringify(this.user.address));
        formData.append('gender', this.user.gender);
        formData.append('avatar', this.user.avatar);
        formData.append('password',this.user.password_confirmation);
        const config = { headers: {'content-type': 'multipart/form-data'} };
        const URL = `${ADMIN_URL}/update-profile`;
        axios.post(URL, formData, config)
          .then(response => {
             console.log('Update Response === ', response);
             if(response.data.success===true)
             {
               this.$swal('Success', response.data.message, 'success');
             }
          }).catch(error => {
          // console.log('User Edit error', error)
        });
      },


      fetchUser() {
        const user_id = this.$store.getters["auth/authUser"].id;
        const ADMIN_URL = this.$gbvar.ADMIN_URL;
        axios.get(`${ADMIN_URL}/users/${user_id}`)
          .then(response => {
              this.user = response.data;
              this.url_avatar = this.user.avatar === null ? null : `${BASE_URL}/${this.user.avatar}`;
            })
            .catch(err => {
            console.log('Error ...___...', err.response);
        })
      },
      onAvatarChange(e) {
        const file = e.target.files[0];
        if (file === undefined) {
          return;
        }
        this.user.avatar = file;
        this.url_avatar = URL.createObjectURL(file);
      },

      passwordKeyUp() {
          if (this.user.password.length < 6 && this.user.password.length > 0) {
              this.password_warning = 'Password must be at least 6 char long';
          } else {
              this.password_warning = '';
          }
      },
      passwordConfirmKeyUp() {

          if (this.user.password !==  this.user.password_confirmation) {
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
