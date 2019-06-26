<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col>
        <b-card>
          <v-client-table :data="partners" :columns="columns" :options="options">
            <template slot="action" slot-scope="props">
              <div>
                <router-link :to="{ name: 'PartnerShow', params: { id: props.row.id }}"><span class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Show" :href="props.row.id">
                                    <i class="fa fa-search"></i></span></router-link>
                <router-link :to="{ name: 'PartnerShow', params: { id: props.row.id }}"><span class="btn btn-primary btn-sm m-1" data-toggle="tooltip" title="Go to Partner Profile" :href="props.row.id">
                                    <i class="fa fa-edit"></i></span></router-link>

                <span class="btn btn-success btn-sm m-1" data-toggle="tooltip" title="Redirect"
                  @click="handleForward(props.row)">
                    <i class="fa fa-forward"></i>
                </span>


              </div>
            </template>
          </v-client-table>
          <div>
            <iframe id="ifrLoad" :src="`${PARTNER_HOST}/ReceiverForAdminLogin.html`" style="display: none;">
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

  export default {
    name: 'Partners',
    data() {
      return {
        PARTNER_HOST: `http://localhost:8080`, /* TO_EDIT_THIS_PLACE */
        partners : [],
        columns: ['id', 'name', 'type', 'booking type', 'phone' ,'status', 'created_at', 'action'],
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
        axios.get(`${ADMIN_URL}/all-partners`)
          .then(response => {
            this.partners = response.data;
          })
          .catch(e => {
            //console.log("error occurs");
          });
      },
      generateCypherText(value) {
        const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
        const ciphertext = CryptoJS.AES.encrypt(stringValue, globalvariables.SECRET_KEY_SAME_AS_PARTNER_PANEL).toString();
        return ciphertext;
      },
      handleForward(param) {
        const phone = param.phone;
        // console.log('handle Forward ___________ ', phone);
        axios.post(`${ADMIN_URL}/partner-login-byadmin`, {phone: phone})
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
            myIfr.postMessage(toSendObj, `${this.PARTNER_HOST}/ReceiverForAdminLogin.html`);
            window.open(this.PARTNER_HOST);

          }).catch(error => {
            console.log('Error Response', error.response);
          })

      }
    },
  }
</script>
