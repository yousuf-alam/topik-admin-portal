<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Edit Leave">
        <b-card-text>
          <div class="form-group">
            <label>Name</label>
            <input class="form-control" type="text" v-model="partner_id" :disabled="isDisabled">
          </div>
          <div class="form-group">
            <label>Leave Date</label>
            <input class="form-control" type="text" v-model="leave_date"   >
          </div>
          <div class="form-group">
            <label>Type</label>
            <input class="form-control" type="text" v-model="type">
          </div>
          <div  class="form-group">
            <label>Status</label>
            <input class="form-control" type="text" v-model="status">
          </div>
          <div  class="form-group">
            <label>Remarks</label>
            <input class="form-control" type="text" v-model="remarks">
          </div>
          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Edit Leave
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
  name: "EditRedeem",
  data(){
    return {
      partners:[],
      name:'',
      leave_date:'',
      type:'',
      leave_id:'',
      partner_id:'',
      status:'',
      remarks:'',
      isDisabled: true,
    }
  },
  created() {
    this.leave_id = this.$route.params.id;
    console.log('redeem id',this.leave_id);
    this.getOld();

  },
  methods:{
    getOld(){
      axios.get(`${ADMIN_URL}/partner-leaves/${this.leave_id}`)
          .then(response => {

            this.partners = response.data.data;
            this.partner_id = this.partners.partner_id;
            this.leave_date = this.partners.leave_date;
            this.type = this.partners.type;
            this.status=this.partners.status;
            this.remarks=this.partners.remarks;
            console.log('partner id data',this.partners);
          })
          .catch(e => {
            console.log("error occurs", e.response);
          });
    },
    onSubmit() {

      let formData = {
        partner_id:this.partner_id,
        leave_date:this.leave_date,
        type:this.type,
        status:this.status,
        remarks:this.remarks,
      }

      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.put(`${ADMIN_URL}/partner-leaves/${this.leave_id}`, formData)
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
