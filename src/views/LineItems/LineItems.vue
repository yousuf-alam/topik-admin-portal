<template>
  <div class="animated fadeIn">
    <div class="cardheading">
      <h4><i class="fa fa-bars"></i><span class="ml-1">LineItems</span>
      
      
         
   
      </h4>

    

      <div class="">
        <h1 class="my-auto tableName">

        </h1>
      </div>
      <div class="">
        <router-link :to="{ name: 'LineItemCreate'}" v-if="elementHasPermission('lineitem create')">
          <button class="btn btn-success">Create New Lineitem</button>
        </router-link>
      </div>
    </div>
     
    
   
    <b-row>
 
      <b-col>
        <b-card>
            <button class="btn btn-success"  @click="ExportLineItems">Export as .xlsx</button>
          <v-client-table :data="lineitems" :columns="columns" :options="options">
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
                  class="btn btn-danger btn-sm m-1"
                  data-toggle="tooltip"
                  title="Delete Lineitem"
                  :href="props.row.id"
                  @click="handleDelete(props.row.id)"
                >
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
  import FileSaver from 'file-saver';
  const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
  export default {
    name: 'Lineitems',
    data() {
      return {
        lineitems : [],
        columns: [
          'id', 'name', 'service', 'category', 'subcategory',
          'published_status', 'created_at', 'action'
        ],
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
      axios.get(`${ADMIN_URL}/all-line-items`)
        .then(response => {
          this.lineitems = response.data;
        })
        .catch(e => {
          console.log("error occurs", e.response);
        });
    },
    computed: {
      elementHasPermission(permission_name) {
          return (permission_name) => {
            return !!this.$store.getters['auth/hasPermission'](permission_name);
          }
      }
    },
    methods: {
        handleDelete(lineitem_id) {
            this.$swal({
                title: 'Are you sure?',
                type: 'warning',
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
            }).then(result => {
                if(result.value) {
                    this.deleteLineItem(lineitem_id);
                }
            }).catch(error => {
                // console.log('Sweetalert ERROR');
            });
        },
        deleteLineItem(lineitem_id) {
            axios.delete(`${ADMIN_URL}/line-items/delete`,
                {
                    params : {
                        id : lineitem_id
                    }
                })
                .then(response => {
                    if(response.data.success===true)
                    {
                        this.$swal('Deleted', response.data.message, 'success')
                    }

                    window.location.reload()
                }).catch(error => {
                this.$swal('Not deleted', 'Error occured while deleing', 'info')
                // console.log('Error response :::: ', error.response);
            })
        },
        ExportLineItems() {
      // Use axios to request the backend to generate the Excel file
      axios
        .get(`${ADMIN_URL}/line-items/export-lineitems`, { responseType: 'blob' })
        .then(response => {
          const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const fileName = 'line_items.xlsx';
          FileSaver.saveAs(blob, fileName);
        })
        .catch(error => {
          console.error('Error while downloading the Excel file', error);
        });
    },







    },
  }
</script>
