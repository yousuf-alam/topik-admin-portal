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
          <option value="platform">Platform</option>
        </select>
      </div>
      <div v-if="promo.type==='platform'" class="form-group">
        <label>Platforms *</label>
        <MultiSelect
          v-model="promo.platforms"
          :searchable="false"
          :close-on-select="false"
          :show-labels="false"
          :options="all_platforms"
          :multiple="true">
        </MultiSelect>
      </div>
      <div v-if="promo.type==='percentage'" class="form-group">
        <label>Percentage Amount (%)</label>
        <input type="text" class="form-control" v-model="promo.percentage_amount">
      </div>
      <div class="form-group">
        <label v-if="promo.type==='percentage'">Maximum Discount Amount</label>
        <label v-else>Discount Amount</label>
        <input type="text" class="form-control" v-model="promo.discount_amount">
      </div>
      <div v-if="promo.type==='download'" class="form-group">
        <label>Discount Per Usage</label>
        <input type="text" class="form-control" v-model="promo.discount_per_usage">
      </div>
      <div v-if="promo.type==='fixed'" class="form-group">
        <label>User Limit</label>
        <input type="text" class="form-control" v-model="promo.user_limit">
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
        <datetimepicker format="YYYY-MM-DD H:i:s" :disabledDates="disabledDates" v-model="promo.expires_at"></datetimepicker>
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
          <option selected value=null>All Services</option>
          <option :value="serv.id" v-for="serv in services">{{ serv.name }}</option>
        </select>
      </div>
      <div v-if="promo.service_id !== null" class="form-group">
        <label >Select Category</label>
        <select class='form-control' v-model="promo.category_id">
          <option selected value=null>All Categories</option>
          <option :value="cat.id" v-for="cat in categories">{{ cat.name }}</option>
        </select>
      </div>
      <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Update Promo Code</b-button>
    </form>
  </b-card>
</template>

<script>
  import axios from 'axios';
  import Datepicker from 'vuejs-datepicker';
  import Datetimepicker from 'vuejs-datetimepicker';
  import MultiSelect from 'vue-multiselect';
  export default {
    name: "PromoEdit",
    components: {
      Datepicker,
      Datetimepicker,
      MultiSelect
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
        service_id: null,
        category_id: null,
        max_uses_user: '',
        user_limit:'',
        order_amount: '',
        discount_amount: '',
        percentage_amount: '',
        discount_per_usage: '',
        expires_at: '',
        all_platforms: ['android','ios','web'],
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
          this.promo.platforms = JSON.parse(response.data.platforms)
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
      onSubmit(e) {
        /*this.changeDateFormat();*/
        e.preventDefault();
        let currentObj = this;
          const config = {
              headers: {
                  'content-type': 'application/json',
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
        formData.append('user_limit', this.promo.user_limit);
        formData.append('order_amount', this.promo.order_amount);
        formData.append('discount_amount', this.promo.discount_amount);
        formData.append('percentage_amount', this.promo.percentage_amount);
        formData.append('discount_per_usage', this.promo.discount_per_usage);
        formData.append('expires_at', this.promo.expires_at);
        formData.append('service_id', this.promo.service_id);
        formData.append('category_id', this.promo.category_id);

        if(this.promo.platforms)
        {
            formData.append('platforms', JSON.stringify(this.promo.platforms));
        }

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
