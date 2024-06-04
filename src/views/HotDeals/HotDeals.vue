<template>
  <div class="animated fadeIn">

    <div>
      <div class="cardheading">
        <h4><i class="fa fa-gift"></i><span class="ml-1">Hot Deals</span></h4>
        <div class="">
          <h1 class="my-auto tableName">

          </h1>
        </div>

        <div class="d-flex justify-content-between gap-5">

          <!-- <router-link :to="{ name: 'HotDealCreate' }">
            <button class="btn btn-success">Create New Hot Deal</button>
          </router-link> -->
        </div>
      </div>
      <b-row>
        <b-col>
          <b-card>
            <v-client-table :data="tableData" :columns="columns" :options="options">

              <template slot="description" slot-scope="props">
                {{ cutDescriptionToShort(props.row.description) }}
              </template>
              <template slot="thumbnail" slot-scope="props">
                <div class="center-div">
                  <img :src="props.row.thumbnail" style="width: 160px; height: 90px;">
                </div>
              </template>
              <!-- <template slot="action" slot-scope="props">
                <div class="d-flex gap-2">
                  <router-link :to="{ name: 'HotDealEdit', params: { id: props.row.id } }"><span
                      class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Edit" :href="props.row.id">
                      <i class="fa fa-edit"></i></span></router-link>

                </div>
              </template> -->
            </v-client-table>
          </b-card>
        </b-col>
      </b-row>
    </div>

  </div>
</template>


<script>
import axios from 'axios';
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;


export default {
  name: 'HotDeals',
  data() {
    return {
      data_loaded_successfully: false,

      columns: ['id', 'name', 'description', 'slug', 'discount_type','discount_amount','code', 'status', 'thumbnail'],
      tableData: [],
      options: {
        pagination: { nav: 'fixed' },
        filterByColumn: true,
        toMomentFormat: 'YYYY-MM-DD',
        sortIcon: { base: 'fa fa-sort', up: 'fa fa-sort-up', down: 'fa fa-sort-down', is: 'fa fa-sort' },
      }
    }
  },
  created() {
    this.getAllProducts();
  },
  methods: {
    handleOptionChange() {
      console.log("key", this.key)
      this.getAllProducts();
    },
    getAllProducts() {
      axios.get(`${ADMIN_URL}/hot-deals`, { key: this.key })
        .then(response => {
          this.tableData = response.data.data;
          this.data_loaded_successfully = true;
        }).catch(error => {
          // console.log('Errorrrrrrrrrrrrrrr ', error.response);
        })
    },


  },


  computed: {
    cutDescriptionToShort() {
      return (description) => {
        if (description === null) {
          return 'No Description Found.';
        }
        return description.substring(0, 50);
      }
    }
  }
}
</script>
