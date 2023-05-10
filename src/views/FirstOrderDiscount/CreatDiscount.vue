<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Basic Info">
        <b-card-text>
          <div class="form-group">
            <label>discount</label>
            <input class="form-control" type="text" v-model="discount" >
          </div>
          <div class="form-group">
            <label>Status</label>
            <select class="form-control" v-model="status">
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>

          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Create Discount
          </b-button>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import axios from "axios";

export default {
  name: "CreatDiscount",
  data(){
    return {
      discount:'',
      status:'',

    }
  },
  methods:{
    onSubmit() {

      let formData = {
        discount:this.discount,
        status:this.status,

      }
      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/first-order-discount/create`, formData)
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
