<template>
  <div class="animated fadeIn">
    <modal name="modal-order_type" height="auto" :adaptive="true" :clickToClose="false">
      <div class="m-3 p-3">
        <b-row class="p-2">
          <h4>Choose Order Type</h4>
          <br /><br />
        </b-row>
        <b-row class="p-2">
          <div class="center-div">
            <button
              v-for="s in main_services"
              :key="s.id"
              @click="createOrder(s)"
              :class="[s.id % 2 ? 'btn btn-primary m-2' : 'btn btn-romoni-secondary m-2']"
            >
              {{ s.name }}
            </button>
            <!--<button @click="createOrder('Beauty Appointment')" class="btn btn-primary m-2">Beauty Appointment</button>-->
            <!-- <button @click="createOrder('Tailor On-Demand')" class="btn btn-romoni-secondary m-2">Tailor On-Demand</button><br>
              <button @click="createOrder('Medicines and Groceries')" class="btn btn-romoni-secondary m-2">Medicines and Groceries</button>
              <button @click="createOrder('Medical Consultations')" class="btn btn-primary m-2">Medical Consultations</button>-->
          </div>
        </b-row>
      </div>
    </modal>

    <modal name="modal-coupon" height="auto" :clickToClose="false" v-if="var_modal_coupon">
      <div class="modal-header">
        <h5 class="modal-title">Coupon</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModalCoupon">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="m-3 p-3">
<!--        <b-row class="p-2">-->
<!--          <h4>Enter Coupon</h4>-->
<!--          <br /><br />-->
<!--        </b-row>-->
        <b-row class="p-2">
          <div class="center-div d-flex">
            <input type="text" id="coupon" v-model="coupon" class="form-control">
            <button @click="submitCoupon" class="btn btn-success ml-1"> Apply </button>
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
    <b-row v-if="type !== 'Tailor On-Demand'">
      <b-col sm="6" md="6">
        <service :type="type" ref="Service"></service>
      </b-col>
      <b-col sm="6" md="6">
        <cart></cart>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col sm="6" md="6">
        <b-row>
          <b-col>
            <service :type="type" ref="Service"></service>
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
        <button
          class="btn btn-primary btn-lg center-div"
          @click="$modal.show('modal-partner_type')"
        >
          <i class="fa fa-search"></i>
          Search Partners
        </button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <partner :partners="partners"></partner>
      </b-col>
    </b-row>
    <b-row>
      <b-col>

        <order-summary :invoice="invoice" v-if="invoice.length !== 0"></order-summary>
      </b-col>
    </b-row>
    <b-card class="bg-white text-center">
<!--      <span style="margin-right: 5px" @click="modalCoupon">-->
<!--        <label>Apply Coupon</label>-->
<!--        <i class="fa fa-plus" aria-hidden="true"></i>-->
<!--      </span>-->

      <button type="button" class="btn btn-outline-secondary" style="margin-right: 5px" @click="modalCoupon">Apply Coupon<i class="fa fa-plus" aria-hidden="true"></i></button>


      <button class="btn btn-romoni-secondary btn-lg" @click="orderPlace">
        Place Order
      </button>
    </b-card>
    <modal name="modal-partner_type" height="auto" :adaptive="true" :clickToClose="false">
      <div class="m-3 p-3">
        <b-row class="p-2">
          <h4>Choose Partner Type</h4>
          <br /><br />
        </b-row>
        <b-row class="p-2">
          <b-col>
            <div class="form-group">
              <select class="form-control" v-model="partner_type">
                <option :value="2">In-House Partner</option>
                <option :value="1">Freelance Partner</option>
              </select>
            </div>
            <div class="form-group" v-if="partner_type==1">
              <label class="font-weight-bold">Choose Reason</label>
              <div v-for="r in freelance_reasons" :key="r">
                <input type="radio" :value="r" v-model="freelance_reason" />
                <label>{{ r }}</label>
              </div>
              <div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Other"
                  v-model="freelance_reason"
                />
              </div>
            </div>
             <button class="btn btn-primary m-2" @click="fetchPartner">
                <i class="fa fa-search"></i>Search Partners
              </button>
          </b-col>
        </b-row>
      </div>
    </modal>
  </div>
</template>

<script>
import axios from "axios";
import EventBus from "../../utils/EventBus";
import Customer from "./OrderCreate/Customer";
import Location from "./OrderCreate/Location";
import Schedule from "./OrderCreate/Schedule";
import Service from "./OrderCreate/Service";
import Cart from "./OrderCreate/Cart";
import Partner from "./OrderCreate/Partner";
import OrderSummary from "./OrderCreate/Summary";
import Design from "./OrderCreate/Design";
import Accessories from "./OrderCreate/Accessories";

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
    Accessories,
  },
  data() {
    return {
      type: "",
      customer: {
        name: "",
        phone: "",
      },
      location: "",
      var_modal_coupon: false,
      coupon: "",
      categories: [],
      partners: [],
      schedule: {
        selected_time: "",
        selected_date: "",
        address: {
          latitude: "",
          longitude: "",
          address_details: "",
        },
      },
      partner_type: 1,
      freelance_reasons: [
        "Customer asked for SP specifically",
        "No IH SP in that area",
        "No IH SP free/available during this time slot",
        "No IH SP can do this job (skill gap)",
      ],
      freelance_reason: "",
      services: [],
      main_services: [],
      designs: [],
      accessories: [],
      measurement_type: "",
      custom_measurement: "",
      selected_partner: null,
      invoice: [],
      promo_discount:""
    };
  },

  mounted() {
    this.modalType();
    console.log("in", this.invoice);
    EventBus.$on("customer:add", this.customerAdd.bind(this));
    EventBus.$on("location:add", this.locationAdd.bind(this));
    EventBus.$on("schedule:add", this.scheduleAdd.bind(this));
    EventBus.$on("design:add", this.designAdd.bind(this));
    EventBus.$on("cart:add", this.servicesAdd.bind(this));
    EventBus.$on("partner:confirm", this.partnerAdd.bind(this));
    EventBus.$on("accessories:add", this.accessoriesAdd.bind(this));
  },
  created() {
    this.getMainServices();
  },
  methods: {
    modalType() {
      this.$modal.show("modal-order_type");
      console.log("called");
    },
    createOrder(service) {
      this.type = service.id;
      this.$modal.hide("modal-order_type");
      this.$refs.Service.fetchCategories(service.id);
    },
    getMainServices() {
      axios
        .get(`${ADMIN_URL}/services`)
        .then((response) => {
          this.main_services = response.data.filter(
            (x) => x.published_status == "published"
          );
          console.log("Services.vue, Response === ", response.data);
        })
        .catch((e) => {
          //console.log("error occurs");
        });
    },
    customerAdd(customer) {
      this.customer = customer;
    },
    locationAdd(location) {
      this.location = location;
      this.partners = [];
    },
    scheduleAdd(schedule) {
      this.schedule = schedule;
      this.partners = [];
    },
    designAdd(designs) {
      this.designs = designs;
    },
    servicesAdd(services) {
      this.services = services;
      this.partners = [];
      // this.fetchPartner();
    },
    accessoriesAdd(data) {
      this.accessories = data.accessories;
      this.measurement_type = data.measurement_type;
      if (this.measurement_type === "own")
        this.measurement_type = data.custom_measurement;
    },

    modalCoupon(){
      this.$modal.show("modal-coupon");
      this.var_modal_coupon = true;
    },

    closeModalCoupon(){
      this.$modal.hide("modal-coupon");
    },

    submitCoupon(){
      console.log(this.coupon);
      axios
        .post(`${ADMIN_URL}/submit-coupon`, {
          coupon: this.coupon,
          category_id: this.services[0].category_id,
          price: this.invoice.price,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.success === true) {
            this.promo_discount = response.data.discount;
            this.coupon_id = response.data.coupon_id;
            this.$modal.hide("modal-coupon");
          } else {
            this.$modal.hide("modal-coupon");
          }
        })
        .catch((e) => {
          console.log("error applying promo === ", e.response);
          this.$modal.hide("modal-coupon");
        });
    },

    fetchPartner() {
      this.$modal.hide("modal-partner_type");
      this.partners = [];

      axios
        .post(`${ADMIN_URL}/available-partners`, {
          service_type: this.type,
          location: this.location,
          date: this.schedule.selected_date,
          time: this.schedule.selected_time,
          services: this.services,
        })
        .then((response) => {
          if (response.data.success === true) {
            this.partners = response.data.data.filter((x) => x.plan_id === this.partner_type);
            console.log('partners',this.partners);
          } else {
            this.partners = [];
          }
        })
        .catch((e) => {
          console.log("error fetchPartner === ", e.response);
        });
    },
    partnerAdd(partner) {
      this.selected_partner = partner;

      this.invoice = this.invoiceFormatter();
      console.log("len", this.invoice.length);
    },
    invoiceFormatter() {
      // const { selected_partner, customer, promo_discount, services, schedule } = this;

      const discount_adv_pay = (this.customer.payment_method === 'bKash' || this.customer.payment_method === 'ssl') ? (this.selected_partner.price * 0.1) : 0;
      const promo_discount = this.promo_discount ? this.promo_discount : 0;
      const discount = promo_discount + discount_adv_pay;
      const total_bill = this.selected_partner.price - discount;
      const serviceNo = this.services.length;
      const sp = this.selected_partner.name;

     return  {
        total_service_charge: this.selected_partner.price,
        discount_adv_pay: discount_adv_pay,
        promo_discount: promo_discount,
        discount: discount,
        total_bill: total_bill,
        serviceNo: serviceNo,
        sp: sp,
        schedule: this.schedule
      };

// You can use the 'result' object as needed.

    },
    orderPlace(e) {
      e.preventDefault();
      let currentObj = this;
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };

      if(this.coupon_id === undefined){
        this.coupon_id = 0;
      }

      let formData = new FormData();
      formData.append("service_id", this.type);
      formData.append("platform", "admin portal");
      formData.append("partner_id", this.selected_partner.id);
      formData.append("location_id", this.location);
      formData.append("scheduled_time", this.schedule.selected_time);
      formData.append("scheduled_date", this.schedule.selected_date);
      formData.append("shipping_name", this.customer.name);
      formData.append("shipping_address", JSON.stringify(this.schedule.address));
      formData.append("shipping_phone", this.customer.phone);
      formData.append("payment_method", this.customer.payment_method);
      formData.append("measurement", this.measurement_type);
      formData.append("accessories", JSON.stringify(this.accessories));
      formData.append("items", JSON.stringify(this.services));
      formData.append("price", this.invoice.total_bill);
      formData.append("total_service_charge", this.invoice.total_service_charge);
      formData.append("discount", this.invoice.discount);
      formData.append("discount_adv_pay", this.invoice.discount_adv_pay);
      formData.append("coupon_id", this.coupon_id);

      for (let i = 0; i < this.designs.length; i++) {
        let file = this.designs[i];
        formData.append("designs[" + i + "][image]", file);
      }
      if(this.partner_type ==1)
          formData.append("freelance_reason",this.freelance_reason)

      const loader = this.$loading.show({
        loader: "spinner",
        color: "#ff3573",
        canCancel: true,
      });


      axios
        .post(`${ADMIN_URL}/place-order`, formData, config)
        .then((response) => {
          setTimeout(() => {
            loader.hide();
          }, 3 * 1000);
          if (response.data.success === true) {
            this.$swal("Order Placed Successfully!", "", "success");
            window.location.href = "/orders";
          } else {
            this.$swal(
              "Something wrong happened",
              "Please check all the fields",
              "error"
            );
          }
        })
        .catch((error) => {
          // console.log('Error  ... ', error.response);

          this.$swal(
            "Something went wrong",
            "Please check all the fields & try again",
            "error"
          );
          /* if(error.response.status===422)
            {
                this.$swal('Invalid Phone Number', error.response.data, 'error');
            }
            else
            {
                this.$swal('Something went wrong', 'Please check all the fields', 'error');

            }*/
        });
    },
  },
};
</script>

<style scoped></style>
