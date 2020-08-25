<template>
  <b-card class="m-4">
    <h5 class="mb-4">Create Banner</h5>
    <form @submit="onSubmit" enctype="multipart/form-data">
      <div class="form-group">
        <label >Select Service Page</label>
        <select @change="getCategories" class='form-control' v-model="service_id">
          <option disabled selected value="-1">Select Service</option>
          <option :value="serv.id" v-for="serv in services" :key="serv.id">{{ serv.name }}</option>
          <option  value="0">Homepage</option>
        </select>
      </div>
      <div class="form-group">
        <label >Banner Type</label>
        <select class='form-control' v-model="type">
          <option value="hot-deals">Hot Deals Banner</option>
          <option value="beauty-on-demand">Beauty On-Demand Banner</option>
          <option value="tailor-on-demand">Tailor On-Demand Banner</option>
        </select>
      </div>
      <div class="form-group">
        <label>Title</label>
        <input type="text" class="form-control" v-model="title">
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea class="form-control" rows="3" v-model="description"></textarea>
      </div>
      <div class="form-group">
        <label>Image</label><br>
        <label class="text-danger">(Image Size should be (480 X 360) and less than 1 MB)</label>
        <input type="file" class="form-control" v-on:change="onImageChange">
      </div>
        <div class="form-group">
          <label>Select Landing Category</label>
          <select @change="getSubcategories" class='form-control' v-model="category_id">
            <option value="">None</option>
            <option :value="cat.id" v-for="cat in categories" :key="cat.id">{{ cat.name }}</option>
          </select>
        </div>
        <div v-if="service_id !== 2" class="form-group">
          <label >Select Landing Subcategory</label>
          <select class='form-control' v-model="subcategory_id">
            <option value="">None</option>
            <option :value="subcat.id" v-for="subcat in subcategories" :key="subcat.id">{{ subcat.name }}</option>
          </select>
        </div>
      <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Add Banner</b-button>
    </form>
  </b-card>
</template>

<script>
  import axios from 'axios';
  const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
  export default {
    name: "BannerCreate",

    data() {
      return {
        title: '',
        description: '',
        image: '',
        type: 'top-banner',
        services: '',
        categories: '',
        subcategories: '',
        service_id: '-1',
        category_id: '',
        subcategory_id: '',
      }
    },
    created() {

      axios.get(`${ADMIN_URL}/services`)
        .then(response => {
          this.services = response.data;
        })
        .catch(e => {
          //console.log("error occurs");
        });

      this.getAllCategories();
    },
    methods: {

      getAllCategories() {

          axios.get(`${ADMIN_URL}/all-categories`)
            .then(response => {
              this.categories = response.data;
            })
            .catch(e => {
              //console.log("error occurs");
            });
      },
      getCategories() {
         if(this.service_id === '0')
         {
           this.type = 'bottom-banner';
           this.getAllCategories();
         }
         else
         {
           axios.post(`${ADMIN_URL}/categories`, {
             service_id: this.service_id
           })
             .then(response => {
               this.categories = response.data;
             })
             .catch(e => {
               //console.log("error occurs");
             });
         }
      },
      getSubcategories() {

        axios.post(`${ADMIN_URL}/subcategories`, {
          category_id: this.category_id
        })
          .then(response => {
            this.subcategories = response.data;
          })
          .catch(e => {
            //console.log("error occurs");
          });

      },
      onImageChange(e) {
        this.image = e.target.files;
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
        formData.append('service_id', this.service_id);
        formData.append('category_id', this.category_id);
        formData.append('subcategory_id', this.subcategory_id);
        formData.append('title', this.title);
        formData.append('description', this.description);
        formData.append('type', this.type);
        formData.append('image', this.image);


        axios.post(`${ADMIN_URL}/banners/create`,formData,config)
          .then(response => {
            console.log('Success', response);
            currentObj.success = response.data.success;
            console.log(response.data);
            if(response.data.success===true)
            {
              this.$swal('Success',response.data.message,'success');
            }
            else
            {
              this.$swal('Error', 'Something went wrong', 'error');
            }
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
