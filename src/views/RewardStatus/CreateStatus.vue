<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Basic Info">
        <b-card-text>
          <div class="form-group">
            <label>Low limit</label>
            <input class="form-control" type="number" v-model="low_limit" >
          </div>
          <div class="form-group">
            <label>High  Limit</label>
            <input class="form-control" type="number" v-model="high_limit">
          </div>

          <div  class="form-group">
            <label>Status</label>
            <input class="form-control" type="text" v-model="status" >
          </div>

          <div  class="form-group">
            <label>Background Color</label>
            <input class="form-control" type="text" v-model="background_color" >
          </div>

          <div  class="form-group">
            <label>Points Color</label>
            <input class="form-control" type="text" v-model="points_color" >
          </div>

            <div  class="form-group">
            <label>Progress Background Color</label>
            <input class="form-control" type="text" v-model="progress_bg_color" >
          </div>

            <div  class="form-group">
            <label>Bottom Text Color</label>
            <input class="form-control" type="text" v-model="bottom_text_color" >
          </div>
 
         
  
        

          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Create Status
          </b-button>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import axios from "axios";
export default {
  name: "CreateStatus",
  data(){
    return {
      low_limit:'',
      high_limit:'',
      status:'',
     background_color:'',
     points_color:'',
     progress_bg_color:'',
     bottom_text_color:''

    }
  },
  methods:{
    onSubmit() {
      let formData = {
        low_limit:this.low_limit,
        high_limit:this.high_limit,
        status:this.status,
       background_color:this.background_color,
       points_color:this.points_color,
       progress_bg_color:this.progress_bg_color,
       bottom_text_color:this.bottom_text_color

      }

      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/reward-status/create-status`, formData)
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
