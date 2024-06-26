<template>
  <div>
    <Loader :loader="activeLoader"/>

    <div class="pt-3">
      <h4><i class="fa fa-user mr-2 mb-2"></i>User Statistics (Top  User)</h4>
      <p>Name-Order-Price</p>
      <b-card-group deck>


         <div class="card" border-variant="none" align="center">
          <div class="card-header">
            THIS MONTH
              <div class="sub-header">{{ this_month }}</div>
          </div>
          <div class="text-justify">
              <card-text class="card-body">
                  <template v-if="userThisMonth.length === 0">
                      <div class="no-data-container">
                          <i><img :src="imagePath" alt="no data" class="no-data-image" /></i>
                          <p>No data found</p>
                      </div>
                  </template>
                  <template v-else>
                    <li v-for="(item, index) in userThisMonth">
                      <div class="item-name">
                        <i class="fa fa-user-circle mr-2"></i>&nbsp;
                        <b></b>
                        {{ item.name }} - {{ item.total_orders }} - {{ formatPrice(item.total_price) }}
                      </div>
                      <hr>
                    </li>
                  </template>
              </card-text>
          </div>
        </div>




        <div class="card" border-variant="none" align="center">
          <div class="card-header">
            LAST MONTH
              <div class="sub-header">{{ last_month }}</div>
          </div>
          <div class="text-justify">
              <card-text class="card-body">
                  <template v-if="userLastMonth.length === 0">
                      <div class="no-data-container">
                          <i><img :src="imagePath" alt="no data" class="no-data-image" /></i>
                          <p>No data found</p>
                      </div>
                  </template>
                  <template v-else>
                    <li v-for="(item, index) in userLastMonth">
                      <div class="item-name">
                        <i class="fa fa-user-circle mr-2"></i>&nbsp;
                        <b></b>
                        {{ item.name }} - {{ item.total_orders }} - {{ formatPrice(item.total_price) }}
                      </div>
                      <hr>
                    </li>
                  </template>
              </card-text>
          </div>
        </div>








        <div class="card" border-variant="none" align="center">
          <div class="card-header">
            THIS QUARTER
              <div class="sub-header">{{ currentQuarterName }}</div>
          </div>
          <div class="text-justify">
              <card-text class="card-body">
                  <template v-if="userThisQuarter.length === 0">
                      <div class="no-data-container">
                          <i><img :src="imagePath" alt="no data" class="no-data-image" /></i>
                          <p>No data found</p>
                      </div>
                  </template>
                  <template v-else>
                    <li v-for="(item, index) in userThisQuarter">
                      <div class="item-name">
                        <i class="fa fa-user-circle mr-2"></i>&nbsp;
                        <b></b>
                        {{ item.name }} - {{ item.total_orders }} - {{ formatPrice(item.total_price) }}
                      </div>
                      <hr>
                    </li>
                  </template>
              </card-text>
          </div>
        </div>











        <div class="card" border-variant="none" align="center">
          <div class="card-header">
           LAST QUARTER
              <div class="sub-header">{{ previousQuarterName }}</div>
          </div>
          <div class="text-justify">
              <card-text class="card-body">
                  <template v-if="userLastQuarter.length === 0">
                      <div class="no-data-container">
                          <i><img :src="imagePath" alt="no data" class="no-data-image" /></i>
                          <p>No data found</p>
                      </div>
                  </template>
                  <template v-else>
                    <li v-for="(item, index) in userLastQuarter">
                      <div class="item-name">
                        <i class="fa fa-user-circle mr-2"></i>&nbsp;
                        <b></b>
                        {{ item.name }} - {{ item.total_orders }} - {{ formatPrice(item.total_price) }}
                      </div>
                      <hr>
                    </li>
                  </template>
              </card-text>
          </div>
        </div>







      </b-card-group>
    </div>
    <div class="pt-3">
      <h4><i class="fa fa-user mr-2 mb-2"></i>Partner Statistics (Top Performer)</h4>
      <b-card-group deck>
        <div class="card" border-variant="none" align="center">
          <div class="card-header">
            THIS MONTH
              <div class="sub-header">{{ this_month }}</div>
          </div>
          <div class="text-justify">
              <card-text class="card-body">
                  <template v-if="highPartnerThisMonth.length === 0">
                      <div class="no-data-container">
                          <i><img :src="imagePath" alt="no data" class="no-data-image" /></i>
                          <p>No data found</p>
                      </div>
                  </template>
                  <template v-else>
                    <li v-for="(item, index) in highPartnerThisMonth">

                      <b></b>
                      <p style="color: #4dbd74">Name:{{ item.name }}</p>
                      <p>Total Leave: {{ item.total_leaves }}</p>
                      <p>Total Order: {{ item.total_orders }}</p>
                      <p>Cancel Order: {{ item.total_cancelled_orders }}</p>
                      <p>Order Value: {{ formatPrice(item.total_price) }}</p>
                      <hr>
                    </li>
                  </template>
              </card-text>
          </div>
        </div>




        <div class="card" border-variant="none" align="center">
          <div class="card-header">
            LAST MONTH
              <div class="sub-header">{{ last_month }}</div>
          </div>
          <div class="text-justify">
              <card-text class="card-body">
                  <template v-if="highPartnerLastMonth.length === 0">
                      <div class="no-data-container">
                          <i><img :src="imagePath" alt="no data" class="no-data-image" /></i>
                          <p>No data found</p>
                      </div>
                  </template>
                  <template v-else>
                    <li v-for="(item, index) in highPartnerLastMonth">

                      <b></b>
                      <p style="color: #4dbd74">Name:{{ item.name }}</p>
                      <p>Total Leave: {{ item.total_leaves }}</p>
                      <p>Total Order: {{ item.total_orders }}</p>
                      <p>Cancel Order: {{ item.total_cancelled_orders }}</p>
                      <p>Order Value: {{ formatPrice(item.total_price) }}</p>
                      <hr>
                    </li>
                  </template>
              </card-text>
          </div>
        </div>





        <div class="card" border-variant="none" align="center">
          <div class="card-header">
            THIS QUARTER
              <div class="sub-header">{{ currentQuarterName }}</div>
          </div>
          <div class="text-justify">
              <card-text class="card-body">
                  <template v-if="highPartnerThisQuarter.length === 0">
                      <div class="no-data-container">
                          <i><img :src="imagePath" alt="no data" class="no-data-image" /></i>
                          <p>No data found</p>
                      </div>
                  </template>
                  <template v-else>
                    <li v-for="(item, index) in highPartnerThisQuarter">

                      <b></b>
                      <p style="color: #4dbd74">Name:{{ item.name }}</p>
                      <p>Total Leave: {{ item.total_leaves }}</p>
                      <p>Total Order: {{ item.total_orders }}</p>
                      <p>Cancel Order: {{ item.total_cancelled_orders }}</p>
                      <p>Order Value: {{ formatPrice(item.total_price) }}</p>
                      <hr>
                    </li>
                  </template>
              </card-text>
          </div>
        </div>



        <div class="card" border-variant="none" align="center">
          <div class="card-header">
            LAST QUARTER
              <div class="sub-header">{{ previousQuarterName }}</div>
          </div>
          <div class="text-justify">
              <card-text class="card-body">
                  <template v-if="highPartnerLastQuarter.length === 0">
                      <div class="no-data-container">
                          <i><img :src="imagePath" alt="no data" class="no-data-image" /></i>
                          <p>No data found</p>
                      </div>
                  </template>
                  <template v-else>
                    <li v-for="(item, index) in highPartnerLastQuarter">

                      <b></b>
                      <p style="color: #4dbd74">Name:{{ item.name }}</p>
                      <p>Total Leave: {{ item.total_leaves }}</p>
                      <p>Total Order: {{ item.total_orders }}</p>
                      <p>Cancel Order: {{ item.total_cancelled_orders }}</p>
                      <p>Order Value: {{ formatPrice(item.total_price) }}</p>
                      <hr>
                    </li>
                  </template>
              </card-text>
          </div>
        </div>
      </b-card-group>
    </div>




    <div class="pt-3">
      <h4><i class="fa fa-user mr-2 mb-2"></i>Partner Statistics (Low Performer)</h4>
      <b-card-group deck>

        <div class="card" border-variant="none" align="center">
          <div class="card-header">
            THIS MONTH
              <div class="sub-header">{{ this_month }}</div>
          </div>
          <div class="text-justify">
              <card-text class="card-body">
                  <template v-if="lowPartnerThisMonth.length === 0">
                      <div class="no-data-container">
                          <i><img :src="imagePath" alt="no data" class="no-data-image" /></i>
                          <p>No data found</p>
                      </div>
                  </template>
                  <template v-else>
                    <li v-for="(item, index) in lowPartnerThisMonth">

                      <b></b>
                      <p style="color: red">Name:{{ item.name }}</p>
                      <p>Total Leave: {{ item.total_leaves }}</p>
                      <p>Total Order: {{ item.total_orders }}</p>
                      <p>Cancel Order: {{ item.total_cancelled_orders }}</p>
                      <p>Order Value: {{ formatPrice(item.total_price) }}</p>
                      <hr>
                    </li>
                  </template>
              </card-text>
          </div>
        </div>






        <div class="card" border-variant="none" align="center">
          <div class="card-header">
            LAST MONTH
              <div class="sub-header">{{ last_month }}</div>
          </div>
          <div class="text-justify">
              <card-text class="card-body">
                  <template v-if="lowPartnerLastMonth.length === 0">
                      <div class="no-data-container">
                          <i><img :src="imagePath" alt="no data" class="no-data-image" /></i>
                          <p>No data found</p>
                      </div>
                  </template>
                  <template v-else>
                    <li v-for="(item, index) in lowPartnerLastMonth">

                      <b></b>
                      <p style="color: red">Name:{{ item.name }}</p>
                      <p>Total Leave: {{ item.total_leaves }}</p>
                      <p>Total Order: {{ item.total_orders }}</p>
                      <p>Cancel Order: {{ item.total_cancelled_orders }}</p>
                      <p>Order Value: {{ formatPrice(item.total_price) }}</p>
                      <hr>
                    </li>
                  </template>
              </card-text>
          </div>
        </div>




        <div class="card" border-variant="none" align="center">
          <div class="card-header">
            THIS QUARTER
              <div class="sub-header">{{ currentQuarterName }}</div>
          </div>
          <div class="text-justify">
              <card-text class="card-body">
                  <template v-if="lowPartnerThisQuarter.length === 0">
                      <div class="no-data-container">
                          <i><img :src="imagePath" alt="no data" class="no-data-image" /></i>
                          <p>No data found</p>
                      </div>
                  </template>
                  <template v-else>
                    <li v-for="(item, index) in lowPartnerThisQuarter">

                      <b></b>
                      <p style="color: red">Name:{{ item.name }}</p>
                      <p>Total Leave: {{ item.total_leaves }}</p>
                      <p>Total Order: {{ item.total_orders }}</p>
                      <p>Cancel Order: {{ item.total_cancelled_orders }}</p>
                      <p>Order Value: {{ formatPrice(item.total_price) }}</p>
                      <hr>
                    </li>
                  </template>
              </card-text>
          </div>
        </div>

        <div class="card" border-variant="none" align="center">
          <div class="card-header">
            LAST QUARTER
              <div class="sub-header">{{ previousQuarterName }}</div>
          </div>
          <div class="text-justify">
              <card-text class="card-body">
                  <template v-if="lowPartnerLastQuarter.length === 0">
                      <div class="no-data-container">
                          <i><img :src="imagePath" alt="no data" class="no-data-image" /></i>
                          <p>No data found</p>
                      </div>
                  </template>
                  <template v-else>
                    <li v-for="(item, index) in lowPartnerLastQuarter">

                      <b></b>
                      <p style="color: red">Name:{{ item.name }}</p>
                      <p>Total Leave: {{ item.total_leaves }}</p>
                      <p>Total Order: {{ item.total_orders }}</p>
                      <p>Cancel Order: {{ item.total_cancelled_orders }}</p>
                      <p>Order Value: {{ formatPrice(item.total_price) }}</p>
                      <hr>
                    </li>
                  </template>
              </card-text>
          </div>
        </div>

      </b-card-group>
    </div>

    <div class="pt-3">
        <h4><i class="fa fa-user mr-2 mb-2"></i>Line Item Statistics</h4>
         <b-card-group deck>


      <div class="card" border-variant="none" align="center">
        <div class="card-header">
            First Quarter
            <div class="sub-header">Jan-Mar</div>
        </div>
        <div class="text-justify">
            <card-text class="card-body">
                <template v-if="lineItemQ1.length === 0">
                    <div class="no-data-container">
                        <i><img :src="imagePath" alt="no data" class="no-data-image" /></i>
                        <p>No data found</p>
                    </div>
                </template>
                <template v-else>
                    <li v-for="(item, index) in lineItemQ1">
                        <p style="display: grid; grid-template-columns: 5rem 1fr;">
                            <span>Line Item: </span><span style="text-align:start;">{{ item.name }}</span>
                        </p>
                        <p style="display: grid; grid-template-columns: 5rem 1fr;">
                            <span>Price: </span><span style="text-align:start;">{{ formatPrice(item.total_price) }}</span>
                        </p>
                        <hr>
                    </li>
                </template>
            </card-text>
        </div>
      </div>




          <div class="card" border-variant="none" align="center">
            <div class="card-header">
                Second Quarter
                <div class="sub-header">Apr-Jun</div>
            </div>
            <div class="text-justify">
                <card-text class="card-body">
                    <template v-if="lineItemQ2.length === 0">
                        <div class="no-data-container">
                            <i><img :src="imagePath" alt="no data" class="no-data-image" /></i>
                            <p>No data found</p>
                        </div>
                    </template>
                    <template v-else>
                        <li v-for="(item, index) in lineItemQ2">
                            <p style="display: grid; grid-template-columns: 5rem 1fr;">
                                <span>Line Item: </span><span style="text-align:start;">{{ item.name }}</span>
                            </p>
                            <p style="display: grid; grid-template-columns: 5rem 1fr;">
                                <span>Price: </span><span style="text-align:start;">{{ formatPrice(item.total_price) }}</span>
                            </p>
                            <hr>
                        </li>
                    </template>
                </card-text>
            </div>
          </div>




          <div class="card" border-variant="none" align="center">
            <div class="card-header">
                Third Quarter
                <div class="sub-header">Jul-Sep</div>
            </div>
            <div class="text-justify">
                <card-text class="card-body">
                    <template v-if="lineItemQ3.length === 0">
                        <div class="no-data-container">
                            <i><img :src="imagePath" alt="no data" class="no-data-image" /></i>
                            <p>No data found</p>
                        </div>
                    </template>
                    <template v-else>
                        <li v-for="(item, index) in lineItemQ3">
                            <p style="display: grid; grid-template-columns: 5rem 1fr;">
                                <span>Line Item: </span><span style="text-align:start;">{{ item.name }}</span>
                            </p>
                            <p style="display: grid; grid-template-columns: 5rem 1fr;">
                                <span>Price: </span><span style="text-align:start;">{{ formatPrice(item.total_price) }}</span>
                            </p>
                            <hr>
                        </li>
                    </template>
                </card-text>
            </div>
          </div>




          <div class="card" border-variant="none" align="center">
              <div class="card-header">
                  Fourth Quarter
                  <div class="sub-header">Oct-Dec</div>
              </div>
              <div class="text-justify">
                  <card-text class="card-body">
                      <template v-if="lineItemQ4.length === 0">
                          <div class="no-data-container">
                              <i><img :src="imagePath" alt="no data" class="no-data-image" /></i>
                              <p>No data found</p>
                          </div>
                      </template>
                      <template v-else>
                          <li v-for="(item, index) in lineItemQ4">
                              <p style="display: grid; grid-template-columns: 5rem 1fr;">
                                  <span>Line Item: </span><span style="text-align:start;">{{ item.name }}</span>
                              </p>
                              <p style="display: grid; grid-template-columns: 5rem 1fr;">
                                  <span>Price: </span><span style="text-align:start;">{{ formatPrice(item.total_price) }}</span>
                              </p>
                              <hr>
                          </li>
                      </template>
                  </card-text>
              </div>
            </div>

        </b-card-group>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
import Loader from "@/views/Loader.vue";
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
import  img_no from "@/../public/img/nodata.png";
export default {

  name: 'dashboard',
  components: {Loader},
  data() {
    return {
      activeLoader: false,

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
      this_month: '',
      last_month: '',
      currentQuarterName: '',
      previousQuarterName: '',
      imagePath:img_no,
    }
  },
  created() {
    this.fetchData();

  },
  methods: {
    fetchData() {
      this.activeLoader = true;
      axios.get(`${ADMIN_URL}/statistics`)
        .then(response => {
          this.activeLoader = false;
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
          this.this_month = response.data.this_month
          this.last_month = response.data.last_month
          this.currentQuarterName = response.data.currentQuarterName
          this.previousQuarterName = response.data.previousQuarterName

          // console.log("hello line item",this.lineItemStat);
          this.all_data_fetched_successfully = true;
          // console.log('finance ======  =========>> ', response.data.finance);
        })
        .catch(e => {
          //console.log("error occurs");
        });
    },

    formatPrice(price) {
      const number = parseFloat(price);
      if (isNaN(number)) return "0";

      const formattedPrice = number.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');

      return formattedPrice;
    }

  }
}
</script>



<style scoped>
li {
  font-size: 14px;
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
  font-size: small;
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
