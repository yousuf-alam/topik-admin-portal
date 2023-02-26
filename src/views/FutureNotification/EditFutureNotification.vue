<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active message="Edit Content">
        <b-card-text>
          <div class="form-group">
            <label>Type</label>
            <input class="form-control" type="text" v-model="type" :disabled="isDisabled">
          </div>
          <div class="form-group">
            <label>message</label>
            <input class="form-control" type="text" v-model="message">
          </div>
          <div  class="form-group">
            <label>days</label>
            <input class="form-control" type="text" v-model="days" >
          </div>
          
          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Edit Content
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
  name: "EditFutureNotification",
  data(){
    return {

      content_id:'',
      type:'',
      message:'',
      days:'',
      lineitem_id:'',
      contentItems:[],
      isActive:null,
      isDisabled: true
    }
  },
  created() {
    this.content_id = this.$route.params.id;
    console.log('popup id',this.content_id);
    this.getOld();

  },
  methods:{
    getOld(){
      axios.get(`${ADMIN_URL}/future-notification/content-item/${this.content_id}`)
          .then(response => {

            this.contentItems = response.data.data;
            this.message = this.contentItems.message;
            this.type = this.contentItems.type;
            this.days = this.contentItems.days;
            this.lineitem_id = this.contentItems.lineitem_id;

            // console.log('redeem id data',this.contentItems);
          })
          .catch(e => {
            console.log("error occurs", e.response);
          });
    },
    onImageChange(e) {
      this.image = e.target.files[0];
    },
    onSubmit(e) {
      e.preventDefault();
      let currentObj = this;
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          'Accept' : 'application/json',
        }
      };

      let formData = new FormData();
      formData.append('type', this.type);
      formData.append('message', this.message);
      formData.append('days', this.days);
      formData.append('lineitem_id', this.lineitem_id);


      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
      // console.log("Formdata",formData);

      axios.post(`${ADMIN_URL}/future-notification/update-content/${this.content_id}`, formData)
          .then(response => {
            console.log('Success', response);

            return this.$router.push('/show-future-notification');

          })
          .catch(error => {

          });
    }
  }
}
</script>

<style scoped>

</style>
