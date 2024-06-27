<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Edit Info">
        <b-card-text>
          <div class="form-group">
            <label>Low Limit</label>
            <input class="form-control" type="text" v-model="low_limit">
          </div>
          <div class="form-group">
            <label>High Limit</label>
            <input class="form-control" type="text" v-model="high_limit" >
          </div>
          <div  class="form-group">
            <label>Status</label>
            <input class="form-control" type="text" v-model="status" >
          </div>

           <div  class="form-group">
            <label>Status Colour</label>
            <input class="form-control" type="text" v-model="status_color" >
          </div>

           <div  class="form-group">
            <label>Background Colour</label>
            <input class="form-control" type="text" v-model="background_color" >
          </div>

           <div  class="form-group">
            <label>Points Colour</label>
            <input class="form-control" type="text" v-model="points_color" >
          </div>

           <div  class="form-group">
            <label>Progress Background Colour</label>
            <input class="form-control" type="text" v-model="progress_bg_color" >
          </div>

           <div  class="form-group">
            <label>Bottom Text Colour</label>
            <input class="form-control" type="text" v-model="bottom_text_color" >
          </div>

          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Edit Status
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
  name: "EditStatus",

  data(){
    return {
      low_limit:'',
      high_limit:'',
      status:'',
      status_id:'',
      status_color:'',
      background_color:'',
      points_color:'',
      progress_bg_color:'',
      bottom_text_color:''

    }
  },
  created() {
    this.status_id = this.$route.params.id;

    this.getOld();

  },
  methods:{
    getOld(){
      axios.get(`${ADMIN_URL}/reward-status/status-item/${this.status_id}`)
          .then(response => {

            this.reward = response.data.data;
            this.low_limit = this.reward.low_limit;
            this.high_limit = this.reward.high_limit;
            this.status=this.reward.status;
            this.status_color=this.reward.status_color;
            this.background_color=this.reward.background_color;
            this.points_color=this.reward.points_color;
            this.progress_bg_color=this.reward.progress_bg_color;
            this.bottom_text_color=this.reward.bottom_text_color;

          })
          .catch(e => {
            console.log("error occurs", e.response);
          });
    },
    onSubmit() {

      let formData = {
        low_limit:this.low_limit,
        high_limit:this.high_limit,
        status:this.status,
        status_color:this.status_color,
        background_color:this.background_color,
        points_color:this.points_color,
        progress_bg_color:this.progress_bg_color,
        bottom_text_color:this.bottom_text_color
      }

      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.put(`${ADMIN_URL}/reward-status/update-status/${this.status_id}`, formData)
          .then(response => {
            console.log('Success', response);

            return this.$router.push('/reward-status');

          })
          .catch(error => {

          });
    }
  }
}
</script>

<style scoped>

</style>
