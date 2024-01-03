<template>
  <div class="animated fadeIn">
    <div>
    <h3>Order Details</h3>
    <router-link :to="{ name: 'OrderEdit', params: { id: order.order_id }}">
      <span class="btn btn-romoni-secondary mb-3">Edit Order</span>
    </router-link>
    <b-row>
      <b-col md="6" sm="6" class="mb-4">
        <b-card class="h-100">
          <h4>Order Info</h4>
          <ul style="list-style:none">
            <li><h6><span class="font-weight-bold">  Order ID : </span> {{order.order_id}}</h6></li>
            <li><h6><span class="font-weight-bold">  Platform : </span> {{order.platform}}</h6></li>
            <li><h6><span class="font-weight-bold">  Status : </span> <span
              class="ml-2 badge badge-warning">{{order.status}}</span>
            </h6></li>
            <li><h6><span class="font-weight-bold">  Assigned SP : </span> <span>{{order.partner}}</span></h6>
            </li>
            <li><h6><span class="font-weight-bold">  Assigned Resource : </span>
              <span class=" ml-2">{{order.resource_name}}</span></h6></li>

            <li><h6><span class="font-weight-bold">  Order Created At : </span><span
              class="ml-2">{{order.created_at}}</span>
            </h6></li>
            <li><h6><span class="font-weight-bold">  Scheduled Date : </span>
              <span>{{order.scheduled_date}}</span></h6></li>
            <li><h6><span class="font-weight-bold">  Scheduled Time : </span>
              <span> {{order.scheduled_time}}</span></h6></li>
<!--            <li><h6><span class="font-weight-bold">  Payment Method : </span><span>{{order.payment_method}}</span>-->
<!--            </h6></li>-->
            <li><h6><span class="font-weight-bold">  Total Bill : </span><span>{{order.total_bill}}</span></h6></li>
            <li><h6><span class="font-weight-bold">  Request From Customer : </span><span >{{order.request_from_customer}}</span></h6></li>
            <li><h6><span class="font-weight-bold">  Internal Notes : </span><span>{{order.internal_notes}}</span></h6></li>

          </ul>
        </b-card>
      </b-col>
      <b-col md="6" sm="6" class="mb-4">
        <b-card class="h-100">
          <h4 class="card-title">Customer Details</h4>

          <ul style="list-style: none;">
            <li><h6><span class="font-weight-bold">Delivery Name : </span> <span>{{order.shipping_name}} </span></h6></li>
            <li><h6><span class="font-weight-bold">  Delivery Address : </span>
              <span>{{order.shipping_address.address_details}}</span></h6></li>
            <li><h6><span class="font-weight-bold">  Delivery Location : </span>
              <span>{{order.location}}</span></h6></li>
            <li><h6><span class="font-weight-bold">  Delivery Contact : </span>
              <span>{{order.shipping_phone}}</span></h6></li>
            <li><h6><span class="font-weight-bold">  Payment Method : </span>
              <span>{{order.payment_method}}</span></h6></li>

            <li><h6><span class="font-weight-bold">  Is_BlackList : </span>
              <span :style="{ color: order.is_blacklisted === 1 ? 'red' : 'green' }">
                       {{ order.is_blacklisted === 1 ? "Yes" : "NO" }}
                 </span></h6></li>

            <li v-if="order.is_blacklisted===1"><h6><span class="font-weight-bold">  Black List Reason : </span>
              <span>{{order.blacklist_reason}}</span></h6></li>

          </ul>
          <br>

         <!-- <h4 class="card-title">Customer Review</h4>
          <ul style="list-style: none">
            <li><h6><span class="font-weight-bold"> Average Rating :	Nil </span></h6></li>
            <li><h6><span class="font-weight-bold"> Beautician Skill : Nil </span></h6></li>
            <li><h6><span class="font-weight-bold"> Product Quality : Nil </span></h6></li>
            <li><h6><span class="font-weight-bold"> Cleanliness : Nil </span></h6></li>
            <li><h6><span class="font-weight-bold"> Punctuality Skill : Nil </span></h6></li>
            <li><h6><span class="font-weight-bold">  Review : Nil </span></h6></li>
          </ul>-->
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6" sm="6">
        <b-card class="pb-4">
          <h4 class="card-title">Bill Details</h4>
          <ul style="list-style:none">
            <li><h6><span class="font-weight-bold"> Service Charge : </span> {{order.total_service_charge}}</h6></li>
            <li><h6><span class="font-weight-bold">  Discount : </span>{{order.total_discount}}</h6></li>
            <li><h6><span class="font-weight-bold">Advance Payment Discount : </span>{{order.discount_adv_pay}}</h6></li>
            <li><h6><span class="font-weight-bold">Promo Discount : </span>{{order.total_discount - order.discount_adv_pay}}</h6></li>
            <li><h6><span class="font-weight-bold">  Total Bill : </span>{{order.total_bill}} </h6></li>
            <li  :class="{ 'paid-show' : order.payment_status == 'Paid'} "><h6><span class="font-weight-bold" >  Payment Status : </span>{{order.payment_status}} </h6></li>


            <b-form-group label="Payment Link">
              <div class="payment-box d-flex " v-if="order.payment_status ==='Pending' && (order.payment_method==='bKash' || order.payment_method==='ssl')">
                <button @click="copyText" class="copy-icon" style="border: none;background: white">
                  <i class="fa fa-copy"></i>
                </button>
                <p class="content ml-2 " v-if="order.payment_method==='ssl'">Thank you for ordering ({{order.crypt_order_id}}) from Romoni. To avail a 5% discount on your advance payment, kindly pay through this link: https://romoni.com.bd/sslcommerz/order/{{order.crypt_order_id}}</p>
                <p class="content ml-2" v-if="order.payment_method==='bKash'">Thank you for ordering ({{order.crypt_order_id}}) from Romoni. To avail a 5% discount on your advance payment, kindly pay through this link: https://romoni.com.bd/bkash/order/{{order.crypt_order_id}}</p>
              </div>
            </b-form-group>
          </ul>
        </b-card>
      </b-col>
      <b-col md="6" sm="6">
        <b-card>
          <h4 class="card-title m-2">Service List</h4>
          <table class="table table-striped table-bordered">
            <thead>
            <tr>
              <th></th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, idx) in order.items" :key="idx">
              <td><span class="font-weight-bold">{{item.name}}</span><br>
              <span v-for="(answer, index) in JSON.parse(item.questions)" :key="index">
                * {{answer.ans}}<br>
              </span></td>
              <td>{{item.quantity}}</td>
              <td>{{item.price}}</td>
            </tr>
            </tbody>
          </table>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card title="Order History" class="scrollable">
          <b-row>
            <b-col
              md="3" sm="3" v-for="(history, key) in order.order_history"
               :key="key">
              <div v-if="history!==null">
                <b-card class="card-accent-danger font-weight-bold" v-bind:header="key">
                  <h5 class="card-title font-weight-bold">{{history}}</h5>

                  <p v-if="key==='Cancelled at'">
                    <span>Partner Name:</span><span class=" ml-2 font-weight-bold">{{order.partner}}</span><br>
                    <span>Partner Phone:</span><span class=" ml-2 font-weight-bold">{{order.partner_phone}}</span><br>
                    <span>Cancellation Reason:</span><span class="ml-2">{{order.cancel_reason}}</span>
                  </p>
                  <p v-else-if="key==='Created at' || key==='Rejected at'">
                    <span>Partner Name:</span><span class=" ml-2 font-weight-bold">{{order.partner}}</span><br>
                    <span>Partner Phone:</span><span class=" ml-2 font-weight-bold">{{order.partner_phone}}</span>
                  </p>
                  <p v-else>
                  <span>Assigned Resource:</span><span class=" ml-2 font-weight-bold">{{order.resource_name}}</span><br>
                  <span>Resource Phone:</span><span class=" ml-2 font-weight-bold">{{order.resource_phone}}</span>
                  </p>
                </b-card>
              </div>

            </b-col>
            <!--
                <b-col md="3" sm="3">
                <b-card class="card-accent-warning" header="Order Accepted">
                  <h5 class="card-title font-weight-bold">March 20, 2019,10:14 PM</h5>
                  <p>Resource Name:<span class=" ml-2 font-weight-bold">My test_resources</span></p>
                </b-card>
              </b-col>
              <b-col md="3" sm="3">
                <b-card class="card-accent-info" header="Order Started">
                  <h5 class="card-title font-weight-bold">March 20, 2019,10:14 PM</h5>
                  <p>Resource Name:<span class=" ml-2 font-weight-bold">My test_resources</span></p>
                </b-card>
              </b-col>
              <b-col md="3" sm="3">
                <b-card class="card-accent-success" header="Order Completed">
                  <h5 class="card-title font-weight-bold">March 20, 2019,10:14 PM</h5>
                  <p>Cash Collected: <span class=" ml-2 font-weight-bold">BDT 800</span></p>
                </b-card>
              </b-col>
            -->
          </b-row>
        </b-card>
      </b-col>
    </b-row>

      <b-row>
        <b-col>
          <b-card title="Previous Orders">
            <b-row>
              <b-col
                md="6" sm="6" v-for="(previous_order, key) in order.previous_orders"
                :key="key">
                <div v-if="previous_order!==null">
                  <a class="previous-order" href="#" v-if="getUserPermission('order update')" @click.prevent="orderDetails('OrderShow', previous_order.order_id)">
                    <b-card class="card-accent-danger font-weight-bold" v-bind:header="previous_order.order_id">
<!--                      <h5 class="card-title font-weight-bold">{{previous_order.created_at}}</h5>-->
                      <p class="previous-order-text">
                        <span>Created At:</span><span class=" ml-2 font-weight-bold">{{previous_order.created_at}}</span> <br>
                        <span>Partner Name:</span><span class=" ml-2 font-weight-bold">{{previous_order.partner}}</span><br>
                        <span>Partner Phone:</span><span class=" ml-2 font-weight-bold">{{previous_order.partner_phone}}</span><br>

                        <span>Assigned Resource:</span><span class=" ml-2 font-weight-bold">{{previous_order.resource_name}}</span><br>
                        <span>Resource Phone:</span><span class=" ml-2 font-weight-bold">{{previous_order.resource_phone}}</span>
                      </p>
                    </b-card>
                  </a>

                </div>

              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>

      <b-row v-if="getUserPermission('admin')">
        <b-col>
          <b-card title="Order Log History">
            <table class="table table-striped table-bordered" style="display: block;overflow-x: auto;">
              <thead>
              <tr>
                <th>Description</th>
                <th>Old Data</th>
                <th>New Data</th>
                <th>User</th>
                <th>Updated At</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, idx) in order.order_log" :key="idx">
<!--                <td><span class="font-weight-bold">{{item.name}}</span><br>-->
<!--                  <span v-for="(answer, index) in JSON.parse(item.questions)" :key="index">-->
<!--                * {{answer.ans}}<br>-->
<!--              </span></td>-->
                <td>{{item.description}}</td>
                <td>{{item.old}}</td>
                <td>{{item.new}}</td>
                <td>{{item.causer_id}}</td>
                <td>{{item.updated_at}}</td>
              </tr>
              </tbody>
            </table>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
  export default {
    name: "OrderShow",
    data() {
      return {
        order: [],
        // order_id: window.location.pathname.split("/").pop() || '',
        order_id: this.$route.params.id || '',


        order_fetched_successfully: false,
      }
    },
    created() {
      this.fetchOrder();
    },
    methods: {
      copyText() {
        // Get the text content of the div
        const textToCopy = this.$el.querySelector('.content').textContent;

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
      fetchOrder() {
        // this.order_id = window.location.pathname.split("/").pop();
        axios.get(`${ADMIN_URL}/orders/show`, {
          params: {
            order_id: this.order_id
          }
        }).then(response => {
          this.order = response.data;
          this.order.shipping_address = JSON.parse(this.order.shipping_address);
          this.order_fetched_successfully = true;
          // console.log('this.order ---------> ', this.order);
        }).catch(e => {
          // console.log("error occurs",e);
        });
      },
      orderDetails(route, order_id) {

        this.$router.push({name: route, params: {id: order_id}});
        window.location.reload();
      },
    }
  }
</script>

<style scoped lang="scss">
.previous-order {
    text-decoration: none;
    font-size: 20px;
     &:hover {
       text-decoration: none;
     }
  .previous-order-text {
    font-size: 14px;
    color: black;
  }
  }

.paid-show{
  color: #4dbd74;
}


</style>
