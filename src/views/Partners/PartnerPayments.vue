<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col>
        <h4><i class="fa fa-user"></i><span class="ml-1">Payment Approve</span></h4>
        <router-link :to="{ name: 'CreatePayment'}" >
          <button class="btn btn-success">Create  Payment</button>
        </router-link>
        <b-card>
          <v-client-table :data="partners" :columns="columns" :options="options">
            <!--<template slot="logo" slot-scope="props">
              <div class="center-div">
                <img :src="`${BASE_URL}/${props.row.logo}`" style="width: 160px;height: 90px;">
              </div>
            </template>-->
            <template slot="action" slot-scope="props">
              <div class="d-flex" >
                <div v-if="(props.row.status).toLowerCase() == 'pending' || (props.row.status).toLowerCase() == 'declined'  " @click="approveId(props.row.id)">
                    <span class="btn btn-success btn-sm m-1" data-toggle="tooltip" title="Show" :href="props.row.id">
                                      <i class="fa fa-check-square"></i></span>
                </div>
<!--                                <span class="btn btn-warning btn-sm m-1 cursor-pointer"   data-toggle="tooltip" title="Redirect to Partner Portal"-->
<!--                                      @click="declineId(props.row.id)">-->
<!--                                    <i class="fa fa-times-circle"></i>-->
<!--                                </span>-->
                <div v-else-if="(props.row.status).toLowerCase() == 'approved'" @click="declineId(props.row.id)">
                    <span class="btn btn-warning btn-sm m-1 cursor-pointer" data-toggle="tooltip" title="Show" :href="props.row.id">
                    <i class="fa fa-times-circle"></i></span>
                </div>


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
      columns: ['id', 'partner_id', 'method','tid', 'amount' ,'status', 'payment_to', 'created_at', 'action'],
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
      axios.get(`${ADMIN_URL}/payment/approve-data`)
          .then(response => {
            // console.log('approve-data', response);
            this.partners = response.data.data;
            console.log('partner', this.partners)
          })
          .catch(e => {
            //console.log("error occurs");
          });
    },
    approveId(approve_details_id){
      console.log('id', approve_details_id);
      axios.post(`${ADMIN_URL}/payment/approve`, {id: approve_details_id})
          .then(() =>{

            this.fetchData();
          })

    },
    declineId(approve_details_id){
      console.log('id', approve_details_id);
      axios.post(`${ADMIN_URL}/payment/decline`, {id: approve_details_id})
          .then(() =>{

            this.fetchData();
          })

    },
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
