<template>
    <b-card class="m-4 p-4">
        <h5 class="mb-4">Date & Schedule</h5>
      <div v-show="type==='Tailor On-Demand'">
        <label>Select Delivery Type</label>
        <b-form-group class="ml-4">
          <input type="radio" v-model="date_type" @change="addSchedule" value="regular">
          <label>Regular Delivery</label><br>
          <input type="radio" v-model="date_type" @change="addSchedule" value="custom">
          <label>Emergency Delivery</label>
        </b-form-group>
      </div>

      <b-form-group v-show="date_type==='custom'" label="Select Date">
        <datepicker v-model="schedule.selected_date" :disabledDates="disabledDates"></datepicker>
      </b-form-group>
      <b-form-group v-show="type==='Beauty On-Demand'" label="Select Time">
        <select @change="addSchedule" class="form-control" v-model="schedule.selected_time">
          <option value="08.00AM-10.00AM">08:00 AM - 10:00 AM</option>
          <option value="10.00AM-12.00PM">10:00 AM - 12:00 PM</option>
          <option value="12.00PM-02.00PM">12:00 PM - 02:00 PM</option>
          <option value="02.00PM-04.00PM">02:00 PM - 04:00 PM</option>
          <option value="04.00PM-06.00PM">04:00 PM - 06:00 PM</option>
          <option value="06.00PM-08.00PM">06:00 PM - 08:00 PM</option>
          <option value="08.00PM-10.00PM">08:00 PM - 10:00 PM</option>
        </select>
      </b-form-group>

      <b-form-group label="Delivery Address">
          <b-form-input @keyup="addSchedule" type="text" v-model="schedule.delivery_address"></b-form-input>
      </b-form-group>
    </b-card>
</template>

<script>
  import EventBus from '../../../utils/EventBus'
  import Datepicker from 'vuejs-datepicker';

  export default {
    name: "Schedule",
    props: ['type'],
    components: {
      Datepicker
    },
    data() {
      return {
        date_type: 'custom',
        schedule : {
          selected_time: '',
          selected_date: '',
          delivery_address: '',
        },

        disabledDates: {
          to: new Date(Date.now() - 8640000)
        }
      };
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
      addSchedule() {

        if(this.date_type==='regular')
        {
          this.schedule.selected_date = 'Regular Delivery';
        }
        else
        {
          this.changeDateFormat();
        }

        EventBus.$emit('schedule:add',this.schedule);
      }
    }
  }
</script>

<style scoped>

</style>
