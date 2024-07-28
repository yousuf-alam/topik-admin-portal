<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Basic Info">
        <b-card-text>

          <div class="form-group">
            <label>Start Date</label>
            <VueCtkDateTimePicker :overlay="true" :range="false" :no-label="true" label="Select Start Date" id="RangeDatePicker"
              format="YYYY-MM-DD" formatted="ll" color="#7D4E77" v-model="start_date" />
          </div>

          <div class="form-group">
            <label>End Date</label>
            <VueCtkDateTimePicker :overlay="true" :range="false" :no-label="true" label="Select End Date" id="RangeDatePicker"
              format="YYYY-MM-DD" formatted="ll" color="#7D4E77" v-model="end_date"/>
          </div>


          <div class="form-group">
            <label>Status</label>
            <select v-model="status" class="form-control">
              <option value="1">Published</option>
              <option value="0">Unpublished</option>
            </select>
          </div>


          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Create New Schedule
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
  name: "AdvancePaymentScheduleCreate",
  data() {
    return {

      start_date: '',
      end_date: '',
      status: '',



    }
  },

  methods: {


    onSubmit(e) {

      e.preventDefault();
      let currentObj = this;
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          'Accept': 'application/json',
        }
      };

      let formData = new FormData();
      formData.append('start_date', this.start_date);
      formData.append('end_date', this.end_date);
      formData.append('status', this.status);


      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/create-advance-payments`, formData)
        .then(response => {
          // console.log('Success', response);

          if (response.data.success === true) {
            this.$swal("Success",response.data.message, "success");

          return this.$router.push('/advance-payment-schedule');

          }
          else {
            this.$swal("Error", 'Advance Payment created failed', "error");
          }

        })
        .catch(error => {

        });
    }
  }
}
</script>

<style scoped></style>
