<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Create Slot">
        <b-card-text>
<!--          <b-form-group label="Scheduled Date">-->
<!--            <datepicker input-class="date-input" @input="changeDateFormat()" v-model="date" ></datepicker>-->
<!--          </b-form-group>-->
          <div class="form-group">
            <label>Select Type</label>
            <select class="form-control" v-model="type">
              <option value="slot"> Slot </option>
              <option value="cancel"> Cancel </option>

            </select>
          </div>
          <div class="form-group">
            <label>Name</label>
            <select class="form-control" v-model="time_slot" v-if="type ==='slot'">
              <option value="max_orders_in_9am_to_12pm"> 09:00 AM - 12:00 PM </option>
              <option value="max_orders_in_12pm_to_3pm"> 12:00 PM - 03:00 PM </option>
              <option value="max_orders_in_3pm_to_6pm"> 03:00 PM - 06:00 PM </option>
              <option value="max_orders_in_6pm_to_9pm"> 06:00 PM - 09:00 PM </option>
            </select>
            <input class="form-control" type="text" v-model="time_slot" v-if="type === 'cancel'" >
          </div>
          <div  class="form-group">
            <label>No Of Served</label>
            <input class="form-control" type="text" v-model="no_of_served" >
          </div>

          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Create Slot
          </b-button>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import axios from "axios";
import Datepicker from 'vuejs-datepicker';
export default {
  name: "CreateSlot",
  components:{
    Datepicker
  },
  data(){
    return {
      type:'',
      time_slot:'',
      no_of_served:''
    }
  },
  methods:{
    onSubmit() {



      let formData = {
        type:this.type,
        time_slot:this.time_slot,
        no_of_served:this.no_of_served
      }






      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/slot-count/create-slot`, formData)
          .then(response => {
            console.log('Success', response);

            return this.$router.push('/slot-count');

          })
          .catch(error => {

          });
    },
    changeDateFormat(){
      let d = this.date;
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      let year = d.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      this.date =  [year, month, day].join('-');
    },
  }
}
</script>

<style scoped>

</style>
