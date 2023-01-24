<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Edit Info">
        <b-card-text>
          <div class="form-group">
            <label>Type</label>
            <input class="form-control" type="text" v-model="type" :disabled="isDisabled">
          </div>
          <div class="form-group" v-if="this.type ==='clickable' || this.type === 'data_collector'">
            <label>Title</label>
            <input class="form-control" type="text" v-model="title">
          </div>
          <div  class="form-group" v-if="this.type ==='clickable' || this.type === 'data_collector'">
            <label>Description</label>
            <input class="form-control" type="text" v-model="description" >
          </div>
          <div  class="form-group" v-if="this.type ==='clickable'">
            <label>Link</label>
            <input class="form-control" type="text" v-model="link" >
          </div>

          <div  class="form-group" v-if="this.type ==='clickable' || this.type === 'data_collector'">
            <label>Button Text</label>
            <input class="form-control" type="text" v-model="buttonText">
          </div>

          <div  class="form-group">
            <label>Is  Active</label>
            <select class="form-control" v-model="isActive">
              <option value="1"> True</option>
              <option value="0"> False </option>
            </select>
          </div>

          <div  class="form-group" v-if="this.type ==='clickable' || this.type === 'image'">
            <label>Upload Image</label>
            <input class="form-control" type="file"   v-on:change="onImageChange">
          </div>



          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Edit Popup
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
  name: "EditPopupPromo",
  data(){
    return {

      popup_id:'',
      type:'',
      title:'',
      description:'',
      selectedFile:'',
      buttonText:'',
      link:'',
      image:'',
      oldType:'',
      oldTitle:'',
      oldDescription:'',
      oldButtonText:'',
      oldLink:'',
      popupItems:[],
      isActive:null,
      isDisabled: true
    }
  },
  created() {
    this.popup_id = this.$route.params.id;
    console.log('popup id',this.popup_id);
    this.getOld();

  },
  methods:{
    getOld(){
      axios.get(`${ADMIN_URL}/popup-promo/popup-item/${this.popup_id}`)
          .then(response => {

            this.popupItems = response.data.data;
            this.title = this.popupItems.title;
            this.type = this.popupItems.type;
            this.description = this.popupItems.description;
            this.link = this.popupItems.link;
            this.buttonText = this.popupItems.button_text;
            this.isActive = this.popupItems.is_active;
            // console.log('redeem id data',this.popupItems);
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
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('button_text', this.buttonText);
      formData.append('link', this.link);
      formData.append('is_active', this.isActive);
      formData.append('image', this.image);

      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
      // console.log("Formdata",formData);

      axios.post(`${ADMIN_URL}/popup-promo/update-popup/${this.popup_id}`, formData)
          .then(response => {
            console.log('Success', response);

            return this.$router.push('/popup-promo');

          })
          .catch(error => {

          });
    }
  }
}
</script>

<style scoped>

</style>
