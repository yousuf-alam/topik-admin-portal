<template>
  <div class="animated fadeIn font-weight-bold">
    <div>
      <div class="cardheading">
        <div></div>
        <button @click="deleteOrder" class="btn btn-danger float-right"><i class="fa fa-trash"></i> Delete This
          Order</button>
      </div>

      <b-row>
        <b-col class="mb-5" sm="6" md="6">
          <b-card class="h-60 p-4 m-4">
            <h5 class="mb-4">SP & Schedule Details</h5>
            <b-form-group>
              <label>Order ID : {{ order.id }}</label>
            </b-form-group>
            <b-form-group>
              <label>Service : {{ type }}</label>
            </b-form-group>
            <b-form-group label="Status">
              <select class="form-control" v-model="order.status">
                <option value="initiated">Initiated</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="started">Started</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </b-form-group>
            <b-form-group label="Cancel Reason *" v-if="order.status === 'cancelled'">
              <p v-if="order.cancel_reason == ''" class="text-danger">You have to select cancel reason</p>
              <select class="form-control" v-model="order.cancel_reason">
                <option value="SP Unreachable">SP Unreachable</option>
                <option value="Cus Unreachable">Cus Unreachable</option>
                <option value="OPS Unreachable">OPS Unreachable </option>
                <option value="Cus Denied">Cus Denied</option>
                <option value="SP Denied">SP Denied </option>
                <option value="SP Unavailable">SP Unavailable</option>
                <option value="Location Prob">Location Prob</option>
                <option value="SP Time Management Issue">SP Time Management Issue</option>
              </select>
            </b-form-group>
            <b-form-group label="Assigned SP">
              <multiselect v-model="order.partner" :options="partners" placeholder="Select one" label="name"
                           track-by="id">
              </multiselect>
            </b-form-group>
            <div v-show="order.service_id === 2">
              <label>Select Delivery Type</label>
              <b-form-group class="ml-4">
                <input type="radio" v-model="date_type" value="Regular Delivery" id="regular_delivery">
                <label for="regular_delivery" class="mx-1">Regular Delivery</label><br>
                <input type="radio" v-model="date_type" value="custom" id="custom_delivery">
                <label for="custom_delivery" class="mx-1">Emergency Delivery</label>
              </b-form-group>
            </div>

            <b-form-group label="Scheduled Date">
              <datepicker input-class="date-input" @input="changeDateFormat()" v-model="order.scheduled_date">
              </datepicker>
            </b-form-group>
            <b-form-group label="Scheduled Time">
              <select class="form-control" v-model="order.scheduled_time">
                <option value="09.00AM-12.00PM"> 09:00 AM - 12:00 PM </option>
                <option value="12.00PM-03.00PM"> 12:00 PM - 03:00 PM </option>
                <option value="03.00PM-06.00PM"> 03:00 PM - 06:00 PM </option>
                <option value="06.00PM-09.00PM"> 06:00 PM - 09:00 PM </option>
              </select>
            </b-form-group>
            <b-form-group label="Request from customer" class="mt-2">
              <input type="text" class="form-control" v-model="order.req_from_customer">
            </b-form-group>
            <b-form-group label="Internal Notes" class="mt-2">
              <input type="text" class="form-control" v-model="order.internal_notes">
            </b-form-group>

            <b-form-group label="Upload Sample Images">

              <div v-for="(image, index) in images" :key="index"> <input type="file"
                                                                         @change="getFileValue(index, $event.target)" class="mt-2 form-control" /> <span class="text-danger"
                                                                                                                                                         v-if="images[index].error"> {{ images[index].error }} </span>

              </div>

              <div class="mt-2">
                <b-button variant="primary" @click="addImage" class="mt-2 sample-btns"> Add More Attachments </b-button>
                <b-button variant="success" @click="showImages" class="mt-2" :disabled="!sampleImages.length"> See Sample Images
                </b-button>
              </div>

            </b-form-group>




            <button class="btn btn-dark mt-3"
                    v-show="order.status !== 'cancelled' || (order.status === 'cancelled' && order.cancel_reason !== '')"
                    @click="updateOrder"> Update</button>


            <b-modal v-model="showModal" title="Sample Images" hide-footer>
              <div class="image-grid">
                <div v-for="(image, index) in sampleImages" :key="index" class="grid-item"> <img :src="image"
                                                                                                 class="img-thumbnail" /> </div>
              </div>
            </b-modal>



          </b-card>

          <b-card class="h-30 p-4 m-4">

            <h4 class="mb-4">Hot Deals Details</h4>
            <br>
            <b-form-group label="Change Hot Deals">
              <b-form-radio v-model="order.hot_deals" value="unused">Unused</b-form-radio>
              <b-form-radio v-model="order.hot_deals" value="tara-voucher">Tara Voucher</b-form-radio>
              <b-form-radio v-model="order.hot_deals" value="tara-card">Tara Regular</b-form-radio>
              <b-form-radio v-model="order.hot_deals" value="brac-premium">Brac Premium Banking</b-form-radio>
              <b-form-radio v-model="order.hot_deals" value="brac-bank">Brac Bank</b-form-radio>
            </b-form-group>

            <br>
            <button class="btn btn-dark mb-3" @click="setHotDeal(order.id)">Change</button>


          </b-card>
        </b-col>

        <b-col class="mb-5" sm="6" md="6">
          <b-card class="h-50 m-4 p-4">
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
              <select class="form-control" v-model="order.location_id"
                      :class="{ 'border-danger': order.location_id === 0 }">
                <option :value="location.id" v-for="location in locations" :key="location.id">
                  {{ location.name }}
                </option>
              </select>
            </b-form-group>
            <b-form-group label="Delivery Address">
              <input type="text" class="form-control" v-model="order.shipping_address.address_details">
            </b-form-group>

            <b-form-group label="Black list">
              <select class="form-control" v-model="order.is_blacklisted">
                <option value="0">NO</option>
                <option value="1">YES</option>
              </select>
            </b-form-group>
            <b-form-group label="Black list Reason" v-if="order.is_blacklisted == 1">
              <select class="form-control" v-model="order.blacklist_reason">
                <option value="safety_issue">Safety Issue</option>
                <option value="location_issue">Location Issue</option>
                <option value="bad_behave">Bad Behave</option>
                <option value="call_receiving_problem">Call Receiving Problem</option>
                <option value="last_order_payment_pending">Last Order Payment Pending</option>
                <option value="other">Other</option>

              </select>
            </b-form-group>
          </b-card>

          <b-card class="h-70 m-4 p-4">
            <h5 class="mb-4">Payment Details</h5>

            <!-- <b-form-group label="Payment Method">
              <select class="form-control" v-model="order.payment_method" @change="getPaymentMethod">
                <option value="bKash">bKash</option>
                <option value="ssl">ssl</option>
                <option value="cash">Cash on delivery</option>

              </select>
            </b-form-group> -->

            <b-form-group label="Payment Method">
              <select class="form-control" v-model="order.payment_method" @change="getPaymentMethod">
                <option v-for="method in availablePaymentMethods()" :value="method" :key="method">

                  {{ paymentMethods[method] }}

                </option>
              </select>
            </b-form-group>


            <b-form-group label="Payment Link">
              <div class="payment-box d-flex ">

                <div class="d-flex flex-column" v-if="order.payment_method === 'ssl'">

                  <div v-if="order.total_paid == 0 && order.hot_deals === 'unused'">
                    <label for="">Partial Payment</label>
                    <button @click="copyTextPartial" class="copy-icon" style="border: none;background: white">
                      <i class="fa fa-copy"></i>
                    </button>
                    <p class="content-partial ml-2 ">Thank you for ordering
                      ({{ order.crypt_order_id }}) from Romoni. To
                      confirm your order make advance payment, kindly pay through this link:
                      https://romoni.com.bd/sslcommerz/order/{{ order.crypt_order_id }}/{{ order.total_bill * 0.25
                      }}
                    </p>
                  </div>
                  <div>
                    <label for="">Full/Due Payment</label>
                    <button @click="copyTextDue" class="copy-icon" style="border: none;background: white">
                      <i class="fa fa-copy"></i>
                    </button>
                    <p class="content-due ml-2 ">Thank you for ordering
                      ({{ order.crypt_order_id }}) from Romoni. To
                      confirm your order make advance payment, kindly pay through this link:
                      https://romoni.com.bd/sslcommerz/order/{{ order.crypt_order_id }}/{{ order.total_due }}
                    </p>

                  </div>


                </div>
                <div class="d-flex flex-column" v-if="order.payment_method === 'bKash'">

                  <div v-if="order.total_paid == 0">
                    <label for="">Partial Payment</label>
                    <button @click="copyTextPartial" class="copy-icon" style="border: none;background: white">
                      <i class="fa fa-copy"></i>
                    </button>
                    <p class="content-partial ml-2">Thank you for ordering
                      ({{ order.crypt_order_id }}) from Romoni. To
                      confirm your order make advance payment, kindly pay through this link:
                      https://romoni.com.bd/bkash/order/{{ order.crypt_order_id }}/{{ order.total_bill * 0.25 }}
                    </p>

                  </div>
                  <div>
                    <label for="">Full / Due Payment</label>
                    <button @click="copyTextDue" class="copy-icon" style="border: none;background: white">
                      <i class="fa fa-copy"></i>
                    </button>
                    <p class="content-due ml-2">Thank you for ordering
                      ({{ order.crypt_order_id }}) from Romoni. To
                      confirm your order make advance payment, kindly pay through this link:
                      https://romoni.com.bd/bkash/order/{{ order.crypt_order_id }}/{{ order.total_due }}
                    </p>
                  </div>


                </div>
              </div>
            </b-form-group>

            <b-col>
              <b-form-group label="Payment Status?">
                <b-form-radio v-model="order.payment_status" value="Paid">Paid</b-form-radio>
                <b-form-radio v-model="order.payment_status" value="Partial">Partial</b-form-radio>
                <b-form-radio v-model="order.payment_status" value="Pending">Pending</b-form-radio>
              </b-form-group>
            </b-col>

            <b-col>
              <div class="table-responsive" v-if="order.payment_status !== 'Pending'">
                <table class="table table-striped">
                  <thead>
                  <tr>
                    <th>Method</th>
                    <th>Amount</th>
                    <th>Trans Id</th>
                    <th>Date</th>


                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in order.order_payments" :key="item.id">
                    <td> {{ item.payment_method }}</td>
                    <td> {{ item.amount }}</td>
                    <td v-if="item.payment_method !== 'bKash' && item.payment_method !== 'ssl'">
                    </td>
                    <td v-if="item.payment_method === 'bKash'"> {{ item.bkash_payment }}</td>
                    <td v-if="item.payment_method === 'ssl'"> {{ item.ssl_payment }}</td>
                    <td>{{ item.created_at }}</td>

                  </tr>
                  </tbody>
                </table>
              </div>



            </b-col>




            <!--          </b-row>-->

            <button class="btn btn-dark mt-3" @click="updateOrder"> Update</button>
          </b-card>
        </b-col>
      </b-row>
      <b-row class="">
        <b-col class="mb-5" sm="6" md="6">
          <b-card class="h-100 p-4 m-4">
            <h5 class="mb-4">Billing Details</h5>
            <b-form-group label="Service Charge">
              <input type="text" class="form-control" v-model="order.total_service_charge">
            </b-form-group>
            <b-form-group label="Discount">
              <input type="text" class="form-control" v-model="order.total_discount">
            </b-form-group>
            <b-form-group label="Total Bill">
              <input type="text" class="form-control" v-model="order.total_bill">
            </b-form-group>
            <b-form-group label="Insert Payment">
              <div>
                <input type="radio" id="bKash" value="bKash" v-model="selectedMethod">
                <label style="margin-left: 10px;" for="bKash">Bkash</label><br>

                <input type="radio" id="ssl" value="ssl" v-model="selectedMethod">
                <label style="margin-left: 10px;" for="ssl">SSL</label>
              </div>
              <input type="text" class="form-control" v-model="add_payment">
              <button class="btn btn-dark mt-3" @click="addPayment"> Add Payment</button>

            </b-form-group>
            <b-form-group label="Total Paid">
              <input type="text" class="form-control" v-model="order.total_paid" :disabled="true">
            </b-form-group>
            <b-form-group label="Total Due">
              <input type="text" class="form-control" v-model="order.total_due" :disabled="true">
            </b-form-group>
            <b-form-group label="Refund Status" v-if="order.is_refund">
              <select class="form-control" v-model="order.refund_status">
                <option value="requested">Requested</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="processing">Processing</option>
                <option value="refunded">Refunded</option>

              </select>
            </b-form-group>

            <b-form-group v-show="order.coupon_id !== null" label="Applied Promo">
              <span class="text-success">{{ order.coupon_code }}</span>
            </b-form-group>
            <h5 class="mb-4">Rating Details</h5>
            <b-form-group>
              <button class="btn btn-sm btn-warning m-1" v-if="!order.review" @click="new_review_bool = true">+ Add
                Review</button>
              <button class="btn btn-sm btn-danger" v-if="new_review_bool === true"
                      @click="new_review_bool = false">Cancel</button>
            </b-form-group>
            <div v-if="order.review">
              <b-form-group label="Rating">
                <input type="text" class="form-control" v-model="order.review.rating">
              </b-form-group>
              <b-form-group label="Review">
                <input type="text" class="form-control" v-model="order.review.comment">
              </b-form-group>
            </div>
            <div v-if="new_review_bool === true">
              <b-form-group label="Rating">
                <select class="form-control" v-model="new_rating">
                  <option value="1.0">1 Star</option>
                  <option value="2.0">2 Star</option>
                  <option value="3.0">3 Star</option>
                  <option value="4.0">4 Star</option>
                  <option value="5.0">5 Star</option>
                </select>
              </b-form-group>
              <b-form-group label="Review">
                <input type="text" class="form-control" v-model="new_review">
              </b-form-group>
            </div>
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
                <tr v-for="item in order.items" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>
                      <span v-for="(answer, index) in item.options" :key="index">
                        {{ answer.ans }} <br>
                      </span>
                  </td>
                  <td><input type="text" style="width: 2rem" v-model="item.quantity"></td>
                  <td><input type="text" style="width: 4rem" v-model="item.price"></td>
                  <td>
                      <span class="cursor-pointer m-2" @click="updateItem(item)"> <i class="fa fa-check text-success"
                                                                                     data-toggle="tooltip" title="Save"></i></span>
                    <span class="cursor-pointer m-2" @click="deleteItem(item)"> <i class="fa fa-trash text-danger"
                                                                                   data-toggle="tooltip" title="Delete"></i></span>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <b-row v-if="type !== 'Tailor On-Demand'">
        <b-col sm="6" md="6">
          <service :type="getType" ref="Service"></service>
        </b-col>
        <b-col sm="6" md="6">
          <cart></cart>
          <div class="row text-center pb-5">
            <div class="center-div">
              <button class="btn btn-dark" @click="addNewitem"> Add New Line Item(s)</button>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row v-else>
        <b-col sm="6" md="6">
          <b-row>
            <b-col>
              <service :type="getType" ref="Service"></service>
            </b-col>
          </b-row>
          <!--<b-row>
          <b-col><design></design></b-col>
        </b-row>-->
        </b-col>
        <b-col sm="6" md="6">
          <b-row>
            <b-col>
              <b-card class="m-4 p-4">
                <h5 class="mb-4">Measurement Type</h5>
                <div class="form-group">
                  <input type="radio" v-model="order.measurement" value="by_sample" @change="addMeasurement"
                         id="by_sample_id">
                  <label for="by_sample_id" class="mx-1"> Customer will provide a
                    sample</label><br>
                  <input type="radio" v-model="order.measurement" value="by_tailor" @change="addMeasurement"
                         id="by_tailor_id">
                  <label for="by_tailor_id" class="mx-1">Tailor will take measurements on
                    spot</label><br>
                </div>
              </b-card>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <cart></cart>
              <div class="row text-center">
                <div class="form-control">
                  <button class="btn btn-dark" @click="addNewitem"> Add New Lineitem(s)</button>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>

    <!--<div v-else class="customcard">
      Loading...
    </div>-->

  </div>
</template>

<script>
import axios from 'axios';
import EventBus from '../../utils/EventBus'
import Customer from './OrderCreate/Customer'
import Location from './OrderCreate/Location'
import Schedule from './OrderCreate/Schedule'
import Service from './OrderCreate/Service'
import Cart from './OrderCreate/Cart'
import Partner from './OrderCreate/Partner'
import OrderSummary from './OrderCreate/Summary'
import Design from './OrderCreate/Design'
import Accessories from './OrderCreate/Accessories'
import Datepicker from 'vuejs-datepicker';
import moment from "moment";


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
      add_payment: '',
      city: '',
      type: '',
      date_type: '',
      new_review_bool: false,
      new_rating: '',
      new_review: '',
      flag_shipping_address_details: '',
      order_fetched_successfully: false,
      discountPercent: '',
      payablePercent: '',
      todayDate: '',
      convertedTime: '',
      currentTime: '',
      timeDifference: 0,
      scheduledTime: '03.00PM-09.00P.M',
      selectedMethod: 'bKash',
      new_hot_deals : '',

      image:'',
      images: [
        {
          image: "",
          ext: null,
          name: null,
          error: "",
        },
      ],
      showModal: false,
      sampleImages: [],



      paymentMethods: {
        bKash: 'bKash',
        ssl: 'ssl',
        cash: 'Cash on delivery'
      }


    };
  },
  created() {
    this.fetchOrder();
    this.getPartners();
    // this.getLocation();


    // this.getPaymentMethod();


  },

  computed: {
    getType() {
      if (this.order.service_id === 1) {
        this.type = "Beauty On-Demand";
      } else if (this.order.service_id === 2) {
        this.type = "Tailor On-Demand";
      } else {
        this.type = "Beauty Appointment";
      }
      return this.type;
    }
  },
  mounted() {
    EventBus.$on('design:add', this.designAdd.bind(this));
    EventBus.$on('cart:add', this.servicesAdd.bind(this));
    EventBus.$on('accessories:add', this.accessoriesAdd.bind(this));
    this.calculateTimeDifference();

  },

  watch: {
    'order.hot_deals'(newValue) {

      this.new_hot_deals = newValue;
      console.log(this.new_hot_deals);
    }
  },

  methods: {

    getFileValue(index, target) {
      let file = target.files[0];

      if (file.size > 1048576) {
        this.$set(this.images[index], "error", "Image size should be less than 1 MB");
        target.value = "";
      } else {
        this.images[index].error = "";

        const reader = new FileReader();
        reader.onload = (res) => {

          this.images[index] = file;

        };
        reader.onerror = (err) => console.log(err);
        reader.readAsDataURL(file);
      }
    },
    addImage() {
      this.images.push({ image: "" });
    },

    showImages() {
      this.showModal = true;
    },

    availablePaymentMethods() {


      if (this.order.payment_method === 'ssl' && this.order.hot_deals !== 'unused') {
        return ['ssl'];
      }
      return ['bKash', 'ssl', 'cash'];
    },
    designAdd(designs) {
      this.designs = designs;
    },
    servicesAdd(services) {
      this.services = services;

    },
    accessoriesAdd(data) {
      this.accessories = data.accessories;
      this.measurement_type = data.measurement_type;
      if (this.measurement_type === 'own')
        this.measurement_type = data.custom_measurement;
    },
    getTodaysDate() {

      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      this.todayDate = `${year}-${month}-${day}`;
      console.log('today date', this.todayDate);
    },
    getCurrentTime() {
      const current = new Date();
      const currentTime = current.getHours() + ':' + ('0' + current.getMinutes()).slice(-2);
      const currentTimeFormatted = currentTime + ' ' + (current.getHours() >= 12 ? 'P.M.' : 'A.M.');
      this.currentTime = currentTimeFormatted;
    },
    calculateTimeDifference() {

      let stringTime = this.scheduledTime;
      let timeString = stringTime.split('-')[0]; // Extract time part before the dash

      let format = moment(timeString, 'hh.mmA');
      let time1 = moment(format);
      let time2 = moment();
      this.timeDifference = time1.diff(time2, 'minutes');

      console.log("Time difference in minutes:", this.timeDifference);

    },

    fetchOrder() {
      this.order_id = window.location.pathname.split("/").pop();
      axios.get(`${ADMIN_URL}/order`, {
        params: {
          order_id: this.order_id
        }
      }).then(response => {
        // console.log('fetch Order ======= ', response.data);
        this.order = response.data;

        this.order.shipping_address = JSON.parse(this.order.shipping_address);
        this.flag_shipping_address_details = this.order.shipping_address.address_details;
        console.log('ser-order', this.order.service_id)
        if (response.data.scheduled_date === 'regular') {
          this.order.scheduled_date = 'Regular Delivery'
        }

        this.scheduledTime = this.order.scheduled_time
        // this.new_hot_deals = this.order.hot_deals;
        console.log("order scheduled time", this.scheduledTime);
        this.order_fetched_successfully = true;

        this.sampleImages = this.order.sample_images || [];
        this.city = this.order.city;

        this.getLocation();


      }).catch(e => {
        console.log("error occurs", e);
      });
    },
    getPartners() {
      axios.get(`${ADMIN_URL}/all-partners`, {})
        .then(response => {
          this.partners = response.data;
          this.$refs.Service.fetchCategories(this.order.service_id);

        })
        .catch(e => {
          console.log("error occurs", e);
        });

    },
    getPaymentMethod() {
      // console.log("payment method is calling");
      axios.post(`${ADMIN_URL}/payment-method-info`, {
        payment_method: this.order
          .payment_method // Changed property name to match the expected key on the server
      })
        .then(response => {
          if (response.data.data) {
            this.discountPercent = response.data.data.percent_discount / 100;
            this.payablePercent = 1 - this.discountPercent;
          }

          console.log('hello discount', this.payablePercent);

          this.changePayment();
        })
        .catch(e => {
          console.log("error occurs", e);
        });
    },

    getLocation() {

      axios.get(`${ADMIN_URL}/locations-by-city`, {
        params: {
          city: this.city
        }
      })
        .then(response => {
          this.locations = response.data;
        })
        .catch(e => {
          console.log("error occurs");
        });
      this.$refs.Service.fetchCategories(this.order.service_id);
    },
    changeDateFormat() {
      let d = this.order.scheduled_date;
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      let year = d.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      this.order.scheduled_date = [year, month, day].join('-');
    },
    copyTextPartial() {
      // Get the text content of the div
      const textToCopy = this.$el.querySelector('.content-partial').textContent;

      // Create a temporary input element
      const tempInput = document.createElement('textarea');
      tempInput.style.position = 'absolute';
      tempInput.style.left = '-9999px';
      tempInput.value = textToCopy;
      document.body.appendChild(tempInput);

      // Select and copy the text
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);

      // Provide some visual feedback (optional)
      alert('Text copied to clipboard!');
    },
    copyTextDue() {
      // Get the text content of the div
      const textToCopy = this.$el.querySelector('.content-due').textContent;

      // Create a temporary input element
      const tempInput = document.createElement('textarea');
      tempInput.style.position = 'absolute';
      tempInput.style.left = '-9999px';
      tempInput.value = textToCopy;
      document.body.appendChild(tempInput);

      // Select and copy the text
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);

      // Provide some visual feedback (optional)
      alert('Text copied to clipboard!');
    },
    changePayment() {
      this.getTodaysDate();
      this.calculateTimeDifference();



      if (this.order.scheduled_date == this.todayDate) {
        if (this.timeDifference < 240)
          return 0;
      }

      if (this.order.payment_method === 'bKash' || this.order.payment_method === 'ssl') {


        this.order.discount_adv_pay = (this.order.total_service_charge * this.discountPercent).toFixed(2);
        this.order.total_discount = this.order.discount_adv_pay;
        this.order.total_bill = (this.order.total_service_charge * this.payablePercent).toFixed(2);

      } else {

        this.order.total_discount = (this.order.total_discount - this.order.discount_adv_pay).toFixed(2);
        this.order.discount_adv_pay = 0;
        this.order.total_bill = this.order.total_service_charge - this.order.total_discount;
      }

    },
    addPayment(e) {
      if (parseFloat(this.add_payment) > parseFloat(this.order.total_due)) {

        this.$swal('Error', 'Inserted amount cannot be greater than the due bill', 'error');
        return;
      }

      let formData = new FormData();
      formData.append('id', this.order.id);
      formData.append('amount', this.add_payment);
      formData.append('payment_method', this.selectedMethod);


      axios.post(`${ADMIN_URL}/order-payment/insert-bill`, formData)
        .then(response => {

          this.add_payment = '';


          this.$swal('Payment Inserted', '', 'success');
          this.fetchOrder();


          // }

        })
        .catch(error => {
          // console.log('Error  ... ', error.response);
          currentObj.output = error;
          // console.log(error);
        });

    },

    setHotDeal(id) {

      axios.post(`${ADMIN_URL}/change-order-hotdeal`, {

        order_id: id,
        hot_deals_val: this.new_hot_deals,

      }).then(response => {
        if (response.data.success === true) {
          this.$swal('Success', response.data.msg, 'success');
          setTimeout(() => {
            location.reload();
          }, 1000);
        } else {
          this.$swal('Error', response.data.msg, 'error');
        }
      }).catch(error => {
        console.error('Error changing hot deal:', error);
        this.$swal('Error', 'Failed to change hot deal. Please try again later.', 'error');
      });
    },


    updateOrder(e) {

      e.preventDefault();
      let currentObj = this;
      // console.log(this.order);

      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };

      if (this.order.shipping_address.address_details !== this.flag_shipping_address_details) {
        this.order.shipping_address.latitude = "";
        this.order.shipping_address.longitude = "";
      }



      //return;

      let formData = new FormData();
      formData.append('id', this.order.id);
      formData.append('status', this.order.status);
      if (this.order.partner) {
        formData.append('partner_id', this.order.partner.id);
      }
      formData.append('location_id', this.order.location_id);
      formData.append('scheduled_time', this.order.scheduled_time);
      formData.append('req_from_customer', this.order.req_from_customer);
      formData.append('internal_notes', this.order.internal_notes);
      formData.append('cancel_reason', this.order.cancel_reason);
      formData.append('scheduled_date', this.order.scheduled_date);
      formData.append('shipping_name', this.order.shipping_name);
      formData.append('shipping_address', JSON.stringify(this.order.shipping_address));
      formData.append('shipping_phone', this.order.shipping_phone);
      formData.append('total_service_charge', this.order.total_service_charge);
      formData.append('total_discount', this.order.total_discount);
      formData.append('discount_adv_pay', this.order.discount_adv_pay);
      formData.append('is_blacklisted', this.order.is_blacklisted);
      formData.append('blacklist_reason', this.order.blacklist_reason);
      formData.append('total_bill', this.order.total_bill);
      formData.append('payment_method', this.order.payment_method);
      formData.append('payment_status', this.order.payment_status);
      formData.append('review', JSON.stringify(this.order.review));
      formData.append('new_rating', this.new_rating);
      formData.append('refund_status', this.order.refund_status);
      formData.append('new_review', this.new_review);
      if (this.order.bKash_status) {
        formData.append('bKash_status', this.order.bKash_status);
      }

      if (this.images.length > 0) {

        this.images.forEach((image, index) => {
          formData.append(`images[${index}]`, image);
        });
      }


      /*
        for( let i = 0; i < this.designs.length; i++ ){
          let file = this.designs[i];
          formData.append('designs[' + i + '][image]', file);
        }*/

      axios.post(`${ADMIN_URL}/orders/update`, formData, config)
        .then(response => {
          //console.log('Success', response);
          console.log('Response:', response.data);
          currentObj.success = response.data.success;
          //console.log(response.data);
          if (response.data.success === true) {
            this.$swal('Order Details Updated', '', 'success');
            setTimeout(() => {
              location.reload();
            }, 1000);
          }
          else {
            this.$swal('Error', response.data.message, 'error');
            setTimeout(() => {
              location.reload();
            }, 1000);
          }

        })
        .catch(error => {
          // console.log('Error  ... ', error.response);
          currentObj.output = error;
          // console.log(error);
        });



    },

    addNewitem() {
      axios.post(`${ADMIN_URL}/orders/add-transaction`, {
        'items': this.services,
        'order_id': this.order_id
      })
        .then(response => {
          console.log('Success', response);
          this.$swal('New Line Item(s) Added', '', 'success');
          setTimeout(() => {
            location.reload();
          }, 1000);

        })
        .catch(error => {
          console.log('Error ', error.response);
          console.log(error);
          this.$swal('Error', 'Something went wrong', 'error');
        });

    },

    updateItem(item) {


      axios.post(`${ADMIN_URL}/orders/update-transaction`, item)
        .then(response => {
          console.log('Success', response);
          this.$swal('Line Item Updated', '', 'success');
          setTimeout(() => {
            location.reload();
          }, 1000);

        })
        .catch(error => {
          console.log('Error ', error.response);
          console.log(error);
        });
    },
    deleteItem(item) {

      axios.post(`${ADMIN_URL}/orders/delete-transaction`, {
        'item_id': item.id
      })
        .then(response => {
          console.log('Success', response);
          this.$swal('Line Item Deleted', '', 'success');
          setTimeout(() => {
            location.reload();
          }, 1000);

        })
        .catch(error => {
          console.log('Error ', error.response);
          console.log(error);
        });

    },
    deleteOrder() {
      // console.log('handle Delete  ..... ', parm);
      this.$swal({
        title: 'Are you sure?',
        text: 'You can\'t revert your action',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes Delete it!',
        cancelButtonText: 'No, Keep it!',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        if (result.value) {
          this.confirmDeleteOrder();
        } else {
          //this.$swal('Cancelled', 'Your file is still intact', 'info')
        }
      });
    },
    confirmDeleteOrder() {
      axios.delete(`${ADMIN_URL}/orders/delete/` + this.order_id)
        .then(response => {
          console.log('response ', response);

          if (response.data.code === 200) {
            this.$swal(response.data.heading, response.data.message, 'success');
            setTimeout(() => {
              window.location.href = '/orders';
            }, 1000);
          } else {
            this.$swal(response.data.heading, response.data.message, 'info');
          }

        }).catch(err => {
        if (err.response.status === 404) {
          this.$swal(err.response.data.heading, err.response.data.message, 'info');
        }

      })
    }

  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
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

.payment-box {
  padding: 5px;
  background: white;
  margin-left: 20px;
  margin-right: 20px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
}

.grid-item img {
  width: 100%;
  height: auto;
}

.img-thumbnail {
  max-width: 100%;
  max-height: 150px;
}

.sample-btns{

  margin-right: 2rem;
}

</style>
