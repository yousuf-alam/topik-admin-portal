<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Basic Info">
        <b-card-text>

          <div class="form-group">
            <label>Channel Name</label>
            <select v-model="channel" class="form-control">
              <option value="facebook">Facebook</option>
              <option value="messenger">Messenger</option>
              <option value="instagram">Instagram</option>
              <option value="play-store">Play Store</option>
              <option value="app-store">App Store</option>
              <option value="instagram">Instagram</option>
              <option value="cs-call">CS Call</option>
              <option value="mobile-app">Mobile App</option>
            </select>
          </div>
          <div class="form-group">
            <label>Complain Type</label>
            <select v-model="type" class="form-control">
              <option value="order">Order</option>
              <option value="technical">Technical</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div class="form-group" v-if="this.type==='order'">
            <label>Order ID</label>
            <input class="form-control" type="text" v-model="order_id" >
          </div>
          <div class="form-group">
            <label>Problem in short</label>
            <textarea class="form-control" rows="3" v-model="description"></textarea>
          </div>
          <div class="form-group">
            <label>Attachment</label><br>
            <input type="file" class="form-control" v-on:change="onImageChange">
          </div>


          <div  class="form-group">
            <label>Complain Date</label>
            <VueCtkDateTimePicker
              :overlay="true"
              :range="false"
              :no-label="true"
              label="Select"
              id="RangeDatePicker"
              format="YYYY-MM-DD"
              formatted="ll"
              color="#7D4E77"
              v-model="complain_date"
            />
          </div>
          <div class="form-group">
            <label>Assign To</label>
            <select v-model="assigned_to" class="form-control">
              <option value="ealham_apu">Ealham Apu</option>
              <option value="farah_apu">Farah Apu</option>
              <option value="nusrat_apu">Nusrat Apu</option>
              <option value="tech-team">Tech Team</option>
              <option value="cs-team">CS Team</option>
            </select>
          </div>

          <div class="form-group">
            <label>Priority</label>
            <select v-model="priority" class="form-control">
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>

            </select>
          </div>


          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Create Complaint
          </b-button>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import axios from "axios";
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
export default {
  name: "ComplainCreate",
  data(){
    return {
      order_id:'',
      payment_method:'',
      amount:'',
      payment_to:'',
      remarks:'',
      complain_date:'',
      type:'',
      channel:'',
      description:'',
      assigned_to:'',
      image:'',
      priority:'',
      partners:[]



    }
  },
  mounted() {
    // this.getPartners();
  },
  methods:{

    onImageChange(e) {
      console.log("image paisi");
      this.image = e.target.files[0];
    },
    getPartners() {
      axios.get(`${ADMIN_URL}/all-active-partners`)
        .then(response => {
          this.partners = response.data.data;
          // console.log(this.partners);
        })
        .catch(error => {

        });
    },
    onSubmit(e) {
      console.log(this.image);
      e.preventDefault();
      let currentObj = this;
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          'Accept' : 'application/json',
        }
      };

      let formData = new FormData();
      formData.append('order_id', this.order_id);
      formData.append('type', this.type);
      formData.append('assigned_to', this.assigned_to);
      formData.append('image', this.image);
      formData.append('description', this.description);
      formData.append('complain_date', this.complain_date);
      formData.append('channel', this.channel);
      formData.append('priority', this.priority);

      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/create-user-complains`, formData)
        .then(response => {
          // console.log('Success', response);

          return this.$router.push('/complains');

        })
        .catch(error => {

        });
    }
  }
}
</script>

<style scoped>

</style>
