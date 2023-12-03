<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Basic Info">
        <b-card-text>
          <div class="form-group">
            <label>Item</label>
            <input class="form-control" type="text" v-model="item" >
          </div>
          <div class="form-group">
            <label>Sub Item</label>
            <input class="form-control" type="text" v-model="sub_item">
          </div>

          <div  class="form-group">
            <label>Reward Name</label>
            <input class="form-control" type="text" v-model="name" >
          </div>

          <div  class="form-group">
            <label>Reward Point</label>
            <input class="form-control" type="text" v-model="reward_point" >
          </div>

          <div  class="form-group">
            <label>Sub Title</label>
            <input class="form-control" type="text" v-model="sub_title" >
          </div>

          <div  class="form-group">
            <label>Step</label>
            <input class="form-control" type="text" v-model="step" >
          </div>

          <div  class="form-group">
            <label>Link</label>
            <input class="form-control" type="text" v-model="link" >
          </div>

          <div  class="form-group">
            <label>Message</label>
            <input class="form-control" type="text" v-model="msg" >
          </div>





          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Create Redeem
          </b-button>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateRedeem",
  data(){
    return {
      item:'',
      sub_item:'',
      reward_point:'',
      name:'',
      sub_title:'',
      step:'',
      link:'',
      msg:''
    }
  },
  methods:{
    onSubmit() {

      let formData = {
        item:this.item,
        subItems:this.sub_item,
        rewardPoint:this.reward_point,
        name:this.name,
        sub_title:this.sub_title,
        step:this.step,
        link:this.link,
        msg:this.msg,
      }
      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/redeem/create-redeem`, formData)
          .then(response => {
            console.log('Success', response);

            return this.$router.push('/redeem');

          })
          .catch(error => {

          });
    }
  }
}
</script>

<style scoped>

</style>
