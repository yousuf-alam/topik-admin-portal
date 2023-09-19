<template>
  <div class="animated fadeIn">
    <Loader :loader="activeLoader"/>
    <div>
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
<!--          <b-card-->
<!--            style="font-size: 16px; font-weight: bold"-->
<!--            border-variant="none"-->
<!--            header="TODAY"-->
<!--            header-bg-variant="dark"-->
<!--            header-text-variant="white"-->
<!--            align="center"-->
<!--            v-for="(item, sectionName) in finance" :key="sectionName"-->
<!--          >-->
<!--            <b-card-title class="h3 font-weight-bold mb-4">৳ {{ item.revenue }}</b-card-title>-->
<!--            <b-card-text class="center-div">-->
<!--            <span class="text-justify" style="list-style: none;">-->
<!--              <li>-->
<!--              <i class="fa fa-shopping-cart mr-2"></i>&nbsp;-->
<!--              <b>{{item.order_no}}</b>-->
<!--                  Orders Placed-->
<!--              </li>-->
<!--              <li>-->
<!--              <i class="fa fa-user-circle mr-2"></i>&nbsp;-->
<!--              <b>{{item.customer}}</b>-->
<!--                  Customers-->
<!--              </li>-->
<!--              <li>-->
<!--              <i class="fa fa-check mr-2"></i>&nbsp;-->
<!--              <b>{{item.success}} %</b>-->
<!--                  Success-->
<!--              </li>-->
<!--              <li>-->
<!--              <i class="fa fa-unlock mr-2"></i>&nbsp;-->
<!--              <b>{{item.pending}}</b>-->
<!--                  Orders Pending-->
<!--              </li>-->
<!--               <li>-->
<!--               <i class="fa fa-ticket mr-2"></i>&nbsp;-->
<!--              <b> ৳ {{item.avg_ticket}}</b>-->
<!--                  Ticket Average-->
<!--              </li>-->
<!--              <li>-->
<!--               <i class="fa fa-users mr-2"></i>&nbsp;-->
<!--              <b> {{item.active_sp}}</b>-->
<!--                  Active SP-->
<!--              </li>-->

<!--              <li>-->
<!--              <i class="fa fa-money mr-2"></i>&nbsp;-->
<!--              <b>৳ {{item.revenue}} </b>-->
<!--                  GMV-->
<!--              </li>-->
<!--                <li>-->
<!--              <i class="fa fa-money mr-2"></i>&nbsp;-->
<!--              <b>৳ {{item.amount}} </b>-->
<!--                  BDT-->
<!--              </li>-->
<!--                      <li>-->
<!--                                 <svg style="height: 1.25rem;width: 1.25rem;color: red;margin-right: 5px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2 h-2">-->
<!--  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />-->
<!--</svg>-->
<!--              <b>৳ {{item.cancel_amount}} </b>-->
<!--                  Cancel-->
<!--              </li>-->


<!--            </span>-->
<!--            </b-card-text>-->
<!--          </b-card>-->

          <div class="card" border-variant="none" align="center" v-for="(item, sectionName) in finance" :key="sectionName">
            <div class="card-header">
              {{sectionName}}
<!--              <div class="sub-header">Janu</div>-->
            </div>
            <div class="text-justify">
              <card-text class="card-body">
                              <h3 class="sub-header">৳ {{ item.revenue }}</h3>

                <template>
                   <span class="text-justify  text-left" style="list-style: none;">
              <li>
              <i class="fa fa-shopping-cart mr-2"></i>&nbsp;
              <b>{{item.order_no}}</b>
                  Orders Placed
              </li>
              <li>
              <i class="fa fa-user-circle mr-2"></i>&nbsp;
              <b>{{item.customer}}</b>
                  Customers
              </li>
              <li>
              <i class="fa fa-check mr-2"></i>&nbsp;
              <b>{{item.success}} %</b>
                  Success
              </li>
              <li>
              <i class="fa fa-unlock mr-2"></i>&nbsp;
              <b>{{item.pending}}</b>
                  Orders Pending
              </li>
               <li>
               <i class="fa fa-ticket mr-2"></i>&nbsp;
              <b> ৳ {{item.avg_ticket}}</b>
                  Ticket Avg
              </li>
              <li>
               <i class="fa fa-users mr-2"></i>&nbsp;
              <b> {{item.active_sp}}</b>
                  Active SP
              </li>

              <li>
              <i class="fa fa-money mr-2"></i>&nbsp;
              <b>৳ {{item.revenue}} </b>
                  GMV
              </li>
                <li>
              <i class="fa fa-money mr-2"></i>&nbsp;
              <b>৳ {{item.amount}} </b>
                  BDT
              </li>
                      <li>
                                 <svg style="height: 1.15rem;width: 1.15rem;color: red;margin-right: 15px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2 h-2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
</svg>
              <b>৳ {{item.cancel_amount}} </b>
                  Cancel
              </li>


            </span>
                </template>
              </card-text>
            </div>
          </div>





        </b-card-group>
      </div>
    </div>
<!--    <div v-else>-->
<!--      Loading...-->
<!--    </div>-->

  </div>
</template>

<script>
    import axios from 'axios';
    import Loader from "@/views/Loader.vue";
    const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
    export default {

        name: 'dashboard',
      components: {Loader},
        data() {
            return {
              activeLoader: false,

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
          console.log("created at calling");
            this.fetchData();


        },
        methods: {
            fetchData() {
              this.activeLoader = true;
                axios.get(`${ADMIN_URL}/dashboard`)
                    .then(response => {
                      console.log("response is coming");
                      this.activeLoader = false;
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
li {
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 1rem;
}



.item-name {
  display: flex;
  align-items: center;
  /* Vertically center items */
}


.card {
  font-size: 16px;
  font-weight: bold;
}
.card-header {
  background-color: #2f353a;
  color: white;
}
.sub-header {
  font-weight: 700;
  text-align: center;
}
.text-justify {
  list-style: none;
  padding: 0 1rem;
  flex-grow: 1;
}
.card-body {
  display: block;
  height: 100%;
}
.no-data-container {
  text-align: center;
  height: 100%;
  display: grid;
  place-content: center;
}
.no-data-image {
  width: 50%;
  height: auto;
}
</style>
