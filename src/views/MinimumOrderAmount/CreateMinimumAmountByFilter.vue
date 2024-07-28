<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Basic Info">
        <b-card-text>
          <div class="form-group">
            <label>Location</label>
            <vue-multiselect v-model="selectedLocation" :options="locations" :searchable="true" :close-on-select="true"
              :show-labels="false" placeholder="Select a location" label="name" track-by="id"
              @input="onLocationChange"></vue-multiselect>
            <span v-if="locationError" class="text-danger">{{ locationError }}</span>
          </div>



          <div v-if="selectedLocation && selectedLocation.name !== 'All'" class="form-group">
            <label>Area</label>
            <vue-multiselect v-model="selectedAreas" :options="areas" :multiple="true" :searchable="true"
              :close-on-select="false" :show-labels="false" placeholder="Select areas" label="name" track-by="id"
              @input="onAreaChange"></vue-multiselect>
            <span v-if="areaError" class="text-danger">{{ areaError }}</span>

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
      locations: [
        { id: 'all', name: 'All' },
        { id: 'Dhaka', name: 'Dhaka' },
        { id: 'Chittagong', name: 'Chittagong' }
      ],
      selectedLocation: null,
      areas: [],
      selectedAreas: [],
      locationError: '',
      areaError: ''

    }
  },

  created() {
    this.fetchLocations();
  },

  methods: {
    fetchLocations() {
      axios.get(`${ADMIN_URL}/locations`)
        .then(response => {

          this.locations = this.locations.concat(response.data.data.map(location => ({
            id: location.id,
            name: location.name
          })));
        })
        .catch(error => {
          console.error('Error fetching locations:', error);
        });
    },

    onLocationChange(selected) {
      this.locationError = '';

      this.selectedAreas = [];
      this.areas = [];
      if (selected && selected.id !== 'all') {
        this.fetchAreas(selected.id);
      }
    },


    onAreaChange(selected) {

      this.areaError = '';

      if (selected && selected.length > 0) {
        const allOption = this.areas.find(area => area.id === 'all');
        if (allOption) {
          this.selectedAreas = selected.includes(allOption) ? [allOption] : selected.filter(area => area.id !== 'all');
        }
      }
    },

    fetchAreas(city) {
      axios.get(`${ADMIN_URL}/locations-by-city`, {
        params: { city }
      })
        .then(response => {

          const allOption = { id: 'all', name: 'All' };
          this.areas = [allOption, ...response.data.map(area => ({
            id: area.id,
            name: area.name,
          }))];
        })
        .catch(error => {
          console.error('Error fetching areas:', error);
        });
    },

    onSubmit() {
      this.locationError = '';
      this.areaError = '';

      if (!this.selectedLocation) {
        this.locationError = 'Please Select a Location.';
        return;
      }

      if (this.selectedLocation.id !== 'all' && (!this.selectedAreas || this.selectedAreas.length === 0)) {
        this.areaError = 'Please Select at least one Area.';
        return;
      }

      let formData = {
        amount: this.amount,
        status: this.status,
        location: this.selectedLocation.id,
        area: this.selectedAreas.map(area => area.id)
      }

      axios.post(`${ADMIN_URL}/minimum-order-amount/filter-create`, formData)
        .then(response => {
          if (response.data.success === true) {
            this.$swal("Success", "Minimum Order Amount Created Successfully!", "success");
            this.$router.push('/minimum-order-amount');
          }

          if (response.data.success === false) {
            this.$swal("Error", response.data.message, "error");
          }
        })
        .catch(error => {
          console.error('Error creating minimum order amount:', error);
        });
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css" scoped></style>
