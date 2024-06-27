<template>
    <div class="animated fadeIn">
      <div class="cardheading">
          <h4><i class="fa fa-table"></i><span class="ml-1">Orders</span></h4>

          <div class="search-wrapper">
            <input type="text" class="form-control" v-model="phone_no" placeholder="Search with Phone.."/>
            <button @click="showOrders" class="btn btn-success">Search</button>
          </div>
      <div class="d-flex gap-3">
        <button v-if="getUserPermission('admin')" @click="modalExport" class="btn btn-success mb-2 mr-2 "><i class="fa fa-file-excel-o"></i> Export as .xlsx </button>

        <router-link v-if="getUserPermission('order create')" class="btn btn-success mb-2" to="/orders/create">+ Create New Order</router-link>
      </div>

      </div>

      <modal name="modal-show-orders" height="auto" :adaptive="true" :clickToClose="false">
        <div class="m-3 p-3">
          <b-row class="p-2">
            <h4 style="font-family: Arial;">Available Orders</h4>
            <br /><br />
          </b-row>
          <b-row class="p-2">
            <div v-if="ordersByPhone.length > 0" class="table-responsive scrollable-table">
              <table class="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Scheduled Date</th>
                    <th>Scheduled Time</th>
                    <th>Location</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(order, index) in ordersByPhone" :key="index">

                    <td @click="orderEdit(order.id)" style="cursor: pointer;  text-decoration: underline;">{{ order.id }}</td>
                    <td>{{ order.scheduled_date }}</td>
                    <td>{{ order.scheduled_time }}</td>
                    <td>{{ order.location_name }}</td>
                    <td>{{ order.status }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else>
              <p style="text-align:center;">No orders available</p>
            </div>
          </b-row>
          <button @click="closeShowOrdersModal" class="btn btn-danger">Close</button>
        </div>
      </modal>

      <b-row>
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
               <b-spinner variant="danger" label="Spinning" v-if="exporting"></b-spinner>
             </b-col>
            </b-row>

          </div>
        </modal>
      </b-row>
      <b-row>
          <b-col>
              <b-card >

                  <div class="d-flex">
                    <div>

                        <div
                          v-for="(item, index) in items "
                          :key="index"
                          v-model="columnInputs['status']"
                          :class="['btn', 'mx-2', selected === item.key ? 'btn-primary ' : 'btn-light']"
                          @click="selectItem(item.key)"
                        >
                          {{ item.value }}
                        </div>


                    </div>
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
                          @input="handleDateRangeChange(item)"

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
                          @change="handleInputChange"
                        />
                      </div>
                    </th>
                  </tr>

                  <tr v-for="order in orders" :key="order.id">
                    <td> {{ order.created_at }} </td>

                    <td> {{ order.id }} </td>
                    <td> {{ order.service_type }} </td>
                    <td> {{ formatPlatform(order.platform) }}</td>
                    <td v-if="order.user_name == null"> - </td>
                    <td v-else-if="order.user_name == undefined"> - </td>
                    <td v-else> {{ order.user_name }} </td>
                    <td class="text-center">
                      <span :class="getStyleOfStatus(order.status)" style="font-size: 12px;">
                        {{ formatStatus(order.status) }}
                      </span>
                    </td>
                    <td> {{ order.scheduled_date }} </td>
                    <td> {{ order.scheduled_time }} </td>
                    <!--<td> {{ order.scheduled_time }} </td>-->

                    <td> {{ order.customer }} </td>
                    <td>
                      <span :class="{'badge badge-danger glow' : order.partner==='Unassigned'}">
                        {{ order.partner }}
                      </span>
                       </td>

                    <td> {{ order.bill }} </td>
                    <td>
                      <span :class="getStyleOfPaymentMethod(order.payment_method,order.hot_deals)">
                        {{ order.payment_method }}
                      </span>
                   </td>
                     <td> {{ order.shipping_phone }} </td>
                    <td> {{ order.shipping_address }} </td>

                    <td>
                      <router-link v-if="getUserPermission('order update')" :to="{ name: 'OrderShow', params: { id: order.id }}">
                          <span class="btn btn-primary btn-sm m-1" data-toggle="tooltip" title="Show" :href="order.show">
                              <i class="fa fa-search"></i>
                          </span>
                      </router-link>
                      <router-link v-if="getUserPermission('order update')" :to="{ name: 'OrderEdit', params: { id: order.id }}">
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
  import store from "../../store/store";
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
                ordersByPhone: [],
                total_count: '0',
                date_from: '',
                date_to: '',
                date_type: 'schedule',
                service: 'all',
                category: 'all',
                categories: [],
                status: 'all',
                exporting: false,

              totalPageCount: 0,
              perPageItem: 10, // Only set this value
              pageNumber: 0,
              phone_no : '',
              toSortColumn: '',
              sortingDirection: '',
              columns: [
                'created_at',

                'id',
                'service_type' ,
                'platform',
                'placed_by',
                'status',
                'scheduled_date',
                'scheduled_time',
                'customer',
                'partner',

                'bill',
                'payment_method',
                'shipping_phone',
                'shipping_address',
                'action'
              ],
              items: [
                { key: '', value: 'All' },
                { key: 'initiated', value: 'Initiated' },
                { key: 'pending', value: 'Pending' },
                { key: 'accepted', value: 'Accepted' },
                { key: 'started', value: 'Started' },
                { key: 'completed', value: 'Completed' },
                { key: 'cancelled', value: 'Cancelled' },
                { key: 'rejected', value: 'Rejected' }
              ],
              selected: '',
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

            if(parm === 'initiated') {
              return 'badge badge-initiated';
            }
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

        getStyleOfPaymentMethod : function () {
          return (method, slug) => {

            if(method === 'ssl' && slug !== 'unused') {
              return 'badge badge-primary';

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
          selectItem(key) {

            if (this.selected !== key) {
              this.selected = key;
             this.pageNumber = 0;
              this.makeReadySearchParams(key)
            }
          },
          modalExport() {
            this.$modal.show('modal-order_export');
          },
          closeModal(){
            this.$modal.hide('modal-order_export')
          },
          ExportOrder(){
            this.exporting = true;
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
                this.exporting = false;

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'order_report_' + moment(this.date_from).format('YYYY-MM-DD') + '~' + moment(this.date_to).format('YYYY-MM-DD') +'.xlsx');
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
           // console.log(type);

          },
          formatPlatform(platform) {

             if (platform === 'android') {
              return 'Android';
            }
             if (platform === 'ios') {
              return 'iOS';
            }
          },

          formatStatus(status) {
            return status.charAt(0).toUpperCase() + status.slice(1);
          },
          handleDateRangeChange(colName) {

            // console.log("ami call hoisi")

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

            console.log("search params calling",this.selected);
            const id = this.getInputValue("id")
            const service_type = this.getInputValue("service_type");
            const placed_by = this.getInputValue("placed_by");
            const platform = this.getInputValue("platform");
            const status = this.getInputValue("status") ? this.getInputValue("status") : this.selected;
            const customer = this.getInputValue("customer");
            const partner = this.getInputValue("partner");
            const bill = this.getInputValue("bill");
            const payment_method = this.getInputValue("payment_method");
            const scheduled_time = this.getInputValue("scheduled_time");
            const shipping_phone = this.getInputValue("shipping_phone");
            const shipping_address = this.getInputValue("shipping_address");

            let setStatusCom = 0;
            if(this.getUserPermission("admin")){
              setStatusCom = 1;
            }
            const statusCompleted = setStatusCom;
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
              id, service_type, placed_by, platform, status, customer,
              partner, bill,payment_method, created_at, scheduled_date,scheduled_time, shipping_phone, shipping_address, statusCompleted
            };

            this.fetchOrder(srcParms);
            console.log('search ---- parms ---- ', srcParms);

          },
          getInputValue(colName) {

            if (this.columnInputs[colName] === undefined) {
              return '';
            }
            console.log("column inputs",this.columnInputs);

            console.log("column inputs",this.columnInputs[colName]);

            return this.columnInputs[colName];
          },
          fetchOrder(srcParms) {
            //console.log('SEARCH PARAMS === ', JSON.stringify(srcParms));
            console.log('currentPage', this.pageNumber);
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

          showOrders() {
            axios.get(`${Admin_URL}/fetch-orders-by-phone`, {
              params: {
                phone_no: this.phone_no
              }
            })
              .then(response => {
                if (response.data.success) {
                  const orders = response.data.data.map(order => {
                    return {
                      id: order.id,
                      scheduled_date: order.scheduled_date,
                      scheduled_time: order.scheduled_time,
                      location_name: order.location.name,
                      status: order.status
                    };
                  });
                  this.ordersByPhone = orders;
                  this.$modal.show('modal-show-orders');
                } else {

                  console.error("Error fetching orders:", response.data.message);
                }
              })
              .catch(error => {
                console.error("Error fetching orders:", error);
              });
          },

          orderEdit(orderId) {
             var baseUrl = window.location.origin + "/orders/edit/";
            const url = `${baseUrl}${orderId}`;
            window.open(url, '_blank');
          },

          closeShowOrdersModal() {
            this.$modal.hide('modal-show-orders');
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

  .search-wrapper{

     display: flex;
     align-items: center;
     position:absolute;
     left:350px;

  }

  .search-wrapper input{

    margin-right: 20px;
  }

  .scrollable-table {
    max-height: 400px;
    overflow-y: auto;
  }

  .ssl-color {
    background-color: #0072BC;
}

.badge-initiated {
  background-color: #900C3F;
  color: #fff;
}
  .glow {
    /*animation: blinker 1s linear infinite;*/
  -webkit-animation: glowing 1500ms infinite;
  -moz-animation: glowing 1500ms infinite;
  -o-animation: glowing 1500ms infinite;
  animation: glowing 1500ms infinite;
  }
  @keyframes blinker {
    50% { opacity: 0; }
  }
  @-webkit-keyframes glowing {
    0% { background-color: #B20000; -webkit-box-shadow: 0 0 3px #B20000; }
    50% { background-color: #FF0000; -webkit-box-shadow: 0 0 40px #FF0000; }
    100% { background-color: #b2295a; -webkit-box-shadow: 0 0 3px #b24b71; }
  }

  @-moz-keyframes glowing {
    0% { background-color: #B20000; -moz-box-shadow: 0 0 3px #B20000; }
    50% { background-color: #FF0000; -moz-box-shadow: 0 0 40px #FF0000; }
    100% { background-color: #B20000; -moz-box-shadow: 0 0 3px #B20000; }
  }

  @-o-keyframes glowing {
    0% { background-color: #B20000; box-shadow: 0 0 3px #B20000; }
    50% { background-color: #FF0000; box-shadow: 0 0 40px #FF0000; }
    100% { background-color: #B20000; box-shadow: 0 0 3px #B20000; }
  }

  @keyframes glowing {
    0% { background-color: #B20000; box-shadow: 0 0 3px #B20000; }
    50% { background-color: #FF0000; box-shadow: 0 0 40px #FF0000; }
    100% { background-color: #B20000; box-shadow: 0 0 3px #B20000; }
  }
</style>
