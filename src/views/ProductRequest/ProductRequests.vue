<template>
  <div class="animated fadeIn">


    <br>
    <div class="cardheading">
      <h4><i class="fa fa-bars"></i><span class="ml-1">Product Requests</span></h4>
      <div class="d-flex justify-content-between gap-5">
        <select v-model="key" class="form-control mr-2" @change="handleOptionChange"
          style="width: 180px;background: #4dbd74;color: white">
          <option value="this_month">This month</option>
          <option value="last_month">Last month</option>
          <option value="last_three_month">Last three month</option>
          <option value="last_six_month">Last six month</option>
          <option value="this_year">This year</option>
          <option value="last_year">Previous year</option>

        </select>
        <router-link :to="{ name: 'ProductRequestCreate' }">
          <button class="btn btn-success">Create New Product Request</button>
        </router-link>
      </div>

    </div>

<b-row class="mt-4" style="margin-top: 2rem">
  <b-col v-for="(statusCount, index) in productReqStatus" :key="index" sm="12" md="6" xl="3">
    <div class="card smallCard small">
      <div class="smallCardBody">
        <i v-if="statusCount.status === 'requested'" class="fa fa-hourglass-start bg-success p-3 font-l"></i>
        <i v-else-if="statusCount.status === 'approved'" class="fa fa-thumbs-up bg-success p-3 font-l"></i>
        <i v-else-if="statusCount.status === 'sent'" class="fa fa-paper-plane bg-success p-3 font-l"></i>
        <i v-else-if="statusCount.status === 'received'" class="fa fa-check-circle bg-success p-3 font-l"></i>
        <div class="p-2">
          <div class="h5 text-success">{{ statusCount.count }}</div>
          <div class="text-muted text-uppercase font-weight-bold font-xs">{{ statusCount.status.toUpperCase() }}
          </div>
        </div>
      </div>
    </div>
  </b-col>
</b-row>


    <b-row>
      <modal name="modal-order_export" height="auto" :adaptive="true">
        <div class="m-3 p-3">
          <b-row class="p-2 border-bottom">
            <h4>Export Product Request as .xlsx</h4><br><br>
          </b-row>
          <b-row class="p-2">
            <b-col>
              <div class="form-group">
                <label class="font-weight-bold">Select Export Type:</label>
                <select v-model="exportType" class="form-control">
                  <option value="dateWise">Date Wise</option>
                  <option value="monthWise">Month Wise</option>
                </select>
              </div>

              <div v-if="exportType === 'dateWise'" class="form-group">
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

              <div v-if="exportType === 'monthWise'" class="form-group">
                <label class="font-weight-bold">Select Year:</label>
                <select v-model="year" class="form-control">
                  <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                </select>
                <label class="font-weight-bold">Select Month:</label>
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
                <label>Select Partner</label>
                <select class="form-control" v-model="sp_id">
                  <option value="all" selected>All</option>
                    <option v-for="partner in partners" :value="partner.id" :key="partner.id">
                        {{ partner . name }}
                    </option>
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
          <button @click="modalExport" class="btn btn-success mb-2"><i class="fa fa-file-excel-o"></i> Export as .xlsx
          </button>
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

                <span @click="sentProductToSp(props.row.id, props.row.status, props.row.partner_id)"
                  class="btn btn-success btn-sm m-1 btn-send" data-toggle="tooltip" title="Sent">
                  <i class="fa fa-paper-plane"></i>
                </span>
                <span @click="exportPartnerWiseReqData(props.row.partner_id)" class="btn btn-info btn-sm m-1 btn-send"
                  data-toggle="tooltip" title="Export">
                  <i class="fa fa-solid fa-download"></i>
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

        } else if (parm === 'rejected') {
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
        'id','Product_Type', 'Partner_Name', 'status', 'Requisition_Date', 'Acquisition_Period', 'Total_Price', 'Sent_Date', 'approved_by', 'created_at', 'action'
       ],
      sp_id:'all',
      date_from: '',
      date_to: '',
      month: null,
      year: new Date().getFullYear(),
      years: this.getYearsList(),
      status: 'all',
      key: 'this_month',
      exporting: false,
       productReqStatus: [
        { status: 'requested', count: 0 },
        { status: 'approved', count: 0 },
        { status: 'sent', count: 0 },
        { status: 'received', count: 0 }
      ],
      partners: [],
      exportType: '',

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
    this.fetchInHousePartners();

  },
  methods: {



    getYearsList() {
      const currentYear = new Date().getFullYear();
      const startYear = currentYear - 3;
      const endYear = currentYear + 6;
      const years = [];
      for (let year = startYear; year <= endYear; year++) {
        years.push(year);
      }
      return years;
    },
    handleOptionChange() {
      console.log("key", this.key)
      this.fetchProductRequests();
    },

    fetchInHousePartners() {
      axios.get(`${ADMIN_URL}/fetch-inhouse-sp`)
        .then(response => {
          this.partners = response.data;

        })
        .catch(error => {
          console.error('Error fetching in-house partners: ', error);
        });
    },


     fetchProductRequests() {
      axios.post(`${ADMIN_URL}/all-product-requests`, { key: this.key })
        .then(response => {
          this.productRequests = response.data.data;
          const statusCounts=response.data.statistics;

          this.productReqStatus = [
            { status: 'requested', count: 0 },
            { status: 'approved', count: 0 },
            { status: 'sent', count: 0 },
            { status: 'received', count: 0 }
          ];
          // Update counts based on response
          statusCounts.forEach(sc => {
            const status = this.productReqStatus.find(s => s.status === sc.status);
            if (status) {
              status.count = sc.count;
            }
          });
          this.data_loaded_successfully = true;
        }).catch(error => {
          // console.log('Errorrrrrrrrrrrrrrr ', error.response);
        })
     },

    modalExport() {
      this.$modal.show('modal-order_export');
    },
    closeModal() {

      this.exportType = '';
      this.date_from = '';
      this.date_to = '';
      this.month = '';
      // this.sp_id = '';
      this.$modal.hide('modal-order_export')
    },
    ExportProductRequest() {
      this.exporting = true;

      const data = {
        exportType: this.exportType,
        sp_id: this.sp_id
      };

      if (this.exportType === 'dateWise') {
        data.date_from = this.date_from;
        data.date_to = this.date_to;
      } else if (this.exportType === 'monthWise') {
        data.year = this.year;
        data.month = this.month;
      }

      axios({
        method: 'post',
        url: `${ADMIN_URL}/product-request/export`,
        responseType: 'blob',
        data: data
      })
        .then(response => {
          this.exporting = false;

          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          let filename = 'product_request_report.xlsx';

          if (this.exportType === 'dateWise') {
            filename = `product_request_report_${moment(this.date_from).format('YYYY-MM-DD')}_to_${moment(this.date_to).format('YYYY-MM-DD')}.xlsx`;
          } else if (this.exportType === 'monthWise') {
            filename = `product_request_report_${this.year}_${this.month}.xlsx`;
          }

          link.href = url;
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
          this.$swal('Report Exported Successfully', '', 'success');
          this.closeModal();
        })
        .catch(e => {
          console.log("error occurs", e);
          this.exporting = false;
        });
    },


    sentProductToSp(requestId, status, partnerId) {


      if (status == 'requested') {

        this.$swal('Error', 'Product Request is not Approved Yet.', 'error');
        return;
      }

      if (status == 'sent' || status == 'received') {

        this.$swal('Error', 'Product is already sent/received.', 'error');
        return;
      }

      if (status == 'rejected') {

        this.$swal('Error', 'This request is already rejected.', 'error');
        return;
      }

      axios.post(`${ADMIN_URL}/change-product-request-status/${requestId}`,
        {
          id: requestId,
          partner_id: partnerId
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
    },

    exportPartnerWiseReqData(partnerId) {
      this.exporting = true;

      axios({
        method: 'get',
        url: `${ADMIN_URL}/export-partner-requests/${partnerId}`,
        responseType: 'blob'
      })
        .then(response => {
          this.exporting = false;
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'partner_product_request_report_' + partnerId + '.xlsx');
          document.body.appendChild(link);
          link.click();
          this.$swal('Partner Report Exported Successfully', '', 'success');
        })
        .catch(e => {
          console.log("error occurs", e);
          this.exporting = false;
          this.$swal('Error', 'Failed to export partner report', 'error');
        });
    }
  },

}
</script>

<style scoped>
.v--modal-overlay>>>.v--modal-box {

  overflow: visible !important;

}

.btn-send {

  cursor: pointer;
}
</style>
