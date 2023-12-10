<template>
  <div class="animated fadeIn">
    <div class="cardheading">
      <h4><i class="fa fa-bars"></i><span class="ml-1">Partner Notices</span></h4>
      <div class="d-flex justify-content-between gap-5">
        <select v-model="key" class="form-control mr-2" @change="handleOptionChange" style="width: 130px">
          <option value="this_month">This month</option>
          <option value="last_month">Last month</option>
          <option value="last_three_month">Last three month</option>
          <option value="last_six_month">Last six month</option>
          <option value="this_year">This Year</option>

        </select>


        <router-link :to="{ name: 'CreateRedeem'}" >
          <button class="btn btn-success">Create New Notice</button>
        </router-link>
      </div>
    </div>
    <b-row>
      <b-col>
        <b-card>
          <v-client-table :data="notices" :columns="columns" :options="options">
            <template slot="action" slot-scope="props">
              <div>
                <router-link :to="{ name: 'EditRedeem', params: { id: props.row.id }}"
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
  name: "NoticeShow",

  data() {
    return {
      notices : [],
      columns: [
        'id', 'type', 'partner_id', 'notice','status','updated_by', 'action'
      ],
      key:'this_month',
      notice_id:'',
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
    this.getAllNotices();
  },
  computed: {
    elementHasPermission(permission_name) {
      return (permission_name) => {
        return !!this.$store.getters['auth/hasPermission'](permission_name);
      }
    }
  },
  methods: {
    handleOptionChange() {
      console.log("key",this.key)
      this.getAllNotices();
    },

    getAllNotices()
    {
      axios.post(`${ADMIN_URL}/in-house-notice/get-all`,{
        key:this.key
      })
        .then(response => {
          console.log('response',response);
          this.notices = response.data.data;
        })
        .catch(e => {
          console.log("error occurs", e.response);
        });

    },
    handleDelete(notice_id) {
      this.$swal({
        title: 'Are you sure?',
        type: 'warning',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
      }).then(result => {
        if(result.value) {
          this.deleteRedeem(notice_id);
        }
      }).catch(error => {
        // console.log('Sweetalert ERROR');
      });
    },
    deleteRedeem(notice_id) {

      axios.delete(`${ADMIN_URL}/redeem/delete-redeem/${notice_id}`
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
