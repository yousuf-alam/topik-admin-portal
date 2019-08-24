<template>
    <b-card class="m-4">
        <h5 class="mb-4">Create Notification</h5>
      <form @submit="onSubmit" enctype="multipart/form-data">
        <div class="form-group">
          <label >Target Group</label>
            <select class='form-control' v-model="target_group">
              <option value="All Users" selected>All Users</option>
              <option value="All Partners">All Partners</option>
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
          <label>Image (Optional)</label><br>
          <label class="text-danger">Image Size should be (480 X 360) and less than 1 MB</label>
          <input type="file" class="form-control" v-on:change="onImageChange">
        </div>
        <div class="form-group">
          <label>Select Landing Category (Optional)</label>
          <select @change="getSubcategories" class='form-control' v-model="category_id">
            <option value="0">None</option>
            <option :value="cat.id" v-for="cat in categories" :key="cat.id">{{ cat.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label >Select Landing Subcategory (Optional)</label>
          <select class='form-control' v-model="subcategory_id">
            <option value="0">None</option>
            <option :value="subcat.id" v-for="subcat in subcategories" :key="subcat.id">{{ subcat.name }}</option>
          </select>
        </div>
        <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Create Notification</b-button>
      </form>
    </b-card>
</template>

<script>
  import axios from 'axios';
  const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
    export default {
        name: "NotificationCreate",

      data() {
        return {
          target_group: 'All Users',
          title: '',
          description: '',
          image: '',
          category_id: 0,
          subcategory_id : 0,
          categories: [],
          subcategories: []
        }
      },
      created() {
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
          formData.append('target_group', this.target_group);
          formData.append('title', this.title);
          formData.append('description', this.description);
          formData.append('image', this.image);
          formData.append('category_id', this.category_id);
          formData.append('subcategory_id', this.subcategory_id);

          const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
          axios.post(`${ADMIN_URL}/push-notifications/create`,formData,config)
            .then(response => {
              console.log('Success', response);
              currentObj.success = response.data.success;
              console.log(response.data);
              if(response.data.success===true)
              {
                this.$swal('Success',response.data.message,'success');
                window.location.href='/notifications';
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
