<template>
  <div class="animated fadeIn">
     <b-row class="smallCardContainer">
      <b-col v-for="(statusCount, index) in productReqStatus" :key="index" sm="12" md="6" xl="3">
        <div class="card smallCard small">
          <div class="smallCardBody">
            <i v-if="statusCount.status === 'requested'" class="fa fa-hourglass-start bg-success p-3 font-l"></i>
            <i v-else-if="statusCount.status === 'approved'" class="fa fa-thumbs-up bg-success p-3 font-l"></i>
            <i v-else-if="statusCount.status === 'sent'" class="fa fa-spinner bg-success p-3 font-l"></i>
            <i v-else-if="statusCount.status === 'received'" class="fa fa-check-circle bg-success p-3 font-l"></i>
            <div class="p-2">
              <div class="h5 text-success">{{ statusCount.count }}</div>
              <div class="text-muted text-uppercase font-weight-bold font-xs">{{ statusCount.status.toUpperCase() }}</div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>

      <br>
    <div class="cardheading">
      <h4><i class="fa fa-bars"></i><span class="ml-1">Product Requests</span></h4>
      <div class="">
        <h1 class="my-auto tableName"></h1>
      </div>
      <div class="">
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
                <b-col cols="5">
                  <label>From:</label>
                  <datepicker calendar-class="vdp-datepicker" v-model="date_from" format="yyyy-MM-dd"></datepicker>
                </b-col>
                <b-col cols="5">
                  <label>To:</label>
                  <datepicker calendar-class="vdp-datepicker" v-model="date_to" format="yyyy-MM-dd"></datepicker>
                </b-col>
              </b-row>
            </div>

            <div class="form-group">
              <label for="month">For Which Month</label><br>
              <select v-model="month" class="form-control">
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
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

            <template slot="status" slot-scope="props">
              <span :class="getStyleOfStatus(props.row.status)" style="font-size: 12px;">
                {{ props.row.status }}
              </span>
            </template>

            <template slot="action" slot-scope="props">
              <div class="d-flex gap-2">
                <router-link :to="{ name: 'ProductRequestShow', params: { id: props.row.id } }">
                  <span class="btn btn-primary btn-sm m-1" data-toggle="tooltip" title="Show" :href="props.row.show">
                    <i class="fa fa-search"></i>
                  </span>
                </router-link>
                <router-link :to="{ name: 'ProductRequestEdit', params: { id: props.row.id } }"><span
                    class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Edit" :href="props.row.id">
                    <i class="fa fa-edit"></i></span>
                </router-link>

                <span @click="sentProductToSp(props.row.id , props.row.status, props.row.partner_id)"
                 class="btn btn-success btn-sm m-1 btn-send"
                  data-toggle="tooltip" title="Sent">
                   <i class="fa fa-paper-plane"></i>
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
import moment from 'moment';
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
import Vue from 'vue';
import Datepicker from 'vuejs-datepicker';
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
 Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);

export default {
  name: 'ProductRequests',
  components: {
        Datepicker
      },

      computed: {

        getStyleOfStatus: function () {
          return (parm) => {
            if (parm === 'requested') {
              return 'badge badge-primary';

            } else if (parm === 'approved') {
              return 'badge badge-warning';

            } else if (parm === 'sent') {
              return 'badge badge-secondary';

            } else if (parm === 'received') {
              return 'badge badge-success';

            }else if (parm === 'rejected') {
              return 'badge badge-danger';

            }
            else {
              return '';
            }
          }
        },
      },
  data() {
    return {
      productRequests: [],

      columns: [
        'id', 'partner_name', 'created_at', 'requisition_date', 'acquisition_period', 'total_price', 'send_date', 'approved_by', 'status', 'action'
      ],
      date_from: '',
      date_to: '',
      month: null,
      status: 'all',
      exporting: false,
      productReqStatus: [
        { status: 'requested', count: 0 },
        { status: 'approved', count: 0 },
        { status: 'sent', count: 0 },
        { status: 'received', count: 0 }
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
    this.fetchProductReqStatus();

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

    fetchProductReqStatus() {
      axios.get(`${ADMIN_URL}/product-request-status-count`)
        .then(response => {

          const statusCounts = response.data.data;

          this.productReqStatus = [
            { status: 'requested', count: 0 },
            { status: 'approved', count: 0 },
            { status: 'sent', count: 0 },
            { status: 'received', count: 0 }
          ];
          statusCounts.forEach(sc => {
            const status = this.productReqStatus.find(s => s.status === sc.status);
            if (status) {
              status.count = sc.count;
            }
          });


        })
        .catch(error => {
          console.error("Error while fetching product requests", error);
        });
    },

    modalExport() {
            this.$modal.show('modal-order_export');
          },
          closeModal(){
            this.date_from = '';
            this.date_to = '';
            this.month = null;
            this.status = 'all';
            this.$modal.hide('modal-order_export')
          },
          ExportProductRequest(){
            this.exporting = true;
            console.log(this.month);
            console.log(this.date_from);
            console.log(this.date_to);
            console.log(this.status);
            axios({
              method: 'post',
              url: `${ADMIN_URL}/product-request/export`,
              responseType: 'blob',
              data: {

                month: this.month,
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

    sentProductToSp(requestId , status, partnerId) {


      if (status == 'requested') {

         this.$swal('Error', 'Product Request is not Approved Yet.', 'error');
        return;
      }

      if (status == 'sent' || status == 'received') {

        this.$swal('Error', 'Product is already sent/received.', 'error');
        return;
      }

      axios.post(`${ADMIN_URL}/change-product-request-status/${requestId}`,
        {
          id: requestId,
          partner_id:partnerId
        })
        .then(response => {
          if (response.data.success === true) {
            this.$swal('Success', response.data.message, 'success');
          }
          else {
            this.$swal('Error', 'Something went wrong', 'error');
          }
          window.location.reload();
        })
        .catch(e => {
          console.log("error occurs", e);
        });
    }
  },

}
</script>

<style scoped>



.v--modal-overlay >>> .v--modal-box {

  overflow: visible !important;

}

.btn-send{

  cursor: pointer;
}
</style>
