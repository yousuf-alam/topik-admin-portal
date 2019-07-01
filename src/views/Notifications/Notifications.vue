<template>
  <div class="animated fadeIn">
    <div class="cardheading">
      <div class="">
        <h1 class="my-auto tableName">

        </h1>
      </div>
      <div class="">
        <router-link :to="{ name: 'NotificationCreate'}">
          <button class="btn btn-success">
            Create New Notification
          </button>
        </router-link>
      </div>
    </div>
    <b-row>
      <b-col>
        <b-card>
          <v-client-table :data="notifications" :columns="columns" :options="options">
            <template slot="action" slot-scope="props">
              <div>
                <router-link :to="{ name: 'NotificationEdit', params: { id: 1 }}"><span class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Show" :href="props.row.show">
                                    <i class="fa fa-edit"></i></span></router-link>
                <span class="btn btn-success btn-sm m-1" data-toggle="tooltip" title="Publish" @click="publish(props.row.id)">
                                    <i class="fa fa-upload"></i></span>
                <span class="btn btn-danger btn-sm m-1" data-toggle="tooltip" title="Delete">
                                    <i class="fa fa-trash"></i></span>
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
  const Admin_URL = process.env.VUE_APP_ADMIN_URL;
  export default {
    name: 'Notifications',
    data() {
      return {
        columns: ['title', 'target_group', 'status', 'action'],
        notifications : [],
        options: {
          pagination: {nav: 'fixed'},
          filterByColumn: true,
          toMomentFormat: 'YYYY-MM-DD',
          sortIcon: {base: 'fa fa-sort', up: 'fa fa-sort-up', down: 'fa fa-sort-down', is: 'fa fa-sort'},

        }

      }
    },
    created() {
      axios.get(`${Admin_URL}/push-notifications`)
        .then(response => {
          this.notifications = response.data;
        })
        .catch(e => {
          console.log("error occurs",e);
        });
    },
    methods: {

      publish(id) {

        axios.post(`${Admin_URL}/push-notifications/publish`,{
          id : id
        })
          .then(response => {
            this.$swal('Notification sent to all devices', '', 'success');
            setTimeout(()=>{
              location.reload();
            },1000);
          })
          .catch(e => {
            console.log("error occurs",e);
          });

      },

      delete(id) {
        // The id can be fetched from the slot-scope row object when id is in columns
        console.log('hi');
      }
    },
  }
</script>
