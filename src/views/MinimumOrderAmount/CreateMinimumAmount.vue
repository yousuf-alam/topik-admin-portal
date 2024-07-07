<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Basic Info">
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
            <select class="form-control" v-model="status">
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>



          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Create Amount
          </b-button>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import axios from "axios";
import VueMultiselect from 'vue-multiselect';
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

export default {
  name: "CreateMinimumAmount",
  components: {

    VueMultiselect

  },
  data() {
    return {
      amount: '',
      status: '',
      allLocations: [],
      selectedLocation: null,
      locationError: ''

    }
  },

  created() {

    this.fetchLocations();

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

    onSubmit() {

      this.locationError = '';

      if (!this.selectedLocation) {
        this.locationError = 'Please Select a Location.';
        return;
      }

      let formData = {
        amount: this.amount,
        status: this.status,
        location_id: this.selectedLocation.id

      }


      axios.post(`${ADMIN_URL}/minimum-order-amount/create`, formData)
        .then(response => {
          console.log('Success', response);

          if (response.data.success === true) {
            this.$swal("Success","Minimum Order Amount Created Successfully!", "success");
          return this.$router.push('/minimum-order-amount');

          }

        })
        .catch(error => {

        });
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css" scoped></style>
