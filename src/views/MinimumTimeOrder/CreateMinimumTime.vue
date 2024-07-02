<template>
  <b-card class="m-4">
    <b-tabs card pills>
      <b-tab active title="Basic Info">
        <b-card-text>
          <div class="form-group">
            <label>Hours</label>
            <input class="form-control" type="text" v-model="hours" >
          </div>

          <div class="form-group">
            <label>Location</label>
            <VueMultiselect v-model="selectedLocation" :options="allLocations" :multiple="true"
                    :searchable="true" :close-on-select="false" :allow-empty="true" label="name"
                    placeholder="Select location" :preserve-search="true" track-by="id">
           </VueMultiselect>

          </div>

          <div class="form-group">
            <label>Status</label>
            <select class="form-control" v-model="status">
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>



          <b-button @click="onSubmit" variant="primary"><i class="fa fa-dot-circle-o"></i> Create Minimum Time
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
  name: "CreateMinimumTime",

  components: {

  VueMultiselect

},
  data(){
    return {
      hours:'',
      status:'',
      allLocations: [],
      selectedLocation: []

    }
  },
  methods:{


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
            value: product.value
          }));
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    },


    onSubmit() {

      let formData = {
        hours:this.hours,
        status:this.status,

      }
      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

      axios.post(`${ADMIN_URL}/minimum-time-before-order/create`, formData)
          .then(response => {
            console.log('Success', response);

            return this.$router.push('/minimum-order-time');

          })
          .catch(error => {

          });
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css" scoped></style>

