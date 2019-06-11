<template>
    <b-card class="m-4 p-4">
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
          <tr v-for="order in services">
            <td>{{order.service_name}}</td>
            <td><span v-for="answer in order.answer ">{{answer.ans}}<br></span></td>
            <td>{{order.quantity}}</td>
            <td>{{order.price}}</td>
            <td><span class="cursor-pointer"  @click="deleteOrder(order)"> <i class="fa fa-trash text-danger"></i></span></td>
          </tr>
          </tbody>
        </table>
      </div>

    </b-card>
</template>

<script>
  import EventBus from '../../../utils/EventBus';
  import axios from 'axios';

  export default {
    name: "Cart",
    mounted(){
      EventBus.$on('service:add',this.order.bind(this));
    },
    data(){
      return {
        services:[]
      }
    },
    methods:{
      order(order){
        this.services.push(order);
        EventBus.$emit('cart:add',this.services);
      },
      deleteOrder(order)
      {
        this.services.splice(this.services.indexOf(order),1);
        EventBus.$emit('cart:add',this.services);
      }
    }
  }
</script>

<style scoped>

</style>
