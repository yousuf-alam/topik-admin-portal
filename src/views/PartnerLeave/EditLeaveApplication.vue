<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Edit Application">
        <b-card-text>
          <div class="form-group">
            <label>Name</label>
            <input class="form-control" type="text" v-model="name" disabled>
          </div>

          <div class="form-group">
            <label>From Date</label>
            <input class="form-control" type="text" v-model="from_date">
          </div>
          <div class="form-group">
            <label>To Date</label>
            <input class="form-control" type="text" v-model="to_date">
          </div>
          <div class="form-group">
            <label>Remarks</label>
            <input class="form-control" type="text" v-model="remarks">
          </div>

          <div class="form-group">
            <label>Status</label>
            <select class="form-control" v-model="status" >
              <option value="0">Approve</option>
              <option value="1">Reject</option>
            </select>
          </div>

          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Edit Application
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
  name: "EditLeaveApplication",

  data(){
    return {
      name:'',
      from_date:'',
      to_date:'',
      status:'',
      remarks:'',
      type:'',
      data:[],
      isDisabled: true,
    }
  },
  created() {
    this.app_id = this.$route.params.id;
    // console.log('order id',this.time_id);
    this.getOld();

  },
  methods:{
    getOld(){
      axios.get(`${ADMIN_URL}/in-house-leave/get-application/${this.app_id}`)
        .then(response => {

          this.data = response.data.data;
          this.name = this.data.name;
          this.from_date = this.data.from_date;
          this.to_date = this.data.to_date;
          this.remarks = this.data.remarks;
          this.status = this.data.status;


          // console.log('order id data',this.data);
        })
        .catch(e => {
          console.log("error occurs", e.response);
        });
    },
    onSubmit() {

      let formData = {
        from_date:this.from_date,
        to_date:this.to_date,
        remarks:this.remarks,
        status:this.status

      }

      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.put(`${ADMIN_URL}/in-house-leave-application/update/${this.app_id}`, formData)
        .then(response => {
          console.log('Success', response);

          return this.$router.push('/leave-approval');

        })
        .catch(error => {

        });
    }
  }
}
</script>

<style scoped>

</style>
