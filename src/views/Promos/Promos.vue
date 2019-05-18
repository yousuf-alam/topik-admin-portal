<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="10"></b-col>
      <b-col sm="2" class="mb-3">
        <router-link :to="{ name: 'PromoCreate'}"><button class="btn btn-success">Create New promo</button></router-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card>
          <v-client-table :data="promos" :columns="columns" :options="options">
            <template slot="action" slot-scope="props">
              <div>
                <router-link :to="{ name: 'promo / Edit', params: { id: props.row.id }}"><span class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Edit" :href="props.row.id">
                                    <i class="fa fa-edit"></i></span></router-link>
                <span @click="publish(props.row.id)" class="btn btn-success btn-sm m-1" data-toggle="tooltip" title="Publish"> <i class="fa fa-upload"></i></span>
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
  export default {
    name: 'promos',
    data() {
      return {
        promos : [],
        columns: ['id', 'code', 'type', 'status','discount_amount', 'expires_at', 'action'],
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
      const Base_URL = process.env.VUE_APP_ADMIN_URL;
      axios.get(`${Base_URL}/all-promos`)
        .then(response =>{
          this.promos = response.data;
        })
        .catch(e=>{
          //console.log("error occurs");
        });
    },
    methods: {
      publish(promo_id)
      {
        const Base_URL = process.env.VUE_APP_ADMIN_URL;
        axios.post(`${Base_URL}/push-promos/publish`,
          {
            id: promo_id
          })
          .then(response =>{
            window.location.reload();
          })
          .catch(e=>{
            console.log("error occurs", e);
          });
      }
    },
  }
</script>
