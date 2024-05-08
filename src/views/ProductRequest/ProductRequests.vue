<template>
  <div class="animated fadeIn">
    <div class="cardheading">
      <h4><i class="fa fa-bars"></i><span class="ml-1">Product Requests</span></h4>
      <div class="">
        <h1 class="my-auto tableName"></h1>
      </div>
      <div class="">
        <!-- Assuming permissions are handled similarly -->
        <router-link :to="{ name: 'ProductRequestCreate'}">
          <button class="btn btn-success">Create New Product Request</button>
        </router-link>
      </div>
    </div>

    <b-row>
      <b-col>
        <b-card>
          <v-client-table :data="productRequests" :columns="columns" :options="options">
            <template slot="action" slot-scope="props">
              <div class="d-flex gap-2">
                <router-link :to="{ name: 'ProductRequestShow', params: { id: props.row.id } }">
                  <span class="btn btn-primary btn-sm m-1" data-toggle="tooltip" title="Show" :href="props.row.show">
                    <i class="fa fa-search"></i>
                  </span>
                </router-link>
                <router-link :to="{ name: 'ProductRequestEdit', params: { id: props.row.id } }"><span
                    class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Edit" :href="props.row.id">
                    <i class="fa fa-edit"></i></span></router-link>
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
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;


export default {
  name: 'ProductRequests',
  data() {
    return {
      productRequests: [],
      columns: [
        'id', 'partner_name', 'status', 'requisition_date', 'acquisition_period', 'total_price', 'send_date', 'approved_by', 'created_at', 'action'
      ],
      options: {
        pagination: { nav: 'fixed' },
        filterByColumn: true,
        // dateColumns: ['requisition_date', 'send_date', 'created_at'],
        toMomentFormat: 'YYYY-MM-DD',
        sortIcon: { base: 'fa fa-sort', up: 'fa fa-sort-up', down: 'fa fa-sort-down', is: 'fa fa-sort' },
      }
    }
  },
  created() {
    this.fetchProductRequests();
  },
  methods: {
    fetchProductRequests() {
      axios.get(`${ADMIN_URL}/all-product-requests`)
        .then(response => {
          this.productRequests = response.data.data;
        })
        .catch(error => {
          console.error("Error while fetching product requests", error);
        });
    },
    // handleDelete(id) {
    //   // Similar confirmation and deletion logic
    // },
  },

}
</script>
