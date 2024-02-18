<template>
  <b-card class="m-4">
    <h5 class="mb-4">Edit content</h5>
    <form @submit="onSubmit" enctype="multipart/form-data">

      <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" v-model="content.name">
      </div>
      <div class="form-group">
        <label>Title</label>
        <input class="form-control"  v-model="content.title">
      </div>

      <div class="form-group">
        <label>Body</label>
        <input class="form-control"  v-model="content.body">
      </div>
      <div class="form-group">
        <label>Image</label><br>
        <label class="text-danger">(Image Size should be (480 X 360) and less than 1 MB)</label><br>
        <img :src="content.image" style="width: 200px; height: 150px;">
        <input type="file" class="form-control" v-on:change="onImageChange">
      </div>


      <div  class="form-group">
        <label >Select Status</label>
        <select class='form-control' v-model="content.status">
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
        </select>
      </div>
      <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Edit content</b-button>
    </form>
  </b-card>
</template>

<script>
import axios from 'axios';
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
const BASE_URL  = process.env.VUE_APP_BASE_URL;
export default {
  name: "EditContent",

  data() {
    return {
      content: [],
      src_image : '/images/schedule_notification/',
      image_url: '',
      image_updated: false,
      name: '',
      title: '',
      image: '',
      status:'',

    }
  },
  created() {

    this.content.id= window.location.pathname.split("/").pop();

    axios.post(`${ADMIN_URL}/contents/show`,
      {
        id: this.content.id
      }).then(response => {
      console.log('Response data ===== ', response.data);
      this.content = response.data;
      this.image_url = BASE_URL + this.src_image + response.data.image;

      this.getSubcategories();
    })
      .catch(e=>{
        console.log("error occurs",e);
      });

  },
  methods: {


    onImageChange(e) {
      this.image_updated = true
      const file = e[0];
      if (file === undefined) {
        return;
      }
      this.content.image = file;
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
      }

      let formData = new FormData();
      formData.append('id', this.content.id);
      formData.append('name', this.content.name);
      formData.append('title', this.content.title);
      formData.append('body', this.content.body);
      formData.append('status', this.content.status);
      if(this.image_updated)
      {
        formData.append('image', this.content.image);
      }



      axios.post(`${ADMIN_URL}/contents/edit`,formData,config)
        .then(response => {
          //console.log('Success', response);
          currentObj.success = response.data.success;
          if(response.data.success===true)
          {
            this.$swal('Success',response.data.message,'success');
            this.$router.push({name: 'contents'});
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
