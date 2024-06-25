<template>
  <b-row>
    <b-col class="mb-5" sm="6" md="4">
      <b-card class="h-100 p-4 m-4">
        <h5 class="mb-4">Complaint Details - CS</h5>
        <b-form-group>
          <label>Complaint ID : {{ complain.id }}</label>
        </b-form-group>
        <b-form-group label="Complaint Channel">

          <select v-model="complain.channel" class="form-control">
            <option value="Facebook">Facebook</option>
            <option value="Messenger">Messenger</option>
            <option value="Instagram">Instagram</option>
            <option value="Play-Store">Play Store</option>
            <option value="App-Store">App Store</option>

<!--            <option value="CS-Call">CS Call</option>-->
            <option value="CS-In-Call">CS Out-Call</option>
            <option value="CS-Out-Call">CS In-Call</option>

            <option value="mobile-app">Mobile App</option>
          </select>
        </b-form-group>
        <b-form-group label="Complaint Type">
          <select v-model="complain.type" class="form-control">
            <option value="order">Order</option>
            <option value="technical">Technical</option>
            <option value="others">Others</option>
          </select>

        </b-form-group>
        <b-form-group label="Order Id" v-if="this.complain.type === 'order'">

          <input class="form-control" v-model="complain.order_id">
        </b-form-group>
        <b-form-group label="Complaint Issue Date">
          <input class="form-control" v-model="complain.complain_issue_date">
        </b-form-group>
        <div>

          <b-form-group class="" label="Priority">
            <input class="form-control" v-model="complain.priority">
          </b-form-group>
        </div>


        <b-form-group label="Complaint Description">
          <textarea class="form-control" v-model="complain.description" />
        </b-form-group>
        <b-form-group label="Assigned to" class="mt-2">
          <select v-model="complain.assigned_to" class="form-control">
            <option value="Ealham-Binte-Ali">Ealham Binte Ali </option>
            <option value="Farah-Kalam">Farah Kalam</option>
            <option value="Nusrat-Jahan-Shorna">Nusrat Jahan Shorna</option>
            <option value="Tech-Team">Tech Team</option>
            <option value="CS-Team">CS Team</option>
          </select>
        </b-form-group>
        <b-form-group label="Complaint Attachment">
          <label class="text-danger">(Image Size should be (480 X 360) and less than 1 MB)</label><br>
          <div v-if="complain.images && complain.images.length > 0">
            <div v-for="(image, index) in complain.images" :key="index">
              <img :src="image" style="width: 200px; height: 150px;" />
              <input type="file" class="form-control" v-on:change="onImageChange($event, index)">
            </div>
          </div>
        </b-form-group>


        <button class="btn btn-dark mt-3" @click="updateComplaint"> Update</button>

      </b-card>
    </b-col>
    <b-col class="mb-5" sm="6" md="4">
      <b-card class="h-100 m-4 p-4">
        <h5 class="mb-4">Solution Details - OPS</h5>
        <b-form-group label="Solution Type">
          <select class='form-control' v-model="complain.solve_type">
            <option value="complementary-service">Complementary Service</option>
            <option value="30%-discount">30%-Discount</option>
            <option value="apology">Apology</option>
          </select>
        </b-form-group>

        <b-form-group label="Complementary Service Type" v-if="this.complain.solve_type === 'complementary-service'">
          <select class='form-control' v-model="complain.complementary_service_type">
            <option value="basic-cleansing">Basic Cleansing</option>
            <option value="spa-manicure-pedicure">Spa Manicure Pedicure</option>
            <option value="hair-protein">Hair Protein</option>
            <option value="other">Others</option>
          </select>
        </b-form-group>


        <b-form-group label="Line Items" v-if="this.complain.complementary_service_type === 'other'">
          <select class="form-control" v-model="complain.complementary_line_item">
            <option v-for="(item, index) in this.complain.activeLineItems" :value="item.name" :key="index">
              {{ item.name }}
            </option>
          </select>
        </b-form-group>



        <b-form-group label="Complementary Service SP" v-if="this.complain.solve_type === 'complementary-service'">
          <select class="form-control" v-model="complain.complementary_service_sp">
            <option v-for="(sp, index) in this.complain.inHouseSp" :value="sp.name" :key="index">
              {{ sp.name }}
            </option>
          </select>
        </b-form-group>


        <b-form-group label="Comment">
          <textarea class="form-control" v-model="complain.solve_description" />
        </b-form-group>



        <b-form-group label="Deduction" class="mt-2" v-if="this.complain.type === 'order'">
          <input class="form-control" v-model="complain.deduction">
        </b-form-group>



        <b-form-group label="Complaint Status">
          <select class='form-control' v-model="complain.status">
            <option value="received">Received</option>
            <option value="opened">Opened</option>
            <option value="resolved">Resolved</option>
            <option value="unreachable">Customer Unreachable</option>

          </select>
        </b-form-group>

        <button class="btn btn-dark mt-3" @click="updateComplaint"> Update</button>
      </b-card>

    </b-col>
    <b-col class="mb-5" sm="6" md="4"
      v-if="(this.complain.status === 'opened' || this.complain.status === 'resolved') && this.complain.type === 'order'">

      <b-card class="h-100 m-4 p-4">

        <h5 class="mb-4">CS Section</h5>

        <b-form-group label="Solution Date" v-if="this.complain.solve_type === 'complementary-service'">

          <VueCtkDateTimePicker :overlay="true" :range="false" :no-label="true" label="Select" id="RangeDatePicker"
            format="YYYY-MM-DD" formatted="ll" color="#7D4E77" v-model="complain.solve_date" />
        </b-form-group>

        <b-form-group label="30% Avail Date" v-if="this.complain.solve_type === '30%-discount'">

          <VueCtkDateTimePicker :overlay="true" :range="false" :no-label="true" label="Select" id="RangeDatePicker"
            format="YYYY-MM-DD" formatted="ll" color="#7D4E77" v-model="complain.solve_date" />
        </b-form-group>

        <b-form-group label="SP Selected">
          <select class="form-control" v-model="complain.complementary_service_sp">
            <option v-for="(sp, index) in this.complain.inHouseSp" :value="sp.name" :key="index">
              {{ sp.name }}
            </option>
          </select>
        </b-form-group>


        <b-form-group label="Cs Remarks">
          <textarea class="form-control" v-model="complain.comments" />
        </b-form-group>


        <b-form-group label="Complementary order ID" v-if="this.complain.solve_type === 'complementary-service'">
          <input class="form-control" v-model="complain.complementary_order_id" />
        </b-form-group>


        <b-form-group label="30% Avail Order ID" v-if="this.complain.solve_type === '30%-discount'">
          <input class="form-control" v-model="complain.complementary_order_id" />
        </b-form-group>



        <button class="btn btn-dark mt-3" @click="updateCsPart">
          Update</button>



      </b-card>

    </b-col>
  </b-row>


</template>

<script>
import axios from 'axios';
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
const BASE_URL = process.env.VUE_APP_BASE_URL;
export default {
  name: "ComplainEdit",

  data() {
    return {
      complain: [],
      src_image: '/images/user_complain/',
      image_url: '',
      image_updated: false,
      name: '',
      title: '',
      image: '',
      status: '',
      complain_id: '',
      images: []

    }
  },
  created() {

    this.complain_id = window.location.pathname.split("/").pop();
    axios.get(`${ADMIN_URL}/complaint-by-id`, {
      params: {
        id: this.complain_id
      }
    }).then(response => {
      console.log('Response data ===== ', response.data);
      this.complain = response.data.data;
      this.image_url = BASE_URL + this.src_image + response.data.image;


    })
      .catch(e => {
        console.log("error occurs", e);
      });

  },
  methods: {


    onImageChange(event, index) {
      const file = event.target.files[0];
      if (!file) return;

      // Create a URL for the image and update the URL in the images array
      const imageUrl = URL.createObjectURL(file);
      // Update the URL and file for the selected image index
      this.$set(this.complain.images, index, { url: imageUrl, file: file });
    },


    updateComplaint(e) {
      console.log("dhuksi");
      e.preventDefault();
      let currentObj = this;
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };


      let formData = new FormData();
      formData.append('id', this.complain.id);
      formData.append('channel', this.complain.channel);
      formData.append('type', this.complain.type);
      if (this.complain.order_id) {
        formData.append('order_id', this.complain.order_id);
      }

      formData.append('complain_issue_date', this.complain.complain_issue_date);
      formData.append('description', this.complain.description);
      // this.complain.images.forEach((image, index) => {
      //   formData.append(`images[${index}]`, image.file);
      // });
      if (this.complain.images && this.complain.images.length > 0) {
        this.complain.images.forEach((image, index) => {
          formData.append(`images[${index}]`, image.file);
        });
      }
      formData.append('status', this.complain.status);
      formData.append('priority', this.complain.priority);
      formData.append('assigned_to', this.complain.assigned_to);
      formData.append('deduction', this.complain.deduction);
      formData.append('solve_type', this.complain.solve_type);
      formData.append('solve_description', this.complain.solve_description);
      formData.append('complementary_service_type', this.complain.complementary_service_type);
      formData.append('complementary_service_sp', this.complain.complementary_service_sp);
      formData.append('complementary_line_item', this.complain.complementary_line_item);
      // formData.append('solve_date', this.complain.solve_date);
      // formData.append('complementary_order_id', this.complain.complementary_order_id);
      // formData.append('complementary_order_date', this.complain.complementary_order_date);
      // formData.append('comments', this.complain.comments);


      axios.post(`${ADMIN_URL}/update-user-complaint`, formData, config)
        .then(response => {
          //console.log('Success', response);
          currentObj.success = response.data.success;
          //console.log(response.data);
          if (response.data.success === true) {
            this.$swal('complain Details Updated', '', 'success');
            setTimeout(() => {
              location.reload();
            }, 1000);
          }

        })
        .catch(error => {
          // console.log('Error  ... ', error.response);
          currentObj.output = error;
          // console.log(error);
        });



    },

    updateCsPart(e) {
      e.preventDefault();
      let currentObj = this;
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };


      let formData = new FormData();
      formData.append('id', this.complain.id);
      formData.append('solve_date', this.complain.solve_date);
      formData.append('complementary_service_sp', this.complain.complementary_service_sp);
      formData.append('comments', this.complain.comments);
      formData.append('complementary_order_id', this.complain.complementary_order_id);
      formData.append('status', 'resolved');


      axios.post(`${ADMIN_URL}/update-cs-section`, formData, config)
        .then(response => {
          //console.log('Success', response);
          currentObj.success = response.data.success;
          //console.log(response.data);
          if (response.data.success === true) {
            this.$swal('Complain Cs Part Updated', '', 'success');
            setTimeout(() => {
              location.reload();
            }, 1000);
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
          'Accept': 'application/json',
        }
      }

      let formData = new FormData();
      formData.append('id', this.content.id);
      formData.append('name', this.content.name);
      formData.append('title', this.content.title);
      formData.append('body', this.content.body);
      formData.append('status', this.content.status);
      if (this.image_updated) {
        formData.append('image', this.content.image);
      }



      axios.post(`${ADMIN_URL}/schedule-notification-data/update-content`, formData, config)
        .then(response => {
          //console.log('Success', response);
          currentObj.success = response.data.success;
          if (response.data.success === true) {
            this.$swal('Success', response.data.message, 'success');
            this.$router.push({
              name: 'ShowContent'
            });
          } else {
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

<style scoped></style>
