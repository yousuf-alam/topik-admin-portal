<template>
    <b-card class="h-100 p-4 m-4">
        <h5 class="mb-4">Customer Info</h5>
        <b-form-group>
          <label >Delivery Mobile</label>
            <b-input-group>
                <b-input-group-prepend>
                    <b-input-group-text>+88</b-input-group-text>
                </b-input-group-prepend>
                <b-form-input type="text" @input="addCustomer" v-model="customer.phone"></b-form-input>
            </b-input-group>
          <span class="text-danger font-sm"> {{phone_warning}} </span>
        </b-form-group>
        <b-form-group>
            <label>Delivery Name</label>
            <b-form-input @input="addCustomer" v-model="customer.name" type="text" id="name"></b-form-input>
        </b-form-group>
    </b-card>
</template>

<script>

  import EventBus from '../../../utils/EventBus'
  export default {
        name: 'Customer',
      data() {
        return {
          customer :{
            name : '',
            phone: '',
          },
            phone_warning: ''

        }
      },
      methods: {
        onKeyUpPhone(event) {
          const phoneIsValid = /(^()?(01){1}[23456789]{1}(\d){8})$/i.test(this.customer.phone);

          if (phoneIsValid === false) {
            this.phone_warning = 'Invalid phone number';
          } else {
            this.phone_warning = '';
          }

          if (this.customer.phone.length < 11 || this.customer.phone.length > 11) {
            this.phone_warning = 'Enter 11 digit phone number';
          }
          if (this.customer.phone.length === 0) {
            this.phone_warning = '';
          }

        },
        addCustomer() {
          this.onKeyUpPhone();
          EventBus.$emit('customer:add',this.customer) ;
        }
      }
    }
</script>

<style scoped>

</style>
