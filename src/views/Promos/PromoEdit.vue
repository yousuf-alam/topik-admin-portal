<template>
  <b-card class="m-4">
    <h5 class="mb-4">Edit Promo Code</h5>
    <form @submit="onSubmit" enctype="multipart/form-data">
      <div class="form-group">
        <label>Code</label>
        <input type="text" class="form-control" v-model="promo.code">
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea class="form-control" rows="3" v-model="promo.description"></textarea>
      </div>
      <div class="form-group">
        <label >Coupon Type</label>
        <select class='form-control' v-model="promo.type">
          <option value="0" selected disabled>Select Coupon Type</option>
          <option value="fixed">Fixed</option>
          <option value="percentage">Percentage</option>
          <option value="download">On App Download</option>
        </select>
      </div>
      <div v-if="type==='percentage'" class="form-group">
        <label>Percentage Amount (%)</label>
        <input type="text"class="form-control" v-model="promo.percentage_amount">
      </div>
      <div class="form-group">
        <label v-if="type==='percentage'">Maximum Discount Amount</label>
        <label v-else>Discount Amount</label>
        <input type="text"class="form-control" v-model="promo.discount_amount">
      </div>
      <div v-if="type==='download'" class="form-group">
        <label>Discount Per Usage</label>
        <input type="text"class="form-control" v-model="promo.discount_per_usage">
      </div>
      <div class="form-group">
        <label>Maximum Usage of per User</label>
        <input type="number" class="form-control" v-model="promo.max_uses_user">
      </div>
      <div class="form-group">
        <label>Minimum Order Value</label>
        <input type="number" class="form-control" v-model="promo.order_amount">
      </div>
      <div class="form-group">
        <label>Expires on</label>
        <datepicker :disabledDates="disabledDates" v-model="promo.expires_at"></datepicker>
      </div>
      <div class="form-group">

        <input type="radio"  value="unpublished" v-model="promo.status">
        <label>Unpublished</label><br>
        <input type="radio" value="published" v-model="promo.status">
        <label>Published</label>
      </div>
      <div class="form-group">
        <label >Select Service</label>
        <select @change="getCategories" class='form-control' v-model="promo.service_id">
          <option selected value="all">All Services</option>
          <option :value="serv.id" v-for="serv in services">{{ serv.name }}</option>
        </select>
      </div>
      <div v-if="service_id !== 'all'" class="form-group">
        <label >Select Category</label>
        <select class='form-control' v-model="promo.category_id">
          <option selected value="all">All Categories</option>
          <option :value="cat.id" v-for="cat in categories">{{ cat.name }}</option>
        </select>
      </div>
      <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Create Promo Code</b-button>
    </form>
  </b-card>
</template>

<script>
  import axios from 'axios';
  import Datepicker from 'vuejs-datepicker';
  export default {
    name: "PromoEdit",
    components: {
      Datepicker
    },
    data() {
      return {
        promo: [],
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
      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
      axios.get(`${ADMIN_URL}/promos/show`, {
        params: {
          id : window.location.pathname.split("/").pop()
        }
      })
        .then(response => {
          this.promo = response.data;
        })
        .catch(e => {
          //console.log("error occurs");
        });
      this.getServices();
    },
    methods: {
      getServices(){
        const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
        axios.get(`${ADMIN_URL}/services`)
          .then(response => {
            this.services = response.data;
          })
          .catch(e => {
            //console.log("error occurs");
          });
      },
      getCategories() {
        const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
        axios.post(`${ADMIN_URL}/categories`, {
          service_id: this.service_id
        })
          .then(response => {
            this.categories = response.data;
          })
          .catch(e => {
            //console.log("error occurs");
          });

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
        formData.append('coupon_id', this.promo.id);
        formData.append('code', this.promo.code);
        formData.append('description', this.promo.description);
        formData.append('type', this.promo.type);
        formData.append('description', this.promo.description);
        formData.append('status', this.promo.status);
        formData.append('max_uses_user', this.promo.max_uses_user);
        formData.append('order_amount', this.promo.order_amount);
        formData.append('discount_amount', this.promo.discount_amount);
        formData.append('percentage_amount', this.promo.percentage_amount);
        formData.append('discount_per_usage', this.promo.discount_per_usage);
        formData.append('expires_at', this.promo.expires_at);
        formData.append('service_id', this.promo.service_id);
        formData.append('category_id', this.promo.category_id);


        const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
        axios.post(`${ADMIN_URL}/promos/edit`,formData,config)
          .then(response => {
            console.log('Success', response);
            currentObj.success = response.data.success;
            console.log(response.data);
            if(response.data.success===true)
            {
              this.$swal('Success',response.data.message,'success');
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
