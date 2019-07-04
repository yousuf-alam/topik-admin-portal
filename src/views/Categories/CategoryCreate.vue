<template>
  <b-card class="m-4">
    <h5 class="mb-4">Create New Category</h5>
    <form @submit="onSubmit" enctype="multipart/form-data">
      <div class="form-group">
        <label>Select Service:</label>
        <select class='form-control' v-model="service_id" @change="getCategories">
          <option v-for="serv in services" :value="serv.id" :key="serv.id">{{ serv.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label>Select Category:</label>
        <select class='form-control' v-model="group">
          <option selected value="none">Select none to add itself as a category </option>
          <option v-for="cat in categories" :value="cat.id" :key="cat.id">{{ cat.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label>Name*</label>
        <input type="text" name="name" class="form-control" v-model="name"
        @keyup="handleFieldChange" ref="name" required>
        <span class="text-danger"> {{name_error}} </span>
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
          <input class="form-check-input" type="checkbox" id="published_status" name="published_status" v-model="published_status">
          <label class="form-check-label" for="published_status">Published</label>
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

      <b-button type="submit" value="Submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Create Category
      </b-button>
    </form>
  </b-card>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "CategoryCreate",
    data() {
      return {
        services: '',
        categories: '',
        group: 'none',
        name: '',
        service_id: '1',
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

        name_error: ''

      }
    },
    created(){
      this.fetchServiceData();

    },
    methods: {
      fetchServiceData() {
        const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
        axios.get(`${ADMIN_URL}/services`)
          .then(response => {
            this.services = response.data;
              // console.log('services ===== ==== ', response.data);
              /* Below two lines added because of: Automatically loading categories of first service.*/
              this.service_id = this.services[0].id;
              this.getCategories();
          })
          .catch(e => {
            // console.log("error occurs");
          });
      },

      getCategories(){
        const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
        axios.post(`${ADMIN_URL}/categories`,{
          service_id: this.service_id
        })
          .then(response =>{
            this.categories = response.data;
          })
          .catch(e=>{
            //console.log("error occurs");
          });

      },
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
      handleFieldChange(e) {
       const field_name = e.target.name;
       if (field_name === 'name') {
         this.name_error = ''
       }
      },
      onSubmit(e) {
        e.preventDefault();
        let currentObj = this;
        const config = {
          headers: {'content-type': 'multipart/form-data'}
        }


        let formData = new FormData();
        formData.append('name', this.name);
        formData.append('group', this.group);
        formData.append('service_id', this.service_id);
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
        // console.log(this.name);
        axios.post(`${ADMIN_URL}/categories/create`,formData,config)
          .then(response => {
            //console.log('Success', response);
            currentObj.success = response.data.success;
            if(response.data.success===true)
            {
              this.$swal('Success',response.data.message,'success');
            }
            else
            {
              this.$swal('Error', 'Something went wrong', 'error');
            }
            this.$router.push({ name: 'Categories'})
            //console.log(response.data);
          })
          .catch(error => {
            //console.log('Error  ... ', error.response);
            currentObj.output = error;
            if (error.response.status === 422) {
              this.name_error = error.response.data.errors.name[0];
              this.$refs.name.focus();
            }
          });
      }
    }

  }
</script>

<style scoped>

</style>
