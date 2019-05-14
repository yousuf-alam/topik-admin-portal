<template>
  <div>
    <b-card>
      <div class="center-div mb-5">
  <!--    <GmapMap :center="center"
               :zoom="15"
               map-type-id="terrain"
               style="width: 800px; height: 500px">
        <GmapCircle
          :center="marker.position"
          :radius="1000"
          :visible="true"
          :options="{fillColor:'red',fillOpacity:0.25}"
        ></GmapCircle>
      </GmapMap>-->
        <label>
          AutoComplete
          <GmapAutocomplete @place_changed="setPlace">
          </GmapAutocomplete>
          <button @click="usePlace">Add</button>
        </label>
        <br/>

        <GmapMap style="width: 800px; height: 500px"
                 :zoom="15"
                 :center="center">
          <GmapMarker v-for="(marker, index) in markers"
                      :key="index"
                      :position="marker.position"
          />
          <GmapMarker
            v-if="this.place"
            label="★"
            :position="{
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng(),
        }"
          />
        </GmapMap>
      </div>



      <div class="form-group row">
        <label class="col-sm-3 col-form-label">City</label>
        <div class="col-sm-9">
          <select class="form-control" v-model="city">
            <option value="Dhaka" selected>Dhaka</option>
            <option value="Chittagong">Chittagong</option>
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
          <input class="form-control" type="text" v-model="radius">
        </div>
      </div>
    </b-card>
  </div>

</template>

<script>
    export default {
        name: "LocationCreate",
      data() {
          return {
            name: '',
            latitude: '',
            longitude: '',
            radius: '',
            city: 'Dhaka',
            position: '',
            zoom: 5,
            center: { lat: 23.7915811, lng: 90.403333 },
            markers: [],
            place: null,
          }
      },
      description: 'Autocomplete Example (#164)',
      methods: {
        setDescription(description) {
          this.description = description;
        },
        setPlace(place) {
          this.place = place
        },
        usePlace(place) {
          if (this.place) {
            this.markers.push({
              position: {
                lat: this.place.geometry.location.lat(),
                lng: this.place.geometry.location.lng(),
              }
            });
            this.place = null;
          }
        }
      }
    }
</script>

<style scoped>

</style>
