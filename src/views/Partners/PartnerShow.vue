<template>
    <div class="customcard">
        <div class="resource-head row">
            <div class="resource-identity col-sm-8  d-flex justify-content-center align-items-center flex-column">
                <img src="https://www.w3schools.com/html/img_girl.jpg" class="rounded-circle" width="100px">
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
                        <tr v-if="partner.booking_type === 'on-demand'">
                          <th>Service Areas</th>
                          <td>{{partner.service_areas}}</td>
                        </tr>
                    </table>
                </b-tab>

                <!--<b-tab title="Resources">
                    <v-client-table :data="tableData" :columns="columns" :options="options"></v-client-table>
                </b-tab>

                <b-tab title="Category">
                    <v-client-table :data="tableData" :columns="columns" :options="options"></v-client-table>
                </b-tab>

                <b-tab title="SubCategory">
                    <v-client-table :data="tableData" :columns="columns" :options="options"></v-client-table>
                </b-tab>
                <b-tab title="Line Item">
                    <v-client-table :data="tableData" :columns="columns" :options="options"></v-client-table>
                </b-tab>-->
            </b-tabs>
        </div>
    </div>
</template>

<script>
  import axios from 'axios';
    export default {
        name: 'PartnerShow',
        components: {},
        data() {
            return {
              partner: [],

              options: {
                    pagination: {nav: 'fixed'},
                    perPage: 5,
                    filterByColumn: true,
                    toMomentFormat: 'YYYY-MM-DD',
                    sortIcon: {base: 'fa fa-sort', up: 'fa fa-sort-up', down: 'fa fa-sort-down', is: 'fa fa-sort'},

              }

            }
        },
      created(){
        const Base_URL = process.env.VUE_APP_ADMIN_URL;
        let partner_id = window.location.pathname.split("/").pop();
        this.id = partner_id;
        axios.post(`${Base_URL}/partners/show`,
          {
            id: this.id
          }).then(response =>{
          this.partner = response.data;
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
          changeStatus(){
            this.$modal.hide('modal-status');
            const Base_URL = process.env.VUE_APP_ADMIN_URL;
            axios.post(`${Base_URL}/partners/change-status`,
              {
                id: this.partner.id,
                status: this.partner.status
              }).then(response =>{
                console.log(response.data);
            })
              .catch(e=>{
                console.log("error occurs",e);
              });
          }
        },
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
