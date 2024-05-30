<template>
  <div class="animated fadeIn">
    <div class="cardheading">
      <h4><i class="fa fa-bars"></i><span class="ml-1">Feed</span></h4>
      <div class="">
        <h1 class="my-auto tableName">

        </h1>
      </div>
      <div class="">
        <router-link :to="{ name: 'CreateFeed'}" >
          <button class="btn btn-success">Create New Feed</button>
        </router-link>
      </div>
    </div>
    <b-row>
      <b-col>
        <b-card>
          <v-client-table :data="feeds" :columns="columns" :options="options">
            <template slot="image" slot-scope="props">
              <div class="center-div">
                <img :src="`${BASE_URL}/${src_image}${props.row.image}`" style="width: 160px;height: 90px;">
              </div>
            </template>
<!--            <template slot="images" slot-scope="props">-->
<!--              <div class="center-div">-->
<!--                <img :src="`${BASE_URL}/${src_image}${props.row.image}`" style="width: 160px;height: 90px;">-->
<!--              </div>-->
<!--            </template>-->

            <template slot="action" slot-scope="props">
              <div>
                <router-link :to="{ name: 'EditFeed', params: { id: props.row.id }}"
                >
                                <span
                                    class="btn btn-warning btn-sm m-1"
                                    data-toggle="tooltip" title="Edit"
                                    :href="props.row.id">
                                  <i class="fa fa-edit"></i>
                                </span>
                </router-link>
                                              <span
                                                  class="btn btn-danger btn-sm m-1"
                                                  data-toggle="tooltip"
                                                  title="Delete Redeem"
                                                  :href="props.row.id"
                                                  @click="handleDelete(props.row.id)"
                                              >
                                                  <i class="fa fa-trash"></i>
                                              </span>
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
const ADMIN_URL = process.env.VUE_APP_ADMIN_URL;
const BASE_URL  = process.env.VUE_APP_BASE_URL;
export default {
  name: "FeedShow",
  data() {
    return {
      feeds : [],
      columns: [
        'image', 'title', 'url', 'type','user_id','publishing_time', 'status','action'
      ],
      BASE_URL:BASE_URL,
      ADMIN_URL:ADMIN_URL,
      src_image : 'images/feed/',


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

    axios.get(`${ADMIN_URL}/feed/get-feed`)
        .then(response => {
          console.log('response',response);
          this.feeds = response.data.data;
        })
        .catch(e => {
          console.log("error occurs", e.response);
        });
  },
  computed: {
    elementHasPermission(permission_name) {
      return (permission_name) => {
        return !!this.$store.getters['auth/hasPermission'](permission_name);
      }
    }
  },
  methods: {
    handleDelete(feed_id) {
      this.$swal({
        title: 'Are you sure?',
        type: 'warning',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
      }).then(result => {
        if(result.value) {
          this.deleteFeedItem(feed_id);
        }
      }).catch(error => {
        // console.log('Sweetalert ERROR');
      });
    },
    deleteFeedItem(feed_id) {

      axios.delete(`${ADMIN_URL}/feed/delete-feed/${feed_id}`
      )
          .then(response => {
            if(response.data.success===true)
            {
              this.$swal('Deleted', response.data.message, 'success')
            }

            window.location.reload()
          }).catch(error => {
        this.$swal('Not deleted', 'Error occured while deleing', 'info')
        // console.log('Error response :::: ', error.response);
      })
    },

  },
}
</script>
