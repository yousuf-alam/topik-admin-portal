<template>
  <b-card class="m-4">
    <h5 class="mb-4">Edit Content</h5>
    <form @submit="onSubmit" enctype="multipart/form-data">
      <div class="form-group">
        <label >Select Section</label>
        <select class='form-control' v-model="item.section">
          <option value="Shop By Concern">Shop By Concern</option>
          <option  value="Spotlight">Spotlight</option>
          <option  value="Hot Deals">Hot Deals</option>
        </select>
      </div>
      <div class="form-group">
        <label>Title</label>
        <input type="text" class="form-control" v-model="item.title">
      </div>
      <div class="form-group">
        <label>Subtitle</label>
        <input type="text" class="form-control" v-model="item.subtitle">
      </div>
      <div class="form-group">
        <label>Landing Type</label>
        <select class="form-control" v-model="landing_type">
          <option value="category">Category</option>
          <option value="tag">Tag</option>
        </select>
      </div>
      <div class="form-group" v-if="landing_type==='category'">
        <label>Category</label>
        <multiselect
          v-model="item.category"
          :options="categories"
          placeholder="Select one"
          label="name"
          track-by="id"
        >
        </multiselect>
      </div>
      <div class="form-group" v-else>
        <label>Tag</label>
        <multiselect
          v-model="item.tag"
          :options="tags"
          placeholder="Select one"
          label="name"
          track-by="id"
        >
        </multiselect>
      </div>
      <div class="form-group">
        <label>Image</label><br>
        <label class="text-danger">(Image Size should be (480 X 360) and less than 1 MB)</label><br>
        <img :src="image_url" style="width: 200px; height: 150px;">
        <input type="file" class="form-control" v-on:change="onImageChange">
      </div>
      <div class="form-group">

        <input type="radio" value="pending" v-model="item.published_status">
        <label>Unpublished</label><br>
        <input type="radio" value="published" v-model="item.published_status">
        <label>Published</label>
      </div>
      <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Update Content</b-button>
    </form>
  </b-card>
</template>

<script>
  import axios from 'axios';
  const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
  const BASE_URL  = process.env.VUE_APP_BASE_URL;
  export default {

    data() {
      return {
        tags: [],
        categories: [],
        item: {},
        src_image : '/images/b2c_assets/',
        image_url: '',
        image_updated: false,
        landing_type: 'category'
      }
    },
    methods: {

      onImageChange(e) {
        const file = e.target.files[0];
        if (file === undefined) {
          return;
        }
        this.item.image = file;
        this.image_url = URL.createObjectURL(file);
        this.image_updated = true;

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
        formData.append('id', this.item.id);
        formData.append('title', this.item.title);
        formData.append('subtitle', this.item.subtitle);
        formData.append('section', this.item.section);
        formData.append('published_status', this.item.published_status);
        if(this.image_updated)
        {
          formData.append('image', this.item.image);
        }

        if(this.item.category)
        {
          console.log('eta')
          formData.append('category', this.item.category.id);
        }
        else
        {
          console.log('ota')
          formData.append('tag', this.item.tag.id);
        }


        axios.post(`${ADMIN_URL}/b2c/item-update`,formData,config)
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
      getItem() {
        axios.get(`${ADMIN_URL}/b2c/item-show`,{
          params : {
            id: window.location.pathname.split("/").pop()
          }
        })
          .then(response => {
            this.item = response.data
            this.image_url = BASE_URL + this.src_image + response.data.image;
            if(response.data.tag)
            {
              this.landing_type = 'tag'
            }
            this.getTags()
            this.getCategories()
          })
          .catch(error => {
            console.log('Error  ... ', error.response);
          });
      },
      getTags() {
        axios.get(`${ADMIN_URL}/b2c/all-tags`)
          .then(response => {
            this.tags = response.data
            this.item.tag = response.data.find(x => x.id == this.item.tag)
          })
          .catch(error => {
            console.log('Error  ... ', error.response);
          });
      },
      getCategories() {
        axios.get(`${ADMIN_URL}/b2c/all-categories`)
          .then(response => {
            this.categories = response.data
          })
          .catch(error => {
            console.log('Error  ... ', error.response);
          });
      }

    },
    created() {
      this.getItem()
    }
  }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>
