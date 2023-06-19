<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col>
        <h4><i class="fa fa-user"></i><span class="ml-1">Payment Approve</span></h4>
        <div class="mb-3">
          <router-link :to="{ name: 'CreatePayment'}" >
            <button class="btn btn-success">Create  Payment</button>
          </router-link>
        </div>
        <b-card>
          <v-client-table :data="partners" :columns="columns" :options="options">

            <template slot="action" slot-scope="props">
              <div>
                <router-link :to="{ name: 'EditPayment', params: { id: props.row.id }}"
                >
                  <span
                      class="btn btn-warning btn-sm m-1"
                      data-toggle="tooltip" title="Edit"
                      :href="props.row.id">
                    <i class="fa fa-edit"></i>
                  </span>
                </router-link>
<!--                <span-->
<!--                    class="btn btn-danger btn-sm m-1"-->
<!--                    data-toggle="tooltip"-->
<!--                    title="Delete Redeem"-->
<!--                    :href="props.row.id"-->
<!--                    @click="handleDelete(props.row.id)"-->
<!--                >-->
<!--                    <i class="fa fa-trash"></i>-->
<!--                </span>-->
              </div>
            </template>
          </v-client-table>
          <div>
            <iframe id="ifrLoad" :src="`${PARTNER_FRONTEND_DOMAIN}/ReceiverForAdminLogin.html`" style="display: none;">
              <p>Oops!. Your browser does not support iframes.</p>
            </iframe>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios';
import CryptoJS from 'crypto-js';
import globalvariables from '../../globalvariables';
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
const BASE_URL = process.env.VUE_APP_BASE_URL;
const PARTNER_FRONTEND_DOMAIN = process.env.VUE_APP_PARTNER_FRONTEND_DOMAIN;
export default {
  name: "PartnerPayments",
  data() {
    return {
      BASE_URL: BASE_URL,
      PARTNER_FRONTEND_DOMAIN: PARTNER_FRONTEND_DOMAIN, /* TO_EDIT_THIS_PLACE */
      partners : [],
      columns: ['id', 'name', 'method', 'amount' , 'payment_to', 'recieved_date', 'action'],
      options: {
        pagination: {nav: 'fixed'},
        filterByColumn: true,
        //dateColumns: ['created_at'],
        toMomentFormat: 'YYYY-MM-DD',
        sortIcon: {base: 'fa fa-sort', up: 'fa fa-sort-up', down: 'fa fa-sort-down', is: 'fa fa-sort'},


      }

    }
  },
  created(){
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios.get(`${ADMIN_URL}/payment-collect-data`)
          .then(response => {
            // console.log('approve-data', response);
            this.partners = response.data.data;
            console.log('partner', this.partners)
          })
          .catch(e => {
            //console.log("error occurs");
          });
    },
    // approveId(approve_details_id){
    //   console.log('id', approve_details_id);
    //   axios.post(`${ADMIN_URL}/payment/approve`, {id: approve_details_id})
    //       .then(() =>{
    //
    //         this.fetchData();
    //       })
    //
    // },
    // declineId(approve_details_id){
    //   console.log('id', approve_details_id);
    //   axios.post(`${ADMIN_URL}/payment/decline`, {id: approve_details_id})
    //       .then(() =>{
    //
    //         this.fetchData();
    //       })
    //
    // },
    generateCypherText(value) {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      const ciphertext = CryptoJS.AES.encrypt(stringValue, globalvariables.SECRET_KEY_SAME_AS_PARTNER_PANEL).toString();
      return ciphertext;
    },
    handleForward(param) {
      // console.log('handle Forward ___________ ', phone);
      axios.post(`${ADMIN_URL}/payment/approve`,)
          .then(response => {
            // console.log('Response === === === ', response)
            const { access_token, user, user_permissions } = response.data;
            const encoded_access_token = this.generateCypherText(access_token);
            const encoded_user = this.generateCypherText(user);
            const encoded_user_permissions = this.generateCypherText(user_permissions);
            const toSendObj = {
              token: encoded_access_token,
              user: encoded_user,
              user_permissions: encoded_user_permissions
            }
            // console.log(toSendObj);

            const myIfr = window.frames['ifrLoad'].contentWindow;
            // console.log("Firstworld Sender, myIfr === ", myIfr);
            myIfr.postMessage(toSendObj, `${PARTNER_FRONTEND_DOMAIN}/ReceiverForAdminLogin.html`);
            window.open(PARTNER_FRONTEND_DOMAIN);

          }).catch(error => {
        console.log('Error Response', error.response);
      })

    }
  },

}

</script>

<style scoped>
.btn-warning {
  background: red;
  color: white;
  font-size: 15px;
}
.btn-success{
  font-size: 15px;
}
</style>
