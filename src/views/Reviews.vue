<template>
  <div class="animated fadeIn">

    <div v-if="data_loaded_successfully">
      <div class="cardheading">
        <h4><i class="fa fa-thumbs-up"></i><span class="ml-1">Reviews</span></h4>
      </div>
      <b-row>
        <b-col>
          <b-card>
            <v-client-table :data="tableData" :columns="columns" :options="options">
              <template slot="order_id" slot-scope="props">
                <router-link :to="{ name: 'OrderEdit', params: { id: props.row.order_id }}">
                            <span class="p-2" data-toggle="tooltip" title="See Order Details" :href="props.row.edit">
                                {{props.row.order_id}}
                            </span>
                </router-link>
              </template>
              <template slot="action" slot-scope="props">
                <div>
                  <router-link :to="{ name: 'OrderEdit', params: { id: props.row.order_id }}">
                                <span class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Show" :href="props.row.edit">
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
    <div v-else class="customcard">
      Loading...
    </div>
  </div>
</template>


<script>
    import axios from 'axios';
    const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
    export default {
        name: 'Reviews',
        data() {
            return {
                data_loaded_successfully: false,
                columns: ['order_id', 'partner', 'rating','comment','created_at' ,'action'],
                tableData: [],
                options: {
                    pagination: {nav: 'fixed'},
                    filterByColumn: true,
                    dateColumns: ['age'],
                    toMomentFormat: 'YYYY-MM-DD',
                    sortIcon: {base: 'fa fa-sort', up: 'fa fa-sort-up', down: 'fa fa-sort-down', is: 'fa fa-sort'},
                }
            }
        },
        created() {
            this.getReviews();
        },
        methods: {
            getReviews() {
                axios.get(`${ADMIN_URL}/reviews`)
                    .then(res => {
                        this.tableData = res.data;
                        this.data_loaded_successfully = true;
                    }).catch(error => {
                    // console.log('Errorrrrrrrrrrrrrrr ', error.response);
                })
            }
        }

    }
</script>
