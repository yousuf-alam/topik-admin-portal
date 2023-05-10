<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Edit Info">
        <b-card-text>
          <div class="form-group">
            <label>Discount</label>
            <input class="form-control" type="text" v-model="discount">
          </div>
         
          <div class="form-group">
            <label>status</label>
            <select class="form-control" v-model="status"  >
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>
          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Edit Discount
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
  status: "EditDiscount",
  data(){
    return {
      discounts:'',
      status:'',
      discount:'',
      isDisabled: true,
    }
  },
  created() {
    this.discount_id = this.$route.params.id;
    console.log('redeem id',this.discount_id);
    this.getOld();

  },
  methods:{
    getOld(){
      axios.get(`${ADMIN_URL}/first-order-discount/get-item/${this.discount_id}`)
          .then(response => {

            this.discounts = response.data.data;
            this.discount = this.discounts.discount;
            this.status = this.discounts.status;

            console.log('discounts id data',this.discounts);
          })
          .catch(e => {
            console.log("error occurs", e.response);
          });
    },
    onSubmit() {

      let formData = {
        discount:this.discount,
        status:this.status
      }

      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.put(`${ADMIN_URL}/first-order-discount/update/${this.discount_id}`, formData)
          .then(response => {
            console.log('Success', response);

            return this.$router.push('/first-order-discount');

          })
          .catch(error => {

          });
    }
  }
}
</script>

<style scoped>

</style>
