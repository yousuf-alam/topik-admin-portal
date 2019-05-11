<template>
  <b-card class="m-4">
    <h5 class="mb-4">Create Promo Code</h5>
    <form @submit="onSubmit" enctype="multipart/form-data">
      <div class="form-group">
        <label>Code</label>
        <input type="text"class="form-control" v-model="code">
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea class="form-control" rows="3" v-model="description"></textarea>
      </div>
      <div class="form-group">
        <label >Coupon Type</label>
        <select class='form-control' v-model="type">
          <option value="0" selected disabled>Select Coupon Type</option>
          <option value="fixed">Fixed</option>
          <option value="percentage">Percentage</option>
          <option value="download">On App Download</option>
        </select>
      </div>
      <div v-if="type==='percentage'" class="form-group">
        <label>Percentage Amount (%)</label>
        <input type="text"class="form-control" v-model="percentage_amount">
      </div>
      <div class="form-group">
        <label v-if="type==='percentage'">Maximum Discount Amount</label>
        <label v-else>Discount Amount</label>
        <input type="text"class="form-control" v-model="discount_amount">
      </div>
      <div v-if="type==='download'" class="form-group">
        <label>Discount Per Usage</label>
        <input type="text"class="form-control" v-model="discount_per_usage">
      </div>
      <div class="form-group">
        <label>Maximum Usage of per User</label>
        <input type="number" class="form-control" v-model="max_uses_user">
      </div>
      <div class="form-group">
        <label>Minimum Order Value</label>
        <input type="number" class="form-control" v-model="order_amount">
      </div>
      <div class="form-group">
        <label>Expires on</label>
        <datepicker :disabledDates="disabledDates" v-model="expires_at"></datepicker>
      </div>
      <div class="form-group">
        <div class="form-check checkbox">
          <input class="form-check-input" type="checkbox" v-model="published_status">
          <label class="form-check-label" >Published</label>
        </div>
      </div>
      <div class="form-group">
        <label >Select Service</label>
        <select @change="getCategories" class='form-control' v-model="service_id">
          <option selected value="all">All Services</option>
          <option :value="serv.id" v-for="serv in services">{{ serv.name }}</option>
        </select>
      </div>
      <div v-if="service_id !== 'all'" class="form-group">
        <label >Select Category</label>
        <select class='form-control' v-model="category_id">
          <option selected value="all">All Categories</option>
          <option :value="cat.id" v-for="cat in categories">{{ cat.name }}</option>
        </select>
      </div>
      <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Create Notification</b-button>
    </form>
  </b-card>
</template>

<script>
  import axios from 'axios';
  import Datepicker from 'vuejs-datepicker';
  export default {
    name: "PromoCreate",
    components: {
      Datepicker
    },
    data() {
      return {
        code: '',
        description: '',
        type: '0',
        services: '',
        published_status: '',
        categories: '',
        service_id: 'all',
        category_id: 'all',
        max_uses_user: '',
        order_amount: '',
        discount_amount: '',
        percentage_amount: '',
        discount_per_usage: '',
        expires_at: '',
        disabledDates: {
          to: new Date(Date.now() - 8640000)
        }

      }
    },
    created() {
      const Base_URL = process.env.VUE_APP_ADMIN_URL;
      axios.get(`${Base_URL}/api/services`)
        .then(response => {
          this.services = response.data;
        })
        .catch(e => {
          //console.log("error occurs");
        });
    },
    methods: {

      getCategories() {
        const Base_URL = process.env.VUE_APP_ADMIN_URL;
        axios.post(`${Base_URL}/api/categories`, {
          service_id: this.service_id
        })
          .then(response => {
            this.categories = response.data;
          })
          .catch(e => {
            //console.log("error occurs");
          });

      },
      onImageChange(e) {
        this.image = e.target.files[0];
      },

      changeDateFormat(){
        let d = this.expires_at;
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        this.expires_at =  [year, month, day].join('-');
      },
      onSubmit(e) {
        this.changeDateFormat();
        e.preventDefault();
        let currentObj = this;
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
            'Accept' : 'application/json',
          }
        }
        let formData = new FormData();
        formData.append('code', this.code);
        formData.append('description', this.description);
        formData.append('type', this.type);
        formData.append('description', this.description);
        formData.append('published_status', this.published_status);
        formData.append('max_uses_user', this.max_uses_user);
        formData.append('order_amount', this.order_amount);
        formData.append('discount_amount', this.discount_amount);
        formData.append('percentage_amount', this.percentage_amount);
        formData.append('discount_per_usage', this.discount_per_usage);
        formData.append('expires_at', this.expires_at);
        formData.append('service_id', this.service_id);
        formData.append('category_id', this.category_id);


        const Base_URL = process.env.VUE_APP_ADMIN_URL;
        axios.post(`${Base_URL}/api/promos/create`,formData,config)
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
