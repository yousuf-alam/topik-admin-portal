<template>
  <div class="animated fadeIn">
    <div class="cardheading">
      <h4><i class="fa fa-bars"></i><span class="ml-1">Reward user</span></h4>
      <div class="">
        <h1 class="my-auto tableName">

        </h1>
      </div>
    </div>
    <b-row>
      <b-col>
        <b-card>
          <v-client-table :data="rewards" :columns="columns" :options="options">

            <template slot="image" slot-scope="props">
              <div class="center-div">
                <img :src="`${BASE_URL}/${src_image}${props.row.image}`" style="width: 160px;height: 90px;" v-show="props.row.image">
              </div>
            </template>
            <template slot="action" slot-scope="props">
              <div>

                <span class="btn btn-success btn-sm m-1 cursor-pointer" data-toggle="tooltip" title="Publish" @click="approveReward(props.row.id)">
                                    <i class="fa fa-check-square"></i></span>
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
  name: "RewardUser",

  data() {
    return {
      rewards : [],
      columns: [
        'id', 'user_id', 'image', 'slug','action'
      ],
      redeem_id:'',
      BASE_URL: BASE_URL,
      src_image : 'images/social/',
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
    axios.get(`${ADMIN_URL}/social-media/get-data`)
      .then(response => {
        console.log('response',response);
        this.rewards = response.data.data;
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
    approveReward(id) {
      console.log("hello id",id);

      axios.post(`${ADMIN_URL}/social-media/approve-reward`,{
        id : id
      })
        .then(response => {
          this.$swal('Approve Reward', '', 'success');
          setTimeout(()=>{
            location.reload();
          },1000);
        })
        .catch(e => {
          console.log("error occurs",e);
        });

    },

  },
}
</script>
