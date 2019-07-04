<template>
    <div class="animated fadeIn">
      <div class="cardheading">
          <h4><i class="fa fa-table"></i><span class="ml-1">Orders</span></h4>
          <button @click="modalType" class="btn btn-success mb-2">Create New Order</button>
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
                   <label>From : &nbsp</label>
                   <datepicker calendar-class="vdp-datepicker" v-model="date_from" format="yyyy-MM-dd"></datepicker>
                   <label>To : &nbsp</label>
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
                   <option v-for="cat in categories" :value="cat.id">{{cat.name}}</option>
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
                  <v-server-table :url="get_orders" :columns="columns" :options="options">
                      <template slot="action" slot-scope="props">
                          <div>
                              <router-link :to="{ name: 'OrderShow', params: { id: props.row.id }}"><span class="btn btn-primary btn-sm m-1" data-toggle="tooltip" title="Show" :href="props.row.show">
                                  <i class="fa fa-search"></i></span></router-link>
                              <router-link :to="{ name: 'OrderEdit', params: { id: props.row.id }}"><span class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Show" :href="props.row.show">
                                  <i class="fa fa-edit"></i></span></router-link>
                              <span class="btn btn-danger btn-sm m-1" data-toggle="tooltip" title="Delete">
                                  <i class="fa fa-trash"></i></span>
                          </div>
                      </template>
                  </v-server-table>
              </b-card>
          </b-col>
      </b-row>
    </div>
</template>


<script>
  window.axios = require('axios');
  import Datepicker from 'vuejs-datepicker';
  const Admin_URL = process.env.VUE_APP_ADMIN_URL;
    export default {
      name: 'Orders',
      components: {
        Datepicker
      },
        data() {
            return {
              get_orders : Admin_URL + '/orders',
                orders: [],
                date_from: '',
                date_to: '',
                date_type: 'schedule',
                service: 'all',
                category: 'all',
                categories: [],
                status: 'all',
                columns: ['id', 'service_type' ,'platform', 'status','customer', 'partner','scheduled_date', 'bill','created_at', 'action'],

               options: {
                    pagination: {nav: 'fixed'},
                    filterByColumn: true,
                    dateColumns: ['created_at'],
                    perPage: 10,
                    toMomentFormat: 'YYYY-MM-DD',
                    sortIcon: {base: 'fa fa-sort', up: 'fa fa-sort-up', down: 'fa fa-sort-down', is: 'fa fa-sort'},

                }

            }
        },
      created(){

        axios.get(`${Admin_URL}/orders`)
          .then(response =>{
            this.orders = response.data;
          })
          .catch(e=>{
            console.log("error occurs",e);
          });
      },
        methods: {
          modalType(){
            this.$modal.show('modal-order_type');
          },
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

          }
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
</style>
