<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <h1>Admin Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <b-input-group class="mb-0">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input
                      name="phone"
                      v-model="phone"
                      type="text"
                      class="form-control"
                      placeholder="Phone no."
                      autocomplete="phone"
                      @keyup="onKeyUpPhone"
                    />
                  </b-input-group>
                  <span class="text-danger"> {{phone_warning}} </span>
                  <div class="my-3"></div>
                  <b-input-group class="mt-0">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input
                      name="password"
                      v-model="password"
                      type="password"
                      class="form-control"
                      placeholder="Password"
                      autocomplete="current-password"
                      @keyup="onKeyUpPassword"
                    />
                  </b-input-group>
                  <span class="text-danger"> {{ password_warning }} </span>
                  <b-row class="mt-2">
                    <b-col cols="6">
                      <b-button
                        @click="handleFormSubmit"
                        variant="primary"
                        class="px-4 "
                        :disabled="disableLogInBtn"

                      >
                        Login
                      </b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Forgot password?</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <b-button variant="primary" class="active mt-3">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
//import store from '../../store/store';

export default {
  name: 'Login',
  data() {
    return {
       phone: '',
       phone_warning: '',
       password: '',
       password_warning: '',
       loginClicked: false,
    }
  },
  computed: {
    disableLogInBtn: function() {
    let rule = this.phone_warning.length > 0 || this.password_warning.length > 0 ||
      this.phone.length === 0 || this.password.length === 0;
    return rule;
    }
  },
  methods: {
    onKeyUpPhone(event) {
      const phoneIsValid = /(^()?(01){1}[23456789]{1}(\d){8})$/i.test(this.phone);
      if (phoneIsValid === false) {
        this.phone_warning = 'Invalid phone number';
      } else { 
        this.phone_warning = '';
      }

      if (this.phone.length < 11 || this.phone.length > 11) {
        this.phone_warning = 'Enter 11 digit phone number';
      } 
      if (this.phone.length === 0) { 
        this.phone_warning = ''; 
      }
    },

    onKeyUpPassword(event) {
      if (this.password.length < 6 && this.password.length > 0) {
        this.password_warning = 'Password must be at least 6 char long';
      } else { 
        this.password_warning = ''; 
      }
    },

    handleFormSubmit(event) {
      this.$store.dispatch('auth/login', {phone: this.phone, password: this.password})
        .then((response) => {
          this.$router.push({path: '/'});
        }).catch((error) => {
          // console.log('Error ... ', error.response);
        })
    }
  }
}
</script>
<style scoped>
  .bg-primary {
    background-color: #2f353a !important;
  }

</style>
