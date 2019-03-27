<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col sm="6" md="6">
                <b-card>
                    <h4>Order Info</h4>
                    <ul style="list-style:none">
                        <li><h6> <span class="font-weight-bold">  Order ID : </span> 16</h6> </li>
                        <li><h6> <span class="font-weight-bold">  Platform: </span> android</h6> </li>
                        <li><h6> <span class="font-weight-bold">  Status :</span>  <span class="ml-2 badge badge-warning">completed</span></h6> </li>
                        <li><h6> <span class="font-weight-bold">  Assigned SP :</span> <span>test_partner</span></h6> </li>
                        <li><h6> <span class="font-weight-bold">  Assigned Resource :</span>
                            <span class=" ml-2">My test_resources</span></h6> </li>

                        <li><h6> <span class="font-weight-bold">  Order Created At :</span><span class="ml-2">2018-11-14 19:50:00</span> </h6> </li>
                        <li><h6> <span class="font-weight-bold">  Scheduled Date : </span>
                            <span> 2018-11-15</span></h6> </li>
                        <li><h6> <span class="font-weight-bold">  Scheduled Time : </span>
                            <span> 08:00AM - 10:00AM</span></h6> </li>
                        <li><h6> <span class="font-weight-bold">  Payment Method : </span><span>cash_on_delivery</span></h6> </li>
                        <li><h6> <span class="font-weight-bold">  Total Bill : </span><span>1000.00</span></h6> </li>
                        <li><h6> <span class="font-weight-bold">  Commission Recieved : </span>
                            <span class=" ml-2 badge badge-danger">no</span>
                        </h6></li>
                    </ul>
                </b-card>
            </b-col>
            <b-col sm="6" md="6">
                <b-card>
                    <h4 class="card-title">Customer Details</h4>

                    <ul style="list-style: none;">
                        <li><h6><span class="font-weight-bold">Delivery Name :</span> <span>Joy Tushar </span>	</h6> </li>
                        <li><h6> <span class="font-weight-bold">  Delivery Address : </span>
                            <span> g, Pallabi, Dhaka</span></h6> </li>
                        <li><h6> <span class="font-weight-bold">  Delivery Location : </span>
                            <span> Pallabi</span></h6> </li>
                        <li><h6> <span class="font-weight-bold">  Delivery Contact : </span>
                            <span> 01955909501</span></h6> </li>

                    </ul><br>

                    <h4 class="card-title">Customer Review</h4>
                    <ul style="list-style: none">
                        <li><h6><span class="font-weight-bold"> Average Rating :	Nil </span></h6></li>
                        <li><h6> <span class="font-weight-bold"> Beautician Skill : Nil </span></h6> </li>
                        <li><h6> <span class="font-weight-bold"> Product Quality : Nil </span></h6> </li>
                        <li><h6> <span class="font-weight-bold"> Cleanliness : Nil </span></h6> </li>
                        <li><h6> <span class="font-weight-bold"> Punctuality Skill : Nil </span></h6> </li>
                        <li><h6> <span class="font-weight-bold">  Review : Nil </span></h6> </li>
                    </ul>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col sm="6" md="6">
                <b-card class="pb-4">
                    <h4 class="card-title">Bill Details</h4>
                    <ul style="list-style:none">
                        <li><h6> <span class="font-weight-bold"> Service Charge : </span> 1000.00</h6> </li>
                        <li><h6> <span class="font-weight-bold">  Discount : </span>0.00 </h6> </li>
                        <li><h6> <span class="font-weight-bold">  Total Bill : </span>1000.00 </h6> </li>
                    </ul>
                </b-card>
            </b-col>
            <b-col sm="6" md="6">
                <b-card>
                <h4 class="card-title m-2">Service List</h4>
                <table  class="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><span class="font-weight-bold">Nail cut, file and polish- hands and feet</span><br>
                        </td>
                        <td>2</td>
                        <td>1000.00</td>
                    </tr>
                    </tbody>
                </table>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
        name: "OrderShow"
    }
</script>

<style scoped>

</style>