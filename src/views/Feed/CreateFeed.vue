<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Create Feed">
        <b-card-text>

          <div class="form-group">
            <label>Select Type</label>
            <select class="form-control" v-model="type">
              <option value="pool"> Poll</option>
              <option value="image"> Image </option>
              <option value="video"> Video </option>
              <option value="multiple_image"> Multiple Image </option>

            </select>
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
            <label>Upload Image</label>
            <input class="form-control" type="file"   v-on:change="onImageChange">
          </div>
          <div  class="form-group" v-if="type ==='video'">
            <label>URL</label>
            <input class="form-control" type="text" v-model="url" >
          </div>
          <div  class="form-group" v-if="type === 'pool'">
            <label>Create Pool Option</label>
              <div v-for="(field, index) in fields" :key="index">
                <input  v-model="field.value" @input="updateFieldValue(index, $event.target.value)" class="mt-2 form-control">
              </div>
              <b-button variant="primary" @click="addField" class="mt-2">Add Poll Option</b-button>

          </div>
<!--          <img :src="demoimage" v-if="demoimage" alt="" ref="demoimage">-->
          <div  class="form-group" v-if="type === 'multiple_image'">
            <label>Upload multiple Image</label>
            <div v-for="(image, index) in images" :key="index">
              <input   type="file"  @change="getFileValue(index, $event.target)" class="mt-2 form-control">
            </div>
            <b-button variant="primary" @click="addImage" class="mt-2">Add image uploader</b-button>

          </div>

          <b-button @click="onSubmit" variant="primary" ><i class="fa fa-dot-circle-o"></i> Create Feed
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
  name: "CreateFeed",
  data(){
    return {
      type:'',
      title:'',
      description:'',
      selectedFile:'',
      buttonText:'',
      url:'',
      image:'',
      options:[],
      fields: [{ value: "" }],
      images:[{image:"",
        ext:null,
        name:null

      }],
      demoimage:null




    }
  },
  created() {


  },
  methods:{
    updateFieldValue(index, value) {
      this.fields[index].value = value;
    },
    getFileValue(index,target){

      let file=target.files[0]
      // console.log(file
      let ext = file.type.replace('image/','')
      let name = file.name
      this.images[index].ext=ext;
      this.images[index].name=name;
      const reader = new FileReader();
      reader.onload = (res) => {
          this.images[index].image=res.target.result;
        };
        reader.onerror = (err) => console.log(err);
        reader.readAsDataURL(file);
    },
    addField() {
      this.fields.push({ value: "" });
    },
    addImage(){
      this.images.push({ image: "" });
    },


    onImageChange(e) {
      this.image = e.target.files[0];
    },
    OnImagesChange(e){

    },
    onSubmit(e) {
      let fieldValue = [];
      this.fields.map(ele => {
        fieldValue.push(ele.value);
      });

      // let imageValue =[];
      // this.images.map(ele=> {
      //   imageValue.push(ele.image);
      // });

      e.preventDefault();
      let currentObj = this;
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          'Accept' : 'application/json',
        }
      };
      // console.log('option', fieldValue);

      let formData = new FormData();
      formData.append('type', this.type);
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('options', JSON.stringify(fieldValue));
      formData.append('images', JSON.stringify(this.images));

      formData.append('url', this.url);

      formData.append('image', this.image);



      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/feed/create-feed`, formData)
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
