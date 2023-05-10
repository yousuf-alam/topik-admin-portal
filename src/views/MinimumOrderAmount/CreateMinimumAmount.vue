<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Basic Info">
        <b-card-text>
          <div class="form-group">
            <label>Amount</label>
            <input class="form-control" type="text" v-model="amount" >
          </div>
          <div class="form-group">
            <label>Status</label>
            <select class="form-control" v-model="status">
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>



          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Create Redeem
          </b-button>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateMinimumAmount",
  data(){
    return {
      amount:'',
      status:'',

    }
  },
  methods:{
    onSubmit() {

      let formData = {
        amount:this.amount,
        status:this.status,

      }
      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/minimum-order-amount/create`, formData)
          .then(response => {
            console.log('Success', response);

            return this.$router.push('/minimum-order-amount');

          })
          .catch(error => {

          });
    }
  }
}
</script>

<style scoped>

</style>
