<template>
  <div>
    <b-card>
      <h4>
        Search Location :
        <GmapAutocomplete @place_changed="setPlace">
        </GmapAutocomplete>
      </h4>
      <br>
      <b-row>
        <b-col md="8">
          <GmapMap :center="center"
                   :zoom="15"
                   style="width: auto; height: 500px">
            <GmapMarker
              :position="{
                lat: this.place.geometry.location.lat(),
                lng: this.place.geometry.location.lng(),
              }"
              label="★"
              v-if="this.place"
            />
            <GmapCircle
              :center="marker.position"
              :draggable="true"
              :editable="true"
              :options="{fillColor:'red',fillOpacity:0.25}"
              :radius="place_radius"
              :visible="true"
              @center_changed="getCenter"
              @radius_changed="getRadius"
            ></GmapCircle>
          </GmapMap>
        </b-col>
        <b-col md="4">
          <b-card>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">City</label>
            <div class="col-sm-9">
              <select class="form-control" v-model="city">
                <option selected value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Tongi">Tongi</option>
                <option value="Gazipur">Gazipur</option>
                <option value="Savar">Savar</option>
                <option value="Narayanganj">Narayanganj</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Name</label>
            <div class="col-sm-9">
              <input class="form-control" type="text" v-model="name">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Latitude</label>
            <div class="col-sm-9">
              <input class="form-control" type="text" v-model="latitude">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Longitude</label>
            <div class="col-sm-9">
              <input class="form-control" type="text" v-model="longitude">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Radius</label>
            <div class="col-sm-9">
              <input class="form-control" type="text" v-model="place_radius">
            </div>
          </div>
            <b-btn @click="onSubmit" class="btn btn-romoni-secondary float-right">Add New Location</b-btn>
          </b-card>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "LocationCreate",
    data() {
      return {
        name: '',
        latitude: '',
        longitude: '',
        place_radius: 1000,
        city: 'Dhaka',
        position: '',
        zoom: 5,
        center: {lat: 23.7915811, lng: 90.403333},
        marker: {
          position: {
            lat: '',
            lng: ''
          }
        },
        place: null,
      }
    },
    methods: {

      getCenter(center) {
        this.latitude = center.lat();
        this.longitude = center.lng();
      },

      getRadius(radius) {
        this.place_radius = radius;
      },

      setPlace(place) {
        this.place = place;
        if (this.place) {
          this.marker.position.lat = this.place.geometry.location.lat();
          this.marker.position.lng = this.place.geometry.location.lng();
          this.center.lat = this.marker.position.lat;
          this.center.lng = this.marker.position.lng;
          this.latitude = this.marker.position.lat;
          this.longitude = this.marker.position.lng;
        }
      },
      onSubmit()
      {
        const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
        axios.post(`${ADMIN_URL}/locations/create`,
          {
            city      : this.city,
            name      : this.name,
            latitude  : this.latitude,
            longitude : this.longitude,
            radius    : this.place_radius
          })
          .then(response => {
            if(response.data.success===true)
            {
              this.$swal(response.data.message, '', 'success');
            }
            else
            {
              this.$swal('Something went wrong', '', 'error');
            }
            console.log(response.data);
          })
          .catch(error => {
            console.log('Error  ... ', error.response);
            console.log(error);
          });
      }
    }
  }

</script>

<style scoped>

</style>
