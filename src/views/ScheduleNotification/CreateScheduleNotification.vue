<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Schedule Notification Info">
        <b-card-text>
          <div class="form-group">
            <label>Select  Content</label>
            <select v-model="notification_id" class="form-control">
              <option v-for="content in contents" :key="content.id" :value="content.id">{{ content.name}} </option>>
            </select>
          </div>

          <div  class="form-group">
            <label>Schedule Time</label>
            <input class="form-control" type="text" v-model="time" >
          </div>

          <div  class="form-group">
            <label>Receive date</label>
            <VueCtkDateTimePicker
              :overlay="true"
              :range="true"
              :no-label="true"
              label="Select"
              id="RangeDatePicker"
              format="YYYY-MM-DD"
              formatted="ll"
              color="#7D4E77"
              v-model="date_range"
            />
          </div>


          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Create Notification
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
  name: "CreatePayment",
  data(){
    return {
      notification_id:'',
      time:'',
      date_range: {
        startDate: null,
        endDate: null
      },
      contents:[]



    }
  },
  mounted() {
    this.getContents();
  },
  methods:{
    getContents() {
      axios.get(`${ADMIN_URL}/schedule-notification-data/get-active-content`)
        .then(response => {
          this.contents = response.data.data;
          console.log(this.contents);
        })
        .catch(error => {

        });
    },
    onSubmit() {
      // console.log('date range', this.date_range.start)
      let formData = {
        notification_id:this.notification_id,
        startDate: this.date_range.start,
        endDate: this.date_range.end,
        time:this.time,
      }

      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/schedule-notification/create-notification`, formData)
        .then(response => {
          console.log('Success', response);

          return this.$router.push('/schedule-notification');

        })
        .catch(error => {

        });
    }
  }
}
</script>

<style scoped>

</style>
