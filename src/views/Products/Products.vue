<template>
  <div class="animated fadeIn">

    <div>
      <div class="cardheading">
        <h4><i class="fa fa-thumbs-down"></i><span class="ml-1">Products</span></h4>
        <div class="">
          <h1 class="my-auto tableName">

          </h1>
        </div>

        <div class="d-flex justify-content-between gap-5">

          <router-link :to="{ name: 'ProductCreate' }">
            <button class="btn btn-success">Create New Product</button>
          </router-link>
        </div>
      </div>
      <b-row>
        <b-col>
          <b-card>
            <v-client-table :data="tableData" :columns="columns" :options="options">

              <template slot="description" slot-scope="props">
                {{ cutDescriptionToShort(props.row.description) }}
              </template>
              <template slot="image" slot-scope="props">
                <div class="center-div">
                  <img :src="props.row.image_url" style="width: 160px; height: 90px;">
                </div>
              </template>
              <template slot="action" slot-scope="props">
                <div class="d-flex gap-2">
                  <router-link :to="{ name: 'ProductEdit', params: { id: props.row.id } }"><span
                      class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Edit" :href="props.row.id">
                      <i class="fa fa-edit"></i></span></router-link>
                  <span class="btn btn-danger btn-sm m-1" data-toggle="tooltip" title="Delete Product"
                    :href="props.row.id" @click="handleDelete(props.row.id)">
                    <i class="fa fa-trash"></i>
                  </span>
                </div>
              </template>
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
  name: 'Products',
  data() {
    return {
      data_loaded_successfully: false,
      key: 'this_month',
      columns: ['id', 'category_name', 'product_name_en', 'product_name_bn', 'zoho_code','old_price','new_price', 'image', 'action'],
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
      axios.get(`${ADMIN_URL}/all-products`, { key: this.key })
        .then(response => {
          this.tableData = response.data.data;
          this.data_loaded_successfully = true;
        }).catch(error => {
          // console.log('Errorrrrrrrrrrrrrrr ', error.response);
        })
    },

    handleDelete(product_id) {
      this.$swal({
        title: 'Are you sure?',
        type: 'warning',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
      }).then(result => {
        if (result.value) {
          this.deleteProductItem(product_id);
        }
      }).catch(error => {
        // console.log('Sweetalert ERROR');
      });
    },
    deleteProductItem(product_id) {

      axios.delete(`${ADMIN_URL}/delete-product/${product_id}`
      )
        .then(response => {
          if (response.data.success === true) {
            this.$swal('Deleted', response.data.message, 'success')
          }

          window.location.reload()
        }).catch(error => {
          this.$swal('Not deleted', 'Error occured while deleing', 'info')
          // console.log('Error response :::: ', error.response);
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
