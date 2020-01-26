<template>
<div class="animated fadeIn">
  <b-card>
    <div class="row w-100">
      <div class="col-lg-4 mx-auto">
        <div class="auth-form-light text-left p-5">
          <input type="hidden" name="_token" value="">
          <div class="form-group">
            <label class="text-center">Check GP Star Loyalty</label>
            <input type="text" class="form-control form-control-lg" v-model="phone">
          </div>
          <div class="mt-3">
            <button class="btn btn-info btn-block" @click="check" :disabled="loading">Check Number</button>
            <b-spinner variant="danger" label="Spinning" v-if="loading"></b-spinner>
            <h3 :class="result.color" class="font-weight-bold text-center"> {{result.text}}</h3>
          </div>
        </div>

      </div>
    </div>
  </b-card>

</div>
</template>

<script>
  import axios from 'axios';
  const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

    export default {
        name: "GpStar",
      data(){
          return{
            phone: '',
            loading: false,
            result: {
              'text': '',
              'color': ''
            }

          }
      },
      methods: {
          check(){
            this.loading = true;
            axios.post(`${ADMIN_URL}/check-gp-star`,
              {
                phone: this.phone
              }).then(response =>{
              this.loading = false;
              if(response.data.success===true)
              {
                this.result.text = response.data.gpstar_status;
                this.result.color = 'text-success';

              }
              else {
                this.result.text = response.data.gpstar_status;
                this.result.color = 'text-danger';
              }
              console.log(response.data);

            })
              .catch(e=>{
                this.loading = false;
                console.log('e',e)
                this.$swal('Error', 'Something Went Wrong', 'error');
              });
          }
      }
    }
</script>

<style scoped>

</style>
