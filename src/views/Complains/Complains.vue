<template>
  <div class="animated fadeIn">

     <b-row class="smallCardContainer">
      <b-col v-for="(statusCount, index) in complaintStatusCount" :key="index" sm="12" md="6" xl="3">
        <div class="card smallCard small">
          <div class="smallCardBody">
            <i v-if="statusCount.status === 'received'" class="fa fa-hourglass-start bg-success p-3 font-l"></i>
            <i v-else-if="statusCount.status === 'opened'" class="fa fa-thumbs-up bg-success p-3 font-l"></i>
            <i v-else-if="statusCount.status === 'resolved'" class="fa fa-check-circle bg-success p-3 font-l"></i>
            <i v-else-if="statusCount.status === 'un-reachable'" class="fa fa-spinner bg-success p-3 font-l"></i>
            <div class="p-2">
              <div class="h5 text-success">{{ statusCount.count }}</div>
              <div class="text-muted text-uppercase font-weight-bold font-xs">{{ statusCount.status.toUpperCase() }}</div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
<br>

    <div>
      <div class="cardheading">
        <h4><i class="fa fa-thumbs-down"></i><span class="ml-1">Complaints</span></h4>
        <div class="">
          <h1 class="my-auto tableName">

          </h1>
        </div>




        <div class="d-flex justify-content-between gap-5">
          <select v-model="key" class="form-control mr-2" @change="handleOptionChange"
            style="width: 180px;background: #4dbd74;color: white">
            <option value="this_month">This month</option>
            <option value="last_month">Last month</option>
            <option value="last_three_month">Last three month</option>
            <option value="last_six_month">Last six month</option>
            <option value="this_year">This year</option>
            <option value="last_year">Previous year</option>

          </select>
          <router-link :to="{ name: 'ComplainCreate' }">
            <button class="btn btn-success">Report New Complaint</button>
          </router-link>
        </div>
      </div>
      <b-row>
        <b-col>
          <b-card>
            <v-client-table :data="tableData" :columns="columns" :options="options">
              <template slot="order_id" slot-scope="props">
                <router-link :to="{ name: 'OrderShow', params: { id: props.row.order_id } }">
                  <span class="p-2" data-toggle="tooltip" title="See Order Details" :href="props.row.show">
                    {{ props.row.order_id }}
                  </span>
                </router-link>
              </template>
              <template slot="description" slot-scope="props">
                {{ cutDescriptionToShort(props.row.description) }}
              </template>
              <template slot="status" slot-scope="props">
                <span :class="getStyleOfStatus(props.row.status)" style="font-size: 12px;">
                  {{ props.row.status }}
                </span>
              </template>
              <template slot="action" slot-scope="props">
                <div class="d-flex gap-2">
                  <router-link :to="{ name: 'ComplainShow', params: { id: props.row.id } }">
                    <span class="btn btn-primary btn-sm m-1" data-toggle="tooltip" title="Show" :href="props.row.show">
                      <i class="fa fa-search"></i>
                    </span>
                  </router-link>
                  <router-link :to="{ name: 'ComplainEdit', params: { id: props.row.id } }"><span
                      class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Edit" :href="props.row.id">
                      <i class="fa fa-edit"></i></span></router-link>
                </div>
              </template>
            </v-client-table>
          </b-card>
        </b-col>
      </b-row>
    </div>

  </div>
</template>


<script>
import axios from 'axios';
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
export default {
  name: 'Complains',
  data() {
    return {
      data_loaded_successfully: false,
      key: 'this_month',
      columns: ['id', 'channel', 'type', 'partner_name','phone_number' , 'priority', 'assigned_to', 'complain_issue_date', 'status', 'complain_entry_date', 'solve_type', 'action'],
      tableData: [],

      complaintStatusCount: [
        { status: 'received', count: 0 },
        { status: 'opened', count: 0 },
        { status: 'resolved', count: 0 },
        { status: 'un-reachable', count: 0 }
      ],
      options: {
        pagination: { nav: 'fixed' },
        filterByColumn: true,
        dateColumns: ['age'],
        toMomentFormat: 'YYYY-MM-DD',


        sortIcon: { base: 'fa fa-sort', up: 'fa fa-sort-up', down: 'fa fa-sort-down', is: 'fa fa-sort' },
      }
    }
  },
  created() {
    this.getAllComplains();
    this.getComplaintStatusCount();
  },
  methods: {
    handleOptionChange() {
      console.log("key", this.key)
      this.getAllComplains();
    },
    getAllComplains() {
      axios.post(`${ADMIN_URL}/user-complains`, { key: this.key })
        .then(response => {
          this.tableData = response.data.data;
          this.data_loaded_successfully = true;
        }).catch(error => {
          // console.log('Errorrrrrrrrrrrrrrr ', error.response);
        })
    },

    getComplaintStatusCount(){
      axios.get(`${ADMIN_URL}/user-complaints-status-count`)
        .then(response => {

          const statusCounts = response.data.data;

          this.complaintStatusCount = [
            { status: 'received', count: 0 },
            { status: 'opened', count: 0 },
            { status: 'resolved', count: 0 },
            { status: 'un-reachable', count: 0 }
          ];
          // Update counts based on response
          statusCounts.forEach(sc => {
            const status = this.complaintStatusCount.find(s => s.status === sc.status);
            if (status) {
              status.count = sc.count;
            }
          });


        }).catch(error => {

          console.error("Error while fetching complaintstatus", error);
      })
    },
  },
  computed: {
    cutDescriptionToShort() {
      return (description) => {
        if (description === null) {
          return 'No Description Found.';
        }
        return description.substring(0, 50);
      }
    },

    getStyleOfStatus: function () {
          return (parm) => {
            if (parm === 'received') {
              return 'badge badge-primary';

            } else if (parm === 'opened') {
              return 'badge badge-secondary';

            } else if (parm === 'resolved') {

              return 'badge badge-success';

            } else if (parm === 'un-reachable') {
              return 'badge badge-warning';

            }  else {
              return '';
            }
          }
        },
  }
}
</script>
