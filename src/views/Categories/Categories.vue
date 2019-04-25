<template>
  <div>
    <b-row>
      <b-col sm="10"></b-col>
      <b-col sm="2" class="mb-3">
        <router-link :to="{ name: 'CategoryCreate'}"><button class="btn btn-success">Create New Category</button></router-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card>
          <v-client-table :data="categories" :columns="columns" :options="options">
            <template slot="action" slot-scope="props">
              <div v-if="props.row.category === 'none'">
                <router-link :to="{ name: 'Category / Edit', params: { id: props.row.id }}"><span class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Edit" :href="props.row.id">
                                    <i class="fa fa-edit"></i></span></router-link>
                <span class="btn btn-danger btn-sm m-1" data-toggle="tooltip" title="Delete"> <i class="fa fa-trash"></i></span>
              </div>
              <div v-else>
                <router-link :to="{ name: 'Subcategory / Edit', params: { id: props.row.id }}"><span class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Edit" :href="props.row.id">
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
    name: 'Categories',
    data() {
      return {
        categories : [],
        columns: ['name', 'service', 'category' ,'published_status', 'created_at', 'action'],
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
      axios.get(`${Base_URL}/api/categories`)
        .then(response =>{
          this.categories = response.data;
        })
        .catch(e=>{
          //console.log("error occurs");
        });
    },
    methods: {

    },
  }
</script>
