<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Edit Payment">
        <b-card-text>
          <div class="form-group">
            <label>Method</label>
            <input class="form-control" type="text" v-model="method" >
          </div>
          <div class="form-group">
            <label>Amount</label>
            <input class="form-control" type="text" v-model="amount">
          </div>
          <div class="form-group">
            <label>Payment to</label>
            <input class="form-control" type="text" v-model="payment_to"  >
          </div>
          <div  class="form-group">
            <label>Received date</label>
            <input class="form-control" type="text" v-model="recieved_date">
          </div>
          <div  class="form-group">
            <label>Remarks</label>
            <input class="form-control" type="text" v-model="remarks">
          </div>



          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Edit Payment
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
  name: "EditPayment",
  data(){
    return {
      payments:[],
      method:'',
      amount:'',
      payment_to:'',
      recieved_date:'',
      remarks:'',
      isDisabled: true,
    }
  },
  created() {
    this.payment_id = this.$route.params.id;
    this.getOld();

  },
  methods:{
    getOld(){
      axios.get(`${ADMIN_URL}/partner-payment/payment-item/${this.payment_id}`)
          .then(response => {

            this.payments = response.data.data;
            this.amount = this.payments.amount;
            this.method = this.payments.method;
            this.payment_to = this.payments.payment_to;
            this.recieved_date = this.payments.recieved_date;
            this.remarks = this.payments.remarks;

          })
          .catch(e => {
            console.log("error occurs", e.response);
          });
    },
    onSubmit() {

      let formData = {
        payment_method:this.method,
        amount:this.amount,
        payment_to:this.payment_to,
        recieved_date:this.recieved_date,
        remarks:this.remarks,
      }

      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.put(`${ADMIN_URL}/partner-payment/update-payment/${this.payment_id}`, formData)
          .then(response => {
            console.log('Success', response);

            return this.$router.push('/Partner-payment');

          })
          .catch(error => {

          });
    }
  }
}
</script>

<style scoped>

</style>
