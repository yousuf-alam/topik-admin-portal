<template>
  <b-card class="h-100 m-4 p-4">
    <h5 class="mb-4">Location</h5>
    <b-form-group label="Select City">
        <select class="form-control" @change="getLocation" v-model="city">
          <option value="Dhaka">Dhaka</option>
          <option value="Chittagong">Chittagong</option>
        </select>
      </b-form-group>
    <b-form-group label="Select Area">
      <select class="form-control" @change="addLocation" v-model="selected_location">
        <option value="0" disabled>Select a Location</option>
        <option :value="location.id" v-for="location in locations">{{ location.name }}</option>
      </select>
    </b-form-group>
  </b-card>
</template>

<script>
  import axios from 'axios';
  import EventBus from '../../../utils/EventBus'
  const Base_URL = process.env.VUE_APP_ADMIN_URL;
  export default {
    name: "Location",

    data() {
      return {
        locations: [],
        selected_location: '0',
        city: 'Dhaka'
      }
    },
    created() {
      this.getLocation();
    },
    methods : {
      getLocation()
      {
        axios.get(`${Base_URL}/locations-by-city`, {
          params : {
            city : this.city
          }
        })
          .then(response => {
            this.locations = response.data;
          })
          .catch(e => {
            console.log("error occurs");
          });
      },
      addLocation()
      {
        EventBus.$emit('location:add',this.selected_location);
      }
    }
  }
</script>

<style scoped>

</style>
