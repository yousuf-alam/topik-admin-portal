<template>
  <div class="animated fadeIn">
    <div class="cardheading">
      <h4><i class="fa fa-gift"></i><span class="ml-1">E-Loan Applicants</span></h4>
      <div class="">
        <h1 class="my-auto tableName">

        </h1>
      </div>
    </div>
    <b-row>
      <b-col>
        <b-card>
          <v-client-table :data="loans" :columns="columns" :options="options">
            <template slot="action" slot-scope="props">
              <div>
                <router-link :to="{ name: 'EloanShow', params: { id: props.row.id }}"><span class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Edit" :href="props.row.id">
                                    <i class="fa fa-search"></i></span></router-link>
              </div>
            </template>
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
        loans : [],
        columns: ['id', 'partner', 'status','amount', 'created_at', 'action'],
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
      axios.get(`${ADMIN_URL}/eloan/all`)
        .then(response =>{
          this.loans = response.data;
        })
        .catch(e=>{
          //console.log("error occurs");
        });
    },
    methods: {

    },
  }
</script>
