<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Create Popup">
        <b-card-text>
          <!--          <b-form-group label="Scheduled Date">-->
          <!--            <datepicker input-class="date-input" @input="changeDateFormat()" v-model="date" ></datepicker>-->
          <!--          </b-form-group>-->
          <div class="form-group">
            <label>Select Type</label>
            <select class="form-control" v-model="type">
              <option value="data_collector"> Data Collector </option>
              <option value="clickable"> Clickable </option>
              <option value="image"> Image </option>

            </select>
          </div>
          <div class="form-group" v-if="type ==='clickable' || type === 'data_collector'">
            <label>Title</label>

            <input class="form-control" type="text" v-model="title"  >
          </div>
          <div  class="form-group" v-if="type ==='clickable' || type === 'data_collector'">
            <label>Description</label>
            <input class="form-control" type="text" v-model="description"  >
          </div>
          <div  class="form-group" v-if="type ==='clickable' || type === 'image'">
            <label>Upload Image</label>
            <input class="form-control" type="file"   v-on:change="onImageChange">
          </div>
          <div  class="form-group" v-if="type ==='clickable'">
            <label>Link</label>
            <input class="form-control" type="text" v-model="link" >
          </div>
          <div  class="form-group" v-if="type ==='clickable' || type === 'data_collector'">
            <label>Button Text</label>
            <input class="form-control" type="text" v-model="buttonText"  >
          </div>

          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Create Slot
          </b-button>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import axios from 'axios';
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
export default {
  name: "CreatePopup",
  data(){
    return {
      type:'',
      title:'',
      description:'',
      selectedFile:'',
      buttonText:'',
      link:'',
      image:''


    }
  },
  methods:{

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

      formData.append('image', this.image);



      // let formData = {
      //   type:this.type,
      //   title:this.title,
      //   description:this.description,
      //   buttonText:this.buttonText,
      //   link:this.link,
      //   image:this.image
      // }






      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/popup-promo/create-popup`, formData)
          .then(response => {
            console.log('Success', response);

            return this.$router.push('/popup-promo');

          })
          .catch(error => {

          });
    },
    // changeDateFormat(){
    //   let d = this.date;
    //   let month = '' + (d.getMonth() + 1);
    //   let day = '' + d.getDate();
    //   let year = d.getFullYear();
    //   if (month.length < 2) month = '0' + month;
    //   if (day.length < 2) day = '0' + day;
    //
    //   this.date =  [year, month, day].join('-');
    // },
  }
}
</script>

<style scoped>

</style>
