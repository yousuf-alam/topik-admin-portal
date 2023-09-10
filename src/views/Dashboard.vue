<template>
  <div class="animated fadeIn">
    <div v-if="all_data_fetched_successfully">
      <h4><i class="fa fa-shopping-cart mr-2 mb-2"></i>ORDER STATUS</h4>
      <b-row class="smallCardContainer ">
        <b-col sm="12" md="6" xl="4">
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
        <b-col sm="12" md="6" xl="4">
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
        <b-col sm="12" md="6" xl="4">
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
<!--        <b-col sm="12" md="6" xl="2">-->
<!--          <div class="card smallCard">-->
<!--            <div class="smallCardBody">-->
<!--              <i class="fa fa-check bg-danger p-4 font-2xl "></i>-->
<!--              <div class=" p-2">-->
<!--                <div class="h5 text-danger  ">{{order.completed}}</div>-->
<!--                <div class="text-muted text-uppercase font-weight-bold font-xs">Completed</div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </b-col>-->
<!--        &lt;!&ndash;</b-row>-->
<!--        <b-row class="smallCardContainer ">&ndash;&gt;-->
<!--        <b-col sm="12" md="6" xl="2">-->
<!--          <div class="card smallCard">-->
<!--            <div class="smallCardBody">-->
<!--              <i class="fa fa-close bg-danger p-4 font-2xl "></i>-->
<!--              <div class=" p-2">-->
<!--                <div class="h5 text-danger  ">{{order.halted}}</div>-->
<!--                <div class="text-muted text-uppercase font-weight-bold font-xs">Rejected</div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </b-col>-->
<!--        <b-col sm="12" md="6" xl="2">-->
<!--          <div class="card smallCard">-->
<!--            <div class="smallCardBody">-->
<!--              <i class="fa fa-ban bg-danger p-4 font-2xl "></i>-->
<!--              <div class=" p-2">-->
<!--                <div class="h5 text-danger  ">{{order.cancelled}}</div>-->
<!--                <div class="text-muted text-uppercase font-weight-bold font-xs">Cancelled</div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </b-col>-->
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
              <i class="fa fa-shopping-cart mr-2"></i>&nbsp;
              <b>{{finance.today.order_no}}</b>
                  Orders Placed
              </li>
              <li>
              <i class="fa fa-user-circle mr-2"></i>&nbsp;
              <b>{{finance.today.customer}}</b>
                  Customers
              </li>
              <li>
              <i class="fa fa-check mr-2"></i>&nbsp;
              <b>{{finance.today.success}} %</b>
                  Success
              </li>
              <li>
              <i class="fa fa-unlock mr-2"></i>&nbsp;
              <b>{{finance.today.pending}}</b>
                  Orders Pending
              </li>
               <li>
               <i class="fa fa-ticket mr-2"></i>&nbsp;
              <b> ৳ {{finance.today.avg_ticket}}</b>
                  Ticket Average
              </li>
              <li>
               <i class="fa fa-users mr-2"></i>&nbsp;
              <b> {{finance.today.active_sp}}</b>
                  Active SP
              </li>

              <li>
              <i class="fa fa-money mr-2"></i>&nbsp;
              <b>৳ {{finance.today.revenue}} </b>
                  GMV
              </li>
                <li>
              <i class="fa fa-money mr-2"></i>&nbsp;
              <b>৳ {{finance.today.amount}} </b>
                  BDT
              </li>
                      <li>
                                 <svg style="height: 1.25rem;width: 1.25rem;color: red;margin-right: 5px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2 h-2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
</svg>
              <b>৳ {{finance.today.cancel_amount}} </b>
                  Cancel
              </li>


            </span>
            </b-card-text>
          </b-card>

          <b-card
            style="font-size: 16px; font-weight: bold"
            border-variant="none"
            header="LAST DAY"
            header-bg-variant="dark"
            header-text-variant="white"
            align="center"
            v-if="getUserPermission('customer service')"
          >
            <b-card-title class="h3 font-weight-bold mb-4">৳ {{ finance.last_day.revenue }}</b-card-title>
            <b-card-text class="center-div">
            <span class="text-justify" style="list-style: none;">
              <li>
              <i class="fa fa-shopping-cart mr-2"></i>&nbsp;
              <b>{{finance.last_day.order_no}}</b>
                  Orders Placed
              </li>
              <li>
              <i class="fa fa-user-circle mr-2"></i>&nbsp;
              <b>{{finance.last_day.customer}}</b>
                  Customers
              </li>
              <li>
              <i class="fa fa-check mr-2"></i>&nbsp;
              <b>{{finance.last_day.success}} %</b>
                  Success
              </li>
              <li>
              <i class="fa fa-unlock mr-2"></i>&nbsp;
              <b>{{finance.last_day.pending}}</b>
                  Orders Pending
              </li>
               <li>
               <i class="fa fa-ticket mr-2"></i>&nbsp;
              <b> ৳ {{finance.last_day.avg_ticket}}</b>
                  Ticket Average
              </li>
              <li>
               <i class="fa fa-users mr-2"></i>&nbsp;
              <b> {{finance.last_day.active_sp}}</b>
                  Active SP
              </li>

                 <li>
              <i class="fa fa-money mr-2"></i>&nbsp;
              <b>৳ {{finance.last_day.revenue}} </b>
                  GMV
              </li>
                 <li>
              <i class="fa fa-money mr-2"></i>&nbsp;
              <b>৳ {{finance.last_day.amount}} </b>
                  GMV
              </li>
                  <li>
                        <svg style="height: 1.25rem;width: 1.25rem;color: red;margin-right: 5px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2 h-2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
</svg>
              <b>৳ {{finance.last_day.cancel_amount}} </b>
                  Cancel
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
              <i class="fa fa-shopping-cart mr-2"></i>&nbsp;
              <b>{{finance.month.order_no}}</b>
                  Orders Placed
              </li>
              <li>
              <i class="fa fa-user-circle mr-2"></i>&nbsp;
              <b>{{finance.month.customer}}</b>
                  Customers
              </li>
              <li>
              <i class="fa fa-check mr-2"></i>&nbsp;
              <b>{{finance.month.success}} %</b>
                  Success
              </li>
              <li>
              <i class="fa fa-unlock mr-2"></i>&nbsp;
              <b>{{finance.month.pending}}</b>
                  Orders Pending
              </li>
               <li>
               <i class="fa fa-ticket mr-2"></i>&nbsp;
              <b> ৳ {{finance.month.avg_ticket}}</b>
                  Ticket Average
              </li>
              <li>
               <i class="fa fa-users mr-2"></i>&nbsp;
              <b> {{finance.month.active_sp}}</b>
                  Active SP
              </li>

                 <li>
              <i class="fa fa-money mr-2"></i>&nbsp;
              <b>৳ {{finance.month.revenue}} </b>
                  GMV
              </li>
                 <li>
              <i class="fa fa-money mr-2"></i>&nbsp;
              <b>৳ {{finance.month.amount}} </b>
                  BDT
              </li>
                   <li>
                 <svg style="height: 1.25rem;width: 1.25rem;color: red;margin-right: 5px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2 h-2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
</svg>
              <b>৳ {{finance.month.cancel_amount}} </b>
                  Cancel
              </li>


            </span>
            </b-card-text>
          </b-card>

          <b-card
            style="font-size: 16px; font-weight: bold"
            border-variant="none"
            header="LAST MONTH"
            header-bg-variant="dark"
            header-text-variant="white"
            align="center"
          >
            <b-card-title class="h3 font-weight-bold mb-4">৳ {{ finance.last_month.revenue }}</b-card-title>
            <b-card-text class="center-div">
            <span class="text-justify" style="list-style: none;">
              <li>
              <i class="fa fa-shopping-cart mr-2"></i>&nbsp;
              <b>{{finance.last_month.order_no}}</b>
                  Orders Placed
              </li>
              <li>
              <i class="fa fa-user-circle mr-2"></i>&nbsp;
              <b>{{finance.last_month.customer}}</b>
                  Customers
              </li>
              <li>
              <i class="fa fa-check mr-2"></i>&nbsp;
              <b>{{finance.last_month.success}} %</b>
                  Success
              </li>
              <li>
              <i class="fa fa-unlock mr-2"></i>&nbsp;
              <b>{{finance.last_month.pending}}</b>
                  Orders Pending
              </li>
               <li>
               <i class="fa fa-ticket mr-2"></i>&nbsp;
              <b> ৳ {{finance.last_month.avg_ticket}}</b>
                  Ticket Average
              </li>
              <li>
               <i class="fa fa-users mr-2"></i>&nbsp;
              <b> {{finance.last_month.active_sp}}</b>
                  Active SP
              </li>

                 <li>
              <i class="fa fa-money mr-2"></i>&nbsp;
              <b>৳ {{finance.last_month.revenue}} </b>
                  GMV
              </li>
                 <li>
              <i class="fa fa-money mr-2"></i>&nbsp;
              <b>৳ {{finance.last_month.amount}} </b>
                  BDT
              </li>
                    <li>
          <svg style="height: 1.25rem;width: 1.25rem;color: red;margin-right: 5px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2 h-2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
</svg>

              <b>৳ {{finance.last_month.cancel_amount}} </b>
                  Cancel
              </li>


            </span>
            </b-card-text>
          </b-card>

          <b-card
            style="font-size: 16px; font-weight: bold"
            border-variant="none"
            header="LIFETIME"
            header-bg-variant="dark"
            header-text-variant="white"
            align="center"
            v-if="! getUserPermission('customer service')"
          >
            <b-card-title class="h3 font-weight-bold mb-4">৳ {{ finance.lifetime.revenue }}</b-card-title>
            <b-card-text class="center-div">
            <span class="text-justify" style="list-style: none;">
              <li>
              <i class="fa fa-shopping-cart mr-2"></i>&nbsp;
              <b>{{finance.lifetime.order_no}}</b>
                  Orders Placed
              </li>
              <li>
              <i class="fa fa-user-circle mr-2"></i>&nbsp;
              <b>{{finance.lifetime.customer}}</b>
                  Customers
              </li>
              <li>
              <i class="fa fa-check mr-2"></i>&nbsp;
              <b>{{finance.lifetime.success}} %</b>
                  Success
              </li>
              <li>
              <i class="fa fa-unlock mr-2"></i>&nbsp;
              <b>{{finance.lifetime.pending}}</b>
                  Orders Pending
              </li>
               <li>
               <i class="fa fa-ticket mr-2"></i>&nbsp;
              <b> ৳ {{finance.lifetime.avg_ticket}}</b>
                  Ticket Average
              </li>
              <li>
               <i class="fa fa-users mr-2"></i>&nbsp;
              <b> {{finance.lifetime.active_sp}}</b>
                  Active SP
              </li>
              <li>
              <i class="fa fa-money mr-2"></i>&nbsp;
              <b>৳ {{finance.lifetime.revenue}} </b>
                  GMV
              </li>
                <li>
              <i class="fa fa-money mr-2"></i>&nbsp;
              <b>৳ {{finance.lifetime.amount}} </b>
                  BDT
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

            order: {
            "open": 0,
              "acknowledged": 0,
              "processed": 0,
              "completed": 0,
              "halted": 0,
              "cancelled": 0
          },
            finance: {
            "today": {
              "order_no": 0,
                "served_no": 0,
                "revenue": 0,
                "customer": 0
            },
            "week": {
              "order_no": 0,
                "served_no": 0,
                "revenue": 0,
                "customer": 0
            },
            "month": {
              "order_no": 0,
                "served_no": 0,
                "revenue": 0,
                "customer": 0
            },
            "year": {
              "order_no": 0,
                "served_no": 0,
                "revenue": 0,
                "customer": 0
            }
          },
                all_data_fetched_successfully: true,
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
