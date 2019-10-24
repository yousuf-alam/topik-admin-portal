<template>
    <div class="customcard">
        <div class="resource-head row">
            <div class="resource-identity col-sm-8  d-flex justify-content-center align-items-center flex-column">
                <img :src="src_avatar + '/'+partner.avatar" class="rounded-circle" width="100px">
                <div>
                    <h3>{{partner.name}}</h3>
                </div>
                <div>
                    <h4 class="status-badge">
                        {{partner.status}}
                    </h4>
                </div>
                <div>
                    <span class="change-log-modal" @click="statusModal">
                        Change Log
                    </span>

                    <!-- Modal Component -->
                  <modal name="modal-status" height="auto">
                    <div class="m-3 p-3">
                      <b-row>
                        <h3 class="mb-3">Change Status of SP</h3>
                      </b-row>
                      <b-row>
                        <div class="form-group">
                          <div class="radio">
                            <label><input type="radio" v-model="partner.status" value="pending"> Pending </label>
                          </div>
                          <div class="radio">
                            <label><input type="radio" v-model="partner.status" value="verified"> Verified </label>
                          </div>
                          <div class="radio">
                            <label><input type="radio" v-model="partner.status" value="rejected"> Rejected </label>
                          </div>
                        </div>
                      </b-row>
                      <b-row>
                        <button @click="changeStatus" class="btn btn-primary" data-dismiss="modal" type="button">Submit</button>
                      </b-row>
                    </div>
                  </modal>

                </div>


            </div>

            <div class="resource-job-summary col-sm-4 table-responsive">
                <div class="mt-2 ">
                    <h3 class="p-1 bg-primary">Job Summary</h3>
                </div>
                <table class="table">
                    <tbody>
                    <tr>
                        <td scope="row">TODAY SERVES</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td scope="row">WEEKLY SERVES</td>
                        <td>25</td>
                    </tr>
                    <tr>
                        <td scope="row">MONTHLY SERVES</td>
                        <td>100</td>
                    </tr>
                    <tr>
                        <td scope="row">TOTAL SERVES</td>
                        <td>153</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="resource-body">
            <b-tabs content-class="mt-3" pills card>
                <b-tab class="pl-5 ml-5 mr-5 pr-5" title="Basic Info" active>
                    <table class="table">
                        <tr>
                            <th>Company Name</th>
                            <td>{{partner.name}}</td>
                        </tr>
                        <tr>
                            <th>Type</th>
                            <td>{{partner.type}} ( {{partner.booking_type}} ) </td>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <td>{{partner.user.phone}}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td>{{partner.status}}</td>
                        </tr>
                        <tr>
                            <th>Admin Name</th>
                            <td>{{partner.admin_name}}</td>
                        </tr>
                        <tr>
                          <th>Bkash No</th>
                          <td>{{partner.bkash_no}}</td>
                        </tr>
                        <tr>
                          <th>City</th>
                          <td>{{partner.city}}</td>
                        </tr>
                        <!--<tr v-if="partner.booking_type === 'on-demand'">
                          <th>Service Areas</th>
                          <td>{{partner.service_areas}}</td>
                        </tr>-->
                    </table>
                </b-tab>

                <b-tab title="Rating & Priority">
                  <table class="table">
                    <tr>
                      <th>Overall Score</th>
                      <td>{{partner.priority}}
                        <span class="text-muted ml-4">(Out of 100)</span>
                      </td>
                    </tr>
                    <tr>
                      <th>Admin Score</th>
                      <td v-if="admin_score_mode==='view'">{{partner.admin_score}}
                        <span data-toggle="tooltip" title="Edit Score" @click="admin_score_mode = 'edit'">
                          <i class="fa fa-pencil pl-1 text-danger cursor-pointer"></i>
                          <span class="text-muted ml-5 pl-5">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp(Out of 50)</span>
                        </span>
                      </td>
                      <td v-else>
                        <input type="text" v-model="partner.admin_score">
                          <button class="btn btn-primary btn-sm" @click="changeScore" v-if="admin_score_mode === 'edit'" :disabled="partner.admin_score>50">Save</button>
                          <button class="btn btn-light btn-sm" @click="admin_score_mode='view'" v-if="admin_score_mode === 'edit'">Cancel</button>
                          <span class="text-muted ml-5">(Out of 50)</span>
                        <span class="text-danger ml-5" v-if="partner.admin_score>50">The score can't be more than 50</span>
                      </td>
                    </tr>
                    <tr>
                      <th>User Rating</th>
                      <td>{{ratingFloat}}
                        <span class="text-muted ml-5 pl-5">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp({{(ratingFloat* 5)}} Out of 25)</span>
                      </td>
                    </tr>
                    <tr>
                      <th>Jobs Completed</th>
                      <td>{{partner.completed_job}}
                        <span class="text-muted ml-5 pl-5">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp({{jobScore}} Out of 25)</span>
                      </td>

                    </tr>
                  </table>
                </b-tab>
              <b-tab title="Commission Rates" v-if="partner.booking_type ==='appointment' || partner.booking_type ==='both' ">
                <b-button class="btn-romoni-secondary float-right m-3" @click="commissionModal">Edit Rates</b-button>
                <table class="table">
                  <tr>
                    <th>৳ 0 - 4,999</th>
                    <td>{{partner.commission_rates.min.amount}} {{typeSymbol(partner.commission_rates.min.type)}}</td>
                  </tr>
                  <tr>
                    <th>৳ 5,000 - 14,999</th>
                    <td>{{partner.commission_rates.mid.amount}} {{typeSymbol(partner.commission_rates.mid.type)}}</td>
                  </tr>
                  <tr>
                    <th>৳ 15,000 - 24,999</th>
                    <td>{{partner.commission_rates.max.amount}} {{typeSymbol(partner.commission_rates.max.type)}}</td>
                  </tr>
                  <tr>
                    <th>৳ 25,000 - above</th>
                    <td>{{partner.commission_rates.mega.amount}} {{typeSymbol(partner.commission_rates.mega.type)}}</td>
                  </tr>
                </table>
                <!-- Modal Component -->
                <modal name="modal-commission" height="auto">
                  <div class="m-3 p-3">
                    <b-row>
                      <h3 class="mb-3">Change Commission Rates of SP</h3>
                    </b-row>
                    <b-row>
                      <b-col>
                        <table class="table">
                          <tr>
                            <th>Range</th>
                            <td>Type</td>
                            <td>Amount</td>
                          </tr>
                          <tr>
                            <th>৳ 0 - 4,999</th>
                            <td>
                              <select class='form-control' v-model="partner.commission_rates.min.type">
                                <option value="percentage">Percentage</option>
                                <option value="fixed">Fixed</option>
                              </select>
                            </td>
                            <td><input type="number" class='form-control' v-model="partner.commission_rates.min.amount"></td>
                          </tr>
                          <tr>
                            <th>৳ 5,000 - 14,999</th>
                            <td>
                              <select class='form-control' v-model="partner.commission_rates.mid.type">
                                <option value="percentage">Percentage</option>
                                <option value="fixed">Fixed</option>
                              </select>
                            </td>
                            <td><input type="number" class='form-control' v-model="partner.commission_rates.mid.amount"></td>
                          </tr>
                          <tr>
                            <th>৳ 15,000 - 24,999</th>
                            <td>
                              <select class='form-control' v-model="partner.commission_rates.max.type">
                                <option value="percentage">Percentage</option>
                                <option value="fixed">Fixed</option>
                              </select>
                            </td>
                            <td><input type="number" class='form-control' v-model="partner.commission_rates.max.amount"></td>
                          </tr>
                          <tr>
                            <th>৳ 25,000 - above</th>
                            <td>
                              <select class='form-control' v-model="partner.commission_rates.mega.type">
                                <option value="percentage">Percentage</option>
                                <option value="fixed">Fixed</option>
                              </select>
                            </td>
                            <td><input type="number" class='form-control' v-model="partner.commission_rates.mega.amount"></td>
                          </tr>
                        </table>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <button @click="changeCommission" class="btn btn-success float-right" data-dismiss="modal" type="button">Save</button>
                      </b-col>
                    </b-row>
                  </div>
                </modal>
              </b-tab>
            </b-tabs>
        </div>
    </div>
</template>

<script>
  import axios from 'axios';
  const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
  const BASE_URL = process.env.VUE_APP_BASE_URL;
  const PARTNER_URL = process.env.VUE_APP_PARTNER_URL;
    export default {
        name: 'PartnerShow',
        components: {},
        data() {
            return {
              partner: [],
              admin_score_mode: 'view',
              commission_mode: 'view',
              src_avatar: BASE_URL,
              options: {
                    pagination: {nav: 'fixed'},
                    perPage: 5,
                    filterByColumn: true,
                    toMomentFormat: 'YYYY-MM-DD',
                    sortIcon: {base: 'fa fa-sort', up: 'fa fa-sort-up', down: 'fa fa-sort-down', is: 'fa fa-sort'},

              }

            }
        },
      computed : {
        ratingFloat() {
          let rating =  parseFloat(this.partner.rating);
          return rating.toFixed(2);
        },
        jobScore() {
            let jobscore =  parseFloat(this.partner.priority - this.partner.admin_score - this.partner.rating* 5);
            return jobscore.toFixed(2);
        },
      },
      created(){

        this.id = window.location.pathname.split("/").pop();
        axios.post(`${ADMIN_URL}/partners/show`,
          {
            id: this.id
          }).then(response =>{
          this.partner = response.data;
          if(this.partner.commission_rates === null)
          {

              let rates = {};
              rates.min = {};
              rates.min.type = '';
              rates.min.amount = '';
              rates.mid = {};
              rates.mid.type = '';
              rates.mid.amount = '';
              rates.max = {};
              rates.max.type = '';
              rates.max.amount = '';
              rates.mega = {};
              rates.mega.type = '';
              rates.mega.amount = '';
              console.log('rates',rates)
              this.partner.commission_rates = rates;
          }
          else
          {
              this.partner.commission_rates = JSON.parse(response.data.commission_rates)
          }

          console.log(response.data);
        })
          .catch(e=>{
            console.log("error occurs",e);
          });


      },
        methods: {
          statusModal(){
            this.$modal.show('modal-status');
          },
          commissionModal(){
              this.$modal.show('modal-commission');
          },
          typeSymbol(type) {
              if(type==='fixed')
                  return 'BDT';
              else
                  return '%';
          },
          changeStatus(){
            this.$modal.hide('modal-status');
            axios.post(`${ADMIN_URL}/partners/change-status`,
              {
                id: this.partner.id,
                status: this.partner.status
              }).then(response =>{
            })
              .catch(e=>{
                console.log("error occurs",e);
              });
          },
          changeScore() {
            this.admin_score_mode = 'view';
            axios.post(`${ADMIN_URL}/partners/change-score`,
              {
                id: this.partner.id,
                score: this.partner.admin_score
              }).then(response =>{
                if(response.data.success===true)
                  this.$swal('Score Updated', '', 'success');
              location.reload();
            })
              .catch(e=>{
                console.log("error occurs",e);
              });
            },
            changeCommission() {
                this.$modal.hide('modal-commission');
                axios.post(`${ADMIN_URL}/partners/change-commissions`,
                    {
                        id: this.partner.id,
                        commissions: this.partner.commission_rates
                    }).then(response =>{
                    if(response.data.success===true)
                        this.$swal('Commission Rates Updated', '', 'success');
                    /*location.reload();*/
                })
                    .catch(e=>{
                        console.log("error occurs",e);
                    });
            },
        }
    }
</script>


<style scoped>
    .status-badge {
        color: white;
        background-color: #4dbd74;
        padding: 0.25rem;
    }
    .change-log-modal {
        color: #0989df;
        text-decoration: underline;
    }

    .change-log-modal:hover {
        text-decoration: underline;
        color: #76b7e2;
        cursor: pointer;
    }
</style>
