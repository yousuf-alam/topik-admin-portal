<template>
  <div class="animated fadeIn">
    <div class="cardheading">
      <div class="">
        <h1 class="my-auto tableName">

        </h1>
      </div>
      <div class="">
          <router-link :to="{ name: 'BannerCreate'}">
              <button class="btn btn-success">Create New Banner</button>
          </router-link>
      </div>
    </div>
    <b-row>
      <b-col>
        <b-card>
          <v-client-table :data="banner" :columns="columns" :options="options">
            <template slot="image" slot-scope="props">
              <div class="center-div" >
                <img :src="`${BASE_URL}/${src_image}${props.row.image}`"  style="width: 60px;height: 60px;">
              </div>

            </template>
            <template slot="action" slot-scope="props">
              <div>
                <router-link :to="{ name: 'Banner / Edit', params: { id: props.row.id }}"><span class="btn btn-warning btn-sm m-1" data-toggle="tooltip" title="Edit" :href="props.row.id">
                                    <i class="fa fa-edit"></i></span></router-link>
                <span class="btn btn-danger btn-sm m-1" data-toggle="tooltip" title="Delete"> <i class="fa fa-trash"></i></span>
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
  const BASE_URL  = process.env.VUE_APP_BASE_URL;

  export default {
    name: 'Banners',
    data() {
      return {
        BASE_URL: BASE_URL,
        banner : [],
        src_image : '/images/banners/',
        columns: ['image', 'title', 'service', 'type', 'status', 'created_at', 'action'],
        options: {
          pagination: {nav: 'fixed'},
          filterByColumn: true,
          toMomentFormat: 'YYYY-MM-DD',
          sortIcon: {base: 'fa fa-sort', up: 'fa fa-sort-up', down: 'fa fa-sort-down', is: 'fa fa-sort'},

        }

      }
    },
    created(){
      const Admin_URL = process.env.VUE_APP_ADMIN_URL;
      const BASE_URL  = process.env.VUE_APP_BASE_URL;
      axios.get(`${Admin_URL}/banners`)
        .then(response => {
          console.log('Banners.vue, response === ', response.data);
          this.banner = response.data;
        })
        .catch(e=>{
          //console.log("error occurs");
        });
    },
    methods: {
      
    },
  }
</script>
