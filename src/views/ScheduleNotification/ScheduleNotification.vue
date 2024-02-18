<template>
  <div class="animated fadeIn">
    <div class="cardheading">
      <h4><i class="fa fa-file-image-o"></i><span class="ml-1">notificationss</span></h4>
      <div class="">
        <h1 class="my-auto tableName">

        </h1>
      </div>
      <div class="d-flex gap-5">
         <div>
           <router-link :to="{ name: 'CreateScheduleNotification'}">
             <button class="btn btn-success">Create New</button>
           </router-link>
         </div>
          <div class="ml-2">
            <router-link :to="{ name: 'ShowContent'}">
              <button class="btn btn-success">Show Content</button>
            </router-link>
          </div>
      </div>
    </div>
    <b-row>
      <b-col>
        <b-card>
          <v-client-table :data="notifications" :columns="columns" :options="options">
            <template slot="image" slot-scope="props">
              <div class="center-div">
                <img :src="`${BASE_URL}/${src_image}${props.row.image}`" style="width: 160px;height: 90px;">
              </div>
            </template>
            <template slot="action" slot-scope="props">
              <div>
                <router-link :to="{ name: 'notifications / Edit', params: { id: props.row.id }}"><span class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Edit" :href="props.row.id">
                                    <i class="fa fa-edit"></i></span></router-link>
                <span @click="deletenotifications(props.row.id)" class="btn btn-danger btn-sm m-1" data-toggle="tooltip" title="Delete"> <i class="fa fa-trash"></i></span>
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

const BASE_URL = process.env.VUE_APP_BASE_URL;
const ROOT_URL = process.env.VUE_APP_ROOT_URL;
export default {
  name: 'ScheduleNotification',
  data() {
    return {
      BASE_URL: BASE_URL,
      notifications: [],
      src_image: 'images/notificationss/',
      columns: ['id', 'scheduled_date', 'live_time', 'title', 'body', 'status', 'action'],
      options: {
        pagination: {nav: 'fixed'},
        filterByColumn: true,
        toMomentFormat: 'YYYY-MM-DD',
        sortIcon: {base: 'fa fa-sort', up: 'fa fa-sort-up', down: 'fa fa-sort-down', is: 'fa fa-sort'},

      }

    }
  },
  created() {
    const Admin_URL = process.env.VUE_APP_ADMIN_URL;
    const BASE_URL = process.env.VUE_APP_BASE_URL;
    axios.get(`${Admin_URL}/schedule-notification/get-data`)
      .then(response => {
        // console.log('B2CSections.vue, response === ', response.data);
        this.notifications = response.data.data;
      })
      .catch(e => {
        //console.log("error occurs");
      });
  },
  methods: {
    deletenotifications($id) {
      let url = `${ROOT_URL}/api/v2.0/admin/notificationss/delete`;

      axios.post(`${ROOT_URL}/api/v2.0/admin/notificationss/delete`, {
        id: $id
      })
        .then(response => {
          if (response.data.status == 'Successfully deleted') {
            this.$swal('Success', response.data.status, 'success');
            this.$router.go(this.$router.currentRoute);
          } else {
            this.$swal('Error', response.data, 'error');
          }
        })
        .catch(e => {
          this.$swal('Error', e.message, 'error');
        });
    }
  },
}
</script>
