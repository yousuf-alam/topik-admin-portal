<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <img class="logo mb-3" src="/img/brand/topik.svg" width="40%">
                  <h3>Admin Login</h3>
                  <p class="text-muted">Sign In to your account</p>
                  <b-input-group class="mb-0">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input
                      name="phone"
                      v-model="phone"
                      type="text"
                      class="form-control"
                      placeholder="Phone no."
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
                      autocomplete="off"
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
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
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
      if (event.keyCode === 13) {
        this.handleFormSubmit();
        return;
      }
      if (this.password.length < 6 && this.password.length > 0) {
        this.password_warning = 'Password must be at least 6 char long';
      } else {
        this.password_warning = '';
      }
    },

    handleFormSubmit() {
      this.$store.dispatch('auth/login', {phone: this.phone, password: this.password})
        .then((response) => {
          console.log('Login Success .... ', response);
          this.$router.push({path: '/'});
        }).catch((error) => {
          console.log('Login Error ... ', error.response);
          this.password_warning = error.response.status === 401 ? "Credential doesn't match" : '';
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
