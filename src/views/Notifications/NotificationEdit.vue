<template>
  <b-card class="m-4">
    <h5 class="mb-4">Edit Notification</h5>
    <form @submit="onSubmit" enctype="multipart/form-data">
      <div class="form-group">
        <label >Target Group</label>
        <select class='form-control' v-model="notification.target_group">
          <option value="All Users">All Users</option>
          <option value="All Partners">All Partners</option>
        </select>
      </div>
      <div class="form-group">
        <label>Title</label>
        <input type="text"class="form-control" v-model="notification.title">
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea class="form-control" rows="3" v-model="notification.description"></textarea>
      </div>
      <div class="form-group">
        <label>Image (Optional)</label><br>
        <label class="text-danger">Image Size should be (480 X 360) and less than 1 MB</label><br>
        <img v-show="notification.image" :src="image_url" style="width: 200px; height: 150px;">
       <!-- <img v-show="notification.image" :src="src_image+notification.image" style="width: 200px; height: 150px;">-->
        <input type="file" class="form-control" v-on:change="onImageChange">
      </div>
      <div class="form-group">
        <label>Select Landing Category (Optional)</label>
        <select @change="getSubcategories" class='form-control' v-model="notification.category_id">
          <option value="0">None</option>
          <option :value="cat.id" v-for="cat in categories" :key="cat.id">{{ cat.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label >Select Landing Subcategory (Optional)</label>
        <select class='form-control' v-model="notification.subcategory_id">
          <option value="0">None</option>
          <option :value="subcat.id" v-for="subcat in subcategories" :key="subcat.id">{{ subcat.name }}</option>
        </select>
      </div>
      <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Edit Notification</b-button>
    </form>
  </b-card>
</template>

<script>
  import axios from 'axios';
  const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
  const BASE_URL = process.env.VUE_APP_BASE_URL;
  export default {
    name: "NotificationEdit",

    data() {
      return {
        notification: [],
        id: '',
        src_image: '/images/push_notifications/',
        image_url: '',
        categories: [],
        subcategories: []
      }
    },
    created() {
      this.getAllCategories();
      this.fetchNotification();
    },

    methods: {
      fetchNotification() {
          this.id = window.location.pathname.split("/").pop();
          axios.post(`${ADMIN_URL}/push-notifications/show`,
              {
                  id: this.id
              }).then(response => {
              this.notification = response.data;
              this.image_url = BASE_URL + this.src_image + response.data.image;
              this.getSubcategories();
          })
              .catch(e => {
                  console.log("error occurs", e);
              });
      },

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
              category_id: this.notification.category_id
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
        const file = e.target.files[0];
        if (file === undefined) {
          return;
        }
        this.notification.image = file;
        this.image_url = URL.createObjectURL(file);
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
        formData.append('id', this.notification.id);
        formData.append('target_group', this.notification.target_group);
        formData.append('title', this.notification.title);
        formData.append('description', this.notification.description);
        formData.append('image', this.notification.image);
        formData.append('category_id', this.notification.category_id);
        formData.append('subcategory_id', this.notification.subcategory_id);

        const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
        axios.post(`${ADMIN_URL}/push-notifications/edit`,formData,config)
          .then(response => {
            currentObj.success = response.data.success;
            console.log(response.data);
            if(response.data.success===true)
            {
              this.$swal(response.data.message, '', 'success');
            }
            else
            {
              this.$swal('Something went wrong', '', 'error');
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
