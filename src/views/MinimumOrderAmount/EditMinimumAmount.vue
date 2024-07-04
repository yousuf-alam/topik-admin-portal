<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Edit Info">
        <b-card-text>
          <div class="form-group">
            <label>Locations</label>
            <VueMultiselect v-model="selectedLocation" :options="allLocations" :multiple="false" :searchable="true"
              :allow-empty="true" label="name" placeholder="Select Location"
              track-by="id">
            </VueMultiselect>
            <div v-if="locationError" class="text-danger">{{ locationError }}</div>
          </div>

          <div class="form-group">
            <label>Amount</label>
            <input class="form-control" type="text" v-model="amount">
          </div>

          <div class="form-group">
            <label>Status</label>
            <select class="form-control" v-model="status" >
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>

          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Edit Minimum
          </b-button>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import axios from "axios";
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
import VueMultiselect from 'vue-multiselect';

export default {
  name: "EditMinimumAmount",
  components: {
    VueMultiselect
  },
  data(){
    return {
      amounts: '',
      amount: '',
      status: '',
      amount_id: '',
      isDisabled: true,
      allLocations: [],
      selectedLocation: null,
      locationError: ''
    }
  },
  created() {
    this.amount_id = this.$route.params.id;
    console.log('order id', this.amount_id);
    this.fetchLocations().then(() => {
      this.getOld();
    });
  },
  methods: {
    async fetchLocations(searchParam) {
      let url = `${ADMIN_URL}/search-area`;
      if (searchParam) {
        url += `/${searchParam}`;
      }

      try {
        const response = await axios.get(url);
        this.allLocations = response.data.data.map(location => ({
          id: location.id,
          name: location.name,
          value: location.value
        }));
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    },

    async getOld() {
      try {
        const response = await axios.get(`${ADMIN_URL}/minimum-order-amount/get-item/${this.amount_id}`);
        this.amounts = response.data.data;
        this.amount = this.amounts.amount;
        this.status = this.amounts.status;
        this.selectedLocation = this.allLocations.find(location => location.id === this.amounts.location_id);
        console.log('order id data', this.amounts);
      } catch (e) {
        console.log("error occurs", e.response);
      }
    },

    onSubmit() {
      this.locationError = '';

      if (!this.selectedLocation || !this.selectedLocation.id) {
        this.locationError = 'Please Select a Location.';
        return;
      }

      let formData = {
        amount: this.amount,
        status: this.status,
        location_id: this.selectedLocation.id
      }

      axios.put(`${ADMIN_URL}/minimum-order-amount/update/${this.amount_id}`, formData)
        .then(response => {
          console.log('Success', response);
          this.$router.push('/minimum-order-amount');
        })
        .catch(error => {
          console.error('Error updating minimum order amount:', error);
        });
    }
  }
}
</script>

<style scoped>
</style>
