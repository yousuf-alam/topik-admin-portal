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
      <modal name="modal-order_export" height="auto" :adaptive="true">
        <div class="m-3 p-3">
          <b-row class="p-2 border-bottom">
            <h4>Export Product Request as .xlsx</h4><br><br>
          </b-row>
          <b-row class="p-2">
           <b-col>
            <div class="form-group">
              <label class="font-weight-bold">Select Date Range:</label>
              <b-row>
                <b-col>
                  <label>From:</label>
                  <datepicker calendar-class="vdp-datepicker" v-model="date_from" format="yyyy-MM-dd"></datepicker>
                </b-col>
                <b-col>
                  <label>To:</label>
                  <datepicker calendar-class="vdp-datepicker" v-model="date_to" format="yyyy-MM-dd"></datepicker>
                </b-col>
              </b-row>
            </div>

             <div class="form-group">
               <label class="font-weight-bold">Select Date Type:</label>
               <select class="form-control" v-model="date_type">
                 <option selected value="requisition_date">Requisition Date</option>
                 <option value="created_at">Created at</option>
               </select>
             </div>
             <div class="form-group">
               <label class="font-weight-bold">Select Status:</label>
               <select class="form-control" v-model="status">
                 <option selected value="all">All</option>
                 <option value="requested">Requested</option>
                 <option value="approved">Approved</option>
                 <option value="sent">Sent</option>
                 <option value="received">Received</option>
                 <option value="rejected">Rejected</option>
               </select>
             </div>
             <button @click="closeModal" class="btn btn-danger float-right m-1">Cancel</button>
             <button @click="ExportProductRequest" class="btn btn-romoni-secondary float-right m-1">Export Product Request Report</button>
             <b-spinner variant="danger" label="Spinning" v-if="exporting"></b-spinner>
           </b-col>
          </b-row>

        </div>
      </modal>
    </b-row>
    <b-row>
      <b-col>
        <b-card>
          <button  @click="modalExport" class="btn btn-success mb-2"><i class="fa fa-file-excel-o"></i> Export as .xlsx </button>
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
import moment from 'moment';
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
import Vue from 'vue';
import paginate from 'vuejs-paginate';
import _ from 'lodash';
import Datepicker from 'vuejs-datepicker';
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import store from "../../store/store";
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);

export default {
  name: 'ProductRequests',
  components: {
        Datepicker
      },
  data() {
    return {
      productRequests: [],
      columns: [
        'id', 'partner_name', 'status', 'requisition_date', 'acquisition_period', 'total_price', 'send_date', 'approved_by', 'created_at', 'action'
      ],
      date_from: '',
      date_to: '',
      date_type: 'requisition_date',
      status: 'all',
      exporting: false,

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

    modalExport() {
            this.$modal.show('modal-order_export');
          },
          closeModal(){
            this.$modal.hide('modal-order_export')
          },
          ExportProductRequest(){
            this.exporting = true;
            console.log(this.date_type);
            console.log(this.date_from);
            console.log(this.date_to);
            console.log(this.status);
            axios({
              method: 'post',
              url: `${ADMIN_URL}/product-request/export`,
              responseType: 'blob',
              data: {

                date_type: this.date_type,
                status: this.status,
                date_from: this.date_from,
                date_to: this.date_to

              }


            })
              .then(response => {

                this.exporting = false;

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'product_request_report_' + moment(this.date_from).format('YYYY-MM-DD') + '~' + moment(this.date_to).format('YYYY-MM-DD') +'.xlsx');
                document.body.appendChild(link);
                link.click();
                this.$swal('Report Exported Successfully', '', 'success');
                this.closeModal();
              })
              .catch(e => {
                console.log("error occurs",e);
              });


          },
  },

}
</script>
