<template>
    <b-card class="h-100 p-5 m-4">
        <h5 class="mb-4">Customer Info</h5>
        <b-form-group>
          <label >Delivery Mobile</label>
            <b-input-group>
                <b-input-group-prepend>
                    <b-input-group-text>+88</b-input-group-text>
                </b-input-group-prepend>
                <b-form-input type="text" @keyup="addCustomer" v-model="customer.phone"></b-form-input>
            </b-input-group>
        </b-form-group>
        <b-form-group>
            <label for="name">Delivery Name</label>
            <b-form-input @keyup="addCustomer" v-model="customer.name" type="text" id="name"></b-form-input>
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
            phone: ''
          },
        }
      },
      methods: {
        addCustomer(){
          EventBus.$emit('customer:add',this.customer) ;
        }
      }
    }
</script>

<style scoped>

</style>
