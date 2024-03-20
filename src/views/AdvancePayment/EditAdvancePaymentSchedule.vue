<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Edit Info">
        <b-card-text>
          <div class="form-group">
            <label>Start Date</label>
            <input class="form-control" type="text" v-model="start_date"   :disabled="isDisabled" >

          </div>
          <div class="form-group">
            <label>End Date</label>
            <input class="form-control" type="text" v-model="end_date"  :disabled="isDisabled" >
          </div>
          <div class="form-group">
            <label>Status</label>
            <input class="form-control" type="number" v-model="status"  >
          </div>




          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Edit Payment Schedule
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
  name: "EditPaymentMethod",
  data(){
    return {
      start_date:'',
      end_date:'',
      status:'',
      payment_id:'',
      payments:[],

      isDisabled: false,
    }
  },
  created() {
    this.payment_id = this.$route.params.id;
    this.getOld();

  },
  methods:{
    getOld(){
      axios.get(`${ADMIN_URL}/advance-payment-edit/${this.payment_id}`)
        .then(response => {

          this.payments = response.data.data;
          this.start_date = this.payments.start_date;
          this.end_date = this.payments.end_date;
          this.status = this.payments.status;
        })
        .catch(e => {
          console.log("error occurs", e.response);
        });
    },
    onSubmit() {

      let formData = {
        start_date:this.start_date,
        end_date:this.end_date,
        status:this.status,

      }

      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.put(`${ADMIN_URL}/advance-payment-update/${this.payment_id}`, formData)
        .then(response => {
          console.log('Success', response);

          return this.$router.push('/advance-payment-schedule');

        })
        .catch(error => {

        });
    }
  }
}
</script>

<style scoped>

</style>
