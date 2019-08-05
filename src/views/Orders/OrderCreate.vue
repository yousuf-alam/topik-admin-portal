<template>
    <div class="animated fadeIn">
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
        <b-row>
            <b-col class="mb-5" sm="6" md="6">
                <customer> </customer>
            </b-col>
            <b-col class="mb-5" sm="6" md="6">
                <location></location>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <schedule :type="type"> </schedule>
            </b-col>
        </b-row>
        <b-row v-if="type==='Beauty On-Demand'">
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
            <b-col>
              <service :type="type"> </service>
            </b-col>
          </b-row>
          <!--
            <b-row>
              <b-col><design></design></b-col>
            </b-row>
          -->
        </b-col>
        <b-col sm="6" md="6">
          <b-row>
            <b-col>
              <accessories></accessories>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <cart></cart>
            </b-col>
          </b-row>
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
  import Customer from './OrderCreate/Customer'
  import Location from './OrderCreate/Location'
  import Schedule from './OrderCreate/Schedule'
  import Service  from './OrderCreate/Service'
  import Cart     from './OrderCreate/Cart'
  import Partner  from './OrderCreate/Partner'
  import OrderSummary  from './OrderCreate/Summary'
  import Design from './OrderCreate/Design'
  import Accessories from './OrderCreate/Accessories'

  const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

  export default {
    name: "OrderCreate",
    components: {
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
        customer: [],
        location: '',
        categories: [],
        partners: [],
        schedule: [],
        services: [],
        designs: [],
        accessories: [],
        measurement_type: '',
        custom_measurement: '',
        selected_partner: null,
        invoice:[],
        payment_method: 'cash_on_delivery'
      };
    },
    created() {

    },
    mounted() {
        this.modalType();
        EventBus.$on('customer:add'   , this.customerAdd.bind(this));
        EventBus.$on('location:add'   , this.locationAdd.bind(this));
        EventBus.$on('schedule:add'   , this.scheduleAdd.bind(this));
        EventBus.$on('design:add'     , this.designAdd.bind(this));
        EventBus.$on('cart:add'       , this.servicesAdd.bind(this));
        EventBus.$on('partner:confirm', this.partnerAdd.bind(this));
        EventBus.$on('accessories:add', this.accessoriesAdd.bind(this));

    },
    methods : {
      modalType(){
          this.$modal.show('modal-order_type');
          console.log('called');
      },
        createOrder(type)
        {
            this.type = type;
            this.$modal.hide('modal-order_type');
        },

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
      fetchPartner() {
        console.log('fetchPartner ========== ',
         "location = ", this.location,
         "schedult = ", this.schedule,
         "services = ", this.services
        );
        this.partners = [];

        axios.post(`${ADMIN_URL}/available-partners`, {
          location : this.location,
          date : this.schedule.selected_date,
          time : this.schedule.selected_time,
          services : this.services
        })
          .then(response => {
              if (response.data.success === true) {
                  this.partners = response.data.data;
                  console.log(this.partners);

              } else {
                  this.partners = [];
              }


          })
          .catch(e => {
            console.log("error fetchPartner === ", e.response);
          });

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
          address:this.schedule.address.address_details,
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
        formData.append('platform', 'admin portal');
        formData.append('partner_id', this.selected_partner.id);
        formData.append('location_id', this.location);
        formData.append('scheduled_time', this.schedule.selected_time);
        formData.append('scheduled_date', this.schedule.selected_date);
        formData.append('shipping_name', this.customer.name);
        formData.append('shipping_address', JSON.stringify(this.schedule.address));
        formData.append('shipping_phone', this.customer.phone);
        formData.append('payment_method', this.payment_method);
        formData.append('measurement', this.measurement_type);
        formData.append('accessories', JSON.stringify(this.accessories));
        formData.append('items', JSON.stringify(this.services));
        formData.append('price', this.invoice.price);
        formData.append('discount', this.invoice.discount);



        for( let i = 0; i < this.designs.length; i++ ){
          let file = this.designs[i];
          formData.append('designs[' + i + '][image]', file);
        }



        axios.post(`${ADMIN_URL}/place-order`, formData, config)
          .then(response => {

            currentObj.success = response.data.success;
              const loader = this.$loading.show({
                  loader: 'spinner',
                  color: '#ff3573'
              });
              setTimeout(() => loader.hide(), 3 * 1000);
            if(currentObj.success === true)
            {
              this.$swal('Order Placed Successfully!', '', 'success');
              setTimeout(()=>{
                window.location.href = "/orders";
              },1000);
            }

          })
          .catch(error => {
            // console.log('Error  ... ', error.response);
            currentObj.output = error;
            if(error.response.status===409)
            {
                this.$swal('Invalid Phone Number', '', 'error');
            }

          });

      }

    }
  }
</script>

<style scoped>

</style>
