<template>
  <div class="animated fadeIn font-weight-bold">
    <div>
      <div class="cardheading">
        <div></div>
        <button @click="deleteOrder" class="btn btn-danger float-right"><i class="fa fa-trash"></i> Delete This Appointment</button>
      </div>
    <b-row>
      <b-col class="mb-5" sm="6" md="6">
        <b-card class="h-100 p-4 m-4">
          <h5 class="mb-4">SP & Schedule Details</h5>
          <b-form-group>
            <label >Order ID : {{order.id}}</label>
          </b-form-group>
          <b-form-group>
            <label >Service : Beauty Appointment</label>
          </b-form-group>
          <b-form-group>
            <label>Assigned SP: &nbsp</label><label class="text-danger"> {{order.partner.name}}</label>
          </b-form-group>
        <b-form-group label="Status">
          <select class="form-control" v-model="order.status">
            <option value="pending">pending</option>
            <option value="accepted">accepted</option>
            <option value="started">started</option>
            <option value="completed">completed</option>
            <option value="rejected">rejected</option>
            <option value="cancelled">cancelled</option>
          </select>
        </b-form-group>
          <!--<b-form-group label="Assigned SP">
            <multiselect
              v-model="order.partner"
              :options="partners"
              placeholder="Select one"
              label="name"
              track-by="id"
            >
            </multiselect>
          </b-form-group>-->
          <div v-show="order.service_id===2">
            <label>Select Delivery Type</label>
            <b-form-group class="ml-4">
              <input type="radio" v-model="date_type"  value="regular" id="regular_delivery">
              <label for="regular_delivery" class="mx-1">Regular Delivery</label><br>
              <input type="radio" v-model="date_type"  value="custom" id="custom_delivery">
              <label for="custom_delivery" class="mx-1">Emergency Delivery</label>
            </b-form-group>
          </div>

          <b-form-group label="Scheduled Date">
            <datepicker input-class="date-input" @input="changeDateFormat()" v-model="order.scheduled_date" ></datepicker>
          </b-form-group>
          <b-form-group label="Scheduled Time">
            <select class="form-control" v-model="order.scheduled_time">
              <option v-for="time in time_slots" :value="time.slot">{{time.slot}}</option>
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
          <b-row>
            <b-col>
              <b-form-group label="Payment Method">
                <b-form-radio v-model="order.payment_method" value="cash">Cash On Delivery</b-form-radio>
                <b-form-radio v-model="order.payment_method" value="bkash">Bkash</b-form-radio>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Bkash Received?" v-show="order.payment_method==='bkash' && order.status==='completed'">
                <b-form-radio v-model="order.bkash_status" value="received">Received</b-form-radio>
                <b-form-radio v-model="order.bkash_status" value="not_received">Not Received</b-form-radio>
              </b-form-group>
            </b-col>
          </b-row>
          <button class="btn btn-dark mt-3" @click="updateOrder"> Update</button>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
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
          <b-form-group v-show="order.coupon_id!==null" label="Applied Promo">
            <span class="text-success">{{order.coupon_code}}</span>
          </b-form-group>
          <h5 class="mb-4">Rating Details</h5>
          <b-form-group>
            <button class="btn btn-sm btn-warning m-1" v-if="!order.review" @click="new_review_bool=true">+ Add Review</button>
            <button class="btn btn-sm btn-danger" v-if="new_review_bool===true" @click="new_review_bool=false">Cancel</button>
          </b-form-group>
          <div v-if="order.review">
            <b-form-group label="Rating">
              <select class="form-control" v-model="order.review.rating">
                <option value="1">1 Star</option>
                <option value="2">2 Star</option>
                <option value="3">3 Star</option>
                <option value="4">4 Star</option>
                <option value="5">5 Star</option>
              </select>
            </b-form-group>
            <b-form-group label="Review">
              <input type="text" class="form-control" v-model="order.review.comment">
            </b-form-group>
          </div>
          <div v-if="new_review_bool===true">
            <b-form-group label="Rating">
              <select class="form-control" v-model="new_rating">
                <option value="1">1 Star</option>
                <option value="2">2 Star</option>
                <option value="3">3 Star</option>
                <option value="4">4 Star</option>
                <option value="5">5 Star</option>
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
                <td>{{item.name}}</td>
                <td>
                  <span
                    v-for="(answer, index) in item.options"
                    :key="index">
                    {{answer.ans}} <br>
                  </span>
                </td>
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
     <b-row>
      <b-col sm="6" md="6">
        <service :selected_partner="order.partner"></service>
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

    </div>

    <!--<div v-else class="customcard">
      Loading...
    </div>-->

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
  import Datepicker from 'vuejs-datepicker';

  const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;

  export default {
    name: "AppointmentEdit",
    components: {
      Datepicker,
      Customer,
      Location,
      Schedule,
      Service,
      Cart,
      Partner,
      OrderSummary,
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
        time_slots : [],
        new_review_bool: false,
        new_rating: '',
        new_review: '',
        flag_shipping_address_details: '',
        order_fetched_successfully: false

      };
    },
    created() {
      this.fetchOrder();
      this.getPartners();
      this.getLocation();
      this.getTimeSlots();
    },
    computed: {
      getType() {
        if (this.order.service_id === 1) {
          this.type = "Beauty On-Demand";
        }
        else if (this.order.service_id === 2) {
          this.type = "Tailor On-Demand";
        }
        else {
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
      fetchOrder() {
        this.order_id = window.location.pathname.split("/").pop();
        axios.get(`${ADMIN_URL}/appointment`, {
          params: {
            order_id: this.order_id
          }
        }).then(response => {
          // console.log('fetch Order ======= ', response.data);
          this.order = response.data;
          this.order.shipping_address = JSON.parse(this.order.shipping_address);
          this.flag_shipping_address_details = this.order.shipping_address.address_details;
          this.order_fetched_successfully = true;

        }).catch(e => {
          console.log("error occurs",e);
        });
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
      getTimeSlots() {
          axios.get(`${ADMIN_URL}/appointment/time-slots`)
              .then(response => {
                  this.time_slots = response.data.slots;

              })
              .catch(e => {
                  console.log("error occurs",e);
              });
      },

      updateOrder(e) {

        //this.changeDateFormat();

        e.preventDefault();
        let currentObj = this;
        const config = {
          headers: {'content-type': 'multipart/form-data'}
        };

        if (this.order.shipping_address.address_details !== this.flag_shipping_address_details) {
          this.order.shipping_address.latitude = "";
          this.order.shipping_address.longitude = "";
        }



        //return;

        let formData = new FormData();
        formData.append('id', this.order.id);
        formData.append('status', this.order.status);
        formData.append('partner_id', this.order.partner.id);
        formData.append('location_id', this.order.location_id);
        formData.append('scheduled_time', this.order.scheduled_time);
        formData.append('scheduled_date', this.order.scheduled_date);
        formData.append('shipping_name', this.order.shipping_name);
        formData.append('shipping_address',  JSON.stringify(this.order.shipping_address));
        formData.append('shipping_phone', this.order.shipping_phone);
        formData.append('total_service_charge', this.order.total_service_charge);
        formData.append('total_discount', this.order.total_discount);
        formData.append('total_bill', this.order.total_bill);
        formData.append('payment_method', this.order.payment_method);
        formData.append('review', JSON.stringify(this.order.review));
        formData.append('new_rating', this.new_rating);
        formData.append('new_review', this.new_review);
          if(this.order.bkash_status)
          {
              formData.append('bkash_status', this.order.bkash_status);
          }

      /*
        for( let i = 0; i < this.designs.length; i++ ){
          let file = this.designs[i];
          formData.append('designs[' + i + '][image]', file);
        }*/

        axios.post(`${ADMIN_URL}/orders/update`, formData, config)
          .then(response => {
            //console.log('Success', response);
            currentObj.success = response.data.success;
            //console.log(response.data);
            if(response.data.success === true)
            {
                this.$swal('Order Details Updated', '', 'success');
                setTimeout(()=>{
                    location.reload();
                },1000);
            }

          })
          .catch(error => {
            // console.log('Error  ... ', error.response);
            currentObj.output = error;
            // console.log(error);
          });



      },

      addNewitem()
      {
        axios.post(`${ADMIN_URL}/appointments/add-transaction`, {
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
              setTimeout(()=>{
                  location.reload();
              },1000);

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
                if(result.value) {
                    this.confirmDeleteOrder();
                } else {
                    //this.$swal('Cancelled', 'Your file is still intact', 'info')
                }
            });
        },
        confirmDeleteOrder() {
            axios.delete(`${ADMIN_URL}/orders/delete/`+this.order_id)
                .then(response => {
                    console.log('response ', response);

                    if(response.data.code===200)
                    {
                        this.$swal(response.data.heading, response.data.message, 'success');
                        setTimeout(()=>{
                            window.location.href='/orders';
                        },1000);
                    }
                    else
                    {
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
</style>
