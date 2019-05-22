<template>
  <div>
    <b-card>
      <h4>
        Search Location :
        <GmapAutocomplete @place_changed="setPlace">
        </GmapAutocomplete>
      </h4>
      <br>
      <div class="row">
        <div class="col-md-7">


          <GmapMap :center="center"
                   :zoom="15"
                   style="width: 800px; height: 500px">
            <GmapMarker :clickable="true"
                        :draggable="true"
                        :position="marker.position"
            />
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
        </div>
        <div class="col-md-5">
          <b-card>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">City</label>
              <div class="col-sm-9">
                <select class="form-control" v-model="city">
                  <option selected value="Dhaka">Dhaka</option>
                  <option value="Chittagong">Chittagong</option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">Name</label>
              <div class="col-sm-9">
                <input class="form-control" type="text" v-model="location.name">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">Latitude</label>
              <div class="col-sm-9">
                <input class="form-control" type="text" v-model="location.latitude">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">Longitude</label>
              <div class="col-sm-9">
                <input class="form-control" type="text" v-model="location.longitude">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">Radius</label>
              <div class="col-sm-9">
                <input class="form-control" type="text" v-model="location.radius">
              </div>
            </div>
            <b-btn @click="onSubmit" class="btn btn-romoni-secondary float-right">Edit Location</b-btn>
          </b-card>
        </div>
      </div>
    </b-card>


  </div>

</template>

<script>
  import axios from 'axios';
  const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
  export default {
    name: "LocationEdit",
    data() {
      return {
        location: [],
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
    created(){
      let id = window.location.pathname.split("/").pop();
      axios.get(`${ADMIN_URL}/locations/show`,{
        params : {
          id : id
        }
      })
        .then(response =>{
          this.location = response.data;
        })
        .catch(e=>{
          console.log("error occurs");
        });
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
        axios.post(`${ADMIN_URL}/locations/edit`,
          {
            id        : this.location.id,
            city      : this.location.city,
            name      : this.location.name,
            latitude  : this.location.latitude,
            longitude : this.location.longitude,
            radius    : this.location.radius
          })
          .then(response => {
            console.log('Success', response);
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
