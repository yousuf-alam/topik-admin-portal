<template>
  <div class="animated fadeIn">
    <div v-if="order_fetched_successfully">
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
            <li><h6><span class="font-weight-bold">  Payment Method : </span><span>{{order.payment_method}}</span>
            </h6></li>
            <li><h6><span class="font-weight-bold">  Total Bill : </span><span>{{order.total_bill}}</span></h6></li>
            <!--<li><h6><span class="font-weight-bold">  Commission Recieved : </span>
              <span class=" ml-2 badge badge-danger">no</span>
            </h6></li>-->
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
            <li><h6><span class="font-weight-bold">  Total Bill : </span>{{order.total_bill}} </h6></li>
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
        <b-card title="Order History">
          <b-row>
            <b-col
              md="3" sm="3" v-for="(history, key) in order.order_history"
               :key="key">
              <div v-if="history!==null">
                <b-card class="card-accent-danger font-weight-bold" v-bind:header="key">
                  <h5 class="card-title font-weight-bold">{{history}}</h5>
                  <p v-if="key==='Created at' || key==='Rejected at'">Partner Name:<span class=" ml-2 font-weight-bold">{{order.partner}}</span></p>
                  <p v-else>Assigned Resource:<span class=" ml-2 font-weight-bold">{{order.resource_name}}</span></p>
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
        order_id: '',

        order_fetched_successfully: false,
      }
    },
    created() {
      this.fetchOrder();
    },
    methods: {
      fetchOrder() {
        this.order_id = window.location.pathname.split("/").pop();
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
      }
    }
  }
</script>

<style scoped>

</style>
