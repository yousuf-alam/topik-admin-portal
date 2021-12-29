<template>
  <div class="animated fadeIn">
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
        <order-summary
          :invoice="invoice"
          v-if="invoice.length !== 0"
        ></order-summary>
      </b-col>
    </b-row>
    <b-card class="bg-white text-center">
      <button class="btn btn-romoni-secondary btn-lg" @click="orderPlace">
        Place Order
      </button>
    </b-card>
    <modal
      name="modal-partner_type"
      height="auto"
      :adaptive="true"
      :clickToClose="false"
    >
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
            <div class="form-group" v-if="partner_type == 1">
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
import Customer from "../Orders/OrderCreate/Customer";
import Location from "../Orders/OrderCreate/Location";
import Schedule from "../Orders/OrderCreate/Schedule";
import Service from "../Orders/OrderCreate/Service";
import Cart from "../Orders/OrderCreate/Cart";
import Partner from "../Orders/OrderCreate/Partner";
import OrderSummary from "../Orders/OrderCreate/Summary";
import Design from "../Orders/OrderCreate/Design";
import Accessories from "../Orders/OrderCreate/Accessories";

const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

export default {
  name: "ThirdPartyOrderPlace",
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
  data() {
    return {
      type: "",
      customer: {
        name: "",
        phone: ""
      },
      location: "",
      categories: [],
      partners: [],
      schedule: {
        selected_time: "",
        selected_date: "",
        address: {
          latitude: "",
          longitude: "",
          address_details: ""
        }
      },
      partner_type: 1,
      freelance_reasons: [
        "Customer asked for SP specifically",
        "No IH SP in that area",
        "No IH SP free/available during this time slot",
        "No IH SP can do this job (skill gap)"
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
      order_id: "",
      order: null
    };
  },

  mounted() {
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
    this.fetchThirdPartyOrder();
  },
  methods: {
    fetchThirdPartyOrder() {
      this.order_id = window.location.pathname.split("/").pop();
      axios
        .get(`${ADMIN_URL}/fetch-third-party-order`, {
          params: {
            order_id: this.order_id
          }
        })
        .then(response => {
          this.order = response.data;
          this.createOrder(this.order.lineitem.service_id);
          EventBus.$emit("customer:update", this.order);
          EventBus.$emit("service:update", this.order);
        })
        .catch(e => {});
    },
    createOrder(service_id) {
      this.type = service_id;
      this.$refs.Service.fetchCategories(service_id);
    },
    getMainServices() {
      axios
        .get(`${ADMIN_URL}/services`)
        .then(response => {
          this.main_services = response.data.filter(
            x => x.published_status == "published"
          );
          console.log("Services.vue, Response === ", response.data);
        })
        .catch(e => {
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
    fetchPartner() {
      this.$modal.hide("modal-partner_type");
      this.partners = [];

      axios
        .post(`${ADMIN_URL}/available-partners`, {
          service_type: this.type,
          location: this.location,
          date: this.schedule.selected_date,
          time: this.schedule.selected_time,
          services: this.services
        })
        .then(response => {
          if (response.data.success === true) {
            this.partners = response.data.data.filter(
              x => x.plan_id === this.partner_type
            );
            console.log("partners", this.partners);
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
      console.log("len", this.invoice.length);
    },
    invoiceFormatter() {
      return {
        price: this.selected_partner.price,
        discount: 0,
        serviceNo: this.services.length,
        sp: this.selected_partner.name,
        schedule: this.schedule
      };
    },
    orderPlace(e) {
      e.preventDefault();
      const config = {
        headers: { "content-type": "multipart/form-data" }
      };

      let formData = new FormData();
      formData.append("service_id", this.type);
      formData.append("platform", "admin portal");
      formData.append("partner_id", this.selected_partner.id);
      formData.append("location_id", this.location);
      formData.append("scheduled_time", this.schedule.selected_time);
      formData.append("scheduled_date", this.schedule.selected_date);
      formData.append("shipping_name", this.customer.name);
      formData.append(
        "shipping_address",
        JSON.stringify(this.schedule.address)
      );
      formData.append("shipping_phone", this.customer.phone);
      formData.append("payment_method", this.customer.payment_method);
      formData.append("measurement", this.measurement_type);
      formData.append("accessories", JSON.stringify(this.accessories));
      formData.append("items", JSON.stringify(this.services));
      formData.append("price", this.invoice.price);
      formData.append("discount", this.invoice.discount);
      formData.append("third_party_order_id", this.order_id);
      formData.append("order_id", window.location.pathname.split("/").pop());

      for (let i = 0; i < this.designs.length; i++) {
        let file = this.designs[i];
        formData.append("designs[" + i + "][image]", file);
      }
      if (this.partner_type == 1)
        formData.append("freelance_reason", this.freelance_reason);

      const loader = this.$loading.show({
        loader: "spinner",
        color: "#ff3573",
        canCancel: true
      });

      axios
        .post(`${ADMIN_URL}/place-order`, formData, config)
        .then(response => {
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
        .catch(error => {
          this.$swal(
            "Something went wrong",
            "Please check all the fields & try again",
            "error"
          );
        });
    }
  }
};
</script>

<style scoped></style>
