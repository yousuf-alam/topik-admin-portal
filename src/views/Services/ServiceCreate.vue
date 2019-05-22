<template>
  <b-card class="m-4">
    <h5 class="mb-4">Create New Service</h5>
    <form @submit="onSubmit" enctype="multipart/form-data">
       <div class="form-group">
         <label>Name*</label>

         <input type="text" name="name" class="form-control" v-model="name">
       </div>


       <div class="form-group">
         <label>Short Description</label>
         <textarea class="form-control" name="short_description" rows="3" v-model="short_description"></textarea>
       </div>

       <div class="form-group">
         <label>Long Description</label>
         <textarea class="form-control" name="long_description" rows="10" v-model="long_description"></textarea>

       </div>


       <div class="form-group">
         <label>Meta Title</label>
         <input type="text" name="meta_title" class="form-control" v-model="meta_title">
       </div>

       <div class="form-group">
         <label>Meta Description</label>
         <textarea class="form-control" name="meta_description" rows="10" v-model="meta_description"></textarea>
       </div>

       <div class="form-group">
         <div class="form-check checkbox">
           <input class="form-check-input" type="checkbox" name="published_status" v-model="published_status">
           <label class="form-check-label" >Published</label>
         </div>
       </div>

      <div class="form-group">
        <label>Icon (SVG)</label>
        <input type="file" class="form-control" v-on:change="onSVGChange">
      </div>
      <div class="form-group">
        <label>Icon (PDF)</label>
        <input type="file" class="form-control" v-on:change="onPDFChange">
      </div>
      <div class="form-group">
        <label>Thumbnail</label>
        <input type="file" class="form-control" v-on:change="onThumbnailChange">
      </div>
      <div class="form-group">
        <label>Banner (Web)</label>
        <input type="file" class="form-control" v-on:change="onBwebChange">
      </div>
      <div class="form-group">
        <label>Banner (Tab)</label>
        <input type="file" class="form-control" v-on:change="onBtabChange">
      </div>
      <div class="form-group">
        <label>Banner (iOS)</label>
        <input type="file" class="form-control" v-on:change="onBandChange">
      </div>
      <div class="form-group">
        <label>Banner (Android)</label>
        <input type="file" class="form-control" v-on:change="onBiosChange">
      </div>

      <b-button type="submit" value="Submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Create Service
      </b-button>
    </form>
  </b-card>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "ServiceCreate",
    created() {
        const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
        console.log('Service Create ADMIN_URL === ', ADMIN_URL);
    },
    data() {
      return {
        name: '',
        short_description: '',
        long_description: '',
        meta_title: '',
        meta_description: '',
        published_status: '',
        icon_svg: '',
        icon_pdf: '',
        thumbnail: '',
        banner_web: '',
        banner_tab: '',
        banner_android: '',
        banner_ios: '',
      }
    },
    methods: {

      onSVGChange(e) {
        this.icon_svg = e.target.files[0];
      },
      onPDFChange(e) {
        this.icon_pdf = e.target.files[0];
      },
      onThumbnailChange(e) {
        this.thumbnail = e.target.files[0];
      },
      onBwebChange(e) {
        this.banner_web = e.target.files[0];
      },
      onBtabChange(e) {
        this.banner_tab = e.target.files[0];
      },
      onBandChange(e) {
        this.banner_android = e.target.files[0];
      },
      onBiosChange(e) {
        this.banner_ios = e.target.files[0];
      },
      onSubmit(e) {
        e.preventDefault();
        let currentObj = this;
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
            'Accept' : 'application/json',
            }
        }


        let formData = new FormData();
        formData.append('name', this.name);
        formData.append('short_description', this.short_description);
        formData.append('long_description', this.long_description);
        formData.append('meta_title', this.meta_title);
        formData.append('meta_description', this.meta_description);
        formData.append('published_status', this.published_status);
        formData.append('icon_svg', this.icon_svg);
        formData.append('icon_pdf', this.icon_pdf);
        formData.append('thumbnail', this.thumbnail);
        formData.append('banner_web', this.banner_web);
        formData.append('banner_tab', this.banner_tab);
        formData.append('banner_android', this.banner_android);
        formData.append('banner_ios', this.banner_android);

        const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

        console.log(this.name);
        axios.post(`${ADMIN_URL}/services/create`,formData,config)
          .then(response => {
            console.log('Success', response);
            currentObj.success = response.data.success;
            console.log(response.data);
          })
          .catch(error => {
            console.log('Error  ... ', error.response);
            currentObj.output = error;
            console.log(error);
          });
      }
    }

  }
</script>

<style scoped>

</style>
