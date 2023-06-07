<template>
<div>

  <b-row v-if="getUserPermission('admin')">
    <b-col>
      <b-card title="Leave Log History">
        <table class="table table-striped table-bordered" style="display: block;overflow-x: auto;">
          <thead>
          <tr>
            <th>Description</th>
            <th>Old Data</th>
            <th>New Data</th>
            <th>User</th>
            <th>Updated At</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in leaves">

            <td>{{item.description}}</td>
            <td>{{item.old}}</td>
            <td>{{item.new}}</td>
            <td>{{item.causer_id}}</td>
            <td>{{item.updated_at}}</td>
          </tr>
          </tbody>
        </table>
      </b-card>
    </b-col>
  </b-row>
</div>
</template>

<script>
import axios from "axios";
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

export default {
  name: "LeaveLog",
  data() {
    return {
      leaves: [],
      leave_id: this.$route.params.id,

    }
  },
  created() {
    this.leave_id = this.$route.params.id;
    this.getOrderLog();
  },
  methods: {
    getOrderLog(){
      axios.get(`${ADMIN_URL}/partner-leaves-log/${this.leave_id}`)
          .then(response => {

            this.leaves = response.data.data;


          })
          .catch(e => {
            console.log("error occurs", e.response);
          });
    },
  }



}
</script>

<style scoped>

</style>
