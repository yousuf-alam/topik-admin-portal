<template>
  <b-row>
    <b-col class="mb-5" sm="6" md="6">
      <b-card class="h-100 p-4 m-4">
        <h5 class="mb-4">Complaint  Details</h5>
        <b-form-group>
          <label >complain ID : {{complain.id}}</label>
        </b-form-group>
        <b-form-group label="Complain Channel">

          <select v-model="complain.channel" class="form-control">
            <option value="facebook">Facebook</option>
            <option value="messenger">Messenger</option>
            <option value="instagram">Instagram</option>
            <option value="play-store">Play Store</option>
            <option value="app-store">Play Store</option>
            <option value="instagram">Instagram</option>
            <option value="cs-call">CS Call</option>
            <option value="mobile-app">Mobile App</option>
          </select>
        </b-form-group>
        <b-form-group label="Complain Type">
          <select v-model="complain.type" class="form-control">
            <option value="order">Order</option>
            <option value="technical">Technical</option>
            <option value="others">Others</option>
          </select>

        </b-form-group>
        <b-form-group label="Order Id"  v-if="this.complain.type==='order'">

          <input class="form-control"  v-model="complain.order_id">
        </b-form-group>
        <b-form-group label="Complain Date">
          <input class="form-control"  v-model="complain.complain_date">
        </b-form-group>
        <div>

          <b-form-group class="" label="Priority">
            <input class="form-control"  v-model="complain.priority">
          </b-form-group>
        </div>


        <b-form-group label="Complain Description" >
          <textarea class="form-control"  v-model="complain.description" />
        </b-form-group>
        <b-form-group label="Assigned to" class="mt-2">
          <select v-model="complain.assigned_to" class="form-control">
            <option value="ealham">Ealham</option>
            <option value="farah">Farah</option>
            <option value="nusrat">Nusrat</option>
            <option value="tech-team">Tech Team</option>
            <option value="cs-team">CS Team</option>
          </select>
        </b-form-group>
        <b-form-group label="Complaint Attachment">
          <label class="text-danger">(Image Size should be (480 X 360) and less than 1 MB)</label><br>
          <img :src="complain.image" style="width: 200px; height: 150px;" />
          <input type="file" class="form-control" v-on:change="onImageChange">
        </b-form-group>

        <button class="btn btn-dark mt-3"
                @click="updateComplaint"> Update</button>

      </b-card>
    </b-col>
    <b-col class="mb-5" sm="6" md="6">
      <b-card class="h-100 m-4 p-4">
        <h5 class="mb-4">Solution Details</h5>
        <b-form-group label="Solve Type">
          <select class='form-control' v-model="complain.solve_type">
            <option value="complementary-service">Complementary Service</option>
            <option value="30-discount">30%-Discount</option>
            <option value="apology">Apology</option>
          </select>
        </b-form-group>
        <b-form-group label="Solution Description">
          <textarea class="form-control"  v-model="complain.solve_description" />
        </b-form-group>
        <b-form-group label="Complementary order ID" v-if="this.complain.type!=='technical'">
          <input class="form-control"  v-model="complain.complementary_order_id" />
        </b-form-group>
        <b-form-group label="Deduction" class="mt-2" v-if="this.complain.type!=='technical'">
          <input class="form-control"  v-model="complain.deduction">
        </b-form-group>

        <b-form-group label="Solution Date">

          <VueCtkDateTimePicker
            :overlay="true"
            :range="false"
            :no-label="true"
            label="Select"
            id="RangeDatePicker"
            format="YYYY-MM-DD"
            formatted="ll"
            color="#7D4E77"
            v-model="complain.solve_date"
          />
        </b-form-group>

        <b-form-group label="Complain Status">
          <select class='form-control' v-model="complain.status">
            <option value="received">Received</option>
            <option value="opened">Opened</option>
            <option value="resolved">Resolved</option>
          </select>
        </b-form-group>

        <button class="btn btn-dark mt-3" @click="updateComplaint"> Update</button>
      </b-card>
    </b-col>
  </b-row>


</template>

<script>
import axios from 'axios';
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
const BASE_URL  = process.env.VUE_APP_BASE_URL;
export default {
  name: "ComplainEdit",

  data() {
    return {
      complain: [],
      src_image : '/images/user_complain/',
      image_url: '',
      image_updated: false,
      name: '',
      title: '',
      image: '',
      status:'',
      complain_id: '',

    }
  },
  created() {

    this.complain_id = window.location.pathname.split("/").pop();
    axios.get(`${ADMIN_URL}/user-complain-by-id`, {
      params: {
        id: this.complain_id
      }
      }).then(response => {
      console.log('Response data ===== ', response.data);
      this.complain = response.data.data;
      this.image_url = BASE_URL + this.src_image + response.data.image;


    })
      .catch(e=>{
        console.log("error occurs",e);
      });

  },
  methods: {


    onImageChange(e) {
      this.complain.image = e.target.files[0];
      // this.image_updated = true
      // const file = e[0];
      // if (file === undefined) {
      //   return;
      // }
      // this.content.image = file;
      // this.image_url = URL.createObjectURL(file);

    },
    updateComplaint(e) {
      console.log("dhuksi");
      e.preventDefault();
      let currentObj = this;
      const config = {
        headers: {'content-type': 'multipart/form-data'}
      };


      let formData = new FormData();
      formData.append('id', this.complain.id);
      formData.append('channel', this.complain.channel);
      formData.append('type', this.complain.type);
      formData.append('order_id', this.complain.order_id);
      formData.append('complain_date', this.complain.complain_date);
      formData.append('description', this.complain.description);
      formData.append('image', this.complain.image);
      formData.append('status', this.complain.status);
      formData.append('priority', this.complain.priority);
      formData.append('assigned_to', this.complain.assigned_to);
      formData.append('deduction',  this.complain.deduction);
      formData.append('solve_type', this.complain.solve_type);
      formData.append('solve_date', this.complain.solve_date);
      formData.append('complementary_order_date', this.complain.complementary_order_date);
      formData.append('complementary_order_id', this.complain.complementary_order_id);
      formData.append('comments', this.complain.comments);


      axios.post(`${ADMIN_URL}/update-user-complaint`, formData, config)
        .then(response => {
          //console.log('Success', response);
          currentObj.success = response.data.success;
          //console.log(response.data);
          if(response.data.success === true)
          {
            this.$swal('complain Details Updated', '', 'success');
            setTimeout(()=>{
              location.reload();
            },1000);
          }

        })
        .catch(error => {
          // console.log('Error  ... ', error.response);
          currentObj.output = error;
          // console.log(error);
        });



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



      axios.post(`${ADMIN_URL}/schedule-notification-data/update-content`,formData,config)
        .then(response => {
          //console.log('Success', response);
          currentObj.success = response.data.success;
          if(response.data.success===true)
          {
            this.$swal('Success',response.data.message,'success');
            this.$router.push({name: 'ShowContent'});
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
