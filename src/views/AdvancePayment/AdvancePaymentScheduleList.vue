<template>
  <div class="animated fadeIn">
    <div class="cardheading">
      <h4><i class="fa fa-bars"></i><span class="ml-1">Advance Payment Schedule</span></h4>
      <div class="">
        <h1 class="my-auto tableName">

        </h1>
        <!-- <router-link :to="{ name: 'CreateAdvancePaymentSchedule' }">
          <button class="btn btn-primary">Create Advance Payment</button>
        </router-link> -->
      </div>

    </div>
    <b-row>
      <b-col>

        <b-card>

          <v-client-table :data="transformedPayments" :columns="columns" :options="options">
            <template slot="action" slot-scope="props">
              <div>
                <router-link :to="{ name: 'EditAdvancePaymentSchedule', params: { id: props.row.id }}"
                >
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
  name: "AdvancePaymentSchedule",

  data() {
    return {
      payments : [],
      columns: [
        'id', 'start_date', 'end_date', 'status','created_at', 'action'
      ],

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
    axios.get(`${ADMIN_URL}/advance-payment-list`)
      .then(response => {
        console.log('response',response);
        this.payments = response.data.data;
      })
      .catch(e => {
        console.log("error occurs", e.response);
      });
  },

  computed: {
    transformedPayments() {
      return this.payments.map(payment => {
        payment.status = payment.status === 1 ? 'Published' : 'Unpublished';
        return payment;
      });
    }
  },


}
</script>
