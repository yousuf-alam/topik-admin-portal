<template>
  <div class="animated fadeIn">
    <div class="cardheading">
      <h4><i class="fa fa-bars"></i><span class="ml-1">Minimum Order Amount</span></h4>

      <div class="link-btns">
        <div class="">
          <router-link v-if="getUserPermission('minimum order amount create')" :to="{ name: 'CreateMinimumAmountByFilter'}" >
            <button class="btn btn-success">Create New Minimum Order Amount</button>
          </router-link>
        </div>

        <!-- <div class="">
          <router-link :to="{ name: 'CreateMinimumAmount'}" >
            <button class="btn btn-success">Create New Minimum Order Amount</button>
          </router-link>
        </div> -->
      </div>
    </div>
    <b-row>
      <b-col>
        <b-card>
          <v-client-table :data="amounts" :columns="columns" :options="options">
            <template slot="action" slot-scope="props">
              <div>
                <router-link v-if="getUserPermission('minimum order amount update')" :to="{ name: 'EditMinimumAmount', params: { id: props.row.id }}"
                >
                  <span
                      class="btn btn-warning btn-sm m-1"
                      data-toggle="tooltip" title="Edit"
                      :href="props.row.id">
                    <i class="fa fa-edit"></i>
                  </span>
                </router-link>
<!--                <span-->
<!--                    class="btn btn-danger btn-sm m-1"-->
<!--                    data-toggle="tooltip"-->
<!--                    title="Delete Redeem"-->
<!--                    :href="props.row.id"-->
<!--                    @click="handleDelete(props.row.id)"-->
<!--                >-->
<!--                    <i class="fa fa-trash"></i>-->
<!--                </span>-->
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
  name: "ShowMinimumAmount",

  data() {
    return {
      amounts : [],
      columns: [
        'id','location', 'amount', 'status', 'created_by','updated_by', 'action'
      ],
      redeem_id:'',
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
    axios.get(`${ADMIN_URL}/minimum-order-amount/get-all`)
        .then(response => {
          console.log('response',response);
          // this.amounts = response.data.data;
          this.amounts = response.data.data.map(item => ({
          ...item,
          location: item.location.name,
          status: item.status.charAt(0).toUpperCase() + item.status.slice(1)
        }));
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
    // handleDelete(redeem_id) {
    //   this.$swal({
    //     title: 'Are you sure?',
    //     type: 'warning',
    //     showCloseButton: true,
    //     showCancelButton: true,
    //     focusConfirm: false,
    //   }).then(result => {
    //     if(result.value) {
    //       this.deleteRedeem(redeem_id);
    //     }
    //   }).catch(error => {
    //     // console.log('Sweetalert ERROR');
    //   });
    // },
    // deleteRedeem(redeem_id) {
    //
    //   axios.delete(`${ADMIN_URL}/redeem/delete-redeem/${redeem_id}`
    //   )
    //       .then(response => {
    //         if(response.data.success===true)
    //         {
    //           this.$swal('Deleted', response.data.message, 'success')
    //         }
    //
    //         window.location.reload()
    //       }).catch(error => {
    //     this.$swal('Not deleted', 'Error occured while deleing', 'info')
    //     // console.log('Error response :::: ', error.response);
    //   })
    // },
  },
}
</script>

<style scoped>

.link-btns {

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
}
</style>
