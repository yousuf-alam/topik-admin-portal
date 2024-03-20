<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Edit Info">
        <b-card-text>
          <div class="form-group">
            <label>Hours</label>
            <input class="form-control" type="text" v-model="hours">
          </div>
          <div class="form-group">
            <label>Status</label>
            <select class="form-control" v-model="status" >
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>

          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Edit Minimum Payment Time
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
  name: "EditMinimumTime",

  data(){
    return {
      times:'',
      hours:'',
      status:'',
      time_id:'',
      isDisabled: true,
    }
  },
  created() {
    this.time_id = this.$route.params.id;
    this.getOld();

  },
  methods:{
    getOld(){
      axios.get(`${ADMIN_URL}/minimum-time-payment-edit/${this.time_id}`)
          .then(response => {

            this.times = response.data.data;
            this.hours = this.times.hours;
            this.status = this.times.status;


          })
          .catch(e => {
            console.log("error occurs", e.response);
          });
    },
    onSubmit() {

      let formData = {
        hours:this.hours,
        status:this.status,

      }

      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.put(`${ADMIN_URL}/minimum-time-payment-update/${this.time_id}`, formData)
          .then(response => {


            return this.$router.push('/minimum-payment-time');

          })
          .catch(error => {

          });
    }
  }
}
</script>

<style scoped>

</style>
