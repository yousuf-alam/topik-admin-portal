<template>
  <div class="animated fadeIn">
    <div v-if="all_data_fetched_successfully">
      <h4><i class="fa fa-shopping-cart mr-2 mb-2"></i>ORDER STATUS</h4>
      <b-row class="smallCardContainer ml-1 mr-1">

        <div class="card smallCard" >
          <div class="smallCardBody">
            <i class="fa fa-unlock bg-danger p-4 font-2xl "></i>
            <div class=" p-2">
              <div class="h5 text-danger  ">{{order.open}}</div>
              <div class="text-muted text-uppercase font-weight-bold font-xs">Pending</div>
            </div>
          </div>
        </div>

        <div class="card smallCard">
          <div class="smallCardBody">
            <i class="fa fa-laptop bg-danger p-4 font-2xl "></i>
            <div class=" p-2">
              <div class="h5 text-danger  ">{{order.acknowledged}}</div>
              <div class="text-muted text-uppercase font-weight-bold font-xs">Accepted</div>
            </div>
          </div>
        </div>

        <div class="card smallCard">
          <div class="smallCardBody">
            <i class="fa fa-spinner bg-danger p-4 font-2xl "></i>
            <div class=" p-2">
              <div class="h5 text-danger  ">{{order.processed}}</div>
              <div class="text-muted text-uppercase font-weight-bold font-xs">Processing</div>
            </div>
          </div>
        </div>
      </b-row>

      <b-row class="smallCardContainer ml-1 mr-1">
        <div class="card smallCard">
          <div class="smallCardBody">
            <i class="fa fa-check bg-danger p-4 font-2xl "></i>
            <div class=" p-2">
              <div class="h5 text-danger  ">{{order.completed}}</div>
              <div class="text-muted text-uppercase font-weight-bold font-xs">Completed</div>
            </div>
          </div>
        </div>

        <div class="card smallCard">
          <div class="smallCardBody">
            <i class="fa fa-close bg-danger p-4 font-2xl "></i>
            <div class=" p-2">
              <div class="h5 text-danger  ">{{order.halted}}</div>
              <div class="text-muted text-uppercase font-weight-bold font-xs">Rejected</div>
            </div>
          </div>
        </div>

        <div class="card smallCard">
          <div class="smallCardBody">
            <i class="fa fa-ban bg-danger p-4 font-2xl "></i>
            <div class=" p-2">
              <div class="h5 text-danger  ">{{order.cancelled}}</div>
              <div class="text-muted text-uppercase font-weight-bold font-xs">Cancelled</div>
            </div>
          </div>
        </div>
      </b-row>

      <div class="pt-3">
        <h4><i class="fa fa-money mr-2 mb-2"></i>SALES STATISTICS</h4>
        <b-card-group deck >
          <b-card
            style="font-size: 16px; font-weight: bold"
            border-variant="none"
            header="TODAY"
            header-bg-variant="dark"
            header-text-variant="white"
            align="center"
          >
            <b-card-title class="h3 font-weight-bold mb-4">৳ {{ finance.today.revenue }}</b-card-title>
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
            <b-card-title class="h3 font-weight-bold mb-4">৳ {{ finance.week.revenue }}</b-card-title>
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
            <b-card-title class="h3 font-weight-bold mb-4">৳ {{ finance.month.revenue }}</b-card-title>
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
            <b-card-title class="h3 font-weight-bold mb-4">৳ {{ finance.year.revenue }}</b-card-title>
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
    <div v-else>
      Loading...
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
        finance: [],
        all_data_fetched_successfully: false,
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
            this.all_data_fetched_successfully = true;
            // console.log('finance ======  =========>> ', response.data.finance);
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
    font-weight: normal;
  }

  .smallCard {
    width: 300px;
    margin-right: 20px;
  }
  .smallCardBody {
    display: flex;
    justify-content: align-left
  }
  .smallCardContainer {
    display: flex;
    justify-content: space-between;
  }


  @media  (max-width: 800px)  {
    .smallCard {
      width: 200px;
    }
  }
  @media  (min-width: 500px) and (max-width: 600px) {
    .smallCardContainer {
      display: flex;
      justify-content: space-around;
    }
    .smallCard {
      width: 170px;
      border: 2px solid yellow;
    }
  }
  @media  (max-width: 499px) {
    .smallCard {
      width: 300px;
    }
  }
  @media  (min-width: 801px) and (max-width: 1024px) {
    .smallCard {
      width: 220px;
    }
  }
  @media  (min-width: 1441px) {
    .smallCard {
      width: 430px;
    }
  }
</style>
