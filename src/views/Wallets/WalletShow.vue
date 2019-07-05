<template>
    <div class="">
        <div class="walletHead card">
            <div class="card-body">
              <b-row>
                <b-col cols="8"></b-col>
                <b-col cols="4">
                  <h2 class="font-weight-bold"> {{partner.name}}</h2>
                </b-col>
              </b-row>
                <div class="wallet-forhead">
                  <div class="leftside">
                  </div>
                  <div class="rightside" v-if="partner.balance >0">
                    <img src="/img/wallet-pink.png" width="30%"
                         alt="wallet-icon">
                    <div class="badge badge-success money">৳ {{partner.balance }}</div>
                    <h1 class="text-success font-weight-bold">Credit</h1>
                  </div>
                  <div class="rightside" v-else >
                  <img src="https://partner.staging180601.romoni.xyz/site_assets/img/wallet-pink.png" width="30%"
                       alt="wallet-icon">
                  <div class="badge badge-danger money">৳ {{partner.balance }}</div>
                  <h1 class="text-danger font-weight-bold">Debit</h1>
                </div>
                </div>
            </div>
        </div>
        <b-tabs card>
            <b-tab title="Transaction History" active>
                <b-card>
                    <v-client-table :data="wallet_history" :columns="columns" :options="options"></v-client-table>
                </b-card>
            </b-tab>
            <b-tab title="Advance Recharge">
                <div class="row w-100">
                    <div class="col-lg-4 mx-auto">
                        <div class="auth-form-light text-left p-5">
                            <input type="hidden" name="_token" value="">
                            <div class="form-group">
                                <label class="text-center">Recharge Amount</label>
                                <input type="number" class="form-control form-control-lg" v-model="amount">
                            </div>
                            <div class="mt-3">
                              <button class="btn btn-danger btn-block" @click="recharge">"Recharge Wallet"</button>
                            </div>
                        </div>

                    </div>
                </div>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
  import axios from 'axios';
  const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
    export default {
        name: 'WalletShow',
        data() {
            return {
              partner: [],
              wallet_history: [],
              amount: '',
                columns: ['created_at', 'id', 'description','debit','credit','balance'],
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
          this.fetchData();

      },
        methods: {

          fetchData(){
            this.id = window.location.pathname.split("/").pop();
            axios.post(`${ADMIN_URL}/partners/show`,
              {
                id: this.id
              }).then(response =>{
              this.partner = response.data;
              this.wallet_history = this.partner.wallet_history;
              console.log(response.data);
            })
              .catch(e=>{
                console.log("error occurs",e);
              });
          },

          recharge() {
            axios.post(`${ADMIN_URL}/wallet/recharge`,
              {
                partner_id: this.id,
                amount    : this.amount
              }).then(response =>{
              this.partner = response.data;
              console.log(response.data);
              if(response.data.success===true)
              {
                this.$swal('Success',response.data.message,'success');
                this.fetchData();
              }
              else
              {
                this.$swal('Error', 'Something went wrong', 'error');
              }
            })
              .catch(e=>{
                console.log("error occurs",e);
              });

          },

        },
    }
</script>


<style scoped>

    .walletHeadContainer {
        background: white;
    }

    .wallet-forhead {
        display: flex;
        justify-content: space-around;
    }

    .leftside {

        flex-basis: 0;
        flex-grow: 2;
    }

    .rightside {

        flex-basis: 0;
        flex-grow: 1;
    }

    .rightside > .money {
        font-size: 30px;
    }

    .rightside > .money-condition {
        color: rgb(80, 126, 12);
        font-size: 30px;
        margin: auto 0;
        text-align: center;
    }

    @media only screen and (max-width: 600px) {
        .rightside > .money {
            font-size: 20px;
        }

        .rightside > .money-condition {
            color: rgb(80, 126, 12);
            font-size: 20px;
            margin: auto 0;
            text-align: center;
        }
    }

</style>
