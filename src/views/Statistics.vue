<template>
  <div>

    <div class="pt-3">
      <h4><i class="fa fa-user mr-2 mb-2"></i>User Statistics (Top Expended User)</h4>
      <p>name-order-price</p>
      <b-card-group deck>
        <b-card style="font-size: 16px; font-weight: bold" border-variant="none" header="THIS MONTH"
          header-bg-variant="dark" header-text-variant="white" align="center">
          <b-card-title class="h3 font-weight-bold mb-4"></b-card-title>
          <b-card-text class="center-div">
            <span class="text-justify" style="list-style: none;">
              <li v-for="(item, index) in userThisMonth">
                <i class="fa fa-user-circle mr-2"></i>&nbsp;
                <b></b>
                {{ item.name }} - {{ item.total_orders }} - {{ formatPrice(item.total_price) }}
                <hr>
              </li>






            </span>
          </b-card-text>
        </b-card>
        <b-card style="font-size: 16px; font-weight: bold" border-variant="none" header="LAST MONTH"
          header-bg-variant="dark" header-text-variant="white" align="center">
          <b-card-title class="h3 font-weight-bold mb-4"></b-card-title>
          <b-card-text class="center-div">
            <span class="text-justify" style="list-style: none;">
              <li v-for="(item, index) in userLastMonth">
                <i class="fa fa-user-circle mr-2"></i>&nbsp;
                <b></b>
                {{ item.name }} - {{ item.total_orders }} - {{ formatPrice(item.total_price) }}
                <hr>
              </li>





            </span>
          </b-card-text>
        </b-card>
        <b-card style="font-size: 16px; font-weight: bold" border-variant="none" header="THIS QUARTER"
          header-bg-variant="dark" header-text-variant="white" align="center">
          <b-card-title class="h3 font-weight-bold mb-4"></b-card-title>
          <b-card-text class="center-div">
            <span class="text-justify" style="list-style: none;">
              <li v-for="(item, index) in userThisQuarter">
                <i class="fa fa-user-circle mr-2"></i>&nbsp;
                <b></b>
                {{ item.name }} - {{ item.total_orders }} - {{ formatPrice(item.total_price) }}
                <hr>
              </li>





            </span>
          </b-card-text>
        </b-card>
        <b-card style="font-size: 16px; font-weight: bold" border-variant="none" header="LAST QUARTER"
          header-bg-variant="dark" header-text-variant="white" align="center">
          <b-card-title class="h3 font-weight-bold mb-4"></b-card-title>
          <b-card-text class="center-div">
            <span class="text-justify" style="list-style: none;">
              <li v-for="(item, index) in userLastQuarter">
                <i class="fa fa-user-circle mr-2"></i>&nbsp;
                <b></b>
                {{ item.name }} - {{ item.total_orders }} - {{ formatPrice(item.total_price) }}

                <hr>
              </li>





            </span>
          </b-card-text>
        </b-card>




      </b-card-group>
    </div>
    <div class="pt-3">
      <h4><i class="fa fa-user mr-2 mb-2"></i>Partner Statistics (Top Performer)</h4>
      <b-card-group deck>
        <b-card style="font-size: 16px; font-weight: bold" border-variant="none" header="THIS MONTH"
          header-bg-variant="dark" header-text-variant="white" align="center">
          <b-card-title class="h3 font-weight-bold mb-4"></b-card-title>
          <b-card-text class="center-div">
            <span class="text-justify" style="list-style: none;">
              <li v-for="(item, index) in highPartnerThisMonth">

                <b></b>
                <p style="color: #4dbd74">Name:{{ item.name }}</p>
                <p>Total Leave:{{ item.total_leaves }}</p>
                <p>Total Order:{{ item.total_orders }}</p>
                <p>Cancel Order:{{ item.total_cancelled_orders }}</p>
                <p>Order Value:{{ formatPrice(item.total_price) }}</p>
                <hr>
              </li>






            </span>
          </b-card-text>
        </b-card>
        <b-card style="font-size: 16px; font-weight: bold" border-variant="none" header="LAST MONTH"
          header-bg-variant="dark" header-text-variant="white" align="center">
          <b-card-title class="h3 font-weight-bold mb-4"></b-card-title>
          <b-card-text class="center-div">
            <span class="text-justify" style="list-style: none;">
              <li v-for="(item, index) in highPartnerLastMonth">

                <b></b>
                <p style="color: #4dbd74">Name:{{ item.name }}</p>
                <p>Total Leave:{{ item.total_leaves }}</p>
                <p>Total Order:{{ item.total_orders }}</p>
                <p>Cancel Order:{{ item.total_cancelled_orders }}</p>
                <p>Order Value:{{ formatPrice(item.total_price) }}</p>
                <hr>
              </li>





            </span>
          </b-card-text>
        </b-card>
        <b-card style="font-size: 16px; font-weight: bold" border-variant="none" header="THIS QUARTER"
          header-bg-variant="dark" header-text-variant="white" align="center">
          <b-card-title class="h3 font-weight-bold mb-4"></b-card-title>
          <b-card-text class="center-div">
            <span class="text-justify" style="list-style: none;">
              <li v-for="(item, index) in highPartnerThisQuarter">

                <b></b>
                <p style="color: #4dbd74">Name:{{ item.name }}</p>
                <p>Total Leave:{{ item.total_leaves }}</p>
                <p>Total Order:{{ item.total_orders }}</p>
                <p>Cancel Order:{{ item.total_cancelled_orders }}</p>
                <p>Order Value:{{ formatPrice(item.total_price) }}</p>
                <hr>
              </li>





            </span>
          </b-card-text>
        </b-card>
        <b-card style="font-size: 16px; font-weight: bold" border-variant="none" header="LAST QUARTER"
          header-bg-variant="dark" header-text-variant="white" align="center">
          <b-card-title class="h3 font-weight-bold mb-4"></b-card-title>
          <b-card-text class="center-div">
            <span class="text-justify" style="list-style: none;">
              <li v-for="(item, index) in highPartnerLastQuarter">

                <b></b>
                <p style="color: #4dbd74">Name:{{ item.name }}</p>
                <p>Total Leave:{{ item.total_leaves }}</p>
                <p>Total Order:{{ item.total_orders }}</p>
                <p>Cancel Order:{{ item.total_cancelled_orders }}</p>
                <p>Order Value:{{ formatPrice(item.total_price) }}</p>
                <hr>
              </li>





            </span>
          </b-card-text>
        </b-card>
      </b-card-group>
    </div>
    <div class="pt-3">
      <h4><i class="fa fa-user mr-2 mb-2"></i>Partner Statistics (Low Performer)</h4>
      <b-card-group deck>
        <b-card style="font-size: 16px; font-weight: bold" border-variant="none" header="THIS MONTH"
          header-bg-variant="dark" header-text-variant="white" align="center">
          <b-card-title class="h3 font-weight-bold mb-4"></b-card-title>
          <b-card-text class="center-div">
            <span class="text-justify" style="list-style: none;">
              <li v-for="(item, index) in lowPartnerThisMonth">

                <b></b>
                <p style="color: red">Name:{{ item.name }}</p>
                <p>Total Leave:{{ item.total_leaves }}</p>
                <p>Total Order:{{ item.total_orders }}</p>
                <p>Cancel Order:{{ item.total_cancelled_orders }}</p>
                <p>Order Value:{{ formatPrice(item.total_price) }}</p>
                <hr>
              </li>






            </span>
          </b-card-text>
        </b-card>
        <b-card style="font-size: 16px; font-weight: bold" border-variant="none" header="LAST MONTH"
          header-bg-variant="dark" header-text-variant="white" align="center">
          <b-card-title class="h3 font-weight-bold mb-4"></b-card-title>
          <b-card-text class="center-div">
            <span class="text-justify" style="list-style: none;">
              <li v-for="(item, index) in lowPartnerLastMonth">

                <b></b>
                <p style="color: red">Name:{{ item.name }}</p>
                <p>Total Leave:{{ item.total_leaves }}</p>
                <p>Total Order:{{ item.total_orders }}</p>
                <p>Cancel Order:{{ item.total_cancelled_orders }}</p>
                <p>Order Value:{{ formatPrice(item.total_price) }}</p>
                <hr>
              </li>





            </span>
          </b-card-text>
        </b-card>
        <b-card style="font-size: 16px; font-weight: bold" border-variant="none" header="THIS QUARTER"
          header-bg-variant="dark" header-text-variant="white" align="center">
          <b-card-title class="h3 font-weight-bold mb-4"></b-card-title>
          <b-card-text class="center-div">
            <span class="text-justify" style="list-style: none;">
              <li v-for="(item, index) in lowPartnerThisQuarter">

                <b></b>
                <p style="color: red">Name:{{ item.name }}</p>
                <p>Total Leave:{{ item.total_leaves }}</p>
                <p>Total Order:{{ item.total_orders }}</p>
                <p>Cancel Order:{{ item.total_cancelled_orders }}</p>
                <p>Order Value:{{ formatPrice(item.total_price) }}</p>
                <hr>
              </li>





            </span>
          </b-card-text>
        </b-card>
        <b-card style="font-size: 16px; font-weight: bold" border-variant="none" header="LAST QUARTER"
          header-bg-variant="dark" header-text-variant="white" align="center">
          <b-card-title class="h3 font-weight-bold mb-4"></b-card-title>
          <b-card-text class="center-div">
            <span class="text-justify" style="list-style: none;">
              <li v-for="(item, index) in lowPartnerLastQuarter">

                <b></b>
                <p style="color: red">Name:{{ item.name }}</p>
                <p>Total Leave:{{ item.total_leaves }}</p>
                <p>Total Order:{{ item.total_orders }}</p>
                <p>Cancel Order:{{ item.total_cancelled_orders }}</p>
                <p>Order Value:{{ formatPrice(item.total_price) }}</p>
                <hr>
              </li>





            </span>
          </b-card-text>
        </b-card>
      </b-card-group>
    </div>

    <div class="pt-3">
      <h4><i class="fa fa-user mr-2 mb-2"></i>Line Item Statistics</h4>
      <b-card-group deck>
        <b-card style="font-size: 16px; font-weight: bold" border-variant="none" header="First Quarter"
          header-bg-variant="dark" header-text-variant="white" align="center">


          <b-card-title class="h3 font-weight-bold mb-4"></b-card-title>
          <b-card-text class="center-div">
            <span class="text-justify" style="list-style: none;">
              <li v-for="(item, index) in lineItemQ1">
                <p>Name:{{ item.name }}</p>
                <p>Price:{{ formatPrice(item.total_price) }}</p>
                <hr>
              </li>



            </span>
          </b-card-text>
        </b-card>
        <b-card style="font-size: 16px; font-weight: bold" border-variant="none" header="Second Quarter"
          header-bg-variant="dark" header-text-variant="white" align="center">
          <b-card-title class="h3 font-weight-bold mb-4"></b-card-title>
          <b-card-text class="center-div">
            <span class="text-justify" style="list-style: none;">

              <li v-for="(item, index) in lineItemQ2">
                <p>Name:{{ item.name }}</p>
                <p>Price:{{ formatPrice(item.total_price) }}</p>
                <hr>
              </li>

            </span>
          </b-card-text>
        </b-card>
        <b-card style="font-size: 16px; font-weight: bold" border-variant="none" header="Third Quarter"
          header-bg-variant="dark" header-text-variant="white" align="center">
          <b-card-title class="h3 font-weight-bold mb-4"></b-card-title>
          <b-card-text class="center-div">

            <span class="text-justify" style="list-style: none;">
              <li v-for="(item, index) in lineItemQ3">

                <p>Name:{{ item.name }}</p>
                <p>Price:{{ formatPrice(item.total_price) }}</p>
                <hr>
              </li>

            </span>
          </b-card-text>
        </b-card>
        <b-card style="font-size: 16px; font-weight: bold" border-variant="none" header="Fourth Quarter"
          header-bg-variant="dark" header-text-variant="white" align="center">
          <b-card-title class="h3 font-weight-bold mb-4"></b-card-title>
          <b-card-text class="center-div">
            <span class="text-justify" style="list-style: none;">

              <li v-for="(item, index) in lineItemQ4">

                <p>Name:{{ item.name }}</p>
                <p>Price:{{ formatPrice(item.total_price) }}</p>
                <hr>
              </li>

            </span>
          </b-card-text>
        </b-card>

      </b-card-group>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
export default {

  name: 'dashboard',
  data() {
    return {

      userStat: [],
      userThisMonth: [],
      userLastMonth: [],
      userThisQuarter: [],
      userLastQuarter: [],
      lineItemQ1: [],
      lineItemQ2: [],
      lineItemQ3: [],
      lineItemQ4: [],
      highPartnerThisMonth: [],
      highPartnerLastMonth: [],
      highPartnerThisQuarter: [],
      highPartnerLastQuarter: [],
      lowPartnerThisMonth: [],
      lowPartnerLastMonth: [],
      lowPartnerThisQuarter: [],
      lowPartnerLastQuarter: [],
      lineItemStat: [],
      highPerformerPartner: [],
      lowPerformerPartner: [],
      all_data_fetched_successfully: true,
    }
  },
  created() {
    this.fetchData();

  },
  methods: {
    fetchData() {
      axios.get(`${ADMIN_URL}/statistics`)
        .then(response => {
          // console.log('rsponse',response.data.userStat);
          this.userStat = response.data.userStat;
          this.lineItemStat = response.data.linItemStat;
          this.highPerformerPartner = response.data.highPerformerPartner;
          this.lowPerformerPartner = response.data.lowPerformerPartner;
          this.userThisMonth = this.userStat.this_month
          this.userLastMonth = this.userStat.last_month
          this.userThisQuarter = this.userStat.this_quarter
          this.userLastQuarter = this.userStat.previous_quarter
          this.lineItemQ1 = this.lineItemStat.Q1
          this.lineItemQ2 = this.lineItemStat.Q2
          this.lineItemQ3 = this.lineItemStat.Q3
          this.lineItemQ4 = this.lineItemStat.Q4
          this.highPartnerThisMonth = this.highPerformerPartner.this_month
          this.highPartnerLastMonth = this.highPerformerPartner.last_month
          this.highPartnerThisQuarter = this.highPerformerPartner.this_quarter
          this.highPartnerLastQuarter = this.highPerformerPartner.previous_quarter
          this.lowPartnerThisMonth = this.lowPerformerPartner.this_month
          this.lowPartnerLastMonth = this.lowPerformerPartner.last_month
          this.lowPartnerThisQuarter = this.lowPerformerPartner.this_quarter
          this.lowPartnerLastQuarter = this.lowPerformerPartner.previous_quarter
          // console.log("hello line item",this.lineItemStat);
          this.all_data_fetched_successfully = true;
          // console.log('finance ======  =========>> ', response.data.finance);
        })
        .catch(e => {
          //console.log("error occurs");
        });
    },

    formatPrice(price) {
      const formattedPrice = parseFloat(price);
      return parseFloat(formattedPrice).toLocaleString();
    }
    //   const number = parseFloat(price);
    // if (isNaN(number)) return "0"; // Handle invalid input

    // const formattedPrice = number.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');

    // return formattedPrice;
  }
}
</script>



<style scoped>
li {
  font-size: 14px;
}
</style>
