<template>
  <modal name="modal-order_type" height="auto" :adaptive="true"  :clickToClose="false">
    <div class="m-3 p-3">
      <b-row class="p-2">
        <h4>Please Write Remarks</h4>
        <br /><br />
      </b-row>
      <b-row class="p-2">
        <div class="center-div">
          <input v-model="remarks" type="text" >
          <button @click="closeModal">
            submit
          </button>

        </div>
      </b-row>
    </div>
  </modal>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
};
</script>

<style>
/* Modal styling */
</style>
