<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Edit Info">
        <b-card-text>
          <div class="form-group">
            <label>Start Date</label>
            <VueCtkDateTimePicker
              :overlay="true"
              :range="false"
              :no-label="true"
              label="Select Start Date"
              format="YYYY-MM-DD"
              color="#7D4E77"
              v-model="start_date"
              :disabled="isDisabled"
            />
          </div>
          <div class="form-group">
            <label>End Date</label>
            <VueCtkDateTimePicker
              :overlay="true"
              :range="false"
              :no-label="true"
              label="Select End Date"
              format="YYYY-MM-DD"
              color="#7D4E77"
              v-model="end_date"
              :disabled="isDisabled"
            />
          </div>
          <div class="form-group">
            <label>Status</label>
            <select class='form-control' v-model="status">
              <option value="1">Published</option>
              <option value="0">Unpublished</option>
            </select>
          </div>

          <b-button @click="onSubmit" variant="primary">
            <i class="fa fa-dot-circle-o"></i> Edit Payment Schedule
          </b-button>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import axios from "axios";
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

export default {
  name: "EditPaymentMethod",
  components: {
    VueCtkDateTimePicker
  },
  data(){
    return {
      start_date: '',
      end_date: '',
      status: '',
      payment_id: '',
      payments: [],
      isDisabled: false,
    }
  },
  created() {
    this.payment_id = this.$route.params.id;
    this.getOld();
  },
  methods: {
    getOld() {
      axios.get(`${ADMIN_URL}/advance-payment-edit/${this.payment_id}`)
        .then(response => {
          this.payments = response.data.data;
          this.start_date = this.payments.start_date;
          this.end_date = this.payments.end_date;
          this.status = this.payments.status;
        })
        .catch(e => {
          console.log("error occurs", e.response);
        });
    },
    onSubmit() {
      const formData = {
        start_date: this.start_date,
        end_date: this.end_date,
        status: this.status,
      };

      axios.put(`${ADMIN_URL}/advance-payment-update/${this.payment_id}`, formData)
        .then(response => {

          if (response.data.success === true) {
            this.$swal("Success",response.data.message, "success");

          return this.$router.push('/advance-payment-schedule');

          }
          else {
            this.$swal("Error", 'Advance Payment updated failed', "error");
          }

        })
        .catch(error => {
          console.log("error occurs", error.response);
        });
    }
  }
}
</script>

<style scoped>
 </style>
