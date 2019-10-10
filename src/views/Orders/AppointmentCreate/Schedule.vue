<template>
    <b-card class="m-4 p-4">
        <h5 class="mb-4">Date & Schedule</h5>
        <b-form-group label="Select Date">
          <datepicker @change="addSchedule" v-model="schedule.selected_date" :disabledDates="disabledDates"></datepicker>
        </b-form-group>
        <b-form-group label="Select Time">
          <select @change="addSchedule" class="form-control" v-model="schedule.selected_time">
            <option v-for="time in time_slots" :value="time.slot">{{time.slot}}</option>
          </select>
        </b-form-group>
    </b-card>
</template>

<script>
  import EventBus from '../../../utils/EventBus'
  import Datepicker from 'vuejs-datepicker';
  import axios from 'axios';
  const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
  export default {
    name: "Schedule",
    components: {
      Datepicker
    },
    data() {
      return {
        schedule : {
          selected_time: '',
          selected_date: '',
          delivery_address: '',
        },
        time_slots : [],
        disabledDates: {
          to: new Date(Date.now() - 8640000)
        }
      };
    },
      created() {
          this.getTimeSlots()
      },
    methods: {
      changeDateFormat(){
        let d = this.schedule.selected_date;
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        this.schedule.selected_date =  [year, month, day].join('-');
      },
        getTimeSlots() {
            axios.get(`${ADMIN_URL}/appointment/time-slots`)
                .then(response => {
                    this.time_slots = response.data.slots;

                })
                .catch(e => {
                    console.log("error occurs",e);
                });
        },
      addSchedule() {
        this.changeDateFormat();
        EventBus.$emit('schedule:add',this.schedule);
      }
    }
  }
</script>

<style scoped>

</style>
