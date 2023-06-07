<template>
  <div class="animated fadeIn">
    <div class="cardheading">
      <h4><i class="fa fa-bars"></i><span class="ml-1">Reward Status</span></h4>
      <div class="">
        <h1 class="my-auto tableName">

        </h1>
      </div>
      <div class="">
        <router-link :to="{ name: 'CreateStatus'}" >
          <button class="btn btn-success">Create New Status</button>
        </router-link>
      </div>
    </div>
    <b-row>
      <b-col>
        <b-card>
          <v-client-table :data="rewardStatus" :columns="columns" :options="options">
            <template slot="action" slot-scope="props">
              <div>
                                <router-link :to="{ name: 'EditStatus', params: { id: props.row.id }}"
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
export default {
  name: "StatusShow",

  data() {
    return {
      rewardStatus : [],
      columns: [
   'low_limit', 'high_limit', 'status','background_color','points_color','progress_bg_color','bottom_text_color', 'action'
      ],
      status_id:'',
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
    axios.get(`${ADMIN_URL}/reward-status/get-data`)
        .then(response => {
          console.log('response',response);
          this.rewardStatus = response.data.data;
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
    handleDelete(status_id) {
      this.$swal({
        title: 'Are you sure?',
        type: 'warning',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
      }).then(result => {
        if(result.value) {
          this.deleteRedeem(status_id);
        }
      }).catch(error => {
        // console.log('Sweetalert ERROR');
      });
    },
    deleteRedeem(status_id) {

      axios.delete(`${ADMIN_URL}/reward-status/delete-status/${status_id}`
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
