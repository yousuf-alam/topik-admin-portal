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
            <template slot="image" slot-scope="props">
              <div class="center-div">
                <img :src="`${BASE_URL}/${src_image}${props.row.image}`" style="width: 160px;height: 90px;" v-show="props.row.image">
              </div>
            </template>
            <template slot="action" slot-scope="props">
              <div>
                <router-link :to="{ name: 'NotificationEdit', params: { id: props.row.id }}"><span class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Show" :href="props.row.show">
                                    <i class="fa fa-edit"></i></span></router-link>
                <span class="btn btn-success btn-sm m-1 cursor-pointer" data-toggle="tooltip" title="Publish" @click="publish(props.row.id)">
                                    <i class="fa fa-upload"></i></span>
                <span class="btn btn-danger btn-sm m-1 cursor-pointer" data-toggle="tooltip" title="Delete" @click="destroy(props.row.id)">
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
  const BASE_URL  = process.env.VUE_APP_BASE_URL;
  export default {
    name: 'Notifications',
    data() {
      return {
        columns: ['title','image', 'target_group', 'status', 'action'],
        notifications : [],
        BASE_URL: BASE_URL,
        src_image : 'images/push_notifications/',
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
      destroy(id) {
        axios.post(`${Admin_URL}/push-notifications/delete`,{
          id : id
        })
          .then(response => {
            if(response.data.success===true)
            {
              this.$swal('Notification Deleted Successfully', '', 'success');
              location.reload();
            }
          })
          .catch(e => {
            console.log("error occurs",e);
          });
      }
    },
  }
</script>
