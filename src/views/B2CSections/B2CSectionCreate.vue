<template>
  <b-card class="m-4">
    <h5 class="mb-4">Add Content</h5>
    <form @submit="onSubmit" enctype="multipart/form-data">
      <div class="form-group">
        <label >Select Section</label>
        <select class='form-control' v-model="section">
          <option value="Shop By Concern">Shop By Concern</option>
          <option  value="Spotlight">Spotlight</option>
        </select>
      </div>
      <div class="form-group">
        <label>Title</label>
        <input type="text" class="form-control" v-model="title">
      </div>
      <div class="form-group">
        <label>Subtitle</label>
        <input type="text" class="form-control" v-model="subtitle">
      </div>
      <div class="form-group">
        <multiselect
          v-model="tag"
          :options="tags"
          placeholder="Select one"
          label="name"
          track-by="id"
        >
        </multiselect>
      </div>
      <div class="form-group">
        <label>Image</label><br>
        <label class="text-danger">(Image Size should be (480 X 360) and less than 1 MB)</label>
        <input type="file" class="form-control" v-on:change="onImageChange">
      </div>
      <div class="form-group">

        <input type="radio" value="pending" v-model="published_status">
        <label>Unpublished</label><br>
        <input type="radio" value="published" v-model="published_status">
        <label>Published</label>
      </div>
      <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Add Content</b-button>
    </form>
  </b-card>
</template>

<script>
  import axios from 'axios';
  const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
  export default {

    data() {
      return {
        title: '',
        subtitle: '',
        section: 'Shop By Concern',
        image: '',
        tag: '',
        tags: [],
        published_status: 'published'
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
        };

        let formData = new FormData();
        formData.append('title', this.title);
        formData.append('subtitle', this.subtitle);
        formData.append('section', this.section);
        formData.append('image', this.image);
        formData.append('tag', this.tag.id);
        formData.append('published_status', this.published_status);


        axios.post(`${ADMIN_URL}/b2c/item-create`,formData,config)
          .then(response => {
            console.log('Success', response);
            currentObj.success = response.data.success;
            console.log(response.data);
            if(response.data.success===true)
            {
              this.$swal('Success',response.data.message,'success');
              this.$router.push({ name: 'B2CSections'})
            }
            else
            {
              this.$swal('Error', 'Something went wrong', 'error');
              console.log('Error', response.data);
            }
          })
          .catch(error => {
            console.log('Error exception', error.response);
            currentObj.output = error;
            console.log(error);
          });
      },
      getTags() {
        axios.get(`${ADMIN_URL}/b2c/all-tags`)
          .then(response => {
            this.tags = response.data
          })
          .catch(error => {
            console.log('Error  ... ', error.response);
          });
      }
    },
    created() {
      this.getTags()
    }
  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>
