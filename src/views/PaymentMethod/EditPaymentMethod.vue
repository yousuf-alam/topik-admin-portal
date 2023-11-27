<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Edit Info">
        <b-card-text>
          <div class="form-group">
            <label>Name</label>
            <input class="form-control" type="text" v-model="name"   :disabled="isDisabled" >
          </div>
          <div class="form-group">
            <label>Thumbnail</label>
            <input class="form-control" type="text" v-model="thumbnail"  :disabled="isDisabled" >
          </div>
          <div class="form-group">
            <label>Percent Discount</label>
            <input class="form-control" type="number" v-model="percent_discount"  >
          </div>




          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Edit Payment Method
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
      name:'',
      thumbnail:'',
      percent_discount:'',
      payment_id:'',
      payments:[],

      isDisabled: false,
    }
  },
  created() {
    this.payment_id = this.$route.params.id;
    console.log('redeem id',this.payment_id);
    this.getOld();

  },
  methods:{
    getOld(){
      axios.get(`${ADMIN_URL}/payment-method/get-item/${this.payment_id}`)
        .then(response => {

          console.log('hello data',response.data.data)

          this.payments = response.data.data;
          this.name = this.payments.name;
          this.thumbnail = this.payments.thumbnail;
          this.percent_discount = this.payments.percent_discount;
        })
        .catch(e => {
          console.log("error occurs", e.response);
        });
    },
    onSubmit() {

      let formData = {
        name:this.name,
        thumbnail:this.thumbnail,
        percent_discount:this.percent_discount,

      }

      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.put(`${ADMIN_URL}/payment-method/update/${this.payment_id}`, formData)
        .then(response => {
          console.log('Success', response);

          return this.$router.push('/payment-method');

        })
        .catch(error => {

        });
    }
  }
}
</script>

<style scoped>

</style>
