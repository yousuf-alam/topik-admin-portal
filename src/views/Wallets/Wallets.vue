<template>
  <div>
    <b-row>
      <b-col>
        <b-card>
          <v-client-table :data="partners" :columns="columns" :options="options">
            <template slot="action" slot-scope="props">
              <div>
                <router-link :to="{ name: 'WalletShow', params: { id: props.row.id }}">
                  <span class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Show" :href="props.row.id"><i class="fa fa-search"></i></span>
                </router-link>
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
    name: 'Wallets',
    data() {
      return {
        partners : [],
        columns: ['id', 'name', 'type', 'booking type', 'phone' ,'status', 'balance', 'action'],
        options: {
          pagination: {nav: 'fixed'},
          filterByColumn: true,
          //dateColumns: ['created_at'],
          toMomentFormat: 'YYYY-MM-DD',
          sortIcon: {base: 'fa fa-sort', up: 'fa fa-sort-up', down: 'fa fa-sort-down', is: 'fa fa-sort'},

        }

      }
    },
    created(){
      const Base_URL = process.env.VUE_APP_ADMIN_URL;
      axios.get(`${Base_URL}/all-partners`)
        .then(response =>{
          this.partners = response.data;
        })
        .catch(e=>{
          //console.log("error occurs");
        });
    },
    methods: {

    },
  }
</script>
