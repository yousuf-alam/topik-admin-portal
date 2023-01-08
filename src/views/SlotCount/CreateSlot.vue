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
              <option value="max_orders_in_8am_to_11am"> 08:00 AM - 11:00 AM </option>
              <option value="max_orders_in_11am_to_2pm"> 11:00 AM - 02:00 PM </option>
              <option value="max_orders_in_2pm_to_5pm"> 02:00 PM - 05:00 PM </option>
              <option value="max_orders_in_5pm_to_8pm"> 05:00 PM - 08:00 PM </option>
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
