<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Create Feed">
        <b-card-text>

          <div class="form-group">
            <label> Type</label>
            <input class="form-control" type="text" v-model="type" :disabled="isDisabled" >
          </div>
          <div class="form-group">
            <label>Title</label>

            <input class="form-control" type="text" v-model="title"  >
          </div>
          <div  class="form-group" >
            <label>Description</label>
            <input class="form-control" type="text" v-model="description"  >
          </div>
          <div  class="form-group" v-if="type === 'image'">
<!--            <label>Upload Image</label>-->
<!--            <input class="form-control" type="file"   v-on:change="onImageChange">-->
              <label>Image</label><br>
              <label class="text-danger">(Image Size should be (480 X 360) and less than 1 MB)</label><br>
              <img :src="single_image" style="width: 200px; height: 150px;">
              <input type="file" class="form-control" v-on:change="onImageChange">

          </div>
          <div  class="form-group" v-if="type ==='video'">
            <label>URL</label>
            <input class="form-control" type="text" v-model="url" >
          </div>
          <div  class="form-group" v-if="type === 'pool'">
            <label>Create Pool Option</label>
            <div v-for="(field, index) in fields" :key="index">
              <input  v-model="field.name" @input="updateFieldValue(index, $event.target.value)" class="mt-2 form-control">
            </div>
            <b-button variant="primary" @click="addField" class="mt-2">Add Poll Option</b-button>

          </div>
          <div  class="form-group">
            <label>Select Status</label>
            <select class="form-control" v-model="status">
              <option value="active"> Active</option>
              <option value="finished"> Finished </option>
              <option value="disabled"> Disable </option>

            </select>
          </div>

          <b-button @click="onSubmit" variant="primary" ><i class="fa fa-dot-circle-o"></i> Edit Feed
          </b-button>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import axios from 'axios';
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
export default {
  name: "EditFeed",
  data(){
    return {
      feedItems:[],

      type:'',
      status:'',
      title:'',
      description:'',
      selectedFile:'',
      buttonText:'',
      url:'',
      image:'',
      single_image:'',
      options:[],
      isDisabled: true,
      src_image : '/images/feed/',

      fields: [{ name: "" }]
    }
  },
  created() {
    this.feed_id = this.$route.params.id;
    // console.log('popup id',this.feed_id);
    this.getOld();

  },
  methods:{
    getOld(){
      axios.get(`${ADMIN_URL}/feed/feed-item/${this.feed_id}`)
          .then(response => {

            this.feedItems = response.data.data;
            this.fields= response.data.options;
            this.title = this.feedItems.title;
            this.type = this.feedItems.type;
            this.description = this.feedItems.description;
            this.url = this.feedItems.url;
            this.buttonText = this.feedItems.button_text;
            this.status = this.feedItems.status;
            this.single_image = this.feedItems.single_image;
            console.log('this imag e url',this.single_image);
          })
          .catch(e => {
            console.log("error occurs", e.response);
          });
    },
    updateFieldValue(index, value) {
      this.fields[index].name = value;
    },
    addField() {
      this.fields.push({ name: "" });
    },

    onImageChange(e) {
      this.image = e.target.files[0];
    },
    onSubmit(e) {
      // let fieldValue = [];
      // this.fields.map(ele => {
      //   fieldValue.push(ele.name);
      // });

      e.preventDefault();
      let currentObj = this;
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          'Accept' : 'application/json',
        }
      };
      let formData = new FormData();
      formData.append('type', this.type);
      formData.append('title', this.title);
      formData.append('description', this.description);
      // formData.append('options', JSON.stringify(fieldValue));
      formData.append('url', this.url);
      formData.append('image', this.image);
      formData.append('status', this.status);
      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/feed/update-feed/${this.feed_id}`, formData)
          .then(response => {
            console.log('Success', response);

            return this.$router.push('/feed-show');

          })
          .catch(error => {

          });
    },
  }
}
</script>

<style scoped>

</style>
