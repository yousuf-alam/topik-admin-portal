<template>
  <div>
    <div class="cardheading ">
      <div class="">
          
      </div>
      <div class="">
          <span sm="2" class="mb-3 my-2" v-if="elementHasPermission('lineitem create')">
            <router-link :to="{ name: 'LineItemCreate'}">
              <button class="btn btn-success">Create New Lineitem</button>
            </router-link>
          </span>                        
      </div>
    </div>
    <b-row>
      <b-col>
        <b-card>
          <v-client-table :data="categories" :columns="columns" :options="options">
            <template slot="action" slot-scope="props">
              <div>
                <router-link :to="{ name: 'LineitemEdit', params: { id: props.row.id }}"
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
      const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
      axios.get(`${ADMIN_URL}/all-line-items`)
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
