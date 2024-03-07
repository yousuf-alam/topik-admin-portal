<template>
  <div class="animated fadeIn">
    <div class="cardheading">
      <h4><i class="fa fa-file-image-o"></i><span class="ml-1"> Schedule Notification</span></h4>
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
<!--                <router-link :to="{ name: 'notifications / Edit', params: { id: props.row.id }}"><span class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Edit" :href="props.row.id">-->
<!--                                    <i class="fa fa-edit"></i></span></router-link>-->
                <span @click="deleteNotifications(props.row.id)" class="btn btn-danger btn-sm m-1" data-toggle="tooltip" title="Delete"> <i class="fa fa-trash"></i></span>
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
const Admin_URL = process.env.VUE_APP_ADMIN_URL;
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

    deleteNotifications(id){

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
    confirmDelete($id) {

      console.log('dhuksi');


      axios.post(`${Admin_URL}/schedule-notification/delete-notification`, {
        id: $id
      })
        .then(response => {
          this.$swal('Delete Notification', '', 'success');
          setTimeout(()=>{
            window.location.href='/schedule-notification';
          },1000);
        })
        .catch(e => {
          console.log("error occurs",e);
        });
    }
  },
}
</script>
