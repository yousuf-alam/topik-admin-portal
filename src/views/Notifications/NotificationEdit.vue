<template>
  <b-card class="m-4">
    <h5 class="mb-4">Create Notification</h5>
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
        <img v-show="notification.image" :src="src_image+notification.image" style="width: 200px; height: 150px;">
        <input type="file" class="form-control" v-on:change="onImageChange">
      </div>
      <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Create Notification</b-button>
    </form>
  </b-card>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "NotificationEdit",

    data() {
      return {
        notification: [],
        id: '',
        src_image: '/images/push_notifications/'
      }
    },
    created() {
      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
      this.src_image = ADMIN_URL + this.src_image;
      this.id = window.location.pathname.split("/").pop();

      axios.post(`${ADMIN_URL}/push-notifications/show`,
        {
          id: this.id
        }).then(response => {
        this.notification = response.data;
      })
        .catch(e => {
          console.log("error occurs", e);
        });

    },
    methods: {

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
        }

        let formData = new FormData();
        formData.append('target_group', this.notification.target_group);
        formData.append('title', this.notification.title);
        formData.append('description', this.notification.description);
        formData.append('image', this.notification.image);

        const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
        axios.post(`${ADMIN_URL}/push-notifications/edit`,formData,config)
          .then(response => {
            console.log('Success', response);
            currentObj.success = response.data.success;
            console.log(response.data);
            window.location.reload();
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
