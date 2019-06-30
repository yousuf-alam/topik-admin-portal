<template>
  <div>
  <!--<b-card class="m-4 p-4">
    <h5 class="mb-4">Select Accessories (Optional)</h5>
    <div class="form-group">
      <b-row>
        <b-col sm="3" v-for="acc in accessories" class="form-check checkbox mr-4 mb-2" >
          <input class="form-check-input" type="checkbox" :value="acc.name" v-model="selected_accessories" @change="addAccessories">
          <label class="form-check-label">{{acc.name}}</label>
        </b-col>
      </b-row>
      <b-row>
        <b-col  class="form-check checkbox mr-4">
          <label class="form-check-label" >Other : &nbsp</label>
          <textarea type="text" style="width: 100%" v-model="custom_accessories"></textarea>
        </b-col>
      </b-row>
    </div>
  </b-card>-->

  <b-card class="m-4 p-4">
    <h5 class="mb-4">Select Measurement Type</h5>
    <div class="form-group">
      <input type="radio" v-model="measurement_type" value="by_sample" @change="addMeasurement" id="by_sample_id">
      <label for="by_sample_id" class="mx-1"> Customer will provide a sample</label><br>
      
      <input type="radio" v-model="measurement_type" value="by_tailor" @change="addMeasurement" id="by_tailor_id">
      <label for="by_tailor_id" class="mx-1">Tailor will take measurements on spot</label><br>
      
      <input type="radio" v-model="measurement_type" value="custom" @change="addMeasurement" id="custom_id">
      <label for="custom_id" class="mx-1">Enter Measurement Here</label><br>
      <textarea v-if="measurement_type==='own'" type="text" style="width: 100%" v-model="custom_measurement" @keyup="addAccessories"></textarea>
    </div>
  </b-card>
  </div>
</template>

<script>
  import axios from 'axios';
  import EventBus from '../../../utils/EventBus';
  const Admin_URL = process.env.VUE_APP_ADMIN_URL;
export default {
    name: "Accessories",
  data() {
    return {
      measurement_type: '',
      custom_measurement: '',
      accessories: [],
      custom_accessories: '',
      selected_accessories: []
    }
  },
  created() {
    axios.get(`${Admin_URL}/accessories`)
      .then(response => {
        this.accessories = response.data;
      })
      .catch(e => {
        console.log("error occurs",e);
      });
  },
  methods : {
    addAccessories() {

      EventBus.$emit('accessories:add',{
       // 'accessories'       : this.selected_accessories,
        'measurement_type'  : this.measurement_type,
        'custom_measurement': this.custom_measurement
      });
    },
    addMeasurement() {
      this.selected_accessories.push(this.custom_accessories);
      this.addAccessories();
    }
  }
}
</script>

<style scoped>

</style>
