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
            <partner :partners="partners"></partner>
          </b-col>
        </b-row>
        <b-row>
            <b-col>
                <schedule></schedule>
            </b-col>
        </b-row>
        <b-row>
            <b-col sm="6" md="6">
                <service :selected_partner="selected_partner"></service>
            </b-col>
            <b-col sm="6" md="6">
                <cart></cart>
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
  import EventBus from '../../../utils/EventBus'
  import Customer from '../AppointmentCreate/Customer'
  import Location from '../AppointmentCreate/Location'
  import Schedule from '../AppointmentCreate/Schedule'
  import Service  from '../AppointmentCreate/Service'
  import Cart     from '../AppointmentCreate/Cart'
  import Partner  from '../AppointmentCreate/Partner'
  import OrderSummary  from '../AppointmentCreate/Summary'
  const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
  const ROOT_URL = process.env.VUE_APP_ROOT_URL;
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
        type: 'Beauty Appointment',
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
        this.fetchPartner();
      },
      scheduleAdd(schedule) {
        this.schedule = schedule;
      },
      servicesAdd(services) {
        this.services = services;
        this.invoice = this.invoiceFormatter();
      },
      fetchPartner() {
        const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
        axios.get(`${ADMIN_URL}/appointment-partners`, {
          params: {
            location_id : this.location
          }
        })
          .then(response => {
            this.partners = response.data;

          })
          .catch(e => {
            console.log("error occurs",e);
          });

      },
        fetchPartnerAddress() {
            axios.post(`${ROOT_URL}/api/v2.0/appointment/partner-details`, {
                partner_id : this.selected_partner.id
            })
                .then(response => {
                    this.selected_partner.address = response.data.address;

                })
                .catch(e => {
                    console.log("error occurs",e);
                });

        },
      partnerAdd(partner) {
        this.selected_partner = partner;
        this.fetchPartnerAddress();
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
        formData.append('shipping_address', JSON.stringify(this.selected_partner.address));
        formData.append('shipping_phone', this.customer.phone);
        formData.append('payment_method', this.payment_method);
        formData.append('items', JSON.stringify(this.services));
        formData.append('price', this.invoice.price);
        formData.append('discount', this.invoice.discount);

        const loader = this.$loading.show({
            loader: 'spinner',
            color: '#ff3573',
            canCancel : true
        });
        axios.post(`${ADMIN_URL}/place-order`, formData, config)
          .then(response => {
              setTimeout(() => {
                  loader.hide();

              }, 3 * 1000);
              if(response.data.success === true)
              {
                  this.$swal('Appointment Booked Successfully!', '', 'success');
                  window.location.href = "/appointments";
              }
              else
              {
                  this.$swal('Something wrong happened', 'Please check all the fields', 'error');
              }
          })
          .catch(error => {
              this.$swal('Something went wrong', 'Please check all the fields & try again', 'error');
            console.log(error);
          });

      }

    }
  }
</script>

<style scoped>

</style>
