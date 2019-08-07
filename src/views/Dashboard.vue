<template>
  <div class="animated fadeIn">
    <div v-if="all_data_fetched_successfully">
      <h4><i class="fa fa-shopping-cart mr-2 mb-2"></i>ORDER STATUS</h4>
      <b-row class="smallCardContainer ">
      <b-col sm="12" md="6" xl="2">
        <div class="card smallCard" >
          <div class="smallCardBody">
            <i class="fa fa-unlock bg-danger p-4 font-2xl "></i>
            <div class=" p-2">
              <div class="h5 text-danger  ">{{order.open}}</div>
              <div class="text-muted text-uppercase font-weight-bold font-xs">Pending</div>
            </div>
          </div>
        </div>
      </b-col>
        <b-col sm="12" md="6" xl="2">
        <div class="card smallCard">
          <div class="smallCardBody">
            <i class="fa fa-laptop bg-danger p-4 font-2xl "></i>
            <div class=" p-2">
              <div class="h5 text-danger  ">{{order.acknowledged}}</div>
              <div class="text-muted text-uppercase font-weight-bold font-xs">Accepted</div>
            </div>
          </div>
        </div>
      </b-col>
     <!-- </b-row>

      <b-row class="smallCardContainer ">-->
        <b-col sm="12" md="6" xl="2">
          <div class="card smallCard">
            <div class="smallCardBody">
              <i class="fa fa-spinner bg-danger p-4 font-2xl "></i>
              <div class=" p-2">
                <div class="h5 text-danger  ">{{order.processed}}</div>
                <div class="text-muted text-uppercase font-weight-bold font-xs">Processing</div>
              </div>
            </div>
          </div>
        </b-col>
        <b-col sm="12" md="6" xl="2">
        <div class="card smallCard">
          <div class="smallCardBody">
            <i class="fa fa-check bg-danger p-4 font-2xl "></i>
            <div class=" p-2">
              <div class="h5 text-danger  ">{{order.completed}}</div>
              <div class="text-muted text-uppercase font-weight-bold font-xs">Completed</div>
            </div>
          </div>
        </div>
        </b-col>
      <!--</b-row>
      <b-row class="smallCardContainer ">-->
        <b-col sm="12" md="6" xl="2">
        <div class="card smallCard">
          <div class="smallCardBody">
            <i class="fa fa-close bg-danger p-4 font-2xl "></i>
            <div class=" p-2">
              <div class="h5 text-danger  ">{{order.halted}}</div>
              <div class="text-muted text-uppercase font-weight-bold font-xs">Rejected</div>
            </div>
          </div>
        </div>
        </b-col>
        <b-col sm="12" md="6" xl="2">
        <div class="card smallCard">
          <div class="smallCardBody">
            <i class="fa fa-ban bg-danger p-4 font-2xl "></i>
            <div class=" p-2">
              <div class="h5 text-danger  ">{{order.cancelled}}</div>
              <div class="text-muted text-uppercase font-weight-bold font-xs">Cancelled</div>
            </div>
          </div>
        </div>
        </b-col>
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
            <b-card-title class="h3 font-weight-bold mb-4">৳ 13550</b-card-title>
            <b-card-text class="center-div">
            <span class="text-justify" style="list-style: none;">
              <li>
              <i class="fa fa-book mr-2"></i>&nbsp;
              <b>11</b>
                  Orders Placed
              </li>
              <li>
              <i class="fa fa-check mr-2"></i>&nbsp;
              <b>8</b>
                  Orders Served
              </li>
              <li>
              <i class="fa fa-money mr-2"></i>&nbsp;
              <b>13550 </b>
                  BDT Revenue
              </li>
              <li>
              <i class="fa fa-user-circle mr-2"></i>&nbsp;
              <b>6</b>
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
            <b-card-title class="h3 font-weight-bold mb-4">৳ 115650</b-card-title>
            <b-card-text class="center-div">
            <span class="text-justify" style="list-style: none;">
              <li>
              <i class="fa fa-book mr-2"></i>&nbsp;
              <b>108</b>
                  Orders Placed
              </li>
              <li>
              <i class="fa fa-check mr-2"></i>&nbsp;
              <b>105</b>
                  Orders Served
              </li>
              <li>
              <i class="fa fa-money mr-2"></i>&nbsp;
              <b>115650 </b>
                  BDT Revenue
              </li>
              <li>
              <i class="fa fa-user-circle mr-2"></i>&nbsp;
              <b>101</b>
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
            <b-card-title class="h3 font-weight-bold mb-4">৳ 2086550</b-card-title>
            <b-card-text class="center-div">
            <span class="text-justify" style="list-style: none;">
              <li>
              <i class="fa fa-book mr-2"></i>&nbsp;
              <b>220</b>
                  Orders Placed
              </li>
              <li>
              <i class="fa fa-check mr-2"></i>&nbsp;
              <b>217</b>
                  Orders Served
              </li>
              <li>
              <i class="fa fa-money mr-2"></i>&nbsp;
              <b>2086550 </b>
                  BDT Revenue
              </li>
              <li>
              <i class="fa fa-user-circle mr-2"></i>&nbsp;
              <b>189</b>
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
            <b-card-title class="h3 font-weight-bold mb-4">৳ 2086550</b-card-title>
            <b-card-text class="center-div">
            <span class="text-justify" style="list-style: none;">
              <li>
              <i class="fa fa-book mr-2"></i>&nbsp;
              <b>4248</b>
                  Orders Placed
              </li>
              <li>
              <i class="fa fa-check mr-2"></i>&nbsp;
              <b>4211</b>
                  Orders Served
              </li>
              <li>
              <i class="fa fa-money mr-2"></i>&nbsp;
              <b>2086550 </b>
                  BDT Revenue
              </li>
              <li>
              <i class="fa fa-user-circle mr-2"></i>&nbsp;
              <b>2879</b>
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
              /*'today' => 13550,
                  'week'  => 115650,
                  'month' => 2086550,
                  'year'  => 5352500*/
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
    width: 100%;
    margin-right: 20px;
    display: inline-table;
  }
  .smallCardBody {
    display: flex;
    justify-content: align-left
  }
  .smallCardContainer {
    display: flex;
    justify-content: space-between;
  }


/*  @media  (max-width: 800px)  {
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
  }*/
</style>
