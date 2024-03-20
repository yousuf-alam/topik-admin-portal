<template>
  <div class="animated fadeIn">
    <div class="cardheading">
      <h4><i class="fa fa-bars"></i><span class="ml-1">Minimum Payment Time</span></h4>
      <div class="">
        <h1 class="my-auto tableName">

        </h1>
      </div>
    </div>
    <b-row>
      <b-col>
        <b-card>
          <v-client-table :data="amounts" :columns="columns" :options="options">
            <template slot="action" slot-scope="props">
              <div>
                <router-link :to="{ name: 'EditMinimumPaymentTime', params: { id: props.row.id }}"
                >
                  <span
                      class="btn btn-warning btn-sm m-1"
                      data-toggle="tooltip" title="Edit"
                      :href="props.row.id">
                    <i class="fa fa-edit"></i>
                  </span>
                </router-link>
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
  name: "ShowMinimumPaymentTime",

  data() {
    return {
      amounts : [],
      columns: [
        'id', 'hours', 'status', 'created_by','updated_by', 'action'
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
    axios.get(`${ADMIN_URL}/minimum-time-payment`)
        .then(response => {
          console.log('response',response);
          this.amounts = response.data.data;
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
  
}
</script>
