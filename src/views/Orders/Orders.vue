<template>
    <div class="animated fadeIn">
      <div class="cardheading">
          <h4><i class="fa fa-table"></i><span class="ml-1">Orders</span></h4>
        <router-link class="btn btn-success mb-2" to="/orders/create">+ Create New Order</router-link>
      </div>
      <b-row>
        <modal name="modal-order_type" height="auto" :adaptive="true">
          <div class="m-3 p-3">
            <b-row class="p-2">
              <h4>Choose Order Type</h4><br><br>
            </b-row>
            <b-row class="p-2">
              <div class="center-div">
                <button @click="createOrder('Beauty On-Demand')" class="btn btn-primary m-2">Beauty On-Demand</button>
                <!--<button @click="createOrder('Beauty Appointment')" class="btn btn-primary m-2">Beauty Appointment</button>-->
                <button @click="createOrder('Tailor On-Demand')" class="btn btn-romoni-secondary m-2">Tailor On-Demand</button>
              </div>

            </b-row>

          </div>
        </modal>
        <modal name="modal-order_export" height="auto" :adaptive="true">
          <div class="m-3 p-3">
            <b-row class="p-2 border-bottom">
              <h4>Export Orders as .xlsx</h4><br><br>
            </b-row>
            <b-row class="p-2">
             <b-col>
               <div class="form-group">
					      <label class="font-weight-bold">Select Date Range:</label>
                 <p>
                   <label>From : &nbsp;</label>
                   <datepicker calendar-class="vdp-datepicker" v-model="date_from" format="yyyy-MM-dd"></datepicker>
                   <label>To : &nbsp;</label>
                   <datepicker calendar-class="vdp-datepicker" v-model="date_to" format="yyyy-MM-dd"></datepicker>
                 </p>
               </div>
               <div class="form-group">
                 <label class="font-weight-bold">Select Service:</label>
                 <select class="form-control" v-model="service" @change="fetchCategories">
                   <option selected value="all">All</option>
                   <option value="1">Beauty On-Demand</option>
                   <option value="2">Tailor On-Demand</option>
                 </select>
               </div>
               <div class="form-group">
                 <label class="font-weight-bold">Select Category:</label>
                 <select class="form-control" v-model="category">
                   <option selected value="all">All</option>
                   <option v-for="cat in categories" :value="cat.id" :key="cat.id">{{cat.name}}</option>
                 </select>
               </div>
               <div class="form-group">
                 <label class="font-weight-bold">Select Date Type:</label>
                 <select class="form-control" v-model="date_type">
                   <option selected value="schedule" v-if="service!=='2'">Scheduled</option>
                   <option value="created_at">Created at</option>
                 </select>
               </div>
               <div class="form-group">
                 <label class="font-weight-bold">Select Status:</label>
                 <select class="form-control" v-model="status">
                   <option selected value="all">All</option>
                   <option value="pending">Pending</option>
                   <option value="accepted">Accepted</option>
                   <option value="started">Started</option>
                   <option value="completed">Completed</option>
                   <option value="rejected">Rejected</option>
                   <option value="cancelled">Cancelled</option>
                 </select>
               </div>
               <button @click="closeModal" class="btn btn-danger float-right m-1">Cancel</button>
               <button @click="ExportOrder" class="btn btn-romoni-secondary float-right m-1">Export Order Report</button>
             </b-col>
            </b-row>

          </div>
        </modal>
      </b-row>
      <b-row>
          <b-col>
              <b-card>
                <button @click="modalExport" class="btn btn-success mb-2"><i class="fa fa-file-excel-o"></i> Export as .xlsx </button>
                  <div class="d-flex">
                    <div style="margin-left: auto;" class="mb-3">
                      <span class="mx-1">Per Page: </span>
                      <select class="form-control" v-model="perPageItem" @change="makeReadySearchParams()">
                        <option :value="5">5</option>
                        <option :value="10">10</option>
                        <option :value="20">20</option>
                        <option :value="50">50</option>
                      </select>
                    </div>
                </div>
                <div class="table-responsive" id="order_table_container">
                <table>
                  <tr class="hadingOne">
                    <th v-for="item in columns" :key="item" @click="headingSortColumn(item)">
                      <div class="d-flex justify-content-between">
                        <span class="mr-2"> {{ makeColNameReadable(item)}} </span>
                        <span :class="getSortIconStyle(item)" class="d-flex align-items-center"></span>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th v-for="item in columns" :key="item">
                      <div v-if="dateColumns.includes(item)">
                        <span v-html="makeDateRangeStrReadable(dateRangeString[item])"></span>
                        <VueCtkDateTimePicker
                          input-size=sm


                          :range=true
                          :no-label=true
                          label="Select"
                          id="RangeDatePicker"
                          format="YYYY-MM-DD"
                          formatted="ll"

                          color="#533b87"

                          v-model="dateRange[item]"
                          @formatted-value="handleDateRangeChange(item)"

                        >
                          <!-- <button class="btn btn-secondary">Select</button> -->
                        </VueCtkDateTimePicker>

                      </div>
                      <div v-else-if="noFilteColumns.includes(item)">

                      </div>
                      <div v-else>
                        <input
                          v-model="columnInputs[item]"
                          :name="item"
                          class="form-control"
                          :placeholder="`Filter By ${item}`"
                          @keyup="handleInputChange"
                        />
                      </div>
                    </th>
                  </tr>

                  <tr v-for="order in orders" :key="order.id">
                    <td> {{ order.created_at }} </td>

                    <td> {{ order.id }} </td>
                    <td> {{ order.service_type }} </td>
                    <td> {{ order.platform }} </td>
                    <td class="text-center">
                      <span :class="getStyleOfStatus(order.status)" style="font-size: 12px;">
                        {{ order.status }}
                      </span>
                    </td>
                    <td> {{ order.scheduled_date }} </td>
                    <!--<td> {{ order.scheduled_time }} </td>-->

                    <td> {{ order.customer }} </td>
                    <td>
                      <span :class="{'badge badge-danger' : order.partner==='Unassigned'}">
                        {{ order.partner }}
                      </span>
                       </td>

                    <td> {{ order.bill }} </td>
                    <td> {{ order.shipping_phone }} </td>
                    <td> {{ order.shipping_address }} </td>

                    <td>
                      <router-link :to="{ name: 'OrderShow', params: { id: order.id }}">
                          <span class="btn btn-primary btn-sm m-1" data-toggle="tooltip" title="Show" :href="order.show">
                              <i class="fa fa-search"></i>
                          </span>
                      </router-link>
                      <router-link :to="{ name: 'OrderEdit', params: { id: order.id }}">
                          <span class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Show" :href="order.show">
                              <i class="fa fa-edit"></i>
                          </span>
                      </router-link>
                    </td>
                  </tr>
                </table>
                <div class="pl-1 mt-3">
                  <span>{{total_count}} records </span>
                </div>
                </div>
              </b-card>
            <paginate
              :pageCount="totalPageCount"
              :clickHandler="onPaginateClick"
              :prevText="'Prev'"
              :nextText="'Next'"
              :container-class="'pagination'">
            </paginate>
          </b-col>
      </b-row>

    </div>
</template>


<script>

  import axios from 'axios';
  import moment from 'moment';
  import Vue from 'vue';
  import paginate from 'vuejs-paginate';
  import _ from 'lodash';
  import Datepicker from 'vuejs-datepicker';
  import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
  import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
  Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
  let typingTimer;
  const Admin_URL = process.env.VUE_APP_ADMIN_URL;

    export default {
      name: 'Orders',
      components: {
        Datepicker,
        paginate
      },
        data() {
            return {
                orders: [],
                total_count: '0',
                date_from: '',
                date_to: '',
                date_type: 'schedule',
                service: 'all',
                category: 'all',
                categories: [],
                status: 'all',

              totalPageCount: 0,
              perPageItem: 10, // Only set this value
              pageNumber: 0,

              toSortColumn: '',
              sortingDirection: '',
              columns: [
                'created_at',

                'id',
                'service_type' ,
                'platform',
                'status',
                'scheduled_date',
                /*'scheduled_time',*/
                'customer',
                'partner',

                'bill',
                'shipping_phone',
                'shipping_address',

                'action'
              ],
              columnInputs: {

              },
              dateColumns: [ "created_at", "scheduled_date" ],
              noFilteColumns: ["action" ],



              dateRange: {
                created_at: '',
                scheduled_date: ''
              },
              dateRangeString: {
                created_at: '',
                scheduled_date: ''
              }

            }
        },
      created(){

        this.makeReadySearchParams();


      },
      computed: {
        getStyleOfStatus: function () {
          return (parm) => {
            if (parm === 'pending') {
              return 'badge badge-primary';

            } else if (parm === 'accepted') {
              return 'badge badge-warning';

            } else if (parm === 'started') {
              return 'badge badge-secondary';

            } else if (parm === 'completed') {
              return 'badge badge-success';

            } else if (parm === 'rejected') {
              return 'badge badge-danger';

            } else if (parm === 'cancelled') {
              return 'badge badge-dark';
            } else {
              return '';
            }
          }
        },
        getSortIconStyle: function () {
          return (parm) => {
            const defaultIcon = 'fa fa-sort';
            if (parm === this.toSortColumn) {
              return `${defaultIcon}${this.sortingDirection}`;
            }
            return `${defaultIcon}`;
          }
        },
        makeDateRangeStrReadable: function() {
          return (name) => {
            if (name === null || name === undefined || name === '') {
              return name;
            }
            return name;
            let res = name.split("-");
            return res[0]+"<br> - <br>"+res[1];
          }
        },
        makeColNameReadable: function() {
          return (colName) => {
            const splitedWords = colName.split("_");
            for (let  index in splitedWords) {
              splitedWords[index] = splitedWords[index].charAt(0).toUpperCase() + splitedWords[index].slice(1);
            }
            const readableName = splitedWords.join(" "); // splited by _ then join them.
            return readableName.replace(/([a-z0-9])([A-Z])/g, '$1 $2'); // even to split the camelcase
          }
        }
      },
        methods: {
          modalExport() {
            this.$modal.show('modal-order_export');
          },
          closeModal(){
            this.$modal.hide('modal-order_export')
          },
          ExportOrder(){
            console.log('hitted');
            axios({
              method: 'post',
              url: `${Admin_URL}/orders/export`,
              responseType: 'blob',
              data: {
                service: this.service,
                category: this.category,
                date_type: this.date_type,
                status: this.status,
                date_from: this.date_from,
                date_to: this.date_to
              }
            })
              .then(response => {
                console.log(response.data);

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'order_report_' + moment(this.date_from).format('YYYY-MM-DD') +'.xlsx');
                document.body.appendChild(link);
                link.click();
                this.$swal('Report Exported Successfully', '', 'success');
                this.closeModal();
              })
              .catch(e => {
                console.log("error occurs",e);
              });

            if(this.service==='2')
            {
              this.date_type = 'created_at';
            }
          },
          fetchCategories(){
            axios.post(`${Admin_URL}/categories`, {
              service_id: this.service
            })
              .then(response => {
                this.categories = response.data;
              })
              .catch(e => {
                console.log("error occurs");
              });

              if(this.service==='2')
              {
                this.date_type = 'created_at';
              }

          },
          createOrder(type)
          {
            if(type!=='Beauty Appointment')
            {
              this.$router.push({ name: 'OrderCreate', params: { type } })
            }
            else
            {
              this.$router.push({ name: 'AppointmentCreate' , params: {type} })
            }
           console.log(type);

          },
          handleDateRangeChange(colName) {

            // console.log(
            //     '\ncolName === ', colName,
            //     '\ndateRange === ', this.dateRange,
            //     '\n333333', this.dateRange[colName]
            //     );

            if (this.dateRange[colName] === '' || this.dateRange[colName] === null) {
              this.dateRangeString[colName] = '';
            } else {
              const startDate = this.dateRange[colName].start;
              const endDate = this.dateRange[colName].end;

              const startMoment = moment(startDate).format("MMM Do YY");
              const endMoment = (endDate === null || endDate === '') ? 'Select End Date' : moment(endDate).format("MMM Do YY");
              this.dateRangeString[colName]  =  startMoment + "-" + endMoment;

            }
            this.makeReadySearchParams();
            console.log('Seeeeee   ', this.dateRange, 'EEEEE', this.dateRangeString);

          },
          headingSortColumn(colName) {
            // console.log('heading Click ', colName);
            if (this.toSortColumn === colName) {
              if (this.sortingDirection === '') {
                this.sortingDirection = "-up"
              } else {
                this.sortingDirection = this.sortingDirection === '-up' ? '-down' : '-up'
              }
            } else {
              this.sortingDirection = '-up';
            }
            this.toSortColumn = colName;
            const copyArray = [ ...this.orders ]

            let sortByColumn = colName;
            if (colName === 'action') {
              sortByColumn = 'id';
            }
            if (this.sortingDirection === '-up') {
              this.orders = _.orderBy(copyArray, [sortByColumn], ['asc']);
            } else {
              this.orders = _.orderBy(copyArray, [sortByColumn], ['desc']);
            }

          },
          handleInputChange(e) {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(() => {
              this.makeReadySearchParams()
            }, 500);

          },
          makeReadySearchParams() {
            const id = this.getInputValue("id")
            const service_type = this.getInputValue("service_type");
            const platform = this.getInputValue("platform");
            const status = this.getInputValue("status");
            const customer = this.getInputValue("customer");
            const partner = this.getInputValue("partner");
            const bill = this.getInputValue("bill");
            const scheduled_time = this.getInputValue("scheduled_time");
            const shipping_phone = this.getInputValue("shipping_phone");
            const shipping_address = this.getInputValue("shipping_address");

            //console.log( "Shipping_Phone ", shipping_phone, typeof( this.dateRange.created_at));
            let from = '';
            let to = '';
            if (this.dateRange.created_at === ""|| this.dateRange.created_at == null) {
              from = '';
              to = ''
            } else {
              from = this.dateRange.created_at.start;
              to = this.dateRange.created_at.end;
            }
            const created_at = {from: from,     to: to }; // will set these two later

            if (this.dateRange.scheduled_date === ""|| this.dateRange.scheduled_date == null) {
              from = '';
              to = '';
            } else {
              from = this.dateRange.scheduled_date.start;
              to = this.dateRange.scheduled_date.end;
            }
            const scheduled_date = {from: from,     to: to }; // will set these two later



            const srcParms = {
              id, service_type, platform, status, customer,
              partner, bill, created_at, scheduled_date,scheduled_time, shipping_phone, shipping_address
            };

            this.fetchOrder(srcParms);
            console.log('search ---- parms ---- ', srcParms);

          },
          getInputValue(colName) {
            if (this.columnInputs[colName] === undefined) {
              return '';
            }
            return this.columnInputs[colName];
          },
          fetchOrder(srcParms) {
            //console.log('SEARCH PARAMS === ', JSON.stringify(srcParms));
            axios.get(`${Admin_URL}/fetch-orders/${this.perPageItem}/${this.pageNumber}`, {
              params: srcParms
            })
              .then(response => {
                // console.log('fetchOrder:: response data ===== ', response.data );
                this.orders = response.data.orders;
                this.totalPageCount = Math.ceil(response.data.total_count / this.perPageItem);
                this.total_count = response.data.total_count;
              })
              .catch(e => {
                // console.log("error occurs", e.response);
              });
          },
          onPaginateClick(parm) {
            this.pageNumber = parm - 1; // As api start from "pageNumber 0"
            this.makeReadySearchParams();
          },
        },
    }
</script>
<style scoped>
  .vdp-datepicker{
    display: inline-block;
    margin-right: 1rem;
  }
  .form-control{
    border: 1px solid #a9a9a9;
  }
  table, th, td {
    border: 1px solid #c4c4b7;
    border-collapse: collapse;
  }
  th, td {
    padding: 15px;
    text-align: left;
  }
  table#t01 {
    width: 100%;
    background-color: #f1f1c1;
  }
  th {
    border-bottom-width: 2px;
    border-bottom-color: #c4c4b7;
  }

  #order_table_container {
    min-height: 600px;
  }
  .badge {
    font-size: 0.75rem;
  }
</style>
