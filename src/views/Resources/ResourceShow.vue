<template>
  <div class="customcard">
    <div class="resource-head row">
      <div class="resource-identity col-sm-8  d-flex justify-content-center align-items-center flex-column">
        <img :src="src_avatar + resource.user.avatar" class="rounded-circle" width="100px">
        <div>
          <h3>{{resource.name}}</h3>
        </div>
        <div>
          <h4 class="status-badge">
            {{resource.status}}
          </h4>
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
              <td>{{resource.name}}</td>
            </tr>
            <tr>
              <th>Service Type</th>
              <td>{{resource.partner.type}} ( {{resource.partner.booking_type}} ) </td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{{resource.user.phone}}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{{resource.status}}</td>
            </tr>
            <tr>
              <th>Resource Type</th>
              <td>{{resource.resource_type}}</td>
            </tr>
            <tr>
              <th>NID</th>
              <td>{{resource.nid}}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{{resource.user.address}}</td>
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
    name: 'ResourceShow',
    components: {},
    data() {
      return {
        resource: [],
        src_avatar : '/images/resource_avatars/',
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
      this.src_avatar = Base_URL + this.src_avatar;
      let resource_id = window.location.pathname.split("/").pop();
      this.id = resource_id;
      axios.post(`${Base_URL}/resources/show`,
        {
          id: this.id
        }).then(response =>{
        this.resource = response.data;
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
        axios.post(`${Base_URL}/resources/change-status`,
          {
            id: this.resource.id,
            status: this.resource.status
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
