<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col class="mb-5" sm="6" md="6">
                <customer></customer>
            </b-col>
            <b-col class="mb-5" sm="6" md="6">
                <location></location>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <schedule></schedule>
            </b-col>
        </b-row>
        <b-row>
            <b-col sm="6" md="6">
                <service></service>
            </b-col>
            <b-col sm="6" md="6">
                <cart></cart>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <partner :partners="partners"></partner>
            </b-col>
        </b-row>
        <b-row>
          <b-col>
            <order-summary :invoice="invoice"></order-summary>
          </b-col>
        </b-row>
        <b-card class="bg-white text-center">
            <button class="btn btn-romoni-secondary btn-lg" @click="orderPlace"> Place Order</button>
        </b-card>
    </div>
</template>

<script>
  import axios from 'axios';
  import EventBus from '../../utils/EventBus'
  import Customer from './AppointmentCreate/Customer'
  import Location from './AppointmentCreate/Location'
  import Schedule from './AppointmentCreate/Schedule'
  import Service  from './AppointmentCreate/Service'
  import Cart     from './AppointmentCreate/Cart'
  import Partner  from './AppointmentCreate/Partner'
  import OrderSummary  from './AppointmentCreate/Summary'

  export default {
    name: "OrderCreate",
    components: {
        Customer,
        Location,
        Schedule,
        Service,
        Cart,
        Partner,
        OrderSummary
    },
    data() {
      return {
        customer: [],
        location: '',
        categories: [],
        partners: [],
        schedule: [],
        services: [],
        selected_partner:null,
        invoice:[],
        payment_method: 'cash_on_delivery'
      };
    },
    mounted() {

        EventBus.$on('customer:add', this.customerAdd.bind(this));
        EventBus.$on('location:add', this.locationAdd.bind(this));
        EventBus.$on('schedule:add', this.scheduleAdd.bind(this));
        EventBus.$on('cart:add'    , this.servicesAdd.bind(this));
        EventBus.$on('partner:confirm', this.partnerAdd.bind(this));
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
      servicesAdd(services) {
        this.services = services;
        this.fetchPartner();
      },
      fetchPartner() {
        const Base_URL = process.env.VUE_APP_ADMIN_URL;
        axios.post(`${Base_URL}/available-partners`, {
          location : this.location,
          date : this.schedule.selected_date,
          time : this.schedule.selected_time,
          services : this.services
        })
          .then(response => {
            this.partners = response.data;

          })
          .catch(e => {
            console.log("error occurs",e);
          });

      },
      partnerAdd(partner) {
        this.selected_partner = partner;
        this.invoice = this.invoiceFormatter();
      },
      invoiceFormatter(){
        return{
          price:this.selected_partner.price,
          serviceNo: this.services.length,
          sp:this.selected_partner.name,
          address:this.schedule.delivery_address,
          schedule:this.schedule
        }
      },
      orderPlace() {

      }

    }
  }
</script>

<style scoped>

</style>
