<template>
  <div>
    <b-row>
      <b-col sm="10"></b-col>
      <b-col sm="2" class="mb-3">
        <router-link :to="{ name: 'LineItemCreate'}" v-if="elementHasPermission('lineitem create')">
          <button class="btn btn-success">Create New Lineitem</button>
        </router-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card>
          <v-client-table :data="categories" :columns="columns" :options="options">
            <template slot="action" slot-scope="props">
              <div>
                <router-link :to="{ name: 'LineItemEdit', params: { id: props.row.id }}"
                v-if="elementHasPermission('lineitem update')">
                  <span 
                      class="btn btn-warning btn-sm m-1" 
                      data-toggle="tooltip" title="Edit" 
                      :href="props.row.id">
                    <i class="fa fa-edit"></i>
                  </span>
                </router-link>
                <span 
                  v-if="elementHasPermission('lineitem delete')"
                  class="btn btn-danger btn-sm m-1" 
                  data-toggle="tooltip" title="Delete"> 
                    <i class="fa fa-trash"></i>
                </span>
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
    name: 'Lineitems',
    data() {
      return {
        categories : [],
        columns: ['id', 'name', 'service', 'category', 'subcategory' ,'published_status', 'created_at', 'action'],
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
      const Base_URL = process.env.VUE_APP_ADMIN_URL;
      axios.get(`${Base_URL}/api/lineitems`)
        .then(response =>{
          this.categories = response.data;
        })
        .catch(e=>{
          //console.log("error occurs");
        });
    },
    computed: {
      elementHasPermission(permission_name) {
          return (permission_name) => {
            return this.$store.getters['auth/hasPermission'](permission_name) ? true : false;
          }
      }
    },    
    methods: {

    },
  }
</script>
