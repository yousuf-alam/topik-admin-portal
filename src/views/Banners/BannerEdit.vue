<template>
  <b-card class="m-4">
    <h5 class="mb-4">Create Banner</h5>
    <form @submit="onSubmit" enctype="multipart/form-data">
      <!--<div class="form-group">
        <label >Select Service Page</label>
        <select @change="getCategories" class='form-control' v-model="banner.service_id">
          <option :value="banner.service_id">{{ serv.name }}</option>
          <option :value="serv.id" v-for="serv in services">{{ serv.name }}</option>
        </select>
      </div>-->
      <div class="form-group">
        <label >Banner Type</label>
        <!-- <select class='form-control' v-model="type" v-if="service_id === '0'">
          <option value="hot-deals">Hot Deals Banner</option>
          <option value="beauty-on-demand">Beauty On-Demand Banner</option>
          <option value="tailor-on-demand">Tailor On-Demand Banner</option>
        </select> -->
        <select class='form-control' v-model="type">
          <option value="top-banner">Top Banner</option>
          <option value="bottom-banner">Bottom Banner</option>
        </select>
      </div>
      <div class="form-group">
        <label>Title</label>
        <input type="text" class="form-control" v-model="banner.title">
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea class="form-control" rows="3" v-model="banner.description"></textarea>
      </div>
      <div class="form-group">
        <label>Image</label><br>
        <label class="text-danger">(Image Size should be (480 X 360) and less than 1 MB)</label><br>
        <img :src="src_image+banner.image" style="width: 200px; height: 150px;">
        <input type="file" class="form-control" v-on:change="onImageChange">
      </div>
      <div class="form-group">
        <label>Select Landing Category</label>
        <select @change="getSubcategories" class='form-control' v-model="banner.category_id">
          <option :value="cat.id" v-for="cat in categories" :key="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>
      <div v-if="banner.service_id !== 2" class="form-group">
        <label >Select Landing Subcategory</label>
        <select class='form-control' v-model="banner.subcategory_id">
          <option :value="subcat.id" v-for="subcat in subcategories" :key="subcat.id">
            {{ subcat.name }}
          </option>
        </select>
      </div>
      <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Edit Banner</b-button>
    </form>
  </b-card>
</template>

<script>
  import axios from 'axios';
  const Admin_URL = process.env.VUE_APP_ADMIN_URL;
  const BASE_URL  = process.env.VUE_APP_BASE_URL;
  export default {
    name: "BannerEdit",

    data() {
      return {
        banner: [],
        src_image : '/images/banners/',
        services: '',
        categories: '',
        subcategories: '',

      }
    },
    created() {
      
      this.src_image = BASE_URL + this.src_image;
      this.banner.id= window.location.pathname.split("/").pop();
      this.getServices();
      this.getCategories();
      this.getSubcategories();
      axios.post(`${Admin_URL}/banners/show`,
        {
          id: this.banner.id
        }).then(response =>{
        this.banner = response.data;
      })
        .catch(e=>{
          console.log("error occurs",e);
        });

    },
    methods: {

      getServices() {
        
        axios.get(`${Admin_URL}/services`)
          .then(response => {
            this.services = response.data;
          })
          .catch(e => {
            //console.log("error occurs");
          });
      },
      getCategories() {
        
        axios.get(`${Admin_URL}/all-categories`, {
         // service_id: this.banner.service_id
        })
          .then(response => {
            this.categories = response.data;
          })
          .catch(e => {
            //console.log("error occurs");
          });

      },
      getSubcategories() {
        
        axios.post(`${Admin_URL}/subcategories`, {
          category_id: this.banner.category_id
        })
          .then(response => {
            this.subcategories = response.data;
            console.log(this.subcategories);
          })
          .catch(e => {
            console.log("error occurs",e);
          });

      },
      onImageChange(e) {
        this.banner.image = e.target.files[0];
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
        formData.append('id', this.banner.id);
        formData.append('service_id', this.banner.service_id);
        formData.append('category_id', this.banner.category_id);
        formData.append('subcategory_id', this.banner.subcategory_id);
        formData.append('title', this.banner.title);
        formData.append('description', this.banner.description);
        formData.append('type', this.banner.type);
        formData.append('image', this.banner.image);

        
        axios.post(`${Admin_URL}/banners/edit`,formData,config)
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
