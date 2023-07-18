<template>
    <b-card class="m-4 p-4">
        <h5 class="mb-4">Date & Schedule</h5>
      <div v-show="service_id===2">
        <label>Select Delivery Type</label>
        <b-form-group class="ml-4">
          <input type="radio" v-model="date_type" @change="addSchedule" value="regular">
          <label>Regular Delivery</label><br>
          <input type="radio" v-model="date_type" @change="addSchedule" value="custom">
          <label>Emergency Delivery</label>
        </b-form-group>
      </div>

      <b-form-group v-show="date_type==='custom'" label="Select Date">
        <datepicker v-model="schedule.selected_date" @input="changeDateFormat" :disabled-dates="disabledDates"></datepicker>
      </b-form-group>
      <b-form-group v-show="service_id!==2" label="Select Time">
        <select @change="addSchedule" class="form-control" v-model="schedule.selected_time">
          <option value="09.00AM-12.00PM"> 09:00 AM - 12:00 PM </option>
          <option value="12.00PM-03.00PM"> 12:00 PM - 03:00 PM </option>
          <option value="03.00PM-06.00PM"> 03:00 PM - 06:00 PM </option>
          <option value="06.00PM-09.00PM"> 06:00 PM - 09:00 PM </option>
        </select>
      </b-form-group>

      <b-form-group label="Delivery Address">
          <b-form-input type="text" v-model="schedule.address.address_details"></b-form-input>
         <!-- <span class="text-danger font-sm"> {{schedule.address_warning}} </span>-->
      </b-form-group>
    </b-card>
</template>

<script>
  import EventBus from '../../../utils/EventBus'
  import Datepicker from 'vuejs-datepicker';

  export default {
    name: "Schedule",
    props: ['service_id'],
    components: {
      Datepicker
    },
    data() {
      return {
        date_type: 'custom',
        schedule : {
          selected_time: '',
          selected_date: '',
          address : {
            name: 'service',
            latitude: '',
            longitude: '',
            address_details: '',
            map_details: ''
          },
            address_warning: ''
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
        EventBus.$emit('schedule:add',this.schedule);
      },
      addSchedule() {

        if(this.date_type==='regular')
        {
          this.schedule.selected_date = 'Regular Delivery';
        }

        EventBus.$emit('schedule:add',this.schedule);
      },
        /*onKeyUpAddress(event) {
            const addressIsValid = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};:\\|,.<>\/?]*$/i.test(this.schedule.address.address_details);

            if (addressIsValid === false) {
                this.address_warning = 'Invalid address. (Avoid using double quotes / special characters)';
            } else {
                this.address_warning = '';
            }

        },*/
    }
  }
</script>

<style scoped>

</style>
