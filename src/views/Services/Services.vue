<template>
  <div class="animated fadeIn">
    <div class="cardheading">
      <h4><i class="fa fa-stumbleupon"></i><span class="ml-1">Services</span></h4>
      <div class="">
        <h1 class="my-auto tableName">

        </h1>
      </div>
      <div class="">
        <router-link :to="{ name: 'ServiceCreate'}">
            <button class="btn btn-success">Create New Service</button>
        </router-link>
      </div>
    </div>
    <b-row>
        <b-col>
            <b-card>
            <v-client-table :data="services" :columns="columnsToShow" :options="options">
                <template slot="action" slot-scope="props">
                    <div>
                        <router-link  :to="{ name: 'ServiceEdit', params: { id: props.row.id }}"
                        v-if="elementHasPermission('service update')">
                        <span
                            class="btn btn-warning btn-sm m-1" data-toggle="tooltip"
                            title="Edit" :href="props.row.id"
                        >
                                <i class="fa fa-edit"></i>
                        </span>
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
// console.log('Services.vue ==== axios ==== ', axios.defaults.headers);
    export default {
        name: 'Services',
        data() {
            return {
              services : [],
                columns: ['id', 'name', 'published_status', 'created_at', 'action'],
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
            // console.log('Base url ==== ===========', ADMIN_URL);

            axios.get(`${ADMIN_URL}/services`)
        		.then(response =>{
                    this.services = response.data;
                    console.log('Services.vue, Response === ', response.data);
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
            },
            columnsToShow() {
                const permissionName = ['service update'];
                const permission_ok = this.elementHasPermission(permissionName);
                if (permission_ok === true) {
                    return this.columns;
                } else {
                    return ['id', 'name', 'published_status', 'created_at'];
                }
            }
        },
        methods: {

        },
    }
</script>
