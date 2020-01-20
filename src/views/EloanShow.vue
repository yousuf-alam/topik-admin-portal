<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6" sm="6" class="mb-4">
        <b-card class="h-100">
          <h4>Loan Info</h4>
          <ul style="list-style:none">
            <li><h6><span class="font-weight-bold">  Loan ID : </span> {{loan.id}}</h6></li>
            <li><h6><span class="font-weight-bold">  Loanee : </span> {{loan.name}}</h6></li>
            <li><h6><span class="font-weight-bold">  Status : </span> <span
              class="ml-2 badge badge-warning">{{loan.status}}</span>
            </h6></li>
            <li><h6><span class="font-weight-bold">  Area : </span> <span>{{loan.area}}</span></h6>
            </li>
            <li><h6><span class="font-weight-bold">  Business Name : </span>
              <span class=" ml-2">{{loan.business_name}}</span></h6></li>

            <li><h6><span class="font-weight-bold"> Business Type : </span><span
              class="ml-2">{{loan.business_type}}</span>
            </h6></li>
            <li><h6><span class="font-weight-bold">  Amount : </span>
              <span>{{loan.amount}}</span></h6></li>
            <li><h6><span class="font-weight-bold">  Interest : </span>
              <span> {{loan.interest}}</span></h6></li>
            <li><h6><span class="font-weight-bold">  Re-Payment : </span><span>{{loan.repayment}}</span>
            </h6></li>
            <li><h6><span class="font-weight-bold">  Monthly Installment : </span><span>{{loan.monthly_installment}}</span></h6></li>
            <li><h6><span class="font-weight-bold">  Income Range : </span><span>{{loan.min_income}} - {{loan.max_income}}</span></h6></li>
            <!--<li><h6><span class="font-weight-bold">  Commission Recieved : </span>
              <span class=" ml-2 badge badge-danger">no</span>
            </h6></li>-->
          </ul>
        </b-card>
      </b-col>
      <b-col md="6" sm="6" class="mb-4">
        <b-card class="h-100">
          <h4>Loanee Identity</h4>
          <ul style="list-style:none">
            <li><h6><span class="font-weight-bold">  Loanee Photo : </span><br>
              <span
              class="ml-2"> <img :src="loan.guarantor_photo" style="width: 150px;height: 150px;"></span>
            </h6></li>
            <li><h6><span class="font-weight-bold">  Loanee NID : &emsp;</span><br><span
              class="ml-2"> <img :src="loan.guarantor_nid" style="width: 150px;height: 150px;"></span>
            </h6></li>
          </ul>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6" sm="6" class="mb-4">
        <b-card class="h-100">
          <h4>Guarantor Info</h4>
          <ul style="list-style:none">
            <li><h6><span class="font-weight-bold">  Relation with Guarantor: </span>
              <span class=" ml-2">{{loan.guarantor_relation}}</span></h6></li>

            <li><h6><span class="font-weight-bold">  Guarantor Phone : </span><span
              class="ml-2">{{loan.guarantor_phone}}</span>
            </h6></li>
            <li><h6><span class="font-weight-bold">  Guarantor Photo : </span><br><span
              class="ml-2"> <img :src="loan.guarantor_photo" style="width: 150px;height: 150px;"></span>
            </h6></li>
            <li><h6><span class="font-weight-bold">  Guarantor NID :  &emsp;</span><br><span
              class="ml-2"> <img :src="loan.guarantor_nid" style="width: 150px;height: 150px;"></span>
            </h6></li>
           <!-- <li><h6><span class="font-weight-bold">  Guarantor Agreement : </span><span
              class="ml-2"> <img :src="loan.guarantor_agreement" style="width: 150px;height: 150px;"></span>
            </h6></li>-->
          </ul>
        </b-card>
      </b-col>
      <b-col md="6" sm="6" class="mb-4">
        <b-card class="h-100">
          <h4>Shop Info</h4>
          <ul style="list-style:none">
            <li><h6><span class="font-weight-bold">  Address Image : </span><br>
              <span class=" ml-2"><img :src="loan.address_image" style="width: 150px;height: 150px;"></span></h6></li>

            <li><h6><span class="font-weight-bold">  Shop Image : </span><br><span
              class="ml-2"><img :src="loan.shop_image" style="width: 150px;height: 150px;"></span>
            </h6></li>
            <li><h6><span class="font-weight-bold">  Guarantor Photo : </span><br><span
              class="ml-2"> <img :src="loan.market_image" style="width: 150px;height: 150px;"></span>
            </h6></li>
            <!-- <li><h6><span class="font-weight-bold">  Guarantor Agreement : </span><span
               class="ml-2"> <img :src="loan.guarantor_agreement" style="width: 150px;height: 150px;"></span>
             </h6></li>-->
          </ul>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>


<script>
  import axios from 'axios';
  const PARTNER_URL = process.env.VUE_APP_PARTNER_URL;
  const BASE_URL  = process.env.VUE_APP_BASE_URL;
  export default {
    name: 'Eloan',
    data() {
      return {
        loan : {},
        eloan_id: '',
        src_image : BASE_URL+'/images/eloan/',

      }
    },
    created(){

      this.eloan_id = window.location.pathname.split("/").pop();
      axios.post(`${PARTNER_URL}/eloan/data`,{
        step : 'all',
        id: this.eloan_id
      })
        .then(response =>{
          this.loan = response.data;
        })
        .catch(e=>{
          //console.log("error occurs");
        });
    },
    methods: {

    },
  }
</script>
