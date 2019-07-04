<template>
  <div class="animated fadeIn">
    <h4><i class="fa fa-shopping-cart mr-2 mb-4"></i>ORDER STATUS</h4>
    <b-row class="mb-5">
      <b-col cols="12" sm="6" lg="2">
        <b-card :no-body="true">
          <b-card-body class="p-0 clearfix">
            <i class="fa fa-unlock bg-danger p-4 font-2xl mr-3 float-left"></i>
            <div class="h4 text-danger mb-0 pt-3">{{order.open}}</div>
            <div class="text-muted text-uppercase font-weight-bold font-md">Pending</div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="12" sm="6" lg="2">
        <b-card :no-body="true">
          <b-card-body class="p-0 clearfix">
            <i class="fa fa-laptop  bg-danger p-4 font-2xl mr-3 float-left"></i>
            <div class="h4 text-danger mb-0 pt-3">{{order.acknowledged}}</div>
            <div class="text-muted text-uppercase font-weight-bold font-md">Accepted</div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="12" sm="6" lg="2">
        <b-card :no-body="true">
          <b-card-body class="p-0 clearfix">
            <i class="fa fa-spinner  bg-danger p-4 font-2xl mr-3 float-left text-white"></i>
            <div class="h4 text-danger mb-0 pt-3">{{order.processed}}</div>
            <div class="text-muted text-uppercase font-weight-bold font-md">Processing</div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="12" sm="6" lg="2">
        <b-card :no-body="true">
          <b-card-body class="p-0 clearfix">
            <i class="fa fa-check bg-danger p-4 font-2xl mr-3 float-left text-white"></i>
            <div class="h4 text-danger mb-0 pt-3">{{order.completed}}</div>
            <div class="text-muted text-uppercase font-weight-bold font-md">Completed</div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="12" sm="6" lg="2">
        <b-card :no-body="true">
          <b-card-body class="p-0 clearfix">
            <i class="fa fa-close  bg-danger p-4 font-2xl mr-3 float-left text-white"></i>
            <div class="h4 text-danger mb-0 pt-3">{{order.halted}}</div>
            <div class="text-muted text-uppercase font-weight-bold font-md">Rejected</div>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col cols="12" sm="6" lg="2">
      <b-card :no-body="true">
        <b-card-body class="p-0 clearfix">
          <i class="fa fa-ban  bg-danger p-4 font-2xl mr-3 float-left"></i>
          <div class="h4 text-danger mb-0 pt-3">{{order.cancelled}}</div>
          <div class="text-muted text-uppercase font-weight-bold font-md">Cancelled</div>
        </b-card-body>
      </b-card>
      </b-col>
    </b-row>


    <div class="pt-5">
      <h4><i class="fa fa-money mr-2 mb-4"></i>SALES STATISTICS</h4>
      <b-card-group deck >
        <b-card
          style="font-size: 16px; font-weight: bold"
          border-variant="none"
          header="TODAY"
          header-bg-variant="dark"
          header-text-variant="white"
          align="center"
        >
          <b-card-title class="h3 mb-4">৳ {{ finance.today.revenue }}</b-card-title>
          <b-card-text class="center-div">
            <span class="text-justify" style="list-style: none;">
              <li>
              <i class="fa fa-book mr-2"></i>&nbsp;
              <b>{{finance.today.order_no}}</b>
                  Orders Placed
              </li>
              <li>
              <i class="fa fa-check mr-2"></i>&nbsp;
              <b>{{finance.today.served_no}}</b>
                  Orders Served
              </li>
              <li>
              <i class="fa fa-money mr-2"></i>&nbsp;
              <b>{{finance.today.revenue}} </b>
                  BDT Revenue
              </li>
              <li>
              <i class="fa fa-user-circle mr-2"></i>&nbsp;
              <b>{{finance.today.customer}}</b>
                  Customers
              </li>
            </span>
          </b-card-text>
        </b-card>

        <b-card
          style="font-size: 16px; font-weight: bold"
          border-variant="none"
          header="THIS WEEK"
          header-bg-variant="dark"
          header-text-variant="white"
          align="center"
        >
          <b-card-title class="h3 mb-4">৳ {{ finance.week.revenue }}</b-card-title>
          <b-card-text class="center-div">
            <span class="text-justify" style="list-style: none;">
              <li>
              <i class="fa fa-book mr-2"></i>&nbsp;
              <b>{{finance.week.order_no}}</b>
                  Orders Placed
              </li>
              <li>
              <i class="fa fa-check mr-2"></i>&nbsp;
              <b>{{finance.week.served_no}}</b>
                  Orders Served
              </li>
              <li>
              <i class="fa fa-money mr-2"></i>&nbsp;
              <b>{{finance.week.revenue}} </b>
                  BDT Revenue
              </li>
              <li>
              <i class="fa fa-user-circle mr-2"></i>&nbsp;
              <b>{{finance.week.customer}}</b>
                  Customers
              </li>
            </span>
          </b-card-text>
        </b-card>

        <b-card
          style="font-size: 16px; font-weight: bold"
          border-variant="none"
          header="THIS MONTH"
          header-bg-variant="dark"
          header-text-variant="white"
          align="center"
        >
          <b-card-title class="h3 mb-4">৳ {{ finance.month.revenue }}</b-card-title>
          <b-card-text class="center-div">
            <span class="text-justify" style="list-style: none;">
              <li>
              <i class="fa fa-book mr-2"></i>&nbsp;
              <b>{{finance.month.order_no}}</b>
                  Orders Placed
              </li>
              <li>
              <i class="fa fa-check mr-2"></i>&nbsp;
              <b>{{finance.month.served_no}}</b>
                  Orders Served
              </li>
              <li>
              <i class="fa fa-money mr-2"></i>&nbsp;
              <b>{{finance.month.revenue}} </b>
                  BDT Revenue
              </li>
              <li>
              <i class="fa fa-user-circle mr-2"></i>&nbsp;
              <b>{{finance.month.customer}}</b>
                  Customers
              </li>
            </span>
          </b-card-text>
        </b-card>

        <b-card
          style="font-size: 16px; font-weight: bold"
          border-variant="none"
          header="THIS YEAR"
          header-bg-variant="dark"
          header-text-variant="white"
          align="center"
        >
          <b-card-title class="h3 mb-4">৳ {{ finance.year.revenue }}</b-card-title>
          <b-card-text class="center-div">
            <span class="text-justify" style="list-style: none;">
              <li>
              <i class="fa fa-book mr-2"></i>&nbsp;
              <b>{{finance.year.order_no}}</b>
                  Orders Placed
              </li>
              <li>
              <i class="fa fa-check mr-2"></i>&nbsp;
              <b>{{finance.year.served_no}}</b>
                  Orders Served
              </li>
              <li>
              <i class="fa fa-money mr-2"></i>&nbsp;
              <b>{{finance.year.revenue}} </b>
                  BDT Revenue
              </li>
              <li>
              <i class="fa fa-user-circle mr-2"></i>&nbsp;
              <b>{{finance.year.customer}}</b>
                  Customers
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
      order : [],
      finance: []
      }
    },
  created(){
    this.fetchData();

  },
  methods: {
    fetchData() {
      axios.get(`${ADMIN_URL}/dashboard`)
        .then(response => {
          this.order = response.data.order;
          this.finance = response.data.finance;
          console.log('open',this.order.open);
        })
        .catch(e => {
          //console.log("error occurs");
        });
    }
  }
}
</script>

<style scoped>
  /* IE fix */
  #card-chart-01, #card-chart-02 {
    width: 100% !important;
  }
  li {
    margin-bottom: 1rem;
  }
</style>
