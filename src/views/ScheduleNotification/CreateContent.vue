<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Basic Info">
        <b-card-text>
          <div class="form-group">
            <label>Name</label>
            <input class="form-control" type="text" v-model="name" >
          </div>
          <div class="form-group">
            <label>Title</label>
            <input class="form-control" type="text" v-model="title" >
          </div>
          <div class="form-group">
            <label>Body</label>
            <input class="form-control" type="text" v-model="body" >
          </div>
          <div class="form-group">
            <label>Image</label><br>
            <label class="text-danger">(Image Size should be (480 X 360) and less than 200 KB)</label>
            <input type="file" class="form-control" v-on:change="onImageChange">
          </div>

          <div class="form-group">
            <label>Status</label>
            <select class="form-control" v-model="status">
              <option value="Published">Published</option>
              <option value="Unpublished">Unpublished</option>
            </select>
          </div>

          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Create Content
          </b-button>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateContent",
  data(){
    return {
      name:'',
      title:'',
      body:'',
      image:'',
      status:'published',

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

      let formData = {
        name:this.name,
        title:this.title,
        body:this.body,
        image:this.image,
        status:this.status,

      }
      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/schedule-notification-data/create-content`, formData)
        .then(response => {
          console.log('Success', response);

          return this.$router.push('/schedule-content');

        })
        .catch(error => {

        });
    }
  }
}
</script>

<style scoped>

</style>
