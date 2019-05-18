<template>
  <div>
  <b-card class="m-4 p-4">
    <h5 class="mb-4">Select Accessories (Optional)</h5>
    <div class="form-group">
      <b-row>
        <div class="col col form-check checkbox mr-4">
        <input class="form-check-input" type="checkbox" value="buttons" v-model="accessories.buttons">
        <label class="form-check-label" >Buttons</label>
        </div>
        <div class="col form-check checkbox mr-4">
          <input class="form-check-input" type="checkbox" v-model="accessories.lace">
          <label class="form-check-label" >Lace</label>
        </div>
        <div class="col form-check checkbox mr-4">
          <input class="form-check-input" type="checkbox" v-model="accessories.panel">
          <label class="form-check-label">Panel (Lawn/Silk)</label>
        </div>
      </b-row>
      <b-row>
        <div class="col form-check checkbox mr-4">
          <input class="form-check-input" type="checkbox" v-model="accessories.patch">
          <label class="form-check-label">Embroidery Patch </label>
        </div>
        <div class="col form-check checkbox mr-4">
          <input class="form-check-input" type="checkbox" v-model="accessories.lining">
          <label class="form-check-label">Extra Lining</label>
        </div>
        <div class="col form-check checkbox mr-4">
          <input class="form-check-input" type="checkbox" v-model="accessories.belt">
          <label class="form-check-label" >Belt</label>
        </div>
      </b-row><br>
      <b-row>
        <div class="col form-check checkbox mr-4">
          <input class="form-check-input" type="checkbox">
          <label class="form-check-label" >Other : &nbsp</label>
          <input type="text" size="55" v-model="accessories.other">
        </div>
      </b-row>
    </div>
  </b-card>

  <b-card class="m-4 p-4">
    <h5 class="mb-4">Select Measurement Type</h5>
    <div class="form-group">
      <input type="radio" v-model="measurement_type" value="sample">
      <label>Customer will provide a sample</label><br>
      <input type="radio" v-model="measurement_type" value="tailor">
      <label>Tailor will take measurements on spot</label><br>
      <input type="radio" v-model="measurement_type" value="own">
      <label>Enter Measurement Here</label><br>
      <textarea v-if="measurement_type==='own'" type="text" style="width: 100%" v-model="custom_measurement"></textarea>
    </div>
  </b-card>
  </div>
</template>

<script>
    export default {
        name: "Accessories",
      data() {
          return {
            measurement_type: '',
            custom_measurement: '',
            accessories: {
              buttons : '',
              lace : '',
              panel : '',
              patch : '',
              lining : '',
              belt: '',
              other: ''

            }
          }
      }
    }
</script>

<style scoped>

</style>
