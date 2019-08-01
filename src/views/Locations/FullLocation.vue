<template>
  <div>
    <b-card>
      <b-row>
        <b-col>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Select City</label>
            <div class="col-sm-9">
              <select class="form-control" v-model="city" @change="selectCity(city)">
                <option selected readonly value="0">Select a City</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
              </select>
            </div>
          </div>
          <GmapMap :center="center"
                   :zoom="12" style="width: 100%; height: 600px"

          >

              <GmapMarker v-for="location in locations" :position="location.position">
                <GmapInfoWindow :options="location.option" :position="location.position"></GmapInfoWindow>
                <GmapCircle
                  :center="location.position"
                  :options="{fillColor:'red',fillOpacity:0.25, strokeWeight:1}"
                  :radius="place_radius"
                  :visible="true"
                  @center_changed="getCenter"
                  @radius_changed="getRadius"
                >
                </GmapCircle>
              </GmapMarker>




          </GmapMap>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "FullLocation",
    data() {
      return {

        locations : [],
        name: '',
        latitude: '',
        longitude: '',
        place_radius: 1000,
        city: '0',
        position: '',
        zoom: 5,
        center: {lat: '', lng: ''},
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
      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
      axios.get(`${ADMIN_URL}/locations`)
        .then(response =>{
          this.locations = response.data;

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
      selectCity(city_name)
      {
        if(city_name==='Dhaka')
        {
          this.center = {lat: 23.7915811, lng: 90.403333}
        }
        else
        {
          this.center = {lat: 22.330370, lng: 91.832626}

        }
      }


    }
  }

</script>

<style scoped>

</style>
<!--<template>
  <div>
    A basic example of using a single infowindow for 3 markers.

    <GmapMap :center="center" :zoom="15" style="width: 100%; height: 500px">


      <GmapMarker :key="i" v-for="(m,i) in markers" :position="m.position" :clickable="true" >
        <gmap-info-window :options="m.infoOption" :position="m.position"  @closeclick="infoWinOpen=false">
        </gmap-info-window>
        <GmapCircle :center="m.position"
                     :options="{fillColor:'red',fillOpacity:0.25}"
                     :radius="place_radius">

        </GmapCircle>
      </GmapMarker>

    </GmapMap>
  </div>

</template>


<script>
  import axios from 'axios';
  export default {

    data() {
      return {
        center: {
          lat: 47.376332,
          lng: 8.547511
        },
        place_radius : 100,
        infoWindowPos: null,
        infoWinOpen: true,
        currentMidx: null,
        infoOptions: {
          infoOption : {
            content: ''
          },
        },
        markers: [{
          position: {
            lat: 47.376332,
            lng: 8.547511
          },
          infoText: '<strong>Marker 1</strong>',
          infoOption : {
            content: '<strong>Marker 1</strong>'
          },
        }, {
          position: {
            lat: 47.374592,
            lng: 8.548867
          },
          infoText: '<strong>Marker 2</strong>',
          infoOption : {
            content: '<strong>Marker 2</strong>'
          },
        }, {
          position: {
            lat: 47.379592,
            lng: 8.549867
          },
          infoText: '<strong>Marker 3</strong>',
          infoOption : {
            content: '<strong>Marker 3</strong>'
          },
        }]
      }},
    created() {
     // this.markers.forEach(this.toggleInfoWindow);
    },
      methods: {

        toggleInfoWindow(marker, idx){

          this.infoWindowPos = marker.position;
          this.infoOptions.content = marker.infoText;
          //check if its the same marker that was selected if yes toggle
          if (this.currentMidx === idx) {
            //this.infoWinOpen = !this.infoWinOpen;
          }
          //if different marker set infowindow to open and reset current marker index
          else {
            this.infoWinOpen = true;
            this.currentMidx = idx;
          }
        }
      }
  }
</script>-->
