<template>
  <div>
    <b-row>
      <b-col>
        <b-card>
          <v-client-table :data="resources" :columns="columns" :options="options">
            <template slot="action" slot-scope="props">
              <div>
                <router-link :to="{ name: 'ResourceShow', params: { id: props.row.id }}"><span class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Show" :href="props.row.id">
                                    <i class="fa fa-search"></i></span></router-link>
                <router-link :to="{ name: 'ResourceShow', params: { id: props.row.id }}"><span class="btn btn-primary btn-sm m-1" data-toggle="tooltip" title="Go to Resource Profile" :href="props.row.id">
                                    <i class="fa fa-edit"></i></span></router-link>
                <span class="btn btn-danger btn-sm m-1" data-toggle="tooltip" title="Delete"> <i class="fa fa-trash"></i></span>
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
    name: 'Resources',
    data() {
      return {
        resources : [],
        columns: ['id', 'name', 'type', 'partner', 'phone' ,'status', 'created_at', 'action'],
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
      axios.get(`${Base_URL}/api/all-resources`)
        .then(response =>{
          this.resources = response.data;
        })
        .catch(e=>{
          //console.log("error occurs");
        });
    },
    methods: {

    },
  }
</script>
