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
          <input type="text"class="form-control" v-model="title">
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
        <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Create Notification</b-button>
      </form>
    </b-card>
</template>

<script>
  import axios from 'axios';
    export default {
        name: "NotificationCreate",

      data() {
        return {
          target_group: 'All Users',
          title: '',
          description: '',
          image: '',
        }
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
          formData.append('target_group', this.target_group);
          formData.append('title', this.title);
          formData.append('description', this.description);
          formData.append('image', this.image);

          const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
          axios.post(`${ADMIN_URL}/push-notifications/create`,formData,config)
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
