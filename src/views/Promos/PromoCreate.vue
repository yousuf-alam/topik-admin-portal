<template>
  <b-card class="m-4">
    <h5 class="mb-4">Create Promo Code</h5>
    <form @submit="onSubmit" enctype="multipart/form-data">
      <div class="form-group">
        <label>Code</label>
          <input type="text" class="form-control"  v-model="code" style="margin-bottom: 10px;">
          <b-button variant="primary" @click="generateAndSetCode"> Generate Code</b-button>
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
          <option value="platform">Platform</option>
        </select>
      </div>


      <div class="form-group">
        <label>Locations</label>
        <VueMultiselect v-model="selectedLocation" :options="allLocations" :multiple="true"
         :searchable="true" :close-on-select="false"
          :allow-empty="true" label="name" placeholder="Select Location"
          :preserve-search="true"
          track-by="id">
        </VueMultiselect>
        <div v-if="locationError" class="text-danger">{{ locationError }}</div>
      </div>



      <div class="form-group">
        <label >Medium Type</label>
        <select class='form-control' v-model="medium">
          <option value="all">All Platform</option>
          <option value="portal">Admin Portal</option>
          <option value="app">User App</option>
        </select>
      </div>

      <div v-if="type==='platform'" class="form-group">
        <label>Platforms *</label>
          <MultiSelect
            v-model="platforms"
            :searchable="false"
            :close-on-select="false"
            :show-labels="false"
            :options="all_platforms"
            :multiple="true">
          </MultiSelect>
      </div>
      <div v-if="type==='percentage' || type==='platform'" class="form-group">
        <label>Percentage Amount (%)</label>
        <input type="text" class="form-control" v-model="percentage_amount">
      </div>
      <div class="form-group">
        <label v-if="type==='percentage' || type==='platform'">Maximum Discount Amount</label>
        <label v-else>Discount Amount</label>
        <input type="text" class="form-control" v-model="discount_amount">
      </div>
      <div v-if="type==='download'" class="form-group">
        <label>Discount Per Usage</label>
        <input type="text" class="form-control" v-model="discount_per_usage">
      </div>
      <div class="form-group">
        <label>Maximum Usage of per User</label>
        <input type="number" class="form-control" v-model="max_uses_user">
      </div>
      <div class="form-group">
        <label>User Limit</label>
        <input type="number" class="form-control" v-model="user_limit">
      </div>
      <div class="form-group">
        <label>Minimum Order Value</label>
        <input type="number" class="form-control" v-model="order_amount">
      </div>
      <div class="form-group">
        <label>Expires on</label>
        <datetimepicker format="YYYY-MM-DD H:i:s" :disabledDates="disabledDates" v-model="expires_at"></datetimepicker>
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
      <div v-if="service_id !== null" class="form-group">
        <label >Select Category</label>
        <select class='form-control' v-model="category_id">
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
  import Datetimepicker from 'vuejs-datetimepicker';
  import MultiSelect from 'vue-multiselect';
  import VueMultiselect from 'vue-multiselect';

  const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

  export default {
    name: "PromoCreate",
    components: {
      Datepicker,
      Datetimepicker,
      MultiSelect,
      VueMultiselect
    },
    data() {
      return {
        code: '',
        description: '',
        type: '0',
        medium: 'all',
        services: '',
        published_status: '',
        categories: '',
        service_id: null,
        category_id: null,
        max_uses_user: '',
        user_limit: '',
        order_amount: '',
        discount_amount: '',
        percentage_amount: '',
        discount_per_usage: '',
        expires_at: '',
        all_platforms: ['android','ios','web'],
        platforms: null,
        disabledDates: {
          to: new Date(Date.now() - 8640000)
        },
       allLocations: [],
       selectedLocation: null,
       locationError: ''

      }
    },
    created() {

      this.fetchLocations();

      axios.get(`${ADMIN_URL}/services`)
        .then(response => {
          this.services = response.data;
        })
        .catch(e => {
          //console.log("error occurs");
        });


    },
    methods: {


      fetchLocations(searchParam) {
      let url = `${ADMIN_URL}/search-area`;
      if (searchParam) {
        url += `/${searchParam}`;
      }

      axios.get(url)
        .then(response => {
          this.allLocations = response.data.data.map(location => ({
            id: location.id,
            name: location.name,
            value: location.value
           }));
        })
        .catch(error => {
          console.error('Error fetching locations:', error);
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
      onImageChange(e) {
        this.image = e.target.files[0];
      },

      generateAndSetCode() {
        // headers: {

        //   'Access-Control-Allow-Origin': '*'
        // }
        const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
        axios.get(`${ADMIN_URL}/generate-promocode`, {

        })
          .then(response => {
            this.code = response.data.data;
          })
          .catch(e => {
            console.log("error occurs");
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
        formData.append('code', this.code);
        formData.append('description', this.description);
        formData.append('type', this.type);
        formData.append('published_status', this.published_status);
        formData.append('max_uses_user', this.max_uses_user);
        formData.append('user_limit', this.user_limit);
        formData.append('order_amount', this.order_amount);
        formData.append('discount_amount', this.discount_amount);
        formData.append('percentage_amount', this.percentage_amount);
        formData.append('discount_per_usage', this.discount_per_usage);
        formData.append('expires_at', this.expires_at);
        formData.append('service_id', this.service_id);
        formData.append('category_id', this.category_id);
        formData.append('medium', this.medium);
        if(this.platforms)
        {
            formData.append('platforms', JSON.stringify(this.platforms));
        }

        if (this.selectedLocation) {
          const locationIds = this.selectedLocation.map(location => location.id);
          formData.append('locations', JSON.stringify(locationIds));
        }


        console.log('uu',JSON.stringify(this.platforms));

        const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
        axios.post(`${ADMIN_URL}/promos/create`,formData,config)
          .then(response => {
            console.log('Success', response);
            currentObj.success = response.data.success;
            console.log(response.data);
            if(response.data.success===true)
            {
              this.$swal('Success',response.data.message,'success');
              window.location.href='/promos'
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

<style src="vue-multiselect/dist/vue-multiselect.min.css" scoped></style>

