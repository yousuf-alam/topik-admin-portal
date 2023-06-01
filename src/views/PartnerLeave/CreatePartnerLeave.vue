<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Leave Info">
        <b-card-text>
          <div class="form-group">
            <label>Name</label>
<!--            <input class="form-control" type="text" v-model="partner_id" >-->
            <select name="" id="" v-model="partner_id" class="form-control">
              <option v-for="item in inHouse" :value=item.id>{{item.name}}</option>
            </select>

          </div>
          <div class="form-group">
            <label>Leave Date</label>
<!--            <input class="form-control" type="text" v-model="leave_date">-->
            <VueCtkDateTimePicker
                :overlay=true
                :range=false
                :no-label=true
                label="Select"
                id="RangeDatePicker"
                format="YYYY-MM-DD"
                formatted="ll"
                color="#7D4E77"
                v-model="leave_date"
            >
            </VueCtkDateTimePicker>
          </div>

          <div  class="form-group">
            <label>Type</label>
            <select name="" id="" class="form-control" v-model="type">
              <option value="day_off">Day Off</option>
              <option value="leave">Leave</option>

            </select>
          </div>

          <div  class="form-group">
            <label>Status</label>
            <select name="" id="" class="form-control" v-model="status">
              <option value="pending">Paid</option>
              <option value="approved">Unpaid</option>

            </select>
          </div>

          <div  class="form-group">
            <label>Remarks</label>
            <input class="form-control" type="text" v-model="remarks" >
          </div>

          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Create Leave
          </b-button>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import axios from "axios";
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import Vue from "vue";
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);

export default {
  name: "CreatePartnerLeave",
  data(){
    return {
      partner_id:'',
      leave_date:'',
      type:'',
      status:'',
      remarks:'',
      inHouse:[],
    }
  },
  created() {
    const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
    axios.get(`${ADMIN_URL}/in-house-partners`)
        .then(response => {
          console.log('response',response);
          this.inHouse = response.data.data;
        })
        .catch(e => {
          console.log("error occurs", e.response);
        });
  },
  methods:{
    onSubmit() {

      let formData = {
        partner_id:this.partner_id,
        leave_date:this.leave_date,
        type:this.type,
        status:this.status,
        remarks:this.remarks,
      }
      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/partner-leaves`, formData)
          .then(response => {
            console.log('Success', response);

            return this.$router.push('/partner-leave');

          })
          .catch(error => {

          });
    }
  }
}
</script>

<style scoped>

</style>
