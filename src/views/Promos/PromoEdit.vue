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
        <label>Coupon Type</label>
        <select class='form-control' v-model="promo.type">
          <option value="0" selected disabled>Select Coupon Type</option>
          <option value="fixed">Fixed</option>
          <option value="percentage">Percentage</option>
          <option value="download">On App Download</option>
          <option value="platform">Platform</option>
        </select>
      </div>



      <div class="form-group">
        <label>Locations</label>
        <VueMultiselect v-model="selectedLocation" :options="allLocations" :multiple="true" :searchable="true"
          :close-on-select="false" :allow-empty="true" label="name" placeholder="Select Location"
          :preserve-search="true" track-by="id">
        </VueMultiselect>
        <div v-if="locationError" class="text-danger">{{ locationError }}</div>
      </div>

      <div class="form-group">
        <label>Medium Type</label>
        <select class='form-control' v-model="promo.medium">
          <option value="all">All Platform</option>
          <option value="portal">Admin Portal</option>
          <option value="app">User App</option>
        </select>
      </div>


      <div v-if="promo.type === 'platform'" class="form-group">
        <label>Platforms *</label>
        <MultiSelect v-model="promo.platforms" :searchable="false" :close-on-select="false" :show-labels="false"
          :options="all_platforms" :multiple="true">
        </MultiSelect>
      </div>
      <div v-if="promo.type === 'percentage'" class="form-group">
        <label>Percentage Amount (%)</label>
        <input type="text" class="form-control" v-model="promo.percentage_amount">
      </div>
      <div class="form-group">
        <label v-if="promo.type === 'percentage'">Maximum Discount Amount</label>
        <label v-else>Discount Amount</label>
        <input type="text" class="form-control" v-model="promo.discount_amount">
      </div>
      <div v-if="promo.type === 'download'" class="form-group">
        <label>Discount Per Usage</label>
        <input type="text" class="form-control" v-model="promo.discount_per_usage">
      </div>
      <div class="form-group">
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
        <datetimepicker format="YYYY-MM-DD H:i:s" :disabledDates="disabledDates" v-model="promo.expires_at">
        </datetimepicker>
      </div>
      <div class="form-group">

        <input type="radio" value="unpublished" v-model="promo.status">
        <label>Unpublished</label><br>
        <input type="radio" value="published" v-model="promo.status">
        <label>Published</label>
      </div>
      <div class="form-group">
        <label>Select Service</label>
        <select @change="getCategories" class='form-control' v-model="promo.service_id">
          <option selected value="">All Services</option>
          <option :value="serv.id" v-for="serv in services">{{ serv.name }}</option>
        </select>
      </div>
      <div v-if="promo.service_id !== null" class="form-group">
        <label>Select Category</label>
        <select class='form-control' v-model="promo.category_id">
          <option selected value="">All Categories</option>
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
import VueMultiselect from 'vue-multiselect';
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;


export default {
  name: "PromoEdit",
  components: {
    Datepicker,
    Datetimepicker,
    MultiSelect,
    VueMultiselect
  },
  data() {
    return {
      promo: [],
      code: '',
      description: '',
      type: '0',
      medium: '',
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
      all_platforms: ['android', 'ios', 'web'],
      disabledDates: {
        to: new Date(Date.now() - 8640000)
      },
      allLocations: [],
      selectedLocation: null,
      locationError: '',



    }
  },
  created() {
    this.fetchLocations();
    this.fetchPromoDetails();
    this.getServices();


  },


  methods: {

    fetchLocations(searchParam) {
      let url = `${process.env.VUE_APP_ADMIN_URL}/search-area`;
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



    fetchPromoDetails() {
      const promoId = window.location.pathname.split("/").pop();
      axios.get(`${ADMIN_URL}/promos/show`, { params: { id: promoId } })
        .then(response => {
          this.promo = response.data;
          console.log(this.promo);
          if (this.promo.platforms) {
            this.promo.platforms = JSON.parse(this.promo.platforms);
          }
          if (this.promo.location_ids && this.promo.location_ids.length > 0) {

            // console.log(this.promo.location_ids);
            //  const locationIds = this.promo.location_ids;
            // this.selectedLocation = this.allLocations.filter(location =>
            //   locationIds.includes(location.id)
            // );

            this.selectedLocation = this.promo.location_ids.map(location => ({
              id: location.id,
              name: location.name,
              value: location.value
            }));
          }
        })
        .catch(error => {
          console.error('Error fetching promo details:', error);
        });
    },
    getServices() {
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
          'Accept': 'application/json',
        }
      }
      let formData = new FormData();
      formData.append('coupon_id', this.promo.id);
      formData.append('code', this.promo.code);
      formData.append('description', this.promo.description);
      formData.append('type', this.promo.type);
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
      formData.append('medium', this.promo.medium);

      if (this.promo.platforms) {
        formData.append('platforms', JSON.stringify(this.promo.platforms));
      }


      if (this.selectedLocation && this.selectedLocation.length > 0) {
        const locationIds = this.selectedLocation.map(location => location.id);
        formData.append('location_ids', JSON.stringify(locationIds));
      }

      axios.post(`${ADMIN_URL}/promos/edit`, formData, config)
        .then(response => {
          console.log('Success', response);
          currentObj.success = response.data.success;
          console.log(response.data);
          if (response.data.success === true) {
            this.$swal('Success', response.data.message, 'success');
            window.location.href = '/promos'
          }
          else {
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
