<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Payment Info">
        <b-card-text>
          <div class="form-group">
            <label>Partner Name</label>
            <select v-model="partner_id" class="form-control">
              <option v-for="partner in partners" :key="partner.id" :value="partner.id">{{ partner.name}} </option>>
            </select>
          </div>
          <div class="form-group">
            <label>Method</label>
             <select v-model="payment_method" class="form-control">
               <option value="cash">Cash</option>
               <option value="bkash">Bkash</option>
               <option value="nagad">Nagad</option>
             </select>
          </div>

          <div  class="form-group">
            <label>Amount</label>
            <input class="form-control" type="number" v-model="amount" >
          </div>

          <div  class="form-group">
            <label>Payment To</label>
            <input class="form-control" type="text" v-model="payment_to" >
          </div>
          <div  class="form-group">
            <label>Remarks</label>
            <input class="form-control" type="text" v-model="remarks" >
          </div>

          <div  class="form-group">
            <label>Receive date</label>
            <VueCtkDateTimePicker
                :overlay="true"
                :range="false"
                :no-label="true"
                label="Select"
                id="RangeDatePicker"
                format="YYYY-MM-DD"
                formatted="ll"
                color="#7D4E77"
                v-model="recieved_date"
            />
          </div>


          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Create Payment
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
  name: "CreatePayment",
  data(){
    return {
      partner_id:'',
      payment_method:'',
      amount:'',
      payment_to:'',
      remarks:'',
      recieved_date:'',
      partners:[]



    }
  },
  mounted() {
    this.getPartners();
  },
  methods:{
    getPartners() {
      axios.get(`${ADMIN_URL}/in-house-partners`)
          .then(response => {
            this.partners = response.data.data;
            console.log(this.partners);
          })
          .catch(error => {

          });
    },
    onSubmit() {
      let formData = {
        partner_id:this.partner_id,
        payment_method:this.payment_method,
        amount:this.amount,
        payment_to:this.payment_to,
        recieved_date:this.recieved_date,
      }

      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/partner-payment/submit`, formData)
          .then(response => {
            console.log('Success', response);

            return this.$router.push('/partner-payment');

          })
          .catch(error => {

          });
    }
  }
}
</script>

<style scoped>

</style>
