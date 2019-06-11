<template>
  <div class="animated fadeIn font-weight-bold">
    <b-row>
      <b-col class="mb-5" sm="6" md="6">
        <b-card class="h-100 p-4 m-4">
          <h5 class="mb-4">SP & Schedule Details</h5>
          <b-form-group>
            <label >Order ID : {{order.id}}</label>
          </b-form-group>
          <b-form-group>
            <label >Service : {{type}}</label>
          </b-form-group>
        <b-form-group label="Status">
          <select class="form-control" v-model="order.status">
            <option value="pending">pending</option>
            <option value="accepted">accepted</option>
            <option value="started">started</option>
            <option value="completed">completed</option>
            <option value="rejected">rejected</option>
            <option value="completed">completed</option>
          </select>
        </b-form-group>
          <b-form-group label="Assigned SP">
            <select class="form-control" v-model="order.partner_id">
              <option :value="partner.id" v-for="partner in partners">{{ partner.name }}</option>
            </select>
          </b-form-group>
          <div v-show="order.service_id===2">
            <label>Select Delivery Type</label>
            <b-form-group class="ml-4">
              <input type="radio" v-model="date_type"  value="regular">
              <label>Regular Delivery</label><br>
              <input type="radio" v-model="date_type"  value="custom">
              <label>Emergency Delivery</label>
            </b-form-group>
          </div>

          <b-form-group label="Scheduled Date">
            <datepicker input-class="date-input" v-model="order.scheduled_date" ></datepicker>
          </b-form-group>
          <b-form-group label="Scheduled Time">
            <select class="form-control" v-model="order.scheduled_time">
              <option value="08:00AM - 10:00AM">08:00 AM - 10:00 AM</option>
              <option value="10:00AM - 12:00PM">10:00 AM - 12:00 PM</option>
              <option value="12:00PM - 02:00PM">12:00 PM - 02:00 PM</option>
              <option value="02:00PM - 04:00PM">02:00 PM - 04:00 PM</option>
              <option value="04:00PM - 06:00PM">04:00 PM - 06:00 PM</option>
              <option value="06:00PM - 08:00PM">06:00 PM - 08:00 PM</option>
              <option value="08:00PM - 10:00PM">08:00 PM - 10:00 PM</option>
            </select>
          </b-form-group>
            <button class="btn btn-dark mt-3" @click="updateOrder"> Update</button>

        </b-card>
      </b-col>
      <b-col class="mb-5" sm="6" md="6">
        <b-card class="h-100 m-4 p-4">
          <h5 class="mb-4">Delivery Details</h5>
          <b-form-group label="Delivery Name">
            <input type="text" class="form-control" v-model="order.shipping_name">
          </b-form-group>
          <b-form-group label="Delivery Phone">
            <input type="text" class="form-control" v-model="order.shipping_phone">
          </b-form-group>
          <b-form-group label="Selected City">
            <select class="form-control" @change="getLocation" v-model="city">
              <option value="Dhaka">Dhaka</option>
              <option value="Chittagong">Chittagong</option>
            </select>
          </b-form-group>
          <b-form-group label="Selected Area">
            <select class="form-control"  v-model="order.location_id">
              <option :value="location.id" v-for="location in locations">{{ location.name }}</option>
            </select>
          </b-form-group>
          <b-form-group label="Delivery Address">
            <input type="text" class="form-control" v-model="order.shipping_address">
          </b-form-group>
          <button class="btn btn-dark mt-3" @click="updateOrder"> Update</button>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mb-5" sm="6" md="6">
        <b-card class="h-100 p-4 m-4">
          <h5 class="mb-4">Billing Info</h5>
          <b-form-group label="Service Charge">
            <input type="text" class="form-control" v-model="order.total_service_charge">
          </b-form-group>
          <b-form-group label="Discount">
            <input type="text" class="form-control" v-model="order.total_discount">
          </b-form-group>
          <b-form-group label="Total Bill">
            <input type="text" class="form-control" v-model="order.total_bill">
          </b-form-group>
          <b-form-group v-show="order.coupon_id!==null" label="Applied Promo">
            <span class="text-success">{{order.coupon_code}}</span>
          </b-form-group>
          <button class="btn btn-dark mt-3" @click="updateOrder"> Update</button>
        </b-card>
      </b-col>
      <b-col class="mb-5" sm="6" md="6">
        <b-card class="h-100 p-4 m-4">
          <h5 class="mb-4">Existing Line Items</h5>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
              <tr>
                <th>Item Name</th>
                <th>Option Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>

              </tr>
              </thead>
              <tbody>
              <tr v-for="item in order.items">
                <td>{{item.name}}</td>
                <td><span v-for="answer in item.options ">{{answer.ans}}<br></span></td>
                <td><input type="text" style="width: 2rem"  v-model="item.quantity"></td>
                <td><input type="text" style="width: 4rem" v-model="item.price"></td>
                <td>
                  <span class="cursor-pointer m-2"  @click="updateItem(item)"> <i class="fa fa-check text-success" data-toggle="tooltip" title="Save"></i></span>
                  <span class="cursor-pointer m-2"  @click="deleteItem(item)"> <i class="fa fa-trash text-danger" data-toggle="tooltip" title="Delete"></i></span></td>
              </tr>
              </tbody>
            </table>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row v-if="type ==='Beauty On-Demand'">
      <b-col sm="6" md="6">
        <service :type="getType"></service>
      </b-col>
      <b-col sm="6" md="6">
        <cart></cart>
        <div class="row text-center pb-5">
          <div class="center-div">
            <button class="btn btn-dark" @click="addNewitem()"> Add New Line Item(s)</button>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col sm="6" md="6">
        <b-row>
          <b-col><service :type="getType"></service></b-col>
        </b-row>
        <b-row>
          <b-col><design></design></b-col>
        </b-row>
      </b-col>
      <b-col sm="6" md="6">
        <b-row>
          <b-col><accessories></accessories></b-col>
        </b-row>
        <b-row>
          <b-col><cart></cart>
            <div class="row text-center">
              <div class="form-control">
                <button class="btn btn-dark"> Add New Lineitem(s)</button>
              </div>
            </div></b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from 'axios';
  import EventBus from '../../utils/EventBus'
  import Customer from './OrderCreate/Customer'
  import Location from './OrderCreate/Location'
  import Schedule from './OrderCreate/Schedule'
  import Service  from './OrderCreate/Service'
  import Cart     from './OrderCreate/Cart'
  import Partner  from './OrderCreate/Partner'
  import OrderSummary  from './OrderCreate/Summary'
  import Design from './OrderCreate/Design'
  import Accessories from './OrderCreate/Accessories'
  import Datepicker from 'vuejs-datepicker';

  const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

  export default {
    name: "OrderEdit",
    components: {
      Datepicker,
      Customer,
      Location,
      Schedule,
      Service,
      Cart,
      Partner,
      OrderSummary,
      Design,
      Accessories
    },

    data() {
      return {
        order: [],
        order_id: '',
        partners: [],
        locations: [],
        city: 'Dhaka',
        type: '',
        date_type: '',

      };
    },
    created() {
      this.order_id = window.location.pathname.split("/").pop();
      axios.get(`${ADMIN_URL}/order`, {
        params: {
          order_id: this.order_id
        }
      }).then(response => {
        this.order = response.data;
      }).catch(e => {
        console.log("error occurs",e);
      });

      this.getPartners();
      this.getLocation();
    },
    computed: {
      getType() {

        if (this.order.service_id === 1)
        {
          this.type = "Beauty On-Demand";
        }
        else if(this.order.service_id === 2)
        {
          this.type = "Tailor On-Demand";
        }
        else
        {
          this.type = "Beauty Appointment";
        }
        return this.type;
      }

    },
    mounted() {


      EventBus.$on('design:add'     , this.designAdd.bind(this));
      EventBus.$on('cart:add'       , this.servicesAdd.bind(this));
      EventBus.$on('accessories:add', this.accessoriesAdd.bind(this));

    },
    methods : {


      designAdd(designs) {
        this.designs = designs;
      },
      servicesAdd(services) {
        this.services = services;

      },
      accessoriesAdd(data) {
        this.accessories = data.accessories;
        this.measurement_type = data.measurement_type;
        if(this.measurement_type==='own')
          this.measurement_type = data.custom_measurement;
      },
      getPartners() {
        axios.get(`${ADMIN_URL}/all-partners`, {
        })
          .then(response => {
            this.partners = response.data;

          })
          .catch(e => {
            console.log("error occurs",e);
          });

      },
      getLocation()
      {
        axios.get(`${ADMIN_URL}/locations-by-city`, {
          params : {
            city : this.city
          }
        })
          .then(response => {
            this.locations = response.data;
          })
          .catch(e => {
            console.log("error occurs");
          });
      },
      changeDateFormat(){

        let d = this.order.scheduled_date;
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        this.order.scheduled_date =  [year, month, day].join('-');
      },

      updateOrder(e) {

        this.changeDateFormat();

        e.preventDefault();
        let currentObj = this;
        const config = {
          headers: {'content-type': 'multipart/form-data'}
        };


        let formData = new FormData();
        formData.append('id', this.order.id);
        formData.append('status', this.order.status);
        formData.append('partner_id', this.order.partner_id);
        formData.append('location_id', this.order.location_id);
        formData.append('scheduled_time', this.order.scheduled_time);
        formData.append('scheduled_date', this.order.scheduled_date);
        formData.append('shipping_name', this.order.shipping_name);
        formData.append('shipping_address', this.order.shipping_address);
        formData.append('shipping_phone', this.order.shipping_phone);
        /*formData.append('measurement', this.measurement_type);
        formData.append('accessories', JSON.stringify(this.accessories));*/
        formData.append('total_service_charge', this.order.total_service_charge);
        formData.append('total_discount', this.order.total_discount);
        formData.append('total_bill', this.order.total_bill);


/*
        for( let i = 0; i < this.designs.length; i++ ){
          let file = this.designs[i];
          formData.append('designs[' + i + '][image]', file);
        }*/

        axios.post(`${ADMIN_URL}/orders/update`, formData, config)
          .then(response => {
            console.log('Success', response);
            currentObj.success = response.data.success;
            console.log(response.data);
            if(response.data.success===true)
              this.$swal('Order Details Updated', '', 'success');
          })
          .catch(error => {
            console.log('Error  ... ', error.response);
            currentObj.output = error;
            console.log(error);
          });



      },

      addNewitem()
      {
        axios.post(`${ADMIN_URL}/orders/add-transaction`, {
          'items'    : this.services,
          'order_id' : this.order_id
        })
          .then(response => {
            console.log('Success', response);
            this.$swal('New Line Item(s) Added', '', 'success');
            setTimeout(()=>{
              location.reload();
            },1000);

          })
          .catch(error => {
            console.log('Error ', error.response);
            console.log(error);
            this.$swal('Error', 'Something went wrong', 'error');
          });

      },

      updateItem(item)
      {


        axios.post(`${ADMIN_URL}/orders/update-transaction`, item)
          .then(response => {
            console.log('Success', response);
            this.$swal('Line Item Updated', '', 'success');

          })
          .catch(error => {
            console.log('Error ', error.response);
            console.log(error);
          });
      },
      deleteItem(item)
      {

        axios.post(`${ADMIN_URL}/orders/delete-transaction`, {
          'item_id' : item.id
        })
          .then(response => {
            console.log('Success', response);
            this.$swal('Line Item Deleted', '', 'success');
            setTimeout(()=>{
              location.reload();
            },1000);

          })
          .catch(error => {
            console.log('Error ', error.response);
            console.log(error);
          });

      }

    }
  }
</script>

<style>
  .date-input {
    width: 100%;
    padding: 0.375rem 0.75rem;
    border: 1px solid #e4e7ea;
    color: #5c6873;
  }
  .item-input {
    width: 30px;
  }
</style>
