<template>
  <div class="animated fadeIn font-weight-bold">
    <b-row>
      <b-col class="mb-5" sm="6" md="6">
        <b-card class="h-100 p-4 m-4">
          <b-form-group>
            <label >Order ID : </label>
            {{order.order_id}}
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
              <input type="radio" v-model="date_type" @change="addSchedule" value="regular">
              <label>Regular Delivery</label><br>
              <input type="radio" v-model="date_type" @change="addSchedule" value="custom">
              <label>Emergency Delivery</label>
            </b-form-group>
          </div>

          <b-form-group label="Select Date">
            <datepicker v-model="order.scheduled_date" :disabledDates="disabledDates"></datepicker>
          </b-form-group>
          <b-form-group label="Select Time">
            <select @change="addSchedule" class="form-control" v-model="order.scheduled_time">
              <option value="08:00AM - 10:00AM">08:00 AM - 10:00 AM</option>
              <option value="10:00AM - 12:00PM">10:00 AM - 12:00 PM</option>
              <option value="12:00PM - 02:00PM">12:00 PM - 02:00 PM</option>
              <option value="02:00PM - 04:00PM">02:00 PM - 04:00 PM</option>
              <option value="04:00PM - 06:00PM">04:00 PM - 06:00 PM</option>
              <option value="06:00PM - 08:00PM">06:00 PM - 08:00 PM</option>
              <option value="08:00PM - 10:00PM">08:00 PM - 10:00 PM</option>
            </select>
          </b-form-group>
        </b-card>
      </b-col>
      <b-col class="mb-5" sm="6" md="6">
        <b-card class="h-100 m-4 p-4">
          <h5 class="mb-4">Location</h5>
          <b-form-group label="Select City">
            <select class="form-control" @change="getLocation" v-model="city">
              <option value="Dhaka">Dhaka</option>
              <option value="Chittagong">Chittagong</option>
            </select>
          </b-form-group>
          <b-form-group label="Select Area">
            <select class="form-control" @change="addLocation" v-model="order.location_id">
              <option :value="location.id" v-for="location in locations">{{ location.name }}</option>
            </select>
          </b-form-group>
        </b-card>
      </b-col>
    </b-row>
    <b-row v-if="order.service_id===1">
      <b-col sm="6" md="6">
        <service :type="type"></service>
      </b-col>
      <b-col sm="6" md="6">
        <cart></cart>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col sm="6" md="6">
        <b-row>
          <b-col><service :type="type"></service></b-col>
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
          <b-col><cart></cart></b-col>
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
    props: ['type'],
    data() {
      return {
        order: [],
        order_id: '',
        partners: [],
        locations: [],
        city: 'Dhaka',
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
    mounted() {

      EventBus.$on('customer:add'   , this.customerAdd.bind(this));
      EventBus.$on('location:add'   , this.locationAdd.bind(this));
      EventBus.$on('schedule:add'   , this.scheduleAdd.bind(this));
      EventBus.$on('design:add'     , this.designAdd.bind(this));
      EventBus.$on('cart:add'       , this.servicesAdd.bind(this));
      EventBus.$on('partner:confirm', this.partnerAdd.bind(this));
      EventBus.$on('accessories:add', this.accessoriesAdd.bind(this));

    },
    methods : {

      customerAdd(customer) {
        this.customer = customer;
      },
      locationAdd(location) {
        this.location = location;
      },
      scheduleAdd(schedule) {
        this.schedule = schedule;
      },
      designAdd(designs) {
        this.designs = designs;
      },
      servicesAdd(services) {
        this.services = services;
        this.fetchPartner();
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
      addSchedule() {

          this.changeDateFormat();

      },
      partnerAdd(partner) {
        this.selected_partner = partner;

        this.invoice = this.invoiceFormatter();
      },
      invoiceFormatter(){
        return{
          price:this.selected_partner.price,
          discount: 0,
          serviceNo: this.services.length,
          sp:this.selected_partner.name,
          address:this.schedule.delivery_address,
          schedule:this.schedule
        }
      },
      orderPlace(e) {

        e.preventDefault();
        let currentObj = this;
        const config = {
          headers: {'content-type': 'multipart/form-data'}
        };


        let formData = new FormData();
        formData.append('type', this.type);
        formData.append('platform', 'admin_portal');
        formData.append('partner_id', this.selected_partner.id);
        formData.append('location_id', this.location);
        formData.append('scheduled_time', this.schedule.selected_time);
        formData.append('scheduled_date', this.schedule.selected_date);
        formData.append('shipping_name', this.customer.name);
        formData.append('shipping_address', this.schedule.delivery_address);
        formData.append('shipping_phone', this.customer.phone);
        formData.append('payment_method', this.payment_method);
        formData.append('measurement', this.measurement_type);
        formData.append('accessories', JSON.stringify(this.accessories));
        formData.append('services', JSON.stringify(this.services));
        formData.append('price', this.invoice.price);
        formData.append('discount', this.invoice.discount);



        for( let i = 0; i < this.designs.length; i++ ){
          let file = this.designs[i];
          formData.append('designs[' + i + '][image]', file);
        }

        console.log(this.name);
        axios.post(`${ADMIN_URL}/place-order`, formData, config)
          .then(response => {
            console.log('Success', response);
            currentObj.success = response.data.success;
            console.log(response.data);
          })
          .catch(error => {
            console.log('Error  ... ', error.response);
            currentObj.output = error;
            console.log(error);
          });



      }

    }
  }
</script>

<style scoped>

</style>
