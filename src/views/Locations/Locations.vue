<template>
    <div class="animated fadeIn">
      <div class="cardheading">
        <h4><i class="icon icon-location-pin"></i><span class="ml-1">Locations</span></h4>
        <div class="">
          <h1 class="my-auto tableName">

          </h1>
        </div>
        <div class="">
          <router-link :to="{ name: 'LocationCreate'}">
            <button class="btn btn-success">Create New Location</button>
          </router-link>
        </div>
      </div>
      <b-row>
            <b-col>
                <b-card>
                  <router-link :to="{ name: 'FullLocation'}">
                    <button class="btn btn-romoni-secondary">See Full Area Coverage</button>
                  </router-link>
                    <v-client-table :data="locations" :columns="columns" :options="options">
                        <template slot="action" slot-scope="props">
                            <div>
                                <router-link :to="{ name: 'LocationEdit', params: { id: props.row.id }}"><span class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Edit" :href="props.row.show">
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
                columns: ['name', 'city','radius', 'action'],

                options: {
                    pagination: {nav: 'fixed'},
                    filterByColumn: true,
                    toMomentFormat: 'YYYY-MM-DD',
                    sortIcon: {base: 'fa fa-sort', up: 'fa fa-sort-up', down: 'fa fa-sort-down', is: 'fa fa-sort'},

                }

            }
        },
        created(){
          const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
          axios.get(`${ADMIN_URL}/locations`)
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
