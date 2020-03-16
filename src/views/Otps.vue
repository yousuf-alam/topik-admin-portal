<template>
  <div class="animated fadeIn">
    <div class="cardheading">
      <h4><i class="fa fa-gift"></i><span class="ml-1">Otps</span></h4>
      <div class="">
        <h1 class="my-auto tableName">

        </h1>
      </div>
    </div>
    <b-row>
      <b-col>
        <b-card>
          <v-client-table :data="otps" :columns="columns" :options="options">
          </v-client-table>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>


<script>
  import axios from 'axios';
  export default {
    name: 'Eloan',
    data() {
      return {
        otps : [],
        columns: ['phone', 'otp','created_at'],
        options: {
          pagination: {nav: 'fixed'},
          filterByColumn: true,
          dateColumns: ['age'],
          toMomentFormat: 'YYYY-MM-DD',
          sortIcon: {base: 'fa fa-sort', up: 'fa fa-sort-up', down: 'fa fa-sort-down', is: 'fa fa-sort'},

        }

      }
    },
    created(){
      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
      axios.get(`${ADMIN_URL}/otps`)
        .then(response =>{
          this.otps = response.data;
        })
        .catch(e=>{
          //console.log("error occurs");
        });
    },
    methods: {

    },
  }
</script>
