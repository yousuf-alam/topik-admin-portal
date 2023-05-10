<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Edit Info">
        <b-card-text>
          <div class="form-group">
            <label>Amount</label>
            <input class="form-control" type="text" v-model="amount">
          </div>
          <div class="form-group">
            <label>Status</label>
           <select class="form-control" v-model="status" >
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>

          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Edit Minimum
          </b-button>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import axios from "axios";
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

export default {
  name: "EditMinimumAmount",

  data(){
    return {
      amounts:'',
      amount:'',
      status:'',
      amount_id:'',
      isDisabled: true,
    }
  },
  created() {
    this.amount_id = this.$route.params.id;
    console.log('order id',this.amount_id);
    this.getOld();

  },
  methods:{
    getOld(){
      axios.get(`${ADMIN_URL}/minimum-order-amount/get-item/${this.amount_id}`)
          .then(response => {

            this.amounts = response.data.data;
            this.amount = this.amounts.amount;
            this.status = this.amounts.status;

            console.log('order id data',this.amounts);
          })
          .catch(e => {
            console.log("error occurs", e.response);
          });
    },
    onSubmit() {

      let formData = {
        amount:this.amount,
        status:this.status,
       
      }

      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.put(`${ADMIN_URL}/minimum-order-amount/update/${this.amount_id}`, formData)
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
