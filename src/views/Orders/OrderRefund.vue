<template>
  <div class="animated fadeIn">
    <div class="cardheading">
      <h4><i class="fa fa-bars"></i><span class="ml-1">Order Refund</span></h4>
      <div class="">
        <h1 class="my-auto tableName">

        </h1>
      </div>
<!--      <div class="">-->
<!--        <router-link :to="{ name: 'CreateMinimumAmount'}" >-->
<!--          <button class="btn btn-success">Create New Minimum Order Amount</button>-->
<!--        </router-link>-->
<!--      </div>-->
    </div>
    <b-row>
      <b-col>
        <b-card>
          <v-client-table :data="refunds" :columns="columns" :options="options">
            <template slot="refund_status" slot-scope="props">
              <div :style="{ color: props.row.refund_status.toLowerCase() === 'refunded' ? 'green' : 'black' }">
                {{ props.row.refund_status }}
              </div>
            </template>

            <template slot="action" slot-scope="props">
              <div>


                <router-link :to="{ name: 'OrderEdit', params: { id: props.row.id }}">
                                         <span
                                           class="btn btn-warning btn-sm m-1"
                                           data-toggle="tooltip" title="Edit"
                                           :href="props.row.id">
                    <i class="fa fa-edit"></i>
                  </span>
                </router-link>

              </div>
            </template>
          </v-client-table>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios';
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
export default {
  name: "OrderRefund",

  data() {
    return {
      refunds : [],
      columns: [
        'id', 'Total_Paid', 'Payment_Status', 'status','Cancel_Hour_Count', 'Refund_Status','Expected_Refund_Amount','action'
      ],
      redeem_id:'',
      options: {
        pagination: {nav: 'fixed'},
        filterByColumn: true,
        dateColumns: ['age'],
        toMomentFormat: 'YYYY-MM-DD',
        sortIcon: {base: 'fa fa-sort', up: 'fa fa-sort-up', down: 'fa fa-sort-down', is: 'fa fa-sort'},

      }

    }
  },
  created(){
    axios.get(`${ADMIN_URL}/orders/refund-amount`)
      .then(response => {
        console.log('response',response);
        this.refunds = response.data.data;
      })
      .catch(e => {
        console.log("error occurs", e.response);
      });
  },
  computed: {
    elementHasPermission(permission_name) {
      return (permission_name) => {
        return !!this.$store.getters['auth/hasPermission'](permission_name);
      }
    }
  },
  methods: {

  },
}
</script>
