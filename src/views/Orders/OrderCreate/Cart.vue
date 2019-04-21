<template>
    <b-card class="m-4">
    <table  class="table table-striped">
        <thead>
        <tr>
            <th>Service Name</th>
            <th>Option Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>

        </tr>
        </thead>
        <tbody>
        <tr v-for="order in services">
            <td>{{order.service_name}}</td>
            <td><span v-for="answer in order.answer ">{{answer.ans}}</span></td>
            <td>{{order.quantity}}</td>
            <td>{{order.price}}</td>
            <td><span @click="deleteOrder(order)"> <i class="fa fa-trash"></i></span></td>
        </tr>
        </tbody>
    </table>
    </b-card>
</template>

<script>
    export default {
        name: "Cart"
    }
</script>

<style scoped>

</style>