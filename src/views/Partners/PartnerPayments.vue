<template>
  <div class="animated fadeIn">
    <div class="cardheading">
      <h4><i class="fa fa-bars"></i><span class="ml-1">Partner Payment</span></h4>

      <div class="">

      </div>
      <div class="d-flex  gap-5">
        <select v-model="key" class="form-control mr-2" @change="handleOptionChange" style="width: 180px;background: #4dbd74;color: white">
          <option value="this_month">This month</option>
          <option value="last_month">Last month</option>
          <option value="last_three_month">Last three month</option>
          <option value="last_six_month">Last six month</option>
          <option value="this_year">This year</option>
          <option value="last_year">Previous year</option>

        </select>
      <div class="d-flex gap-2">
        <router-link :to="{ name: 'CreatePayment'}">
          <button class="btn btn-success">
            Create New Payment
          </button>
        </router-link>
        <router-link :to="{ name: 'AllPaymentData'}">
          <button class="btn btn-success ml-2">
            See All
          </button>
        </router-link>
      </div>
      </div>

    </div>
    <b-row>
      <b-col>
        <b-card>
          <v-client-table :data="partners" :columns="columns" :options="options">
            <template slot="Image" slot-scope="props">
              <div class="center-div" v-if="props.row.Image">
                <img :src="props.row.Image" style="width: 160px; height: 90px;"
                @click="showImageModal(props.row.Image)">
              </div>
              <b-modal v-model="isModalVisible" hide-footer title="Image">
                <img :src="modalImageUrl" alt="Image" style="max-width: 100%;">
              </b-modal>
            </template>
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
                <router-link :to="{ name: 'EditPayment', params: { id: props.row.id }}"
                >
                  <span
                      class="btn btn-warning btn-sm m-1"
                      data-toggle="tooltip" title="Edit"
                      :href="props.row.id">
                    <i class="fa fa-edit"></i>
                  </span>
                </router-link>
                <button @click="deletePayments(props.row.id)" class="btn btn-danger float-right"><i class="fa fa-trash"></i></button>


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
      key:'this_month',
      columns: ['id', 'partner_name', 'method','tid','Image', 'amount' ,'status', 'payment_to', 'recieved_date', 'action'],
      options: {
        pagination: {nav: 'fixed'},
        filterByColumn: true,
        //dateColumns: ['created_at'],
        toMomentFormat: 'YYYY-MM-DD',
        sortIcon: {base: 'fa fa-sort', up: 'fa fa-sort-up', down: 'fa fa-sort-down', is: 'fa fa-sort'},


      },
      isModalVisible: false,
      modalImageUrl: ''


    }
  },
  created(){
    this.fetchData();
  },
  methods: {
    handleOptionChange() {
      console.log("key",this.key)
      this.fetchData();
    },
    fetchData() {
      axios.post(`${ADMIN_URL}/payment/approve-data`,{'key':this.key})
          .then(response => {
            // console.log('approve-data', response);
            this.partners = response.data.data;
            console.log('partner', this.partners)
          })
          .catch(e => {
            //console.log("error occurs");
          });
    },
    approveId(id){

      this.$swal({
        title: 'Are you sure?',
        text: 'You can\'t revert your action',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes approve it!',
        cancelButtonText: 'No, Keep it!',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        if(result.value) {
          this.confirmApprove(id);
        } else {
          //this.$swal('Cancelled', 'Your file is still intact', 'info')
        }
      });
      // console.log("hello id",id);


    },
    confirmApprove(id)
    {

      axios.post(`${ADMIN_URL}/payment/approve`, {id: id})
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

    deletePayments(id) {

      this.$swal({
        title: 'Are you sure?',
        text: 'You can\'t revert your action',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes delete it!',
        cancelButtonText: 'No, Keep it!',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        if(result.value) {
          this.confirmDelete(id);
        } else {
          //this.$swal('Cancelled', 'Your file is still intact', 'info')
        }
      });
      console.log("hello id",id);



    },
    confirmDelete(id) {
      console.log(id);
      axios.post(`${ADMIN_URL}/partner-payment/delete-payment`,{
        id : id
      })
        .then(response => {
          this.$swal('Delete Payment', '', 'success');
          setTimeout(()=>{
            window.location.href='/partner-payment';
          },1000);
        })
        .catch(e => {
          console.log("error occurs",e);
        });
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

    },
    showImageModal(imageUrl) {
      this.modalImageUrl = imageUrl;
      this.isModalVisible = true;
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
.center-div {
  position: relative;
  cursor: pointer;
}
</style>
