<template>
    <div class="animated fadeIn">
      <b-row>
        <b-col sm="10"></b-col>
        <b-col sm="2" class="mb-3">
          <router-link :to="{ name: 'LocationCreate'}">
            <button class="btn btn-success">Create New Location</button>
          </router-link>
        </b-col>
      </b-row>
        <b-row>
            <b-col>
                <b-card>
                    <v-client-table :data="locations" :columns="columns" :options="options">
                        <template slot="action" slot-scope="props">
                            <div>
                                <router-link :to="{ name: 'Location / Edit', params: { id: 1 }}"><span class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Show" :href="props.row.show">
                                    <i class="fa fa-edit"></i></span></router-link>
                                <span class="btn btn-danger btn-sm m-1" data-toggle="tooltip" title="Delete">
                                    <i class="fa fa-trash"></i></span>
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
        name: 'Locations',
        data() {
            return {
                locations : [],
                columns: ['name', 'city', 'created_by', 'action'],

                options: {
                    pagination: {nav: 'fixed'},
                    filterByColumn: true,
                    toMomentFormat: 'YYYY-MM-DD',
                    sortIcon: {base: 'fa fa-sort', up: 'fa fa-sort-up', down: 'fa fa-sort-down', is: 'fa fa-sort'},

                }

            }
        },
        created(){
          const Base_URL = process.env.VUE_APP_ADMIN_URL;
          axios.get(`${Base_URL}/locations`)
            .then(response =>{
              this.locations = response.data;
            })
            .catch(e=>{
              console.log("error occurs");
            });
        },
        methods: {

            delete(id) {
                // The id can be fetched from the slot-scope row object when id is in columns
                console.log('hi');
            }
        }
    }
</script>
