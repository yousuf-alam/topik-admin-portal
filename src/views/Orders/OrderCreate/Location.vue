<template>
  <b-card class="h-100 m-4 p-4">
    <h5 class="mb-4">Location</h5>
    <b-form-group label="Select City">
        <select class="form-control" @change="getLocation" v-model="city">
          <option value="Dhaka">Dhaka</option>
          <option value="Chittagong">Chittagong</option>
          <option value="Tongi">Tongi</option>
          <option value="Gazipur">Gazipur</option>
          <option value="Savar">Savar</option>
          <option value="Narayanganj">Narayanganj</option>
        </select>
      </b-form-group>
    <b-form-group label="Select Area">
      <select class="form-control" @change="addLocation" v-model="selected_location">
        <option value="0" disabled>Select a Location</option>
        <option :value="location.id" v-for="location in locations" :key="location.id">
          {{ location.name }}
        </option>
      </select>
    </b-form-group>
    <p v-if="minimum_order_amount !== null"  class="text-success font-weight-bold">
      Minimum order amount for selected area: {{ minimum_order_amount }}
    </p>
  </b-card>
</template>

<script>
  import axios from 'axios';
  import EventBus from '../../../utils/EventBus'
  const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
  export default {
    name: "Location",

    data() {
      return {
        locations: [],
        selected_location: '0',
        city: 'Dhaka',
        minimum_order_amount: null
      }
    },
    created() {
      this.getLocation();
    },
    methods : {
      getLocation()
      {
        axios.get(`${ADMIN_URL}/locations-by-city`, {
          params : {
            city : this.city
          }
        })
          .then(response => {
            console.log('order create: Location.vue ', response.data)
            this.locations = response.data;
          })
          .catch(e => {
            console.log("error occurs");
          });
      },
      addLocation()
      {

        this.fetchMinimumOrderAmount();

       },
      fetchMinimumOrderAmount() {
        axios.get(`${ADMIN_URL}/minimum-order-amount`, {
          params: {
            location_id: this.selected_location
          }
        })
          .then(response => {
            this.minimum_order_amount = response.data.data.amount;
            EventBus.$emit('location:add', {
              location_id: this.selected_location,
              minimum_order_amount: this.minimum_order_amount
            });
          })
          .catch(e => {
            console.log("error fetching minimum order amount", e);
          });
      }
    }
  }
</script>

<style scoped>

</style>
