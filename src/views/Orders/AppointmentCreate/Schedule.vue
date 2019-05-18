<template>
    <b-card class="m-4">
        <h5 class="mb-4">Date & Schedule</h5>
        <b-form-group label="Select Date">
          <datepicker @change="addSchedule" v-model="schedule.selected_date" :disabledDates="disabledDates"></datepicker>
        </b-form-group>
        <b-form-group label="Select Time">
          <select @change="addSchedule" class="form-control" v-model="schedule.selected_time">
            <option value="08:00AM - 10:00AM">08:00 AM - 10:00 AM</option>
            <option value="10:00AM - 12:00PM">10:00 AM - 12:00 PM</option>
            <option value="12:00PM - 02:00PM">12:00 PM - 02:00 PM</option>
            <option value="02:00PM - 04:00PM">02:00 PM - 04:00 PM</option>
            <option value="04:00PM - 06:00PM">04:00 PM - 06:00 PM</option>
            <option value="06:00PM - 08:00PM">06:00 PM - 08:00 PM</option>
            <option value="08:00PM - 10:00PM">08:00 PM - 10:00 PM</option>
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

        disabledDates: {
          to: new Date(Date.now() - 8640000)
        }
      };
    },
    methods: {
      addSchedule() {
        EventBus.$emit('schedule:add',this.schedule);
      }
    }
  }
</script>

<style scoped>

</style>
